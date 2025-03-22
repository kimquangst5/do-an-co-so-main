import { Request, Response } from "express";
import Role from "../../models/roles.models";
import { rolesService } from "../../services/admin/index.service";
import { ObjectId } from "mongodb";
import Account from "../../models/accounts.model";

const permission = async (req: Request, res: Response) => {};
const permissionPatch = async (req: Request, res: Response) => {};

const deletePatch = async (req: Request, res: Response) => {
    await Role.updateOne({
      _id: new ObjectId(req.params.id)
    }, {
      deleted: true
    })
    console.log(req.params);
    
    res.json({
      code: 200
    })
  }

export { permission, permissionPatch };
