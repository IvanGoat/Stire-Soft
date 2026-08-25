import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AdminUpdateUserDto } from './dto/admin-update-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from './entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('me/affiliations')
  addAffiliation(
    @GetUser() user: User,
    @Body() body: { programId: number; roleType: string; currentSemester?: number }
  ) {
    return this.userService.addAffiliation(user.id, body);
  }

  // Rutas /me* declaradas ANTES de las rutas con :id para que 'me' no sea
  // capturado como valor del parametro :id.
  @Patch('me')
  updateProfile(@GetUser() user: User, @Body() updateProfileDto: UpdateProfileDto) {
    return this.userService.updateProfile(user.id, updateProfileDto);
  }

  @Patch('me/password')
  changePassword(@GetUser() user: User, @Body() changePasswordDto: ChangePasswordDto) {
    return this.userService.changePassword(user.id, changePasswordDto);
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  // Administracion de terceros — SOLO admin. El :id nunca representa al
  // propio solicitante (para eso estan PATCH /users/me y /users/me/password).
  @Roles('admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() adminUpdateUserDto: AdminUpdateUserDto) {
    return this.userService.update(+id, adminUpdateUserDto);
  }

  @Roles('admin')
  @Patch(':id/role')
  updateRole(@Param('id') id: string, @Body('role') role: string) {
    return this.userService.updateRole(+id, role);
  }
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.userService.remove(+id);
  }
}
