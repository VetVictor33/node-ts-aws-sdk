import express from 'express';
import Routes from './routes';

const app = express()
const routes: Routes = new Routes()
const port = process.env.PORT || 3001

app.use(express.json())
app.use(routes.router)

app.listen(port, () => { `Server running on port ${port}` })
