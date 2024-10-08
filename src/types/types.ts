import { NextFunction, Request, Response } from "express";
export interface newUserRequestBody {
    name: string;
    email: string;
    photo: string;
    gender: string;
    _id: string;
    dob: Date;
}


export interface NewProductRequestBody {
    name: string;
    price: number;
    photo: string;
    stock: number;
    category: string;
}




export type ControllerType = (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;

export type SearchRequestQuery = {
    search: string;
    price?: string;
    category?: string;
    sort?: string;
    page?: string;
}

export interface BaseQuery {
    name?: {
        $regex: string;
        $options: string;
    };
    price?: {
        $lte: number;
    };
    category?: string;
}