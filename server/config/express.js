import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import logger from 'morgan'
import favicon from 'serve-favicon'
import compression from 'compression'
import bodyParser from 'body-parser'
import MongoStore from 'connect-mongo'
import {join} from 'path'

const SessionStore = MongoStore(session)

export function init (app, config, root, IS_DEV) {
  app.set('x-powered-by', false)

  // View engine
  app.set('views', join(root, 'views'))
  app.set('view engine', 'jade')

  // Middlewares
  app.use(compression())
  app.use(favicon(join(root, '../public/img/favicon.ico')))
  app.use(logger(IS_DEV ? 'dev' : 'combined'))
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(cookieParser())
  app.use(session({
    secret: config.session_secret,
    store: new SessionStore({
      mongooseConnection: mongoose.connection,
      touchAfter: 600 // 10 min
    }),
    resave: false,
    saveUninitialized: false
  }))
  app.use(express.static('public', {maxage: IS_DEV ? 0 : '1h'}))
}
