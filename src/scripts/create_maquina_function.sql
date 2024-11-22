-- RETURN TIPE: uuid
-- ARGUMENTS: _id, _nome, _consumo_medio ...

DECLARE new_id uuid;

BEGIN
  insert into
    maquina (
      id,
      nome,
      consumo_medio,
      data_compra,
      modelo,
      potencia,
      tipo,
      tipo_calculo,
      tipo_combustivel,
      tipo_insumo,
      valor,
      tenant_id,
      created_at,
      updated_at,
      deleted_at,
      vida_util
    )
    values (
      _id,
      _nome,
      _consumo_medio,
      _data_compra,
      _modelo,
      _potencia,
      _tipo,
      _tipo_calculo,
      _tipo_combustivel,
      _tipo_insumo,
      _valor,
      _tenant_id,
      _created_at,
      _updated_at,
      _deleted_at,
      _vida_util
    )
  returning id into new_id;

  RETURN new_id;
END;