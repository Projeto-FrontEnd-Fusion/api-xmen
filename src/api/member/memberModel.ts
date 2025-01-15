import { commonValidationsMembers } from "@/common/utils/commonValidation";
import { z } from "zod";

export type Member = z.infer<typeof MemberSchema>;
export const MemberSchema = z.object({
  id: z.number(),
  name: z.string().max(50),
  professional_profile_url: z.array(
    z.object({
      platform: z.string().max(50),
      url: z.string().url(),
    }),
  ),
  stack: z.enum(["frontend", "backend", "full-stack", "UX Designer"]),
  community_level: z.string().max(50),
  current_squad: z.string().max(50),
  skills: z.array(z.string()),
  projects: z.array(
    z.object({
      project_cover: z.string(),
      project_name: z.string().max(50),
      description: z.string().max(500),
      technologies_used: z.array(z.string()),
      project_url: z.string().url(),
    }),
  ),
  softskills: z.array(z.string()),
});

export type CreateMemberDto = z.infer<typeof CreateMemberDtoSchema>;
export const CreateMemberDtoSchema = z.object({
  name: z.string().max(50),
  professional_profile_url: z.array(
    z.object({
      platform: z.string().max(50),
      url: z.string().url(),
    }),
  ),
  stack: z.enum(["frontend", "backend", "full-stack", "UX Designer"]),
  community_level: z.string().max(50),
  current_squad: z.string().max(50),
  skills: z.array(z.string()),
  projects: z.array(
    z.object({
      project_cover: z.string(),
      project_name: z.string().max(50),
      description: z.string().max(500),
      technologies_used: z.array(z.string()),
      project_url: z.string().url(),
    }),
  ),
  softskills: z.array(z.string()),
});

export type UpdateMemberDto = z.infer<typeof UpdateMemberDtoSchema>;
export const UpdateMemberDtoSchema = z.object({
  name: z.string().max(50),
  professional_profile_url: z.array(
    z.object({
      platform: z.string().max(50),
      url: z.string().url(),
    }),
  ),
  stack: z.enum(["frontend", "backend", "full-stack", "UX Designer"]),
  community_level: z.string().max(50),
  current_squad: z.string().max(50),
  skills: z.array(z.string()),
  projects: z.array(
    z.object({
      project_cover: z.string(),
      project_name: z.string().max(50),
      description: z.string().max(500),
      technologies_used: z.array(z.string()),
      project_url: z.string().url(),
    }),
  ),
  softskills: z.array(z.string()),
});

export const CreateMemberSchema = z.object({
  body: z.object({
    name: commonValidationsMembers.name,
    professional_profile_url: commonValidationsMembers.professional_profile_url,
    stack: commonValidationsMembers.stack,
    community_level: commonValidationsMembers.community_level,
    current_squad: commonValidationsMembers.current_squad,
    skills: commonValidationsMembers.skills,
    projects: commonValidationsMembers.projects,
    softskills: commonValidationsMembers.softskills,
  }),
});

export const GetMemberSchema = z.object({
  params: z.object({ id: commonValidationsMembers.id }),
});

export const UpdateMemberSchema = z.object({
  params: z.object({ id: commonValidationsMembers.id }),
  body: z.object({
    name: commonValidationsMembers.name,
    professional_profile_url: commonValidationsMembers.professional_profile_url,
    stack: commonValidationsMembers.stack,
    community_level: commonValidationsMembers.community_level,
    current_squad: commonValidationsMembers.current_squad,
    skills: commonValidationsMembers.skills,
    projects: commonValidationsMembers.projects,
    softskills: commonValidationsMembers.softskills,
  }),
});
