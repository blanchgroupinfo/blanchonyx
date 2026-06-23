import { supabase } from '@/integrations/supabase/client';

async function fetchProperties() {
  const { data, error } = await supabase
    .from('properties')
    .select('name, price, metadata')
    .eq('status', 'available');

  if (error) console.log("Error:", error.message);
  else console.log("Success:", data);
}