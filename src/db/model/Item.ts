import { Model } from "@nozbe/watermelondb";
import { date, field, readonly, relation } from "@nozbe/watermelondb/decorators";
import Fertilizante from "./Fertilizante";
import NotaFiscal from "./NotaFiscal";

export default class Item extends Model {
    static table = 'item'

    @field('medida') medida!: string;
    @field('quantidade') quantidade!: number;
    @field('valor') valor!: number;
    @relation('fertilizante', 'fertilizante_id') fertilizante!: Fertilizante;
    @relation('nota_fiscal', 'nota_fiscal_id') notaFiscal!: NotaFiscal;
    @readonly @date('created_at') createdAt!: string;
    @readonly @date('updated_at') updatedAt!: string;
    @readonly @date('deleted_at') deletedAt!: string;
}