declare new_fertilizante jsonb;
BEGIN
  -- create fertilizantes
  for new_fertilizante in
  select jsonb_array_elements((changes->'fertilizante'->'created')) loop perform create_fertilizante(
    (new_fertilizante->>'id')::uuid,
    (new_fertilizante->>'nome'),
    (new_fertilizante->>'tipo')::int4,
    epoch_to_timestamp(new_fertilizante->>'created_at'),
    epoch_to_timestamp(new_fertilizante->>'updated_at'),
    epoch_to_timestamp(new_fertilizante->>'deleted_at'),
    
  );
  end loop;

  -- Update fertilizantes
  FOR new_fertilizante IN
    SELECT jsonb_array_elements(changes->'fertilizante'->'updated')
  LOOP
    UPDATE fertilizante
    SET 
      nome = new_fertilizante->>'nome',
      tipo = (new_fertilizante->>'tipo'),
      updated_at = NOW()
    WHERE id = (new_fertilizante->>'id')::uuid;
  END LOOP;
  
  -- delete fertilizantes
  with changes_data as (
    select jsonb_array_elements_text
    (changes->'fertilizante'->'deleted')::uuid as deleted
  )
  update fertilizante
  set deleted_at = now(),
    updated_at = now()
  from changes_data
  where fertilizante.id = changes_data.deleted;
END;