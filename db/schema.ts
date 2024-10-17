import { appSchema, tableSchema } from '@nozbe/watermelondb';
import { column } from '@nozbe/watermelondb/QueryDescription';

export default appSchema({
    version: 1,
    tables: [
        tableSchema({
            name: 'maquina',
            columns: [
                { name: 'nome', type: 'string' },
                { name: 'consumo_medio', type: 'number' },
                { name: 'data_compra', type: 'number' },
                { name: 'modelo', type: 'string' },
                { name: 'potencia', type: 'number' },
                { name: 'tipo', type: 'string' },
                { name: 'tipo_calculo', type: 'string' },
                { name: 'tipo_combustivel', type: 'string' },
                { name: 'tipo_insumo', type: 'string' },
                { name: 'valor', type: 'number' },
                { name: 'vida_util', type: 'number' },
                { name: 'tenant_id', type: 'string' },
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
                { name: 'deleted_at', type: 'number' },
            ]
        }),
        tableSchema({
            name: 'tenant',
            columns: [
                { name: 'tenant', type: 'string' },
                { name: 'tipo_plano', type: 'string' },
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
                { name: 'deleted_at', type: 'number' },
            ]
        }),
        tableSchema({
            name: 'unidade',
            columns: [
                { name: 'contato', type: 'string' },
                { name: 'nome', type: 'string' },
                { name: 'tipo', type: 'string' },
                { name: 'tenant_id', type: 'string' },
                { name: 'endereco_id', type: 'string' },
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
                { name: 'deleted_at', type: 'number' },
            ]
        }),
        tableSchema({
            name: 'usuario',
            columns: [
                { name: 'nome', type: 'string' },
                { name: 'role', type: 'string' },
                { name: 'status', type: 'string' },
                { name: 'tenant_id', type: 'string' },
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
                { name: 'deleted_at', type: 'number' },
            ]
        }),
        tableSchema({
            name: 'talhao',
            columns: [
                { name: 'area', type: 'number' },
                { name: 'nome', type: 'string' },
                { name: 'unidade_id', type: 'string'},
                { name: 'tenant_id', type: 'string' },
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
                { name: 'deleted_at', type: 'number' },
            ]
        }),
        tableSchema({
            name: 'nota_fiscal',
            columns: [
                { name: 'data_emissao', type: 'number' },
                { name: 'descricao', type: 'string' },
                { name: 'numero', type: 'string' },
                { name: 'url', type: 'string' },
                { name: 'valor_total', type: 'number' },
                { name: 'unidade_id', type: 'string'},
                { name: 'tenant_id', type: 'string' },
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
                { name: 'deleted_at', type: 'number' },
            ]
        }),
        tableSchema({
            name: 'despesa_maquina',
            columns: [
                { name: 'data', type: 'number' },
                { name: 'distancia_trabalhada', type: 'number' },
                { name: 'fator_potencia', type: 'string' },
                { name: 'litros_consumidos', type: 'number' },
                { name: 'minutos_trabalhados', type: 'number' },
                { name: 'preco_unitario_combustivel', type: 'number' },
                { name: 'valor_total', type: 'number' },
                { name: 'unidade_horas', type: 'boolean' },
                { name: 'tempo_trabalhado', type: 'number' },
                { name: 'maquina_id', type: 'string'},
                { name: 'tenant_id', type: 'string' },
                { name: 'unidade_id', type: 'string'},
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
                { name: 'deleted_at', type: 'number' },
            ]
        }),
        tableSchema({
            name: 'despesa_fertilizante',
            columns: [
                { name: 'data', type: 'number' },
                { name: 'medida', type: 'string' },
                { name: 'valor_total', type: 'number' },
                { name: 'fertilizante_id', type: 'string'},
                { name: 'tenant_id', type: 'string' },
                { name: 'unidade_id', type: 'string'},
                { name: 'nota_fiscal_id', type: 'string'},
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
                { name: 'deleted_at', type: 'number' },
            ]
        }),
        tableSchema({
            name: 'despesa_fer_talhao',
            columns: [
                { name: 'quantidade', type: 'number' },
                { name: 'valor', type: 'number' },
                { name: 'talhao_id', type: 'string'},
                { name: 'despesa_id', type: 'string'},
                { name: 'tenant_id', type: 'string' },
                { name: 'unidade_id', type: 'string'},
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
                { name: 'deleted_at', type: 'number' },
            ]
        }),
        tableSchema({
            name: 'fertilizante',
            columns: [
                { name: 'nome', type: 'string' },
                { name: 'tipo', type: 'string' },
                { name: 'tenant_id', type: 'string' },
                { name: 'created_at', type: 'number' },
                { name: 'updated_at', type: 'number' },
                { name: 'deleted_at', type: 'number' },
            ]
        })
    ],
});