import { Request, Response } from "express-serve-static-core";
import AwsSdk from "../services/AwsSdk";

export default class FileController {
    async upload(req: Request, res: Response) {
        try {
            const fileToUpload = req.file
            if (!fileToUpload) throw new Error('')
            console.log(fileToUpload)
            const file = await AwsSdk.upload(`images/${fileToUpload.originalname}`, fileToUpload.buffer, fileToUpload.mimetype)
            res.status(201).json({ message: file })
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    async getAllFiles(req: Request, res: Response) {
        try {
            const files = await AwsSdk.findAll();
            res.status(201).json(files)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    async getOneFile(req: Request, res: Response) {
        try {
            const { path } = req.query
            const file = await AwsSdk.findOne(`${path}`)
            res.json(file)
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { path } = req.query
            await AwsSdk.delete(`${path}`)
            res.status(204).send()
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Internal server error' })
        }
    }
}