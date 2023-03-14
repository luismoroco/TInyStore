import serverSingleton from '../../patterns/server.Singleton';
import request from 'supertest';

const app = serverSingleton.app;

describe('GET index ENDPOINT', () => {
  it('Returns OK, and send index', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ msg: 'index' });
  });
});
