import { entryRouter } from "@lib/server";

const {getStaticPaths, get, put, del} = entryRouter('blogs');

export {getStaticPaths, get, put, del};