import {
  type CreateProjectDto,
  CreateProjectDtoSchema,
  type Project,
  type UpdateProjectDto,
  UpdateProjectDtoSchema,
} from "@/api/project/projectModel";
import { ProjectRepository } from "@/api/project/projectRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";
import { StatusCodes } from "http-status-codes";

export class ProjectSevice {
  private projectRepository: ProjectRepository;

  constructor(repository: ProjectRepository = new ProjectRepository()) {
    this.projectRepository = repository;
  }

  async create(projectToBeCreated: CreateProjectDto): Promise<ServiceResponse<Project | null>> {
    try {
      const validationResult = CreateProjectDtoSchema.safeParse(projectToBeCreated);
      if (!validationResult.success) {
        const errorMessags = validationResult.error.errors
          .map((error) => `${error.path.join(".")}: ${error.message}`)
          .join(";");
        logger.error(`Invalid data supplied: ${errorMessags}.`);
        return ServiceResponse.failure(`Invalid data supplied: ${errorMessags}.`, null, StatusCodes.BAD_REQUEST);
      }
      const project: Project = await this.projectRepository.createAsync(projectToBeCreated);
      return ServiceResponse.success<Project>("Project successfully created.", project, StatusCodes.CREATED);
    } catch (ex) {
      const errorMessage = `Error while creating a project ${projectToBeCreated}:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error ocurred while creating the project.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<ServiceResponse<Project[] | null>> {
    try {
      const projects = await this.projectRepository.findAllAsync();
      if (!projects || projects.length === 0) {
        return ServiceResponse.failure("No projects found.", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Project[]>("All Projects successfully.", projects, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error while finding all projects: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error ocurred while retieving all projects.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async finById(id: number): Promise<ServiceResponse<Project | null>> {
    try {
      if (Number.isNaN(id)) {
        return ServiceResponse.failure(
          "Invalid data supplied: id: ID must be a numeric value, id: ID must a be a positive number.",
          null,
          StatusCodes.BAD_REQUEST,
        );
      }
      const project = await this.projectRepository.findByIdAsync(id);
      if (!project) {
        return ServiceResponse.failure("Project not found.", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Project>("Project successfully found.", project, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error while finding the project with id ${id}:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error ocurred while finding the project.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, newProjectData: UpdateProjectDto): Promise<ServiceResponse<Project | null>> {
    try {
      if (Number.isNaN(id)) {
        return ServiceResponse.failure(
          "Invalid data supplied: id: ID must be a numeric value, id: ID must be a positive number.",
          null,
          StatusCodes.BAD_REQUEST,
        );
      }
      const validattionResult = UpdateProjectDtoSchema.safeParse(newProjectData);
      if (!validattionResult.success) {
        const errorMessage = validattionResult.error.errors
          .map((error) => `${error.path.join(".")}: ${error.message}`)
          .join(";");
        logger.error(`Inalid data supplied: ${errorMessage}.`);
        return ServiceResponse.failure(`Invalid data supplied: ${errorMessage}.`, null, StatusCodes.BAD_REQUEST);
      }

      const project = await this.projectRepository.findByIdAsync(id);
      if (!project) {
        return ServiceResponse.failure("Project not found.", null, StatusCodes.NOT_FOUND);
      }

      await this.projectRepository.updateAsync(id, newProjectData);

      const updateProject = await this.projectRepository.findByIdAsync(id);
      if (!updateProject) {
        return ServiceResponse.failure(
          " Failed to retrieve the update project.",
          null,
          StatusCodes.INTERNAL_SERVER_ERROR,
        );
      }

      return ServiceResponse.success("Project successfully update.", updateProject, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error while updating the member whith id ${id} and their new data ${newProjectData};,${
        (ex as Error).message
      }`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error ocurred while updating the project.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: number): Promise<ServiceResponse<Project | null>> {
    try {
      if (Number.isNaN(id)) {
        return ServiceResponse.failure(
          "Invalid data supplied: id: ID must be a numeric value, id: ID must a be a positive number.",
          null,
          StatusCodes.BAD_REQUEST,
        );
      }

      const project = await this.projectRepository.findByIdAsync(id);
      if (!project) {
        return ServiceResponse.failure("Project not found.", null, StatusCodes.NOT_FOUND);
      }

      await this.projectRepository.deleteAsync(id);
      return ServiceResponse.success("Project successfully deleted.", null, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error while deleting the project with id ${id}:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error ocurred while deleting the project,",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export const projectSerevice = new ProjectSevice();
