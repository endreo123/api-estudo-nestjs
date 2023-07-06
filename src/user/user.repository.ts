import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  public async save(user: UserEntity): Promise<void> {
    this.users.push(user);
  }

  public async getAll(): Promise<UserEntity[]> {
    return this.users;
  }

  public async verifyEmail(email: string): Promise<boolean> {
    const possibleUser = this.users.find((user) => user.email === email);
    return possibleUser !== undefined;
  }

  private async searchById(id: string) {
    const possibleUser = this.users.find((userSaved) => userSaved.id === id);

    if (!possibleUser) {
      throw new Error('Usuario não foi encontrado');
    }

    return possibleUser;
  }

  public async update(id: string, dataOfUserForUpdate: Partial<UserEntity>) {
    const user = await this.searchById(id);

    Object.entries(dataOfUserForUpdate).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }

      user[key] = value;
    });

    return user;
  }

  public async remove(id: string) {
    const user = await this.searchById(id);
    this.users = this.users.filter((userSaved) => userSaved.id !== id);

    return user;
  }
}
