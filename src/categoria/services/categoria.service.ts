import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { Categoria } from "../entities/categoria.entity";
import { DeleteResult } from "typeorm/browser";

@Injectable()
export class CategoriaService {

    constructor(
        @InjectRepository(Categoria)
        private categoriaRepository: Repository<Categoria>,
    ) { }

    async findAll(): Promise<Categoria[]> {
        // SELECT * FROM tb_categorias
        return this.categoriaRepository.find({
            relations: {
                produtos: true
            }
        });
    }

    async findById(id: number): Promise<Categoria> {
        // SELECT * FROM tb_categorias WHERE id = ?;

        const categoria = await this.categoriaRepository.findOne({
            where: {
                id,
            },
            relations: {
                produtos: true
            }
        });
        if (!categoria) {
            throw new HttpException("Categoria não encontrada!", HttpStatus.NOT_FOUND)
        }
        return categoria;
    }

    async findAllByTipo(tipo: string): Promise<Categoria[]> {
        // SELECT * FROM tb_categorias WHERE tipo LIKE '%?%'
        return this.categoriaRepository.find({
            where: {
                tipo: ILike(`%${tipo}%`),
            },
            relations: {
                produtos: true
            }
        })
    }

    // CONSULTA EXTRA EM CATEGORIA
    // Retorna um inner join para exibir apenas as categorias com produtos vinculados
    async findAllComProdutos(): Promise<Categoria[]> {
        return this.categoriaRepository.createQueryBuilder("categoria")
            .innerJoinAndSelect("categoria.produtos", "produto")
            .getMany();
    }

    async create(categoria: Categoria): Promise<Categoria> {
        // INSERT INTO tb_categorias (tipo) VALUES (?);

        return await this.categoriaRepository.save(categoria);
    }

    async update(categoria: Categoria): Promise<Categoria> {

        if (!categoria.id || categoria.id <= 0) {
            throw new HttpException("O ID da Categoria é inválido!", HttpStatus.BAD_REQUEST);
        }

        // UPDATE tb_categorias
        // SET tipo = ?, 
        // WHERE id = ?;   
        return await this.categoriaRepository.save(categoria);
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id);

        // DELETE tb_categorias WHERE id = ?
        return await this.categoriaRepository.delete(id);
    }
}