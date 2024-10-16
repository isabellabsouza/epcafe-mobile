import { Model } from "@nozbe/watermelondb";
import { date, field, readonly, relation, text } from "@nozbe/watermelondb/decorators";
import Maquina from "./Maquina";
import Tenant from "./Tenant";
import Unidade from "./Unidade";

export default class DespesaMaquina extends Model {
    static table = 'despesa_maquina'

    @date('data') data!: Date;
    @field('distancia_trabalhada') distanciaTrabalhada!: number;
    @text('fator_potencia') fatorPotencia!: string;
    @field('litros_consumidos') litrosConsumidos!: number;
    @field('minutos_trabalhados') minutosTrabalhados!: number;
    @field('preco_unitario_combustivel') precoUnitarioCombustivel!: number;
    @field('valor_total') valorTotal!: number;
    @field('unidade_horas') unidadeHoras!: boolean;
    @field('tempo_trabalho') tempoTrabalho!: number;
    @relation('maquina', 'maquina_id') maquina!: Maquina;
    @relation('tenant', 'tenant_id') tenant!: Tenant;
    @relation('unidade', 'unidade_id') unidade!: Unidade;
    @readonly @date('created_at') createdAt!: string;
    @readonly @date('updated_at') updatedAt!: string;
    @readonly @date('deleted_at') deletedAt!: string;
}