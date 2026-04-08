import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { Transform, TransformFnParams } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger"

@Entity({ name: "tb_usuarios" })
export class Usuario {

    @PrimaryGeneratedColumn()
    @ApiProperty() 
    id: number

    @Transform(({ value }: TransformFnParams) => value?.trim()) //Remover espaços em branco I/F
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @ApiProperty() 
    nome: string

    @Transform(({ value }: TransformFnParams) => value?.trim()) //Remover espaços em branco I/F
    @IsEmail()
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @ApiProperty() 
    usuario: string

    @Transform(({ value }: TransformFnParams) => value?.trim()) //Remover espaços em branco I/F
    @MinLength(8)
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @ApiProperty() 
    senha: string

    @Column({ length: 5000 })
    @ApiProperty() 
    foto: string

    // EXTRA: coluna com data_nascimento
    @IsNotEmpty()
    @Column({ type: "date", nullable: false })
    @ApiProperty() 
    data_nascimento: Date

}