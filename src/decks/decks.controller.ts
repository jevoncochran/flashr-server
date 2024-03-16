import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { DecksService } from './decks.service';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';
import { Request } from 'express';

@Controller('decks')
export class DecksController {
  constructor(private readonly decksService: DecksService) {}

  @Post()
  create(@Req() req: Request, @Body(ValidationPipe) newDeck: CreateDeckDto) {
    return this.decksService.create(newDeck, req.user.id);
  }

  @Get()
  findAll() {
    return this.decksService.findAll();
  }

  @Get('user-specific')
  getUserDecks(@Req() req: Request) {
    return this.decksService.getUserDecks(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.decksService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updatedDeck: UpdateDeckDto,
  ) {
    return this.decksService.update(id, updatedDeck, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.decksService.remove(+id);
  }
}
