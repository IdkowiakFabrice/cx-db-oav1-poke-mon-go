import { error, info, success } from './core/helpers/display'
import checkEnv from './core/helpers/checkEnv'
import { connect } from './core/models'
import { init } from './core/models'
import dotenv from 'dotenv'
import express, { Express } from 'express'
import api from './routes'
import bodyParser from 'body-parser'

async function main() {
  dotenv.config

  const app: Express = express()
  const port: number = parseInt(process.env.PORT as string)
  try {
    checkEnv(['PORT', 'HOST', 'DATABASE_URI'])
    info('Initialisation du serveur...')
    await connect(process.env.DATABASE_URI as string)
    success('Connexion réussie')
    await init()
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use('/api',api)
    app.listen(port, () => {
      info(`Serveur sur : ${process.env.HOST}:${port}`)
    })
  } catch (e) {
    error(e.message)
  }
}

main()
