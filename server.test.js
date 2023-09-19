import Hapi from '@hapi/hapi';
import supertest from 'supertest';
import { stationsHandler } from './stations.js';

describe('Hapi Server', () => {
  let server;
  let request;

  beforeAll(async () => {
    // Create a Hapi server and supertest agent for testing
    server = Hapi.server({
      port: 3000,
      host: 'localhost',
    });
    server.route({
      method: 'GET',
      path: '/stations',
      handler: stationsHandler,
    });
    await server.start();
    request = supertest(server.listener);
  });

  afterAll(async () => {
    // Close the server after all tests
    await server.stop();
  });

  it('should respond with "Hello world" for /stations', async () => {
    const response = await request.get('/stations');
    expect(response.status).toBe(200);
  });
});
