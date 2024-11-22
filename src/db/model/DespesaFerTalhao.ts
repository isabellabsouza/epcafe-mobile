import { Model } from "@nozbe/watermelondb";
import { date, field, readonly, relation } from "@nozbe/watermelondb/decorators";
import DespesaFertilizante from "./DespesaFertilizante";
import Talhao from "./Talhao";
import Tenant from "./Tenant";
import Unidade from "./Unidade";

export default class DespesaFerTalhao extends Model {
    static table = 'despesa_fer_talhao'

    @field('quantidade') quantidade!: number;
    @field('valor') valor!: number;
    @relation('talhao', 'talhao_id') talhao!: Talhao;
    @relation('despesa_fertilizante', 'despesa_id') despesaFertilizante!: DespesaFertilizante;
    @relation('tenant', 'tenant_id') tenant!: Tenant;
    @relation('unidade', 'unidade_id') unidade!: Unidade;
    @readonly @date('created_at') createdAt!: string;
    @readonly @date('updated_at') updatedAt!: string;
    @readonly @date('deleted_at') deletedAt!: string;
}