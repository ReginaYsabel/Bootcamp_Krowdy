import mongoose from 'mongoose'
require('dotenv').config();

export const dbVideos = mongoose.createConnection( process.env?.PROJECT_CONNECT_DATABASE_HOST_VIDEOS)
export const dbUsers = mongoose.createConnection( process.env?.PROJECT_CONNECT_DATABASE_HOST_USERS)
