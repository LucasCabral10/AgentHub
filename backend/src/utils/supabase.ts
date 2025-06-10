import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase configuration. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey);

export type Database = {
  public: {
    Tables: {
      clientes: {
        Row: {
          id: string;
          cliente_id: string;
          nome: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          cliente_id: string;
          nome: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          cliente_id?: string;
          nome?: string;
          created_at?: string;
        };
      };
      numeros_whatsapp: {
        Row: {
          id: number;
          cliente_id: string;
          numero: string;
        };
        Insert: {
          cliente_id: string;
          numero: string;
        };
        Update: {
          cliente_id?: string;
          numero?: string;
        };
      };
      agentes: {
        Row: {
          id: string;
          cliente_id: string;
          modelo: string | null;
          temperatura: number | null;
          prompt_base: string | null;
          memoria_tempo_min: number | null;
        };
        Insert: {
          id?: string;
          cliente_id: string;
          modelo?: string | null;
          temperatura?: number | null;
          prompt_base?: string | null;
          memoria_tempo_min?: number | null;
        };
        Update: {
          id?: string;
          cliente_id?: string;
          modelo?: string | null;
          temperatura?: number | null;
          prompt_base?: string | null;
          memoria_tempo_min?: number | null;
        };
      };
      plugins: {
        Row: {
          id: number;
          cliente_id: string;
          plugin_nome: string | null;
          ativo: boolean | null;
        };
        Insert: {
          cliente_id: string;
          plugin_nome?: string | null;
          ativo?: boolean | null;
        };
        Update: {
          cliente_id?: string;
          plugin_nome?: string | null;
          ativo?: boolean | null;
        };
      };
      bases_conhecimento: {
        Row: {
          id: string;
          cliente_id: string;
          arquivo_url: string | null;
        };
        Insert: {
          id?: string;
          cliente_id: string;
          arquivo_url?: string | null;
        };
        Update: {
          id?: string;
          cliente_id?: string;
          arquivo_url?: string | null;
        };
      };
    };
  };
};
