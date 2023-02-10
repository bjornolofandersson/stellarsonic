import { collectionRouter } from '@lib/server';

const {get, post} = collectionRouter('mixes');

export { get, post };
