import { UnauthorizedException } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from '../../user/user.service';
import { ConfigService } from '@nestjs/config';

// Regresión B6: un usuario desactivado debe perder el acceso en la
// SIGUIENTE petición autenticada, no seguir operando hasta que expire el
// JWT. JwtStrategy.validate() es el punto real por el que pasa CADA
// request autenticado (vía JwtAuthGuard/Passport) — a diferencia del
// método AuthService.validateToken(), que no forma parte de esa cadena.
describe('JwtStrategy — B6 revalidación de isActive por request', () => {
  let strategy: JwtStrategy;
  const mockUserService = { findOne: jest.fn() };
  const mockConfigService = {
    get: jest.fn().mockReturnValue('test-secret'),
  } as unknown as ConfigService;

  beforeEach(() => {
    jest.clearAllMocks();
    (mockConfigService.get as jest.Mock).mockReturnValue('test-secret');
    strategy = new JwtStrategy(mockUserService as unknown as UserService, mockConfigService);
  });

  it('rechaza el token si el usuario fue desactivado después de emitirlo', async () => {
    mockUserService.findOne.mockResolvedValue({ id: 1, isActive: false, role: 'estudiante' });

    await expect(strategy.validate({ sub: 1, email: 'x@x.com', role: 'estudiante' })).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('rechaza el token si el usuario ya no existe (p. ej. soft delete)', async () => {
    mockUserService.findOne.mockResolvedValue(null);

    await expect(strategy.validate({ sub: 1, email: 'x@x.com', role: 'estudiante' })).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('acepta el token si el usuario sigue activo', async () => {
    const activeUser = { id: 1, isActive: true, role: 'estudiante' };
    mockUserService.findOne.mockResolvedValue(activeUser);

    await expect(strategy.validate({ sub: 1, email: 'x@x.com', role: 'estudiante' })).resolves.toEqual(
      activeUser,
    );
  });
});
