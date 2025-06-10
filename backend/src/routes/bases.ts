import { Router } from 'express';
import { supabase } from '../utils/supabase.js';

const router = Router();

// GET /api/bases/cliente/:clienteId
router.get('/cliente/:clienteId', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('bases_conhecimento')
      .select('*')
      .eq('cliente_id', req.params.clienteId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    res.json(data || null);
  } catch (error) {
    console.error('Erro ao buscar base de conhecimento:', error);
    res.status(500).json({ error: 'Erro ao buscar base de conhecimento' });
  }
});

// POST /api/bases
router.post('/', async (req, res) => {
  try {
    const { cliente_id, arquivo_url } = req.body;
    
    if (!cliente_id) {
      return res.status(400).json({ error: 'cliente_id é obrigatório' });
    }

    const { data, error } = await supabase
      .from('bases_conhecimento')
      .upsert({ cliente_id, arquivo_url })
      .select()
      .single();
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Erro ao salvar base de conhecimento:', error);
    res.status(500).json({ error: 'Erro ao salvar base de conhecimento' });
  }
});

export default router;