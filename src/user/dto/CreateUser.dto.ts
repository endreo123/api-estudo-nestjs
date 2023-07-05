import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { IsEmailUnique } from '../validation/email-unique';

export class createUserDTO {
  @IsNotEmpty({
    message: 'O nome não pode ser vazio',
  })
  name: string;

  @IsEmail(undefined, {
    message: 'O email não é valido ou esta vazio',
  })
  @IsEmailUnique({
    message: 'Já existe um usuario cadastrado com este email',
  })
  email: string;

  @MinLength(6, {
    message: 'A senha deve ter no minimo 6 caracteres',
  })
  password: string;
}
