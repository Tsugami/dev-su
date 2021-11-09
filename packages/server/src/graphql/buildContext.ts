import PostLoader from '../modules/post/PostLoader';

function buildDataloaders() {
  return {
    PostLoader: PostLoader.getLoader(),
  };
}

export default function buildContext() {
  const dataloaders = buildDataloaders();

  return {
    dataloaders,
  };
}
