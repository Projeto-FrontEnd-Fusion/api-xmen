import { createApiResponses } from "@/api-docs/openAPIResponseBuilders";
import { CreateMemberSchema, GetMemberSchema, MemberSchema, UpdateMemberSchema } from "@/api/member/memberModel";
import { validateRequest } from "@/common/utils/httpHandlers";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { memberController } from "./memberController";

export const memberRegistry = new OpenAPIRegistry();
export const memberRouter: Router = express.Router();

memberRegistry.register("Member", MemberSchema);

memberRouter.post("/", validateRequest(CreateMemberSchema), memberController.createMember);
memberRegistry.registerPath({
  method: "post",
  path: "/members",
  operationId: "createMember",
  description: "Create a member.",
  summary: "Create Member",
  tags: ["Member"],
  request: {
    body: {
      required: true,
      content: {
        "application/json": { schema: CreateMemberSchema.shape.body },
      },
    },
  },
  responses: createApiResponses([
    {
      statusCode: StatusCodes.CREATED,
      description: "Member successfully created.",
      schema: MemberSchema,
    },
    {
      statusCode: StatusCodes.BAD_REQUEST,
      description: "Invalid data supplied.",
    },
    {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      description: "An error occurred while creating the member.",
    },
  ]),
});

memberRouter.get("/", memberController.getMembers);
memberRegistry.registerPath({
  method: "get",
  path: "/members",
  operationId: "findAllMembers",
  description: "Retieve all members.",
  summary: "Get all members",
  tags: ["Member"],
  responses: createApiResponses([
    {
      statusCode: StatusCodes.OK,
      description: "All members sucessefully found.",
      schema: z.array(MemberSchema),
    },
    {
      statusCode: StatusCodes.NOT_FOUND,
      description: "No members found.",
    },
    {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      description: "An error occurred while retrieving all members.",
    },
  ]),
});

memberRouter.get("/:id", validateRequest(GetMemberSchema), memberController.getMember);
memberRegistry.registerPath({
  method: "get",
  path: "/members/{id}",
  operationId: "findMemberById",
  description: "Retrieve a member by their ID.",
  summary: "Get Member",
  tags: ["Member"],
  request: { params: GetMemberSchema.shape.params },
  responses: createApiResponses([
    {
      statusCode: StatusCodes.OK,
      description: "Member successfully found.",
      schema: MemberSchema,
    },
    {
      statusCode: StatusCodes.BAD_REQUEST,
      description: "Invalid data supplied.",
    },
    {
      statusCode: StatusCodes.NOT_FOUND,
      description: "Member not found.",
    },
    {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      description: "An error occurred while finding the member.",
    },
  ]),
});

memberRouter.put("/:id", validateRequest(UpdateMemberSchema), memberController.updateMember);
memberRegistry.registerPath({
  method: "put",
  path: "/members/{id}",
  operationId: "updateMember",
  description: "Update a member by their ID.",
  summary: "Update Member",
  tags: ["Member"],
  request: {
    params: UpdateMemberSchema.shape.params,
    body: {
      required: true,
      content: {
        "application/json": { schema: UpdateMemberSchema.shape.body },
      },
    },
  },
  responses: createApiResponses([
    {
      statusCode: StatusCodes.OK,
      description: "Member sucessfully updated.",
      schema: z.null(),
    },
    {
      statusCode: StatusCodes.BAD_REQUEST,
      description: "Invalid data supplied.",
    },
    {
      statusCode: StatusCodes.NOT_FOUND,
      description: "Member not found.",
    },
    {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      description: "An error occurred while updating the member.",
    },
  ]),
});

memberRouter.delete("/:id", validateRequest(GetMemberSchema), memberController.deleteMember);
memberRegistry.registerPath({
  method: "delete",
  path: "/members/{id}",
  operationId: "deleteMember",
  description: "Delete a member by their ID.",
  summary: "Delete Member",
  tags: ["Member"],
  request: { params: GetMemberSchema.shape.params },
  responses: createApiResponses([
    {
      statusCode: StatusCodes.OK,
      description: "Member sucessfully deleted.",
      schema: z.null(),
    },
    {
      statusCode: StatusCodes.BAD_REQUEST,
      description: "Invalid data supplied.",
    },
    {
      statusCode: StatusCodes.NOT_FOUND,
      description: "Member not found.",
    },
    {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      description: "An error ocurred while deleting the member.",
    },
  ]),
});
