create or replace function process_sale(
  p_sale jsonb,   
  p_items jsonb 
) returns void as $$
declare
  item jsonb;
  v_id bigint;
  v_qty integer;
  v_current_stok integer;
begin

  insert into sales (id, tgl, customer, items, total_modal, total_pemasukan, status, dibayar, sisa_hutang)
  values (
    p_sale->>'id',
    (p_sale->>'tgl')::timestamptz,
    p_sale->>'customer',
    p_sale->'items',
    (p_sale->>'total_modal')::numeric,
    (p_sale->>'total_pemasukan')::numeric,
    p_sale->>'status',
    (p_sale->>'dibayar')::numeric,
    (p_sale->>'sisa_hutang')::numeric
  );


  for item in select * from jsonb_array_elements(p_items)
  loop
    v_id := (item->>'id')::bigint;
    v_qty := (item->>'qty')::integer;

    select stok into v_current_stok from products where id = v_id for update;

    if v_current_stok is null then
      raise exception 'Barang dengan id % tidak ditemukan di database', v_id;
    end if;

    if v_current_stok < v_qty then
      raise exception 'Stok tidak cukup untuk barang id % (sisa %, diminta %)', v_id, v_current_stok, v_qty;
    end if;

    update products set stok = stok - v_qty where id = v_id;
  end loop;
end;
$$ language plpgsql security definer;

grant execute on function process_sale(jsonb, jsonb) to anon, authenticated;