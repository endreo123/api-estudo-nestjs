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

    public async verifyEmail(email: string) {
        const possibleUser = this.users.find((user) => user.email === email);
        return possibleUser !== undefined;
    }
}
