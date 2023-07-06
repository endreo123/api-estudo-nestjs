import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { IsEmailUnique } from '../validations/email-unique';

export class UpdateUserDTO {
  @IsNotEmpty({
    message: 'O nome não pode ser vazio',
  })
  @IsOptional()
  name: string;

  @IsEmail(undefined, {
    message: 'O email não é valido ou esta vazio',
  })
  @IsEmailUnique({
    message: 'Já existe um usuario cadastrado com este email',
  })
  @IsOptional()
  email: string;

  @MinLength(6, {
    message: 'A senha deve ter no minimo 6 caracteres',
  })
  @IsOptional()
  password: string;
}
