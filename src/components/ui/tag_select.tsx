
import { Tag } from "@/hooks/use_tags"
import { MultiSelector, MultiSelectorContent, MultiSelectorInput, MultiSelectorItem, MultiSelectorList, MultiSelectorTrigger } from "./multi_select"


interface TagSelectProps {
  selected: string[]
  options: Tag[]
  onChange: (value: string[]) => void
}

export function TagSelect({ selected, options, onChange }: TagSelectProps) {
  return (
    <MultiSelector
      values={selected}
      onValuesChange={onChange}
      loop
      className="w-full"
    >
      <MultiSelectorTrigger>
        <MultiSelectorInput placeholder="Select tags for your idea" />
      </MultiSelectorTrigger>
      <MultiSelectorContent>
        <MultiSelectorList>
          {options.map((tag) => (
            <MultiSelectorItem key={tag.id} value={tag.id}>
              {tag.label}
            </MultiSelectorItem>
          ))}
        </MultiSelectorList>
      </MultiSelectorContent>
    </MultiSelector>
  )
}