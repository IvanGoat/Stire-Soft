import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ActivityTypesService } from './activity-types.service';
import { CreateActivityTypeDto } from './dto/create-activity-type.dto';
import { UpdateActivityTypeDto } from './dto/update-activity-type.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Activity Types')
@Controller('activity-types')
@UseGuards(JwtAuthGuard)
export class ActivityTypesController {
  constructor(private readonly activityTypesService: ActivityTypesService) {}

  // Ola 2 P1: sin esto, cualquier usuario autenticado (incluido un
  // estudiante) podia crear/editar/borrar tipos de actividad — no habia
  // ningun @Roles ni @Public declarado. Mismo patron que activities/content/
  // topic para este tipo de dato de referencia.
  @Post()
  @UseGuards(RolesGuard)
  @Roles('docente', 'admin')
  @ApiOperation({ summary: 'Crear un nuevo tipo de actividad' })
  @ApiResponse({ status: 201, description: 'El tipo de actividad ha sido creado exitosamente.' })
  @ApiResponse({ status: 409, description: 'El código del tipo de actividad ya existe.' })
  create(@Body() createActivityTypeDto: CreateActivityTypeDto) {
    return this.activityTypesService.create(createActivityTypeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener lista paginada de tipos de actividad' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.activityTypesService.findAll(paginationQuery);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un tipo de actividad por ID' })
  @ApiResponse({ status: 200, description: 'Retorna el tipo de actividad.' })
  @ApiResponse({ status: 404, description: 'Tipo de actividad no encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.activityTypesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('docente', 'admin')
  @ApiOperation({ summary: 'Actualizar un tipo de actividad' })
  @ApiResponse({ status: 200, description: 'El tipo de actividad ha sido actualizado.' })
  @ApiResponse({ status: 404, description: 'Tipo de actividad no encontrado.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateActivityTypeDto: UpdateActivityTypeDto) {
    return this.activityTypesService.update(id, updateActivityTypeDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('docente', 'admin')
  @ApiOperation({ summary: 'Eliminar (soft delete) un tipo de actividad' })
  @ApiResponse({ status: 200, description: 'El tipo de actividad ha sido eliminado.' })
  @ApiResponse({ status: 404, description: 'Tipo de actividad no encontrado.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.activityTypesService.remove(id);
  }
}
