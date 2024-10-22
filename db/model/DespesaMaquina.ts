import { Model } from "@nozbe/watermelondb";
import { date, field, readonly, relation, text } from "@nozbe/watermelondb/decorators";
import Maquina from "./Maquina";
import Tenant from "./Tenant";
import Unidade from "./Unidade";
import { Associations } from "@nozbe/watermelondb/Model";

export default class DespesaMaquina extends Model {
    static table = 'despesa_maquina'

    static associations: Associations = {
        maquina: { type: 'belongs_to', key: 'maquina_id' }, // Associação com Maquina
    };

    @date('data') data!: Date;
    @field('distancia_trabalhada') distanciaTrabalhada!: number;
    @text('fator_potencia') fatorPotencia!: string;
    @field('preco_unitario_combustivel') precoUnitarioCombustivel!: number;
    @field('valor_total') valorTotal!: number;
    @field('unidade_horas') unidadeHoras!: boolean;
    @field('tempo_trabalhado') tempoTrabalhado!: number;
    @relation('maquina', 'maquina_id') maquina!: Maquina;
    @relation('tenant', 'tenant_id') tenant!: Tenant;
    @relation('unidade', 'unidade_id') unidade!: Unidade;
    @readonly @date('created_at') createdAt!: string;
    @readonly @date('updated_at') updatedAt!: string;
    @readonly @date('deleted_at') deletedAt!: string;
}