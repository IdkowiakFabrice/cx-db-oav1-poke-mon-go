import { Router, Request, Response } from 'express'
import Pokemon from '../core/models/schemas/pokemon'
import { Document } from 'mongoose'
import { isEmpty } from 'lodash'
import { error, success } from '../core/helpers/response'
import { BAD_REQUEST, OK } from '../core/constants/api'

const api = Router()

interface IPOKEMON {
    id_pokemon: Number,
    name: String,
    types: [String],
    img: String,
    height: String,
    weight: String,
    weaknesses: [String],
}

interface IPokemonDoc extends IPOKEMON, Document { }


api.get('/', (req: Request, res: Response) => {
    try {
        Pokemon.find(function (err, pokemons: IPokemonDoc[]) {
            if (isEmpty(pokemons)) {
            throw new Error(`Pas de Pokemons dans la bdd`)
        }
        res.status(OK.status).json(pokemons)
        })
    }
    catch (err) {
        res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
    }
})


api.get('/:id', (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        Pokemon.findOne({ id_pokemon: <Number>id }, function (err, pokemon: IPokemonDoc) {
            if (isEmpty(pokemon)) {
                throw new Error(`Le Pokemon ${id} n'existe pas`)
            }
            res.status(OK.status).json(success(pokemon))
        })
    }
    catch (err) {
        res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
    }
})

api.put('/:id', async (req: Request, res: Response) => {
    const fields = [ 'name',
        'type',
        'height',
        'weight',
        'weaknesses',
        'description',
        'candy',
        'candy_count',
        'egg',
        'spawn_chance',
        'avg_spawns',
        'spawn_time',
        'starter',
        'legendary',
        'mythical',
        'ultraBeast',
        'mega',
        'gen',]
    try {
        const id = parseInt(req.params.id)
        const missings = fields.filter((field: string) => !req.body[field])
        if (!isEmpty(missings)) {
            const isPlural = missings.length > 1
            throw new Error(`Field${isPlural ? 's' : ''} [ ${missings.join(', ')} ] ${isPlural ? 'are' : 'is'} missing`)
        }

        const {name,types,height,weight,weaknesses,description,candy,candy_count,egg,spawn_chance,avg_spawns,spawn_time,starter,legendary,mythical,ultraBeast,mega,gen} = req.body
        await Pokemon.updateOne({ id_pokemon: id }, {
            name,
            types,
            height,
            weight,
            weaknesses,
            description,
            candy,
            candy_count,
            egg,
            spawn_chance,
            avg_spawns,
            spawn_time,
            starter,
            legendary,
            mythical,
            ultraBeast,
            mega,
            gen,

        });
        const ppokemon = await Pokemon.findOne({ id_pokemon: id } )
        res.status(OK.status).json(success(ppokemon))
    }
    catch (err) {
        res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
    }
})

api.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        await Pokemon.deleteOne({ id_pokemon: id })
        res.status(OK.status).json({status: 200, description: `Le pokemon ${id} a été supprimé` })
    }
    catch (err) {
        res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err))
    }
})

export default api