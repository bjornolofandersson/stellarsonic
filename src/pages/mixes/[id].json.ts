import { entryRouter } from "@lib/server";

const {getStaticPaths, get, put, del} = entryRouter('mixes');

export {getStaticPaths, get, put, del};
