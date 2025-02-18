import { commonValidations } from "@/common/utils/commonValidation";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

const { id, name, email, abilities, position, aboutMe, createdAt, updatedAt } = commonValidations;

export const CreateCandidateDtoSchema = z.object({
  name,
  email,
  abilities,
  position,
  aboutMe,
});

export const CandidateSchema = z.object({
  id,
  name,
  email,
  abilities,
  position,
  aboutMe,
  createdAt,
  updatedAt,
});

export const UpdateCandidateDtoSchema = z.object({
  name,
  email,
  abilities,
  position,
  aboutMe,
});

export type CreateCandidateDto = z.infer<typeof CreateCandidateDtoSchema>;
export type Candidate = z.infer<typeof CandidateSchema>;
export type UpdateCandidateDto = z.infer<typeof UpdateCandidateDtoSchema>;

export const CreateCandidateSchema = z.object({
  body: z.object({
    name,
    email,
    abilities,
    position,
    aboutMe,
  }),
});

export const GetCandidateSchema = z.object({
  params: z.object({ id }),
});

export const UpdateCandidateSchema = z.object({
  params: z.object({ id }),
  body: z.object({
    name,
    email,
    abilities,
    position,
    aboutMe,
  }),
});
