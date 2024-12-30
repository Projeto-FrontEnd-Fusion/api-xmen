import { StatusCodes } from "http-status-codes";

import {
  type CreateMemberDto,
  CreateMemberDtoSchema,
  type Member,
  type UpdateMemberDto,
  UpdateMemberDtoSchema,
} from "@/api/member/memberModel";
import { MemberRepository } from "@/api/member/memberRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";

export class MemberService {
  private memberRepository: MemberRepository;

  constructor(repository: MemberRepository = new MemberRepository()) {
    this.memberRepository = repository;
  }

  async create(memberToBeCreate: CreateMemberDto): Promise<ServiceResponse<Member | null>> {
    try {
      const validationResult = CreateMemberDtoSchema.safeParse(memberToBeCreate);
      if (!validationResult.success) {
        const errorMessages = validationResult.error.errors
          .map((error) => `${error.path.join(".")}: ${error.message}`)
          .join(";");
        logger.error(`Invalid data supplied: ${errorMessages}.`);
        return ServiceResponse.failure(`Invalid data supplied: ${errorMessages}.`, null, StatusCodes.BAD_REQUEST);
      }
      const member: Member = await this.memberRepository.createAsync(memberToBeCreate);
      return ServiceResponse.success<Member>("Member successfully created.", member, StatusCodes.CREATED);
    } catch (ex) {
      const errorMessage = `Error while creating a member ${memberToBeCreate}:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while creating the candidate.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<ServiceResponse<Member[] | null>> {
    try {
      const members = await this.memberRepository.findAllAsync();
      if (!members || members.length === 0) {
        return ServiceResponse.failure("No members found.", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Member[]>("All Members successfully found.", members, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error while finding all candidates: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving all members.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: number): Promise<ServiceResponse<Member | null>> {
    try {
      if (Number.isNaN(id)) {
        return ServiceResponse.failure(
          " Invalid data supplied: id: ID must be a numeric value, id: ID must a be a positive number.",
          null,
          StatusCodes.BAD_REQUEST,
        );
      }
      const member = await this.memberRepository.findByIdAsync(id);
      if (!member) {
        return ServiceResponse.failure("Member not found.", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Member>("Member successfully found.", member, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error while finding the member with id ${id}:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while finding the member.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, newMemberData: UpdateMemberDto): Promise<ServiceResponse<Member | null>> {
    try {
      if (Number.isNaN(id)) {
        return ServiceResponse.failure(
          "Invalid data supplied: id: ID must be a numeric value, id: ID must be a positive number.",
          null,
          StatusCodes.BAD_REQUEST,
        );
      }

      const validationResult = UpdateMemberDtoSchema.safeParse(newMemberData);
      if (!validationResult.success) {
        const errorMessages = validationResult.error.errors
          .map((error) => `${error.path.join(".")}: ${error.message}`)
          .join("; ");
        logger.error(`Invalid data supplied: ${errorMessages}.`);
        return ServiceResponse.failure(`Invalid data supplied: ${errorMessages}.`, null, StatusCodes.BAD_REQUEST);
      }

      const member = await this.memberRepository.findByIdAsync(id);
      if (!member) {
        return ServiceResponse.failure("Member not found.", null, StatusCodes.NOT_FOUND);
      }

      await this.memberRepository.updateAsync(id, newMemberData);

      const updateMember = await this.memberRepository.findByIdAsync(id);
      if (!updateMember) {
        return ServiceResponse.failure(
          "Failed to retrieve the updated member.",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR,
        );
      }

      return ServiceResponse.success("Member successfully update.", updateMember, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error while updating the candidate whith id ${id} and their new data ${newMemberData};,${
        (ex as Error).message
      }`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while updating the member.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: number): Promise<ServiceResponse<Member | null>> {
    try {
      if (Number.isNaN(id)) {
        return ServiceResponse.failure(
          "Invalid data suppplied: id: ID must be a numeric value, id: ID must a be a positive number.",
          null,
          StatusCodes.BAD_REQUEST,
        );
      }

      const member = await this.memberRepository.findByIdAsync(id);
      if (!member) {
        return ServiceResponse.failure("Member not found.", null, StatusCodes.NOT_FOUND);
      }

      await this.memberRepository.deleteAsync(id);
      return ServiceResponse.success("Member successfully deleted.", null, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error while deletinh the member with id ${id}:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error ocurred while deleting the member.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export const memberService = new MemberService();
