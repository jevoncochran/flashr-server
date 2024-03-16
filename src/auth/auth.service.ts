import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { generateRandomDigits } from 'src/common/utils/generateRandomDigits';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.databaseService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const correctPassword = await bcrypt.compare(pass, user.password);

    if (!correctPassword) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    if (user && correctPassword) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async register(credentials: RegisterDto) {
    const { email, password } = credentials;

    // Check for accounts registered with given email
    const userExists = await this.databaseService.user.findUnique({
      where: { email },
    });

    // If an account exists, return error response
    if (userExists) {
      throw new ConflictException('An account with this email already exists');
    }

    // Hash passowrd
    const hash = bcrypt.hashSync(password, 8);

    // Create new user
    const newUser = await this.databaseService.user.create({
      data: { email, password: hash },
    });

    // Create new user profile
    if (newUser) {
      const profile = await this.databaseService.profile.create({
        data: {
          userId: newUser.id,
          username: `user${generateRandomDigits(7)}`,
        },
      });

      return this.login({ ...newUser, profileId: profile.id });
    }
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      user: { email: user.email, id: user.id, profileId: user.profileId },
      accessToken: this.jwtService.sign(payload),
    };
  }
}
