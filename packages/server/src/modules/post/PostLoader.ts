import { createLoader } from '@entria/graphql-mongo-helpers';
import PostModel from './PostModel';

const PostLoader = createLoader({
  model: PostModel,
  loaderName: 'PostLoader',
});

export default PostLoader;
