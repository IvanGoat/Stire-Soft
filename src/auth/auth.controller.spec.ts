import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new AuthController(mockAuthService as any);
  });

  it('register delega en AuthService.register con el DTO recibido', async () => {
    const dto = { email: 'x@x.com', password: 'Segura1!', fullName: 'X' } as any;
    mockAuthService.register.mockResolvedValue({ token: 't', user: { id: 1 } });

    const result = await controller.register(dto);

    expect(mockAuthService.register).toHaveBeenCalledWith(dto);
    expect(result).toEqual({ token: 't', user: { id: 1 } });
  });

  it('login delega en AuthService.login con el DTO recibido', async () => {
    const dto = { email: 'x@x.com', password: 'Segura1!' } as any;
    mockAuthService.login.mockResolvedValue({ token: 't', user: { id: 1 } });

    const result = await controller.login(dto);

    expect(mockAuthService.login).toHaveBeenCalledWith(dto);
    expect(result).toEqual({ token: 't', user: { id: 1 } });
  });

  it('getProfile devuelve el usuario del token sin volver a consultar el servicio', () => {
    const user = { id: 1, email: 'x@x.com' } as any;
    const result = controller.getProfile(user);
    expect(result).toEqual({ user });
  });
});
