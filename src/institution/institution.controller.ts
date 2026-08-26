import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller()
export class InstitutionController {
  constructor(private readonly institutionService: InstitutionService) {}

  // OLA 3 - PUNTO 2: catálogo de referencia sin concepto de dueño — abierto
  // a cualquier rol autenticado de forma deliberada.
  @Get('institutions')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('estudiante', 'docente', 'admin')
  findAllInstitutions() {
    return this.institutionService.findAllInstitutions();
  }

  @Post('institutions')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  createInstitution(@Body() body: { name: string }) {
    return this.institutionService.createInstitution(body);
  }

  @Get('programs')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('estudiante', 'docente', 'admin')
  findAllPrograms(@Query('institutionId') institutionId: string) {
    return this.institutionService.findAllPrograms(institutionId ? +institutionId : undefined);
  }

  @Post('programs')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  createProgram(@Body() body: { name: string; maxSemesters: number; institutionId: number }) {
    return this.institutionService.createProgram(body);
  }
}
