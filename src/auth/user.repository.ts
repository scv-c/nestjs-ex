import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { AuthCredntaisDto } from './dto/auth-credential.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredntaisDto: AuthCredntaisDto): Promise<void> {
    const { username, password } = authCredntaisDto;
    const user = this.create({ username, password });

    await this.save(user);
  }
}
