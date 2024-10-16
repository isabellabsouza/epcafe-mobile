// model/Post.js
import { Model } from '@nozbe/watermelondb'
import { date, field, readonly, text, relation } from '@nozbe/watermelondb/decorators'
import Tenant from './Tenant';

export default class Maquina extends Model {
  static table = 'maquina'

  @text('nome') nome!: string;
  @field('consumo_medio') consumoMedio!: Date;
  @date('data_compra') dataCompra!: Date;
  @text('modelo') modelo!: string;
  @field('potencia') potencia!: number;
  @text('tipo') tipo!: string;
  @text('tipo_calculo') tipoCalculo!: string;
  @text('tipo_combustivel') tipoCombustivel!: string;
  @text('tipo_insumo') tipoInsumo!: string;
  @field('valor') valor!: number;
  @field('vida_util') vidaUtil!: number;
  @relation('tenant', 'tenant_id') tenant!: Tenant;
  @readonly @date('created_at') createdAt!: string;
  @readonly @date('updated_at') updatedAt!: string;
  @readonly @date('deleted_at') deletedAt!: string;
}