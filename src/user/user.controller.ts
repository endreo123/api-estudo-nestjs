import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { createUserDTO } from './dto/CreateUser.dto';

@Controller('/user')
export class UserController {
    constructor(private userRepository: UserRepository) {}

    @Post()
    public async createUser(@Body() dataOfUser: createUserDTO) {
        this.userRepository.save(dataOfUser);
        return dataOfUser;
    }

    @Get()
    public async getUsers() {
        return this.userRepository.getAll();
    }
}
