export interface Pessoa {
  id: string
  fullName: string
  email: string
  cpf: string
  birthDate: string
  phone: string
  createdAt?: string
  updatedAt?: string
}

export type CreatePessoaDTO = Omit<Pessoa, 'id' | 'createdAt' | 'updatedAt'>

export type UpdatePessoaDTO = Partial<CreatePessoaDTO>
