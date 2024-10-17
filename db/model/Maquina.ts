// model/Post.js
import { Model } from '@nozbe/watermelondb'
import { date, field, readonly, text, relation } from '@nozbe/watermelondb/decorators'
import Tenant from './Tenant';
import { Associations } from '@nozbe/watermelondb/Model';

export default class Maquina extends Model {
  static table = 'maquina'

  static associations: Associations = {
    tenant: { type: 'belongs_to', key: 'tenant_id' } as const
  }

  @text('nome') nome!: string;
  @field('consumo_medio') consumoMedio!: number;
  @date('data_compra') dataCompra!: Date;
  @text('modelo') modelo!: string;
  @field('potencia') potencia!: number;
  @text('tipo') tipo!: string;
  @text('tipo_calculo') tipoCalculo!: string;
  @text('tipo_combustivel') tipoCombustivel!: string;
  @text('tipo_insumo') tipoInsumo!: string;
  @field('valor') valor!: number;
  @field('vida_util') vidaUtil!: number;
  @readonly @date('created_at') createdAt!: string;
  @readonly @date('updated_at') updatedAt!: string;
  @readonly @date('deleted_at') deletedAt!: string;

  @relation('tenant', 'tenant_id') tenant!: Tenant;
}