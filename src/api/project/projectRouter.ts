import { createApiResponses } from "@/api-docs/openAPIResponseBuilders";
import { projectController } from "@/api/project/projectController";
import { CreateProjectSchema, GetProjectSchema, ProjectSchema, UpdateProjectSchema } from "@/api/project/projectModel";
import { validateRequest } from "@/common/utils/httpHandlers";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

export const projectRegistry = new OpenAPIRegistry();
export const projectRouter: Router = express.Router();

projectRegistry.register("Project", ProjectSchema);

projectRouter.post("/", validateRequest(CreateProjectSchema), projectController.createProjec);
projectRegistry.registerPath({
  method: "post",
  path: "/projects",
  operationId: "createProject",
  description: "Create a Project.",
  summary: "Create Project",
  tags: ["Project"],
  request: {
    body: {
      required: true,
      content: {
        "application/json": { schema: CreateProjectSchema.shape.body },
      },
    },
  },
  responses: createApiResponses([
    {
      statusCode: StatusCodes.CREATED,
      description: "Project successfully created.",
      schema: ProjectSchema,
    },
    {
      statusCode: StatusCodes.BAD_REQUEST,
      description: "Invalid data supplied.",
    },
    {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      description: "An error ocurred while creating the member.",
    },
  ]),
});

projectRouter.get("/", projectController.readProjects);
projectRegistry.registerPath({
  method: "get",
  path: "/projects",
  operationId: "findAllProjects",
  description: "Read all projects.",
  summary: "Get all projects",
  tags: ["Project"],
  responses: createApiResponses([
    {
      statusCode: StatusCodes.OK,
      description: "All projects successfully found.",
      schema: z.array(ProjectSchema),
    },
    {
      statusCode: StatusCodes.NOT_FOUND,
      description: "No projects found.",
    },
    {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      description: "An error ocurred while retrieving all projects.",
    },
  ]),
});

projectRouter.get("/:id", validateRequest(GetProjectSchema), projectController.retrieveProject);
projectRegistry.registerPath({
  method: "get",
  path: "/projects/{id}",
  operationId: "findProjectById",
  description: "Retrieve a projects by their ID.",
  summary: "Retrieve Project",
  tags: ["Project"],
  request: { params: GetProjectSchema.shape.params },
  responses: createApiResponses([
    {
      statusCode: StatusCodes.OK,
      description: "Projects successfully found.",
      schema: ProjectSchema,
    },
    {
      statusCode: StatusCodes.BAD_REQUEST,
      description: "Invalid data supplied.",
    },
    {
      statusCode: StatusCodes.NOT_FOUND,
      description: "Project not found.",
    },
    {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      description: "An error ocurred while finding the project.",
    },
  ]),
});

projectRouter.put("/:id", validateRequest(UpdateProjectSchema), projectController.updateProject);
projectRegistry.registerPath({
  method: "put",
  path: "/projects/{id}",
  operationId: "updateProject",
  description: "Update a project by their ID.",
  summary: "Update Project",
  tags: ["Project"],
  request: {
    params: UpdateProjectSchema.shape.params,
    body: {
      required: true,
      content: {
        "application/json": { schema: UpdateProjectSchema.shape.body },
      },
    },
  },
  responses: createApiResponses([
    {
      statusCode: StatusCodes.OK,
      description: "Project succesfully updated.",
      schema: z.null(),
    },
    {
      statusCode: StatusCodes.BAD_REQUEST,
      description: "Invalid data supplied.",
    },
    {
      statusCode: StatusCodes.NOT_FOUND,
      description: "Project not found.",
    },
    {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      description: "An error ocurred while updating the project.",
    },
  ]),
});

projectRouter.delete("/:id", validateRequest(GetProjectSchema), projectController.deleteProject);
projectRegistry.registerPath({
  method: "delete",
  path: "/projects/{id}",
  operationId: "deleteProject",
  description: "Delete a Project by their ID.",
  summary: "Delete Project",
  tags: ["Project"],
  request: { params: GetProjectSchema.shape.params },
  responses: createApiResponses([
    {
      statusCode: StatusCodes.OK,
      description: "Delete successfully project.",
      schema: z.null(),
    },
    {
      statusCode: StatusCodes.BAD_REQUEST,
      description: "Invalid data supplied.",
    },
    {
      statusCode: StatusCodes.NOT_FOUND,
      description: "Project not found.",
    },
    {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      description: " An error ocurred while deleting the project.",
    },
  ]),
});
