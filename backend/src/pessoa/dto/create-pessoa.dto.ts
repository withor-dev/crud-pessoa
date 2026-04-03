import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Length,
  Matches,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsCPF } from '../validators/is-cpf.validator';

export class CreatePessoaDto {
  @IsString({ message: 'O nome deve ser um texto' })
  @IsNotEmpty({ message: 'O nome completo é obrigatório' })
  @Length(3, 100, { message: 'O nome deve ter entre 3 e 100 caracteres' })
  fullName: string;

  @IsEmail({}, { message: 'O e-mail informado tem um formato inválido' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'O CPF é obrigatório' })
  @IsCPF()
  cpf: string;

  @IsDate({ message: 'A data de nascimento deve ser uma data válida' })
  @Type(() => Date)
  @IsNotEmpty({ message: 'A data de nascimento é obrigatória' })
  birthDate: Date;

  @IsString()
  @IsNotEmpty({ message: 'O telefone é obrigatório' })
  @Matches(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, {
    message: 'O telefone informado tem um formato inválido',
  })
  phone: string;
}
