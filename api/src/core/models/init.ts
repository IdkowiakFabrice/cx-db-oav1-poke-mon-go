import Pokemon from '../models/schemas/pokemon'
import { error, success } from '../helpers/display'
import data from '../data/pokemon.json'

export default async function init() {
    let isLoaded = true
    Pokemon.find((err, pokemons: Document[]) => {
        if (err) { error('Pas de Pokemons trouvé') }
        if (pokemons.length === 0) {
            for (const p of data) {
                let typeList: Array<String> = []
                let weaknesseList: Array<String> = []
                for (const type of p.type) {
                    typeList.push(type)
                }
                for(const weaknesse of p.weaknesses){
                    weaknesseList.push(weaknesse)
                }
                let pokemon  = new Pokemon({
                    id_pokemon: p.id,
                    name: p.name,
                    types: typeList,
                    img: p.image,
                    height: p.height,
                    weight: p.weight,
                    weaknesses: weaknesseList,    
                    description:  p.description,
                    candy: p.candy,
                    candycount: p.candy_count,
                    egg: p.egg,
                    spawn_chance: p.spawn_chance,
                    avg_spawns: p.avg_spawns,
                    spawn_time: p.spawn_time,
                    starter: p.starter,
                    legendary: p.legendary,
                    mythical: p.mythical,
                    ultraBeast: p.ultraBeast,
                    mega: p.mega,
                    gen: p.gen,
                    })
                pokemon.save((err) => {
                    if (err) {
                        isLoaded = false
                        error('Pokemon pas sauvegardé')
                    }
                })
            }
            if (isLoaded) {
                success('Tous les Tokemons ont été chargés')
            }
        }
    })
}
