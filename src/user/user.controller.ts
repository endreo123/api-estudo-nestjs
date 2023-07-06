import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { createUserDTO } from './dto/CreateUser.dto';
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';
import { ListUsersDTO } from './dto/ListUsers.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';

@Controller('/user')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  public async createUser(@Body() dataOfUser: createUserDTO) {
    const userEntity = new UserEntity();

    userEntity.email = dataOfUser.email;
    userEntity.password = dataOfUser.password;
    userEntity.name = dataOfUser.name;
    userEntity.id = uuid();

    this.userRepository.save(userEntity);
    return {
      user: new ListUsersDTO(userEntity.name, userEntity.id),
      message: 'usuario criado',
    };
  }

  @Get()
  public async getUsers() {
    const usersSaved = await this.userRepository.getAll();
    const ListOfUsers = usersSaved.map(
      (user) => new ListUsersDTO(user.name, user.id),
    );

    return ListOfUsers;
  }

  @Put('/:id')
  public async updateUser(
    @Param('id') id: string,
    @Body() dataOfUserForUpdate: UpdateUserDTO,
  ) {
    const userUpdated = await this.userRepository.update(
      id,
      dataOfUserForUpdate,
    );

    return {
      usuario: userUpdated,
      message: 'Usuario foi atualizado com sucesso',
    };
  }

  @Delete('/:id')
  public async removeUser(@Param('id') id: string) {
    const userRemoved = await this.userRepository.remove(id);

    return {
      user: userRemoved,
      message: 'Usuario removido com sucesso',
    };
  }
}
