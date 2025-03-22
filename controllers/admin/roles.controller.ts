import { Request, Response } from "express";
// import Role from "../../models/roles.models";
import { rolesService } from "../../services/admin/index.service";
import { ObjectId } from "mongodb";
import Account from "../../models/accounts.model";

const permission = async (req: Request, res: Response) => {};
const permissionPatch = async (req: Request, res: Response) => {};

export { permission, permissionPatch };
