import { Request, Response } from 'express';
import { signUp } from './auth.controller';

describe('GET', () => {
  test('First TEST', () => {
    const expected = 'GA';
    const result = 'GA';

    expect(result).toStrictEqual(expected);
  });
});

describe('signUp function', () => {
  const mockRequest = () => {
    const req = {} as Request;
    req.body = {
      // Aquí puedes incluir los campos que necesites para tu prueba
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'mypassword',
    };
    return req;
  };

  const mockResponse = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.header = jest.fn().mockReturnValue(res);
    return res;
  };

  test('should create a new user and return token and user data', async () => {
    const req = mockRequest();
    const res = mockResponse();
    await signUp(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.any(Object));
    expect(res.header).toHaveBeenCalledWith('auth-header', expect.any(String));
  });
});
