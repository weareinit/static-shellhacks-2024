import dotenv from 'dotenv'
import path from 'path'
import Joi from 'joi';

dotenv.config({ path: path.join(__dirname, '../../.env')});

const envSchema = Joi.object().keys({
  NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
  PORT: Joi.number().default(3000),
  DATABASE_URL: Joi.string().required(),
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
  AWS_REGION: Joi.string().required(),
  AWS_BUCKET_NAME: Joi.string().required(),
  EVENT_ID: Joi.number().required(),
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
  aws_access_key_id: envVariables.AWS_ACCESS_KEY_ID,
  aws_secret_access_key: envVariables.AWS_SECRET_ACCESS_KEY,
  aws_region: envVariables.aws_region,
  aws_bucket_name: envVariables.AWS_BUCKET_NAME,
  event_id: envVariables.EVENT_ID,
  // SMTP ...
  // ORM ...
}
