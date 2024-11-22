--RETURN TYPE: jsonb
--ARGUMENTS: last_pulled_at bigint, schemaversion integer, migration jsonb, tenant_id text
DECLARE _ts timestamp with time zone;

_maquina jsonb;
_tenant jsonb;
_usuario jsonb;
_unidade jsonb;
_talhao jsonb;
_nota_fiscal jsonb;
_item jsonb;
_fertilizante jsonb;
_despesa_maquina jsonb;
_despesa_fertilizante jsonb;
_despesa_fer_talhao jsonb;

BEGIN _ts := to_timestamp (last_pulled_at / 1000);

-- MARK: maquinas
  
  select jsonb_build_object(
    'created',
    coalesce(
      jsonb_agg(
        jsonb_build_object(
          'id', m.id,
          'nome', m.nome,
          'consumo_medio', m.consumo_medio,
          'data_compra', m.data_compra,
          'modelo', m.modelo,
          'potencia', m.potencia,
          'tipo', m.tipo,
          'tipo_calculo', m.tipo_calculo,
          'tipo_combustivel', m.tipo_combustivel,
          'tipo_insumo', m.tipo_insumo,
          'valor', m.valor,
          'tenant_id', m.tenant_id,
          'created_at', timestamp_to_epoch(m.created_at),
          'updated_at', timestamp_to_epoch(m.updated_at),
          'deleted_at', timestamp_to_epoch(m.deleted_at),
          'vida_util', m.vida_util
        )
      ) filter (
        where m.deleted_at is null
          and m.updated_at = m.created_at
          and m.created_at > _ts
      ),
      '[]'::jsonb
    ),
    'updated',
    coalesce(
      jsonb_agg(
        jsonb_build_object(
          'id', m.id,
          'nome', m.nome,
          'consumo_medio', m.consumo_medio,
          'data_compra', m.data_compra,
          'modelo', m.modelo,
          'potencia', m.potencia,
          'tipo', m.tipo,
          'tipo_calculo', m.tipo_calculo,
          'tipo_combustivel', m.tipo_combustivel,
          'tipo_insumo', m.tipo_insumo,
          'valor', m.valor,
          'tenant_id', m.tenant_id,
          'created_at', timestamp_to_epoch(m.created_at),
          'updated_at', timestamp_to_epoch(m.updated_at),
          'deleted_at', timestamp_to_epoch(m.deleted_at),
          'vida_util', m.vida_util
        )
      ) filter (
        where m.deleted_at is null
          and m.updated_at > _ts
          and m.updated_at != m.created_at
      ),
      '[]'::jsonb
    ),
    'deleted',
    coalesce(
      jsonb_agg(to_jsonb(m.id)) filter (
        where m.deleted_at is not null
           and m.updated_at > _ts
      ),
      '[]'::jsonb
    )
  ) into _maquina


from maquina m;

-- MARK: tenants

select jsonb_build_object(
    'created',
    coalesce(
      jsonb_agg(
        jsonb_build_object(
          'id', t.id,
          'tenant', t.tenant,
          'tipo_plano', t.tipo_plano,
          'created_at', timestamp_to_epoch(t.created_at),
          'updated_at', timestamp_to_epoch(t.updated_at),
          'deleted_at', timestamp_to_epoch(t.deleted_at)
        )
      ) filter (
        where t.deleted_at is null
          and t.updated_at = t.created_at
          and t.created_at > _ts
      ),
      '[]'::jsonb
    ),
    'updated',
    coalesce(
      jsonb_agg(
        jsonb_build_object(
          'id', t.id,
          'tenant', t.tenant,
          'tipo_plano', t.tipo_plano,
          'created_at', timestamp_to_epoch(t.created_at),
          'updated_at', timestamp_to_epoch(t.updated_at),
          'deleted_at', timestamp_to_epoch(t.deleted_at)
        )
      ) filter (
        where t.deleted_at is null
          and t.updated_at > _ts
          and t.updated_at != t.created_at
      ),
      '[]'::jsonb
    ),
    'deleted',
    coalesce(
      jsonb_agg(to_jsonb(t.id)) filter (
        where t.deleted_at is not null
           and t.updated_at > _ts
      ),
      '[]'::jsonb
    )
  ) into _tenant
from tenant t;

-- MARK: usuarios

select jsonb_build_object(
    'created',
    coalesce(
      jsonb_agg(
        jsonb_build_object(
          'id', u.id,
          'nome', u.nome,
          'role', u.role,
          'status', u.status,
          'tenant_id', u.tenant_id,
          'created_at', timestamp_to_epoch(u.created_at),
          'updated_at', timestamp_to_epoch(u.updated_at),
          'deleted_at', timestamp_to_epoch(u.deleted_at)
        )
      ) filter (
        where u.deleted_at is null
          and u.updated_at = u.created_at
          and u.created_at > _ts
      ),
      '[]'::jsonb
    ),
    'updated',
    coalesce(
      jsonb_agg(
        jsonb_build_object(
          'id', u.id,
          'nome', u.nome,
          'role', u.role,
          'status', u.status,
          'tenant_id', u.tenant_id,
          'created_at', timestamp_to_epoch(u.created_at),
          'updated_at', timestamp_to_epoch(u.updated_at),
          'deleted_at', timestamp_to_epoch(u.deleted_at)
        )
      ) filter (
        where u.deleted_at is null
          and u.updated_at > _ts
          and u.updated_at != u.created_at
      ),
      '[]'::jsonb
    ),
    'deleted',
    coalesce(
      jsonb_agg(to_jsonb(u.id)) filter (
        where u.deleted_at is not null
           and u.updated_at > _ts
      ),
      '[]'::jsonb
    )
  ) into _usuario
from usuario u;

-- MARK: unidades

select jsonb_build_object(
    'created',
    coalesce(
      jsonb_agg(
        jsonb_build_object(
          'id', un.id,
          'contato', un.contato,
          'nome', un.nome,
          'tipo', un.tipo,
          'created_at', timestamp_to_epoch(un.created_at),
          'updated_at', timestamp_to_epoch(un.updated_at),
          'deleted_at', timestamp_to_epoch(un.deleted_at),
          'tenant_id', un.tenant_id,
          'endereco_id', un.endereco_id
        )
      ) filter (
        where un.deleted_at is null
          and un.updated_at = un.created_at
          and un.created_at > _ts
      ),
      '[]'::jsonb
    ),
    'updated',
    coalesce(
      jsonb_agg(
        jsonb_build_object(
          'id', un.id,
          'contato', un.contato,
          'nome', un.nome,
          'tipo', un.tipo,
          'created_at', timestamp_to_epoch(un.created_at),
          'updated_at', timestamp_to_epoch(un.updated_at),
          'deleted_at', timestamp_to_epoch(un.deleted_at),
          'tenant_id', un.tenant_id,
          'endereco_id', un.endereco_id
        )
      ) filter (
        where un.deleted_at is null
          and un.updated_at > _ts
          and un.updated_at != un.created_at
      ),
      '[]'::jsonb
    ),
    'deleted',
    coalesce(
      jsonb_agg(to_jsonb(un.id)) filter (
        where un.deleted_at is not null
           and un.updated_at > _ts
      ),
      '[]'::jsonb
    )
  ) into _unidade
from unidade un;

-- MARK: talhoes

select jsonb_build_object(
    'created',
    coalesce(
      jsonb_agg(
        jsonb_build_object(
          'id', tl.id,
          'area', tl.area,
          'nome', tl.nome,
          'tenant_id', tl.tenant_id,
          'unidade_id', tl.unidade_id,
          'created_at', timestamp_to_epoch(tl.created_at),
          'updated_at', timestamp_to_epoch(tl.updated_at),
          'deleted_at', timestamp_to_epoch(tl.deleted_at)
        )
      ) filter (
        where tl.deleted_at is null
          and tl.updated_at = tl.created_at
          and tl.created_at > _ts
      ),
      '[]'::jsonb
    ),
    'updated',
    coalesce(
      jsonb_agg(
        jsonb_build_object(
          'id', tl.id,
          'area', tl.area,
          'nome', tl.nome,
          'tenant_id', tl.tenant_id,
          'unidade_id', tl.unidade_id,
          'created_at', timestamp_to_epoch(tl.created_at),
          'updated_at', timestamp_to_epoch(tl.updated_at),
          'deleted_at', timestamp_to_epoch(tl.deleted_at)
        )
      ) filter (
        where tl.deleted_at is null
          and tl.updated_at > _ts
          and tl.updated_at != tl.created_at
      ),
      '[]'::jsonb
    ),
    'deleted',
    coalesce(
      jsonb_agg(to_jsonb(tl.id)) filter (
        where tl.deleted_at is not null
           and tl.updated_at > _ts
      ),
      '[]'::jsonb
    )
  ) into _talhao
from talhao tl;


-- MARK: notas_fiscais

select jsonb_build_object(
    'created',
    coalesce(
      jsonb_agg(
        jsonb_build_object(
          'id', nf.id,
          'data_emissao', nf.data_emissao,
          'descricao', nf.descricao,
          'numero', nf.numero,
          'url', nf.url,
          'valor_total', nf.valor_total,
          'unidade_id', nf.unidade_id,
          'tenant_id', nf.tenant_id,
          'created_at', timestamp_to_epoch(nf.created_at),
          'updated_at', timestamp_to_epoch(nf.updated_at),
          'deleted_at', timestamp_to_epoch(nf.deleted_at)
        )
      ) filter (
        where nf.deleted_at is null
          and nf.updated_at = nf.created_at
          and nf.created_at > _ts
      ),
      '[]'::jsonb
    ),
    'updated',
    coalesce(
      jsonb_agg(
        jsonb_build_object(
          'id', nf.id,
          'data_emissao', nf.data_emissao,
          'descricao', nf.descricao,
          'numero', nf.numero,
          'url', nf.url,
          'valor_total', nf.valor_total,
          'unidade_id', nf.unidade_id,
          'tenant_id', nf.tenant_id,
          'created_at', timestamp_to_epoch(nf.created_at),
          'updated_at', timestamp_to_epoch(nf.updated_at),
          'deleted_at', timestamp_to_epoch(nf.deleted_at)
        )
      ) filter (
        where nf.deleted_at is null
          and nf.updated_at > _ts
          and nf.updated_at != nf.created_at
      ),
      '[]'::jsonb
    ),
    'deleted',
    coalesce(
      jsonb_agg(to_jsonb(nf.id)) filter (
        where nf.deleted_at is not null
           and nf.updated_at > _ts
      ),
      '[]'::jsonb
    )
  ) into _nota_fiscal
from nota_fiscal nf;

-- MARK: item

select jsonb_build_object(
    'created',
    coalesce(
      jsonb_agg(
        jsonb_build_object(
          'id', i.id,
          'medida', i.medida,
          'quantidade', i.quantidade,
          'valor', i.valor,
          'fertilizante_id', i.fertilizante_id,
          'nota_fiscal_id', i.nota_fiscal_id,
          'created_at', timestamp_to_epoch(i.created_at),
          'updated_at', timestamp_to_epoch(i.updated_at),
          'deleted_at', timestamp_to_epoch(i.deleted_at)
        )
      ) filter (
        where i.deleted_at is null
          and i.updated_at = i.created_at
          and i.created_at > _ts
      ),
      '[]'::jsonb
    ),
    'updated',
    coalesce(
      jsonb_agg(
        jsonb_build_object(
          'id', i.id,
          'medida', i.medida,
          'quantidade', i.quantidade,
          'valor', i.valor,
          'fertilizante_id', i.fertilizante_id,
          'nota_fiscal_id', i.nota_fiscal_id,
          'created_at', timestamp_to_epoch(i.created_at),
          'updated_at', timestamp_to_epoch(i.updated_at),
          'deleted_at', timestamp_to_epoch(i.deleted_at)
        )
      ) filter (
        where i.deleted_at is null
          and i.updated_at > _ts
          and i.updated_at != i.created_at
      ),
      '[]'::jsonb
    ),
    'deleted',
    coalesce(
      jsonb_agg(to_jsonb(i.id)) filter (
        where i.deleted_at is not null
           and i.updated_at > _ts
      ),
      '[]'::jsonb
    )
  ) into _item
from item i;

-- MARK: fertilizantes

select jsonb_build_object(
    'created',
    coalesce(
      jsonb_agg(
        jsonb_build_object(
          'id', f.id,
          'nome', f.nome,
          'tipo', f.tipo,
          'created_at', timestamp_to_epoch(f.created_at),
          'updated_at', timestamp_to_epoch(f.updated_at),
          'deleted_at', timestamp_to_epoch(f.deleted_at)
        )
      ) filter (
        where f.deleted_at is null
          and f.updated_at = f.created_at
          and f.created_at > _ts
      ),
      '[]'::jsonb
    ),
    'updated',
    coalesce(
      jsonb_agg(
        jsonb_build_object(
          'id', f.id,
          'nome', f.nome,
          'tipo', f.tipo,
          'created_at', timestamp_to_epoch(f.created_at),
          'updated_at', timestamp_to_epoch(f.updated_at),
          'deleted_at', timestamp_to_epoch(f.deleted_at)
        )
      ) filter (
        where f.deleted_at is null
          and f.updated_at > _ts
          and f.updated_at != f.created_at
      ),
      '[]'::jsonb
    ),
    'deleted',
    coalesce(
      jsonb_agg(to_jsonb(f.id)) filter (
        where f.deleted_at is not null
           and f.updated_at > _ts
      ),
      '[]'::jsonb
    )
  ) into _fertilizante
from fertilizante f;

-- MARK: despesas_maquinas

select jsonb_build_object(
    'created',
    coalesce(
      jsonb_agg(
        jsonb_build_object(
          'id', dm.id,
          'data', dm.data,
          'distancia_trabalhada', dm.distancia_trabalhada,
          'fator_potencia', dm.fator_potencia,
          'litros_consumidos', dm.litros_consumidos,
          'minutos_trabalhados', dm.minutos_trabalhados,
          'preco_unitario_combustivel', dm.preco_unitario_combustivel,
          'unidade_horas', dm.unidade_horas,
          'tempo_trabalhado', dm.tempo_trabalhado,
          'created_at', timestamp_to_epoch(dm.created_at),
          'updated_at', timestamp_to_epoch(dm.updated_at),
          'deleted_at', timestamp_to_epoch(dm.deleted_at),
          'maquina_id', dm.maquina_id,
          'tenant_id', dm.tenant_id,
          'unidade_id', dm.unidade_id
        )
      ) filter (
        where dm.deleted_at is null
          and dm.updated_at = dm.created_at
          and dm.created_at > _ts
      ),
      '[]'::jsonb
    ),
    'updated',
    coalesce(
      jsonb_agg(
        jsonb_build_object(
          'id', dm.id,
          'data', dm.data,
          'distancia_trabalhada', dm.distancia_trabalhada,
          'fator_potencia', dm.fator_potencia,
          'litros_consumidos', dm.litros_consumidos,
          'minutos_trabalhados', dm.minutos_trabalhados,
          'preco_unitario_combustivel', dm.preco_unitario_combustivel,
          'unidade_horas', dm.unidade_horas,
          'tempo_trabalhado', dm.tempo_trabalhado,
          'created_at', timestamp_to_epoch(dm.created_at),
          'updated_at', timestamp_to_epoch(dm.updated_at),
          'deleted_at', timestamp_to_epoch(dm.deleted_at),
          'maquina_id', dm.maquina_id,
          'tenant_id', dm.tenant_id,
          'unidade_id', dm.unidade_id
        )
      ) filter (
        where dm.deleted_at is null
          and dm.updated_at > _ts
          and dm.updated_at != dm.created_at
      ),
      '[]'::jsonb
    ),
    'deleted',
    coalesce(
      jsonb_agg(to_jsonb(dm.id)) filter (
        where dm.deleted_at is not null
           and dm.updated_at > _ts
      ),
      '[]'::jsonb
    )
  ) into _despesa_maquina
from despesa_maquina dm;

-- MARK: despesas_fertilizantes

select jsonb_build_object(
    'created',
    coalesce(
      jsonb_agg(
        jsonb_build_object(
          'id', df.id,
          'data', df.data,
          'medida', df.medida,
          'valor_total', df.valor_total,
          'nota_fiscal_id', df.nota_fiscal_id,
          'unidade_id', df.unidade_id,
          'fertilizante_id', df.fertilizante_id,
          'tenant_id', df.tenant_id,
          'created_at', timestamp_to_epoch(df.created_at),
          'updated_at', timestamp_to_epoch(df.updated_at),
          'deleted_at', timestamp_to_epoch(df.deleted_at)
        )
      ) filter (
        where df.deleted_at is null
          and df.updated_at = df.created_at
          and df.created_at > _ts
      ),
      '[]'::jsonb
    ),
    'updated',
    coalesce(
      jsonb_agg(
        jsonb_build_object(
          'id', df.id,
          'data', df.data,
          'medida', df.medida,
          'valor_total', df.valor_total,
          'nota_fiscal_id', df.nota_fiscal_id,
          'unidade_id', df.unidade_id,
          'fertilizante_id', df.fertilizante_id,
          'tenant_id', df.tenant_id,
          'created_at', timestamp_to_epoch(df.created_at),
          'updated_at', timestamp_to_epoch(df.updated_at),
          'deleted_at', timestamp_to_epoch(df.deleted_at)
        )
      ) filter (
        where df.deleted_at is null
          and df.updated_at > _ts
          and df.updated_at != df.created_at
      ),
      '[]'::jsonb
    ),
    'deleted',
    coalesce(
      jsonb_agg(to_jsonb(df.id)) filter (
        where df.deleted_at is not null
           and df.updated_at > _ts
      ),
      '[]'::jsonb
    )
  ) into _despesa_fertilizante
from despesa_fertilizante df;

-- MARK: despesas_fer_talhoes

select jsonb_build_object(
    'created',
    coalesce(
      jsonb_agg(
        jsonb_build_object(
          'id', dt.id,
          'quantidade', dt.quantidade,
          'valor', dt.valor,
          'tenant_id', dt.tenant_id,
          'despesa_id', dt.despesa_id,
          'talhao_id', dt.talhao_id,
          'unidade_id', dt.unidade_id,
          'created_at', timestamp_to_epoch(dt.created_at),
          'updated_at', timestamp_to_epoch(dt.updated_at),
          'deleted_at', timestamp_to_epoch(dt.deleted_at)
        )
      ) filter (
        where dt.deleted_at is null
          and dt.updated_at = dt.created_at
          and dt.created_at > _ts
      ),
      '[]'::jsonb
    ),
    'updated',
    coalesce(
      jsonb_agg(
        jsonb_build_object(
          'id', dt.id,
          'quantidade', dt.quantidade,
          'valor', dt.valor,
          'tenant_id', dt.tenant_id,
          'despesa_id', dt.despesa_id,
          'talhao_id', dt.talhao_id,
          'unidade_id', dt.unidade_id,
          'created_at', timestamp_to_epoch(dt.created_at),
          'updated_at', timestamp_to_epoch(dt.updated_at),
          'deleted_at', timestamp_to_epoch(dt.deleted_at)
        )
      ) filter (
        where dt.deleted_at is null
          and dt.updated_at > _ts
          and dt.updated_at != dt.created_at
      ),
      '[]'::jsonb
    ),
    'deleted',
    coalesce(
      jsonb_agg(to_jsonb(dt.id)) filter (
        where dt.deleted_at is not null
           and dt.updated_at > _ts
      ),
      '[]'::jsonb
    )
  ) into _despesa_fer_talhao
from despesa_fer_talhao dt;


return jsonb_build_object (
    'changes',
    jsonb_build_object (
      'maquina', _maquina,
      'tenant', _tenant,
      'usuario', _usuario,
      'unidade', _unidade,
      'talhao', _talhao,
      'nota_fiscal', _nota_fiscal,
      'item', _item
      'fertilizante', _fertilizante,
      'despesa_maquina', _despesa_maquina,
      'despesa_fertilizante', _despesa_fertilizante,
      'despesa_fer_talhao', _despesa_fer_talhao,
    ),
    'timestamp', timestamp_to_epoch (now())
);

END;