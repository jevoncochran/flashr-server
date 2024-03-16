import { Injectable, UnauthorizedException } from '@nestjs/common';
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
      data: { title: newDeck.title, creatorId: profile.id },
    });

    const cards = [];
    for (const card of newDeck.cards) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, front, back } = card;
      const newCard = await this.databaseService.card.create({
        data: { front, back, deckId: deck.id },
      });

      cards.push(newCard);
    }

    return { ...deck, cards };
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

    const userDecksWithCards = [];
    for (const deck of userDecks) {
      const cards = await this.getCardsByDeck(deck.id);

      userDecksWithCards.push({ ...deck, cards });
    }

    return userDecksWithCards;
  }

  async getCardsByDeck(deckId: string) {
    const cards = await this.databaseService.card.findMany({
      where: { deckId },
    });

    return cards;
  }

  findOne(id: number) {
    return `This action returns a #${id} deck`;
  }

  async update(id: string, updatedDeck: UpdateDeckDto, userId: string) {
    // Retrieve user profile
    const profile = await this.databaseService.profile.findUnique({
      where: { userId },
    });

    // Retrieve deck
    const deck = await this.databaseService.deck.findUnique({ where: { id } });

    // Check that user can modify deck
    if (profile.id !== deck.creatorId) {
      throw new UnauthorizedException(
        'You are not authorized to modify this deck',
      );
    }

    // Update deck title if necessary
    if (updatedDeck.title !== deck.title) {
      await this.databaseService.deck.update({
        where: { id },
        data: { title: updatedDeck.title },
      });
    }

    // Delete all cards in deck
    await this.databaseService.card.deleteMany({ where: { deckId: id } });

    // Repopulate deck with updated cards
    const cards = [];
    if (updatedDeck.cards.length > 0) {
      for (const card of updatedDeck.cards) {
        const { front, back } = card;
        const newCard = await this.databaseService.card.create({
          data: { front, back, deckId: id },
        });

        cards.push(newCard);
      }
    }

    return this.databaseService.deck.findUnique({ where: { id } });
  }

  remove(id: number) {
    return `This action removes a #${id} deck`;
  }
}
