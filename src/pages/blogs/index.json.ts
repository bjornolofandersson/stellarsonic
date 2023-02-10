import { collectionRouter } from '@lib/server';

const {get, post} = collectionRouter('blogs');

export { get, post };
