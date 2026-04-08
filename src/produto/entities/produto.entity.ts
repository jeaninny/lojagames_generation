import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty, IsNumber, IsPositive, Length } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { NumericTransformer } from "../../util/numerictransformer";
import { Categoria } from "../../categoria/entities/categoria.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "tb_produtos" }) // CREATE TABLE tb_produtos;
export class Produto {

    @PrimaryGeneratedColumn() // PRIMARY KEY (id) AUTOINCREMENT;
    @ApiProperty() 
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim()) // Remover espaços em branco I/F
    @IsNotEmpty({ message: "O Nome é Obrigatório" }) // Forçar digitação
    @Length(2, 255, { message: "O Nome deve ter entre 2 e 255 caracteres" })
    @Column({ length: 255, nullable: false }) //VARCHAR(255) NOT NULL
    @ApiProperty() 
    nome: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty({ message: "O Preço é Obrigatório" }) //Força digitação
    @IsPositive()
    @Column({ type: "decimal", precision: 10, scale: 2, transformer: new NumericTransformer() })
    @ApiProperty() 
    preco: number;

    @Transform(({ value }: TransformFnParams) => value?.trim()) //Remover espaços em branco I/F
    @IsNotEmpty({ message: "O Link da foto é Obrigatório" }) //Força digitação
    @Length(10, 255, { message: "O Link da foto deve ter entre 10 e 255 caracteres" })
    @Column({ length: 255, nullable: false }) //VARCHAR(255) NOT NULL
    @ApiProperty() 
    foto: string;

    @ApiProperty() 
    @ManyToOne(() => Categoria, (categoria) => categoria.produtos, {
        onDelete: "CASCADE"
    })
    categoria: Categoria; // Chave estrangeira

}