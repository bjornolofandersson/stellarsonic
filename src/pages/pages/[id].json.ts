import { entryRouter } from "@lib/server";

const {getStaticPaths, get, put, del} = entryRouter('pages');

export {getStaticPaths, get, put, del};
