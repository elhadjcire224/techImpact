"use client"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import * as React from "react"

interface SkillsInputProps {
  value: string[]
  onChange: (skills: string[]) => void
  className?: string
}

export default function SkillsInput({ value, onChange, className }: SkillsInputProps) {
  const [input, setInput] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  const addSkill = (skill: string) => {
    const trimmedSkill = skill.trim()
    if (trimmedSkill && !value.includes(trimmedSkill)) {
      onChange([...value, trimmedSkill])
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value


    if (newValue.includes(',')) {

      const newSkills = newValue.split(',')

      newSkills.slice(0, -1).forEach(skill => addSkill(skill))

      setInput(newSkills[newSkills.length - 1])
    } else {
      setInput(newValue)
    }
  }

  const removeSkill = (skillToRemove: string) => {
    onChange(value.filter(skill => skill !== skillToRemove))
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 p-2 rounded-md border-2  min-h-12 max-h-40",
        className
      )}
    >
      {value.map((skill) => (
        <Badge
          key={skill}
          variant="secondary"
          className="text-foreground hover:bg-background/15 transition-colors"
        >
          {skill}
          <button
            type="button"
            className="ml-1"
            onClick={() => removeSkill(skill)}
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      <input
        ref={inputRef}
        value={input}
        onChange={handleInputChange}

        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault()
            addSkill(input)
            setInput("")
          }
          if (e.key === "Backspace" && !input && value.length > 0) {
            onChange(value.slice(0, -1))
          }
        }}
        className="flex-1 bg-transparent border-0 outline-none focus:outline-none text-sm min-w-[120px]"
        placeholder="Data Science, Design, web developpement..."
      />
    </div>
  )
}
