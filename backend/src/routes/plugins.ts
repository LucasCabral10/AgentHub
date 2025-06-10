import { Router } from 'express';
import { supabase } from '../utils/supabase.js';

const router = Router();

// GET /api/plugins/cliente/:clienteId
router.get('/cliente/:clienteId', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('plugins')
      .select('*')
      .eq('cliente_id', req.params.clienteId);
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar plugins:', error);
    res.status(500).json({ error: 'Erro ao buscar plugins' });
  }
});

// POST /api/plugins
router.post('/', async (req, res) => {
  try {
    const { cliente_id, plugin_nome, ativo } = req.body;
    
    if (!cliente_id || !plugin_nome) {
      return res.status(400).json({ error: 'cliente_id e plugin_nome são obrigatórios' });
    }

    const { data, error } = await supabase
      .from('plugins')
      .upsert({ cliente_id, plugin_nome, ativo })
      .select()
      .single();
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Erro ao salvar plugin:', error);
    res.status(500).json({ error: 'Erro ao salvar plugin' });
  }
});

export default router;