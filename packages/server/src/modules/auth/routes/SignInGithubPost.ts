import UserModel from '../../user/UserModel';
import { RestContext } from '../../../typings';
import { generateToken } from '../AuthControll';
import GithubOAuth from '../oauth/GithubOAuth';

export default async function SignInGithubPost(ctx: RestContext) {
  if (ctx.query.error) {
    const error_description = (ctx.query.error_description as string) || 'Unknown error';
    return ctx.throw(400, error_description);
  }

  if (!ctx.query.code) {
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

  ctx.redirect('http://localhost:3001?token=' + token);
}
