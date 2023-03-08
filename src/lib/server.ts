import { ServerModule } from "./interfaces";

export function getServerModules() {
  const modules = import.meta.glob('../modules/*/*.server.ts', {eager: true, });
  const result: Record<string, ServerModule> = {};
  for (const path in modules) {
    const name = path.substring(path.lastIndexOf('/') + 1).replace('.server.ts', '');
    result[name] = modules[path] as ServerModule;
  }
  return result;
}
