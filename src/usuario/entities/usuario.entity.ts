import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { Transform, TransformFnParams } from "class-transformer"

@Entity({ name: "tb_usuarios" })
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number

    @Transform(({ value }: TransformFnParams) => value?.trim()) //Remover espaços em branco I/F
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    nome: string

    @Transform(({ value }: TransformFnParams) => value?.trim()) //Remover espaços em branco I/F
    @IsEmail()
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    usuario: string

    @Transform(({ value }: TransformFnParams) => value?.trim()) //Remover espaços em branco I/F
    @MinLength(8)
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    senha: string

    @Column({ length: 5000 })
    foto: string

    // EXTRA: coluna com data_nascimento
    @IsNotEmpty()
    @Column({ type: "date", nullable: false })
    data_nascimento: Date

}