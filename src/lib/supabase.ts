import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Cliente = {
  id: string;
  cliente_id: string;
  nome: string;
  created_at: string;
};

export type NumeroWhatsApp = {
  id: number;
  cliente_id: string;
  numero: string;
};

export type Agente = {
  id: string;
  cliente_id: string;
  modelo: string | null;
  temperatura: number | null;
  prompt_base: string | null;
  memoria_tempo_min: number | null;
};

export type Plugin = {
  id: number;
  cliente_id: string;
  plugin_nome: string | null;
  ativo: boolean | null;
};

export type BaseConhecimento = {
  id: string;
  cliente_id: string;
  arquivo_url: string | null;
};
