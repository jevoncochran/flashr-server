import { Injectable } from '@nestjs/common';
import { CreateViewDto } from './dto/create-view.dto';
import { UpdateViewDto } from './dto/update-view.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ViewsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(view: CreateViewDto, userId: string) {
    const profile = await this.databaseService.profile.findUnique({
      where: { userId },
    });

    const previousView = await this.databaseService.view.findFirst({
      where: { userId: profile.id, deckId: view.deckId },
    });

    if (!previousView) {
      return this.databaseService.view.create({
        data: { deckId: view.deckId, userId: profile.id, count: 1 },
      });
    } else {
      return this.update(previousView.id, { count: previousView.count + 1 });
    }
  }

  findAll() {
    return `This action returns all views`;
  }

  findOne(id: number) {
    return `This action returns a #${id} view`;
  }

  async getMostRecentViews(userId: string) {
    const profile = await this.databaseService.profile.findUnique({
      where: { userId },
    });

    return this.databaseService.view.findMany({
      where: { userId: profile.id },
      orderBy: { updatedAt: 'desc' }, // Order by updatedAt in descending order
      take: 3, // Limit to 3 most recent views
    });
  }

  async update(id: string, updates: UpdateViewDto) {
    return this.databaseService.view.update({ where: { id }, data: updates });
  }

  remove(id: number) {
    return `This action removes a #${id} view`;
  }
}
