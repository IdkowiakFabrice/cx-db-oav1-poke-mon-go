import { model, Schema, Document } from 'mongoose'

interface IPOKEMON {
  id_pokemon: Number,
  name: String,
  types: Array<String>,
  img: String,
  height: String,
  weight: String,
  weaknesses: Array<String>,
  description: String,
  candy: String,
  candycount: Number,
  egg: String,
  spawn_chance: Number,
  avg_spawns: Number,
  spawn_time: String,
  starter: Boolean,
  legendary: Boolean,
  mythical: Boolean,
  ultraBeast: Boolean,
  mega: Boolean,
  gen: Number,
}

interface IPokemonDoc extends IPOKEMON, Document {}

const PokemonFields: Record<keyof IPOKEMON, any> = {
  id_pokemon: Number,
  name: String,
  types: [String],
  img: String,
  height: String,
  weight: String,
  weaknesses: [String],
  description: String,
  candy: String,
  candycount: Number,
  egg: String,
  spawn_chance: Number,
  avg_spawns: Number,
  spawn_time: String,
  starter: Boolean,
  legendary: Boolean,
  mythical: Boolean,
  ultraBeast: Boolean,
  mega: Boolean,
  gen: Number,
}

const PokemonSchema: Schema<IPOKEMON> = new Schema(PokemonFields)
const Pokemons = model<IPokemonDoc>('pokemons', PokemonSchema)

export default Pokemons