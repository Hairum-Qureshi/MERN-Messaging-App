import { Request, Response } from "express";

const sign_up = (req:Request, res:Response) => {
    const { first_name, last_name, email, password } = req.body;
    console.log(first_name, last_name, email, password);
    res.status(200).send("Success");
}

export { sign_up };