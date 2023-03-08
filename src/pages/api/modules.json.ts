import { ModuleDescription } from '@lib/interfaces';
import { getServerModules } from '@lib/server';
import { APIRoute } from 'astro';

const modules = getServerModules();

const clientModules: Record<string, ModuleDescription> = {}
for (let [id, m] of Object.entries(modules)) {
  clientModules[id] = { name: m.name, icon: m.icon, collection: m.collection };
}

export const get: APIRoute = async () => {
  return {
    body: JSON.stringify(clientModules),
  };
}
