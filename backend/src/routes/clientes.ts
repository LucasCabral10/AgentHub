import { Router } from 'express';
import { clienteService } from '../services/clienteService.js';

const router = Router();

// GET /api/clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await clienteService.getAll();
    res.json(clientes);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    res.status(500).json({ error: 'Erro ao buscar clientes' });
  }
});

// GET /api/clientes/:id
router.get('/:id', async (req, res) => {
  try {
    const cliente = await clienteService.getById(req.params.id);
    res.json(cliente);
  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
    res.status(404).json({ error: 'Cliente não encontrado' });
  }
});

// POST /api/clientes
router.post('/', async (req, res) => {
  try {
    const { cliente_id, nome } = req.body;
    
    if (!cliente_id || !nome) {
      return res.status(400).json({ error: 'cliente_id e nome são obrigatórios' });
    }

    const cliente = await clienteService.create({ cliente_id, nome });
    res.status(201).json(cliente);
  } catch (error: any) {
    console.error('Erro ao criar cliente:', error);
    
    if (error.code === '23505') { // Unique constraint violation
      return res.status(409).json({ error: 'Cliente ID já existe' });
    }
    
    res.status(500).json({ error: 'Erro ao criar cliente' });
  }
});

// PUT /api/clientes/:id
router.put('/:id', async (req, res) => {
  try {
    const { cliente_id, nome } = req.body;
    const cliente = await clienteService.update(req.params.id, { cliente_id, nome });
    res.json(cliente);
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    res.status(500).json({ error: 'Erro ao atualizar cliente' });
  }
});

// DELETE /api/clientes/:id
router.delete('/:id', async (req, res) => {
  try {
    await clienteService.delete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao deletar cliente:', error);
    res.status(500).json({ error: 'Erro ao deletar cliente' });
  }
});

export default router;