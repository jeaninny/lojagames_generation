import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CategoriaService } from "../services/categoria.service";
import { Categoria } from "../entities/categoria.entity";

@Controller("/categorias")
export class CategoriaController {

    constructor(
        private readonly categoriaService: CategoriaService
    ) { }


    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Categoria[]> {
        return this.categoriaService.findAll();
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    findById(@Param("id", ParseIntPipe) id: number): Promise<Categoria> {
        return this.categoriaService.findById(id);
    }

    @Get("/tipo/:tipo")
    @HttpCode(HttpStatus.OK)
    findByTipo(@Param("tipo") tipo: string): Promise<Categoria[]> {
        return this.categoriaService.findAllByTipo(tipo);
    }

    // CONSULTA EXTRA EM CATEGORIA
    // Retorna um inner join para exibir apenas as categorias com produtos vinculados
    @Get("/com-produtos")
    @HttpCode(HttpStatus.OK)
    findAllComProdutos(): Promise<Categoria[]> {
        return this.categoriaService.findAllComProdutos();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() categoria: Categoria): Promise<Categoria> {
        return this.categoriaService.create(categoria);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() categoria: Categoria): Promise<Categoria> {
        return this.categoriaService.update(categoria);
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param("id", ParseIntPipe) id: number) {
        return this.categoriaService.delete(id);
    }
}