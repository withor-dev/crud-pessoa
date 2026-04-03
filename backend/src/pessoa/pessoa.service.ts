import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PessoaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPessoaDto: CreatePessoaDto) {
    const personExists = await this.prisma.pessoa.findFirst({
      where: {
        OR: [{ email: createPessoaDto.email }, { cpf: createPessoaDto.cpf }],
      },
    });

    if (personExists) {
      throw new ConflictException(
        'Já existe um cadastro com este E-mail ou CPF.',
      );
    }

    return this.prisma.pessoa.create({
      data: createPessoaDto,
    });
  }

  async findAll() {
    return this.prisma.pessoa.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const person = await this.prisma.pessoa.findUnique({
      where: { id },
    });

    if (!person) {
      throw new NotFoundException(`Pessoa com ID ${id} não encontrada.`);
    }

    return person;
  }

  async update(id: string, updatePersonDto: UpdatePessoaDto) {
    await this.findOne(id);

    if (updatePersonDto.email || updatePersonDto.cpf) {
      const existingPerson = await this.prisma.pessoa.findFirst({
        where: {
          OR: [{ email: updatePersonDto.email }, { cpf: updatePersonDto.cpf }],
          NOT: { id },
        },
      });

      if (existingPerson) {
        throw new ConflictException(
          'Este E-mail ou CPF já está em uso por outro cadastro.',
        );
      }
    }

    return this.prisma.pessoa.update({
      where: { id },
      data: updatePersonDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.pessoa.delete({
      where: { id },
    });
  }
}
