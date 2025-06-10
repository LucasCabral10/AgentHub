import { supabase } from '../utils/supabase.js';

export interface Cliente {
  id?: string;
  cliente_id: string;
  nome: string;
  created_at?: string;
}

export const clienteService = {
  async getAll() {
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async getByClienteId(cliente_id: string) {
    const { data, error } = await supabase
      .from('clientes')
      .select('*')
      .eq('cliente_id', cliente_id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async create(cliente: Omit<Cliente, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('clientes')
      .insert(cliente)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id: string, cliente: Partial<Cliente>) {
    const { data, error } = await supabase
      .from('clientes')
      .update(cliente)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('clientes')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { success: true };
  }
};
