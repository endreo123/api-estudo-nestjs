import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
    private users = [];

    public async save(user) {
        this.users.push(user);
    }

    public async getAll() {
        return this.users;
    }
}
