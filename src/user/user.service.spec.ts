import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UserAffiliation } from './entities/user-affiliation.entity';
import { InstitutionService } from '../institution/institution.service';

describe('UserService', () => {
  let service: UserService;

  const mockUserRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    softRemove: jest.fn(),
  };

  const mockUserAffiliationRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockInstitutionService = {
    findProgramById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(UserAffiliation),
          useValue: mockUserAffiliationRepository,
        },
        {
          provide: InstitutionService,
          useValue: mockInstitutionService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('changePassword — regresion bloqueante de la revision del Sub-bloque 2.1', () => {
    afterEach(() => jest.clearAllMocks());

    it('rechaza el cambio si la contraseña actual no coincide, y NO guarda nada', async () => {
      const hashedOld = await bcrypt.hash('ViejaClave1!', 10);
      mockUserRepository.findOne.mockResolvedValue({ id: 1, password: hashedOld });

      await expect(
        service.changePassword(1, {
          currentPassword: 'Incorrecta1!',
          newPassword: 'NuevaClave1!',
        }),
      ).rejects.toThrow(UnauthorizedException);

      expect(mockUserRepository.save).not.toHaveBeenCalled();
    });

    it('la contraseña nueva se persiste hasheada con bcrypt, nunca en texto plano', async () => {
      const hashedOld = await bcrypt.hash('ViejaClave1!', 10);
      mockUserRepository.findOne.mockResolvedValue({ id: 1, password: hashedOld });
      mockUserRepository.save.mockImplementation((u: unknown) => Promise.resolve(u));

      await service.changePassword(1, {
        currentPassword: 'ViejaClave1!',
        newPassword: 'NuevaClave1!',
      });

      expect(mockUserRepository.save).toHaveBeenCalledTimes(1);
      const savedUser = mockUserRepository.save.mock.calls[0][0];

      expect(savedUser.password).not.toBe('NuevaClave1!');
      expect(savedUser.password).toMatch(/^\$2[aby]\$/);
      expect(await bcrypt.compare('NuevaClave1!', savedUser.password)).toBe(true);
    });
  });
});
