import site from '@settings';
import { APIRoute } from 'astro';
import * as yaml from 'yaml';
import * as fs from 'fs';

export const get: APIRoute = async ({params, request}) => {
  return {
    body: JSON.stringify(site),
  };
}

export const put: APIRoute = async ({request}) => {
  const payload = await request.json();

  const output = yaml.stringify(payload);

  //console.log(output);
  fs.writeFileSync('src/settings.yaml', output);

  return {
    body: JSON.stringify(payload)
  }
}
