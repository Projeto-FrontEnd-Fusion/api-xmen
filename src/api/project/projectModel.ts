import { commonValidationsProjects } from "@/common/utils/commonValidation";
import { z } from "zod";

export type Project = z.infer<typeof ProjectSchema>;
export const ProjectSchema = z.object({
  id: z.number(),
  project_cover: z.string().url(),
  project_name: z.string().max(50),
  description: z.string().max(500),
  technologies_used: z.array(z.string()),
  project_url: z.string().url(),
});

export type CreateProjectDto = z.infer<typeof CreateProjectDtoSchema>;
export const CreateProjectDtoSchema = z.object({
  project_cover: z.string().url(),
  project_name: z.string().max(50),
  description: z.string().max(500),
  technologies_used: z.array(z.string()),
  project_url: z.string().url(),
});

export type UpdateProjectDto = z.infer<typeof UpdateProjectDtoSchema>;
export const UpdateProjectDtoSchema = z.object({
  project_cover: z.string().url(),
  project_name: z.string().max(50),
  description: z.string().max(500),
  technologies_used: z.array(z.string()),
  project_url: z.string().url(),
});

export const CreateProjectSchema = z.object({
  body: z.object({
    project_cover: commonValidationsProjects.project_cover,
    project_name: commonValidationsProjects.project_name,
    description: commonValidationsProjects.description,
    technologies_used: commonValidationsProjects.technologies_used,
    project_url: commonValidationsProjects.project_url,
  }),
});

export const GetProjectSchema = z.object({
  params: z.object({ id: commonValidationsProjects.id }),
});

export const UpdateProjectSchema = z.object({
  params: z.object({ id: commonValidationsProjects.id }),
  body: z.object({
    project_cover: commonValidationsProjects.project_cover,
    project_name: commonValidationsProjects.project_name,
    description: commonValidationsProjects.description,
    technologies_used: commonValidationsProjects.technologies_used,
    project_url: commonValidationsProjects.project_url,
  }),
});
