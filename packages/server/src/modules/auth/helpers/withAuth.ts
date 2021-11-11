import { GraphQLContext } from 'graphql/buildContext';

export default function withAuth<
  Root,
  Args,
  A extends (root: Root, args: Args, ctx: GraphQLContext) => unknown,
>(callback: A): A {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //  @ts-ignore (╯°□°）╯︵ ┻━┻
  const fn: A = (root, args, ctx) => {
    if (!ctx.userID) {
      throw new Error('Not authenticated');
    }

    return callback(root, args, ctx);
  };

  return fn;
}
