import { Transform, TransformFnParams } from "class-transformer"
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { NumericTransformer } from "../../util/numerictransform"
import { Categoria } from "../../categoria/entities/categoria.entity"
import { ApiProperty } from "@nestjs/swagger"


@Entity({ name: "tb_produtos" })
export class Produto {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    @ApiProperty()
    nome: string

    @IsNumber({ maxDecimalPlaces: 2 })
    @IsNotEmpty()
    @IsPositive()
    @Column({ type: "decimal", precision: 10, scale: 2, transformer: new NumericTransformer() })
    @ApiProperty()
    preco: number

    @Column({length: 500 })
    @ApiProperty()
    foto: string

    @ApiProperty({type: () => Categoria})
    @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
        onDelete: "CASCADE"
    })
    categoria: Categoria

}