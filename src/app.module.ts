import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ProfilesModule } from './profiles/profiles.module';
import { DecksModule } from './decks/decks.module';
import { ViewsModule } from './views/views.module';
import { CardsModule } from './cards/cards.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    ProfilesModule,
    DecksModule,
    ViewsModule,
    CardsModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
