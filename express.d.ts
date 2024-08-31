import { Request } from "express";

//Extend Request to store user data 
export interface AuthenticatedRequest extends Request {
    user?: any;
}