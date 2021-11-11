import UserModel from '../../user/UserModel';
import { RestContext } from '../../../typings';
import { generateToken } from '../AuthControll';
import GithubOAuth from '../oauth/GithubOAuth';

export default async function AuthorizedPost(ctx: RestContext) {
  if (ctx.query.error) {
    const error_description = (ctx.query.error_description as string) || 'Unknown error';
    return ctx.throw(400, error_description);
  }

  if (!ctx.query.code || !ctx.query.state || ctx.query.state !== ctx.session.state) {
    ctx.throw(400, 'invalid code or state');
  }

  const data = await GithubOAuth.getToken(ctx.query.code as string);

  if ('error' in data) {
    return ctx.throw(400, data.error);
  }

  const profile = await GithubOAuth.getProfile(data.access_token);
  const user =
    (await UserModel.findOne({ github: profile.github })) ?? (await UserModel.create(profile));
  const token = generateToken(user.id);

  ctx.session.token = token;
  ctx.session.user = user;

  ctx.redirect(ctx.session.redirect_uri);
}
