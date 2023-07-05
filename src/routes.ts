import express, { Router } from 'express'
import multer from 'multer'
import FileController from './controllers/FileController';

const upload = multer()

export default class Routes {
    public router: Router;

    private fileController: FileController = new FileController()

    constructor() {
        this.router = express.Router()
        this.regiesterRoutes()
    }

    private regiesterRoutes() {
        this.router.get('/', (req, res) => res.send('App is up and running'))

        this.router.post('/upload', upload.single('file'), this.fileController.upload)

        this.router.get('/files', this.fileController.getAllFiles)
        this.router.get('/file', this.fileController.getOneFile)
        this.router.delete('/file', this.fileController.delete)
    }
}