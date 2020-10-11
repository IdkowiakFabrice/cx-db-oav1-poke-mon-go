import { Router, Request, Response } from 'express'
import cors from 'cors'
import pokemons from './pokemon'

const api = Router()
api.use(cors())

api.get('/',( req: Request, res: Response) => {
    res.json({
        hello: "poke-mon-go API",
        meta: {
            status: 'running',
            version: '1.0.0'
        }
    })
})

api.use('/pokemons', pokemons)

export default api