import { projectSerevice } from "@/api/project/projectService";
import { handleServiceResponse } from "@/common/utils/httpHandlers";
import type { Request, RequestHandler, Response } from "express";

class ProjectController {
  public createProjec: RequestHandler = async (req: Request, res: Response) => {
    const serviceResposnse = await projectSerevice.create(req.body);
    return handleServiceResponse(serviceResposnse, res);
  };

  public readProjects: RequestHandler = async (req: Request, res: Response) => {
    const serviceResponse = await projectSerevice.findAll();
    return handleServiceResponse(serviceResponse, res);
  };

  public retrieveProject: RequestHandler = async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id, 10);
    const serviceResponse = await projectSerevice.finById(id);
    return handleServiceResponse(serviceResponse, res);
  };

  public updateProject: RequestHandler = async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id, 10);
    const serviceResposnse = await projectSerevice.update(id, req.body);
    return handleServiceResponse(serviceResposnse, res);
  };

  public deleteProject: RequestHandler = async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id, 10);
    const serviceRespose = await projectSerevice.delete(id);
    return handleServiceResponse(serviceRespose, res);
  };
}

export const projectController = new ProjectController();
