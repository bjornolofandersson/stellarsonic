import { entryRouter } from "@lib/server";

const {getStaticPaths, get, put, del} = entryRouter('templates');

export {getStaticPaths, get, put, del};
