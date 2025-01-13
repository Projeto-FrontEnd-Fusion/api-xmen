import { memberService } from "@/api/member/memberService";

import { handleServiceResponse } from "@/common/utils/httpHandlers";
import type { Request, RequestHandler, Response } from "express";

class MemberController {
  public createMember: RequestHandler = async (req: Request, res: Response) => {
    const serviceResponse = await memberService.create(req.body);
    return handleServiceResponse(serviceResponse, res);
  };

  public getMembers: RequestHandler = async (req: Request, res: Response) => {
    const ServerResponse = await memberService.findAll();
    return handleServiceResponse(ServerResponse, res);
  };

  public getMember: RequestHandler = async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id, 10);
    const ServiceResponse = await memberService.findById(id);
    return handleServiceResponse(ServiceResponse, res);
  };

  public updateMember: RequestHandler = async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id, 10);
    const ServiceResponse = await memberService.update(id, req.body);
    return handleServiceResponse(ServiceResponse, res);
  };

  public deleteMember: RequestHandler = async (req: Request, res: Response) => {
    const id = Number.parseInt(req.params.id, 10);
    const serviceResponse = await memberService.delete(id);
    return handleServiceResponse(serviceResponse, res);
  };
}

export const memberController = new MemberController();
