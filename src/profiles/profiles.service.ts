import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProfilesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createProfileDto: CreateProfileDto) {
    return this.databaseService.profile.create({
      data: createProfileDto,
    });
  }

  findAll() {
    return `This action returns all profiles`;
  }

  findOne(id: string) {
    return this.databaseService.profile.findUnique({ where: { id } });
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
