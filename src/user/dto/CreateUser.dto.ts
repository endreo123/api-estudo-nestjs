import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class createUserDTO {
  @IsNotEmpty({
    message: 'O nome não pode ser vazio',
  })
  name: string;

  @IsEmail(undefined, {
    message: 'O email não é valido ou esta vazio',
  })
  email: string;

  @MinLength(6, {
    message: 'A senha deve ter no minimo 6 caracteres',
  })
  password: string;
}
