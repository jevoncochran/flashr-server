import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CardsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(newCard: CreateCardDto, userId: string) {
    const profile = await this.databaseService.profile.findUnique({
      where: { userId },
    });

    const deck = await this.databaseService.deck.findUnique({
      where: { id: newCard.deckId },
    });

    if (!deck) {
      throw new NotFoundException('Deck does not exist');
    }

    if (profile.id !== deck.creatorId) {
      throw new UnauthorizedException(
        'You are not authorized to modify this deck',
      );
    }

    return this.databaseService.card.create({ data: newCard });
  }

  findAll() {
    return `This action returns all cards`;
  }

  findOne(id: number) {
    return `This action returns a #${id} card`;
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} card`;
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }
}
