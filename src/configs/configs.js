import dotenv from 'dotenv'

dotenv.config()

//get config from environment
export default {
  IS_PROD: process.env.NODE_ENV === 'production',
  PORT: process.env.PETPROJECT_BACKEND_PORT,
  MONGO_URL: process.env.PETPROJECT_MONGO_URL,
}