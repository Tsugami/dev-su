import request from 'supertest';
import app from '../app';

describe('App', () => {
  test('hello', (done) => {
    const query = `
      query HelloWorld {
        hello
      }
    `;

    const payload = { query };

    request(app.callback())
      .post('/graphql')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(payload))
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.data.hello).toEqual('world');
        done();
      });
  });
});
