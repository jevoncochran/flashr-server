import { Injectable } from '@nestjs/common';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class DecksService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(newDeck: CreateDeckDto, userId: string) {
    const profile = await this.databaseService.profile.findUnique({
      where: { userId },
    });

    const deck = await this.databaseService.deck.create({
      data: { ...newDeck, creatorId: profile.id },
    });

    return deck;
  }

  findAll() {
    return `This action returns all decks`;
  }

  async getUserDecks(userId: string) {
    const profile = await this.databaseService.profile.findUnique({
      where: { userId },
    });

    const userDecks = await this.databaseService.deck.findMany({
      where: { creatorId: profile.id },
    });

    return userDecks;
  }

  findOne(id: number) {
    return `This action returns a #${id} deck`;
  }

  update(id: number, updateDeckDto: UpdateDeckDto) {
    return `This action updates a #${id} deck`;
  }

  remove(id: number) {
    return `This action removes a #${id} deck`;
  }
}
