import express, { Router } from 'express'

export default class Routes {
    public router: Router;

    constructor() {
        this.router = express.Router()
        this.regiesterRoutes()
    }

    private regiesterRoutes() {
        this.router.get('/', (req, res) => res.send('App is up and running'));
    }
}