import jwt from 'jsonwebtoken';

export function generateToken(userId: string): string {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

export async function getUserIDByAccessToken(accessToken: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!accessToken || !accessToken.startsWith('Bearer ')) return reject('No Bearer');

    const token = accessToken.replace('Bearer ', '');

    return jwt.verify(token, process.env.JWT_SECRET as string, (error, payload) => {
      if (error) return reject(error);
      return resolve(payload?.id);
    });
  });
}
