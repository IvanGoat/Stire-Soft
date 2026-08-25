import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from './entities/user.entity';
import { UserAffiliation } from './entities/user-affiliation.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { AdminUpdateUserDto } from './dto/admin-update-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { InstitutionService } from '../institution/institution.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserAffiliation)
    private readonly affiliationRepository: Repository<UserAffiliation>,
    private readonly institutionService: InstitutionService,
  ) {}
  /**
   * Crear un nuevo usuario
   * Encripta la contraseña antes de guardarla
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Verificar si el email ya existe
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Crear nueva instancia de usuario
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    // Guardar en la base de datos
    return await this.userRepository.save(user);
  }

  /**
   * Obtener todos los usuarios
   * No incluye las contraseñas
   */
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  /**
   * Obtener un usuario por ID
   */
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    
    return user;
  }

  /**
   * Buscar usuario por email
   * Incluye la contraseña (para autenticación)
   */
  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'fullName', 'role', 'isActive'],
    });
  }

  /**
   * Actualizar un usuario (uso exclusivo de administradores sobre terceros).
   * Ver updateProfile/changePassword para la auto-edición del propio usuario.
   */
  async update(id: number, adminUpdateUserDto: AdminUpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    // Si se actualiza la contraseña, encriptarla
    if (adminUpdateUserDto.password) {
      adminUpdateUserDto.password = await bcrypt.hash(adminUpdateUserDto.password, 10);
    }

    // Actualizar los campos
    Object.assign(user, adminUpdateUserDto);

    return await this.userRepository.save(user);
  }

  /**
   * Auto-edición de perfil: solo campos no sensibles (fullName).
   * El id SIEMPRE viene del JWT del solicitante, nunca de un parámetro de ruta.
   */
  async updateProfile(id: number, updateProfileDto: UpdateProfileDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateProfileDto);
    return await this.userRepository.save(user);
  }

  /**
   * Cambio de contraseña del propio usuario. Exige la contraseña actual.
   */
  async changePassword(id: number, changePasswordDto: ChangePasswordDto): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'password'],
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      changePasswordDto.currentPassword,
      user.password,
    );

    if (!isCurrentPasswordValid) {
      throw new UnauthorizedException('La contraseña actual es incorrecta');
    }

    user.password = await bcrypt.hash(changePasswordDto.newPassword, 10);
    await this.userRepository.save(user);

    return { message: 'Contraseña actualizada con éxito' };
  }

  /**
   * Actualizar el rol de un usuario
   */
  async updateRole(id: number, role: string): Promise<{ message: string }> {
    const user = await this.findOne(id);
    
    user.role = role as UserRole;
    await this.userRepository.save(user);

    return { message: 'Rol de usuario actualizado con éxito' };
  }

  /**
   * Agregar afiliación académica a un usuario
   */
  async addAffiliation(userId: number, data: { programId: number; roleType: string; currentSemester?: number }) {
    const user = await this.findOne(userId);
    const program = await this.institutionService.findProgramById(data.programId);

    const affiliation = this.affiliationRepository.create({
      user,
      program,
      roleType: data.roleType,
      currentSemester: data.currentSemester,
    });

    return await this.affiliationRepository.save(affiliation);
  }

  /**
   * Eliminar un usuario (soft delete)
   */
  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.softRemove(user);
  }
}