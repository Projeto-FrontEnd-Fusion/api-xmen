import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const commonValidations = {
  id: z
    .string()
    .refine((data) => !Number.isNaN(Number(data)), "ID must be a numeric value")
    .transform(Number)
    .refine((num) => num > 0, "ID must be a positive number"),
  name: z.string().max(50),
  email: z.string().email().max(50),
  abilities: z.string().max(500),
  position: z.enum(["Desenvolvedor Front End", "Desenvolvedor Back End", "Desenvolvedor Full Stack", "UX Designer"]),
  aboutMe: z.string().max(2500),
};

export const commonValidationsMembers = {
  id: z
    .string()
    .refine((data) => !Number.isNaN(Number(data)), "ID must be a numeric value")
    .transform(Number)
    .refine((num) => num > 0, "ID must be a positive number"),
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
};

export const commonValidationsProjects = {
  id: z
    .string()
    .refine((data) => !Number.isNaN(Number(data)), "ID must be a numeric value")
    .transform(Number)
    .refine((num) => num > 0, "ID must be a positive number"),
  project_cover: z.string().url(),
  project_name: z.string().max(50),
  description: z.string().max(500),
  technologies_used: z.array(z.string()),
  project_url: z.string().url(),
};
