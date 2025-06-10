import { Router } from 'express';
import { supabase } from '../utils/supabase.js';

const router = Router();

// GET /api/agentes/cliente/:clienteId
router.get('/cliente/:clienteId', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('agentes')
      .select('*')
      .eq('cliente_id', req.params.clienteId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    res.json(data || null);
  } catch (error) {
    console.error('Erro ao buscar agente:', error);
    res.status(500).json({ error: 'Erro ao buscar agente' });
  }
});

// POST /api/agentes
router.post('/', async (req, res) => {
  try {
    const { cliente_id, modelo, temperatura, prompt_base, memoria_tempo_min } = req.body;
    
    if (!cliente_id) {
      return res.status(400).json({ error: 'cliente_id é obrigatório' });
    }

    const { data, error } = await supabase
      .from('agentes')
      .upsert({ 
        cliente_id, 
        modelo, 
        temperatura, 
        prompt_base, 
        memoria_tempo_min 
      })
      .select()
      .single();
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Erro ao salvar agente:', error);
    res.status(500).json({ error: 'Erro ao salvar agente' });
  }
});

export default router;
