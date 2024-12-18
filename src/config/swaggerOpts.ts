import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url.split('dist')[0]);
const __dirname = path.dirname(`${__filename}dist`);

export const swaggerOpts = {
  info: {
    version: "1.0.0",
    title: "Henk API",
    description: "Henk API documentation",
  },
  baseDir: __dirname,
  filesPattern: "./**/*.js",
  swaggerUIPath: "/api-docs",
  exposeSwaggerUI: true,
  exposeApiDocs: true,
  notRequiredAsNullable: false,
  security: {
    BearerAuth: {
      type: 'http',
      scheme: 'bearer',
    },
  },
  servers: [
    {
      url: 'https://syntra-20242025-henk-api.onrender.com/api',
      description: 'The API server'
    },
  ],
};