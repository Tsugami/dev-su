import { RestContext } from 'typings';
import GithubOAuth from '../oauth/GithubOAuth';

const randomString = (): string => (Math.random() + 1).toString(36).substring(7);

export default function SignInPost(ctx: RestContext) {
  const state = randomString();
  ctx.session.state = state;

  if (ctx.query.redirect_uri) {
    ctx.session.redirect_uri = ctx.query.redirect_uri;
  } else {
    ctx.throw(400, 'redirect_uri is required');
  }

  return ctx.redirect(GithubOAuth.authorizeURL(state));
}
