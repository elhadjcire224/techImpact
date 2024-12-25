import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Globe, Mail, Phone } from 'lucide-react';
import BacKButton from '@/components/back_button';
import { UserRole } from '@/types/user_roles';
import { fetchMemberById } from '@/lib/actions/members.actions';
import { notFound } from "next/navigation";
import { cn, getInitials } from "@/lib/utils";
import { ContactButtons } from "@/components/members/contact_buttons";


interface Member {
  id: string;
  name: string | null;
  image: string | null;
  email: string | null;
  bio: string | null;
  skills: string[];
  role: UserRole;
  phone: string | null;
  github: string | null;
  cvPath: string | null;
}
export default async function MemberDetail({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  const member = await fetchMemberById(id)

  if (!member) notFound()



  return (
    <div className="w-full my-12 max-w-4xl mx-auto p-1 md:p-6 lg:p-8 space-y-8 md:my-0">
      <BacKButton />

      <Card className="backdrop-blur border-1">
        <CardContent className="p-6 px-2 md:p-8">
          {/* Profile Header */}
          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            <Avatar className="h-32 w-32 ring-2 ring-border">
              <AvatarImage src={member.image || ''} />
              <AvatarFallback className="text-4xl bg-background">
                {getInitials(member.name)}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">{member.name}</h1>
              <Badge
                className={cn(
                  "text-sm px-4 py-1",
                  member.role === 'MENTOR' ? "bg-sky-500/10 text-sky-500" : "",
                  member.role === 'ADMIN' ? "bg-purple-500/10 text-purple-500" : ""
                )}
              >
                {member.role}
              </Badge>
            </div>
          </div>

          {/* Bio Section */}
          {member.bio && (
            <div className="mb-8">
              <p className="text-base md:text-lg text-center text-muted-foreground max-w-3xl mx-auto">
                {member.bio}
              </p>
            </div>
          )}

          {/* Skills Grid */}
          <div className="mb-8">
            <h2 className="text-sm font-medium text-muted-foreground mb-4 text-center">Skills & Expertise</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {member.skills.map(skill => (
                <Badge
                  key={skill.skill}
                  variant="outline"
                  className="px-3 py-1 bg-background/50 hover:bg-background/80 transition-colors"
                >
                  {skill.skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <ContactButtons
            email={member.email}
            phone={member.phone}
            github={member.github}
            portfolio={member.portfolio}
            cvPath={member.cvPath}
          />
        </CardContent>
      </Card>
    </div>
  );
}