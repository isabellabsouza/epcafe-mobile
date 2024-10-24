--RETURN TYPE: jsonb
--ARGUMENTS: last_pulled_at bigint, schemaversion integer, migration jsonb
DECLARE _ts timestamp with time zone;

_maquina jsonb;
_tenant jsonb;
_usuario jsonb;
_unidade jsonb;

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
from _unidade un;

return jsonb_build_object (
    'changes',
    jsonb_build_object (
      'maquina', _maquina,
      'tenant', _tenant,
      'usuario', _usuario,
      'unidade', _unidade
    ),
    'timestamp', timestamp_to_epoch (now())
);

END;