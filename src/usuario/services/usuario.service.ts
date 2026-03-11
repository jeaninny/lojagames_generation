import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';
import { differenceInYears } from "date-fns";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
        private bcrypt: Bcrypt
    ) { }

    // Não vai ter um endpoint na Controller
    // Trata-se de método apenas para autenticação
    async findByUsuario(usuario: string): Promise<Usuario | null> {
        return await this.usuarioRepository.findOne({
            where: {
                usuario: usuario
            }
        })
    }

    async findAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find({
        });

    }

    async findById(id: number): Promise<Usuario> {

        const usuario = await this.usuarioRepository.findOne({
            where: {
                id
            }
        });

        if (!usuario) {
            throw new HttpException("Usuario não encontrado!", HttpStatus.NOT_FOUND);
        }

        return usuario;

    }


    async create(usuario: Usuario): Promise<Usuario> {

        // EXTRA: Verifica a data do cadastro e calcula a idade
        const data_atual = new Date();
        const idade = differenceInYears(data_atual, usuario.data_nascimento);

        // EXTRA: Não permite o cadastro caso seja menor de 18 anos
        if (idade < 18) {
            throw new HttpException("Para se cadastrar, é necessário ter 18 anos ou mais!", HttpStatus.BAD_REQUEST);
        }

        const buscaUsuario = await this.findByUsuario(usuario.usuario);

        if (buscaUsuario) {
            throw new HttpException("O Usuario já existe!", HttpStatus.BAD_REQUEST);
        }

        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
        return await this.usuarioRepository.save(usuario);

    }

    async update(usuario: Usuario): Promise<Usuario> {

        await this.findById(usuario.id);

        const buscaUsuario = await this.findByUsuario(usuario.usuario);

        if (buscaUsuario && buscaUsuario.id !== usuario.id) {
            throw new HttpException("Usuário já Cadastrado!", HttpStatus.BAD_REQUEST);
        }

        // EXTRA: Verifica a data da atualização e calcula a idade
        const data_atual = new Date();
        const idade = differenceInYears(data_atual, usuario.data_nascimento);

        // EXTRA: Não permite a atualização de data de nascimento caso seja menor de 18 anos
        if (idade < 18) {
            throw new HttpException("Idade inferior a 18 anos! Não é possível seguir com a atualização do cadastro!", HttpStatus.BAD_REQUEST);
        }

        usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha)
        return await this.usuarioRepository.save(usuario);

    }

}