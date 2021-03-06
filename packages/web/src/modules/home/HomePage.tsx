import { Flex, VStack } from '@chakra-ui/layout';

import PostCard from '../../shared-components/PostCard';

import { graphql } from 'babel-plugin-relay/macro';
import { usePreloadedQuery, loadQuery } from 'react-relay';
import { HomePagePostsQuery } from './__generated__/HomePagePostsQuery.graphql';
import RelayEnvironment from '../../relay/RelayEnvironment';
import Header from '../../shared-components/Header';

const PagePostsQuery = graphql`
  query HomePagePostsQuery($first: Int!, $after: String) {
    posts(first: $first, after: $after) @connection(key: "PostList_posts") {
      __id
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          ...PostCard_post
        }
      }
    }
  }
`;

const preloadedQuery = loadQuery<HomePagePostsQuery>(RelayEnvironment, PagePostsQuery, {
  first: 10,
});

const HomePage = () => {
  const data = usePreloadedQuery<HomePagePostsQuery>(PagePostsQuery, preloadedQuery);

  return (
    <>
      <Header connections={[data.posts?.__id as string]} />
      <Flex direction='column' alignItems='center' justifyContent='flex-start'>
        <VStack p='6' spacing='6' maxWidth='md'>
          {data?.posts?.edges?.map((post, i) => (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <PostCard key={i} post={post?.node} />
          ))}
        </VStack>
      </Flex>
    </>
  );
};

export default HomePage;
