import UserModel from '../../user/UserModel';
import { RestContext } from 'typings';
import { getUserIDByAccessToken } from '../AuthControll';
import { User } from '../oauth/OAuth';

export default async function CallbackPost(ctx: RestContext) {
  const signin = () => ctx.redirect('/auth/signin/github?redirect_uri=' + ctx.query.redirect_uri);

  if (!ctx.query.redirect_uri) {
    ctx.throw(400, 'redirect_uri is required');
  }

  if (!ctx.session.token) {
    return signin();
  }

  const userID = await getUserIDByAccessToken(ctx.session.token);
  const user = await UserModel.findOne({ _id: userID });

  if (!user) return signin();

  const data: User = {
    avatar_url: user.avatar_url,
    github: user.github,
    name: user.name,
  };

  ctx.session.user = data;

  return ctx.redirect(ctx.session.redirect_uri);
}
