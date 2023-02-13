import { collectionRouter } from '@lib/server';

const {get, post} = collectionRouter('templates');

export { get, post };
