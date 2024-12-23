import { commonValidations } from "@/common/utils/commonValidation";
import { email } from "envalid";
import { z } from "zod";

export type Member = z.infer<typeof MemberSchema>;
export const MemberSchema = z.object({
  id: z.number(),
  name: z.string().max(50),
  email: z.string().email().max(50),
  abilities: z.string().max(500),
  position: z.enum(["Desenvolvedor Front End", "Desenvolvedor Back End", "Desenvolvedor Full Stack", "UX Designer"]),
  aboutMe: z.string().max(2500),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CreateMemberDto = z.infer<typeof CreateMemberDtoSchema>;
export const CreateMemberDtoSchema = z.object({
  name: z.string().max(50),
  email: z.string().email().max(50),
  abilities: z.string().max(500),
  position: z.enum(["Desenvolvedor Front End", "Desenvolvedor Back End", "Desenvolvedor Full Stack", "UX Designer"]),
  aboutMe: z.string().max(2500),
});

export type UpdateMemberDto = z.infer<typeof UpdateMemberDtoSchema>;
export const UpdateMemberDtoSchema = z.object({
  name: z.string().max(50),
  abilities: z.string().max(500),
  position: z.enum(["Desenvolvedor Front End", "Desenvolvedor Back End", "Desenvolvedor Full Stack", "UX Designer"]),
  aboutMe: z.string().max(2500),
});

export const CreateMemberSchema = z.object({
  body: z.object({
    name: commonValidations.name,
    email: commonValidations.email,
    abilities: commonValidations.abilities,
    position: commonValidations.position,
    aboutMe: commonValidations.aboutMe,
  }),
});

export const GetMemberSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});

export const UpdateMemberSchema = z.object({
  params: z.object({ id: commonValidations.id }),
  body: z.object({
    name: commonValidations.name,
    abilities: commonValidations.abilities,
    position: commonValidations.position,
    aboutMe: commonValidations.aboutMe,
  }),
});
