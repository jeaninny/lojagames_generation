import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "../../produto/entities/produto.entity";

@Entity({ name: "tb_categorias" }) // CREATE TABLE tb_categorias;
export class Categoria {

    @PrimaryGeneratedColumn() // PRIMARY KEY (id) AUTOINCREMENT;
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim()) // Remover espaços em branco I/F
    @IsNotEmpty({ message: "O Tipo é Obrigatório" }) // Forçar digitação
    @Length(5, 100, { message: "O Tipo deve ter entre 10 e 255 caracteres" })
    @Column({ length: 100, nullable: false }) //VARCHAR(100) NOT NULL
    tipo: string;

    @OneToMany(() => Produto, (produto) => produto.categoria)
    produtos: Produto[]; // Array de retorno
}