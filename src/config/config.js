import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url';
import Joi from 'joi';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../env')});

const envSchema = Joi.object().keys({
  NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
  PORT: Joi.number().default(3000),
  // DB url ...
  // JWT? ...
  // SMTP ...
  // ORM ...

}).unknown();

const { value: envVariables, error } = envSchema.prefs({ errors: { label: 'key'}}).validate(process.env);

if(error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
  env: envVariables.NODE_ENV,
  port: envVariables.PORT,
  // DB url ...
  // JWT? ...
  // SMTP ...
  // ORM ...
}
