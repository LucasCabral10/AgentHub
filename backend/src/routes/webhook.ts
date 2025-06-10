import { Router } from 'express';
import { supabase } from '../utils/supabase.js';

const router = Router();

// POST /webhook/:cliente_id
router.post('/:cliente_id', async (req, res) => {
  try {
    const { remoteJid, mensagem, tipo } = req.body;
    const { cliente_id } = req.params;

    // Verifica se o número está autorizado
    const { data: instancias, error } = await supabase
      .from('instancias')
      .select('numeros_autorizados, ativa')
      .eq('cliente_id', cliente_id)
      .eq('ativa', true);

    if (error || !instancias || instancias.length === 0) {
      return res.status(403).json({ error: 'Instância não autorizada ou inativa' });
    }

    const instancia = instancias.find(inst => inst.numeros_autorizados.includes(remoteJid));
    if (!instancia) {
      return res.status(403).json({ error: 'Número não autorizado para esta instância' });
    }

    // Processa a mensagem e envia a resposta
    // Lógica de processamento da mensagem aqui

    res.json({ success: true, message: 'Mensagem processada com sucesso' });
  } catch (error) {
    console.error('Erro ao processar webhook:', error);
    res.status(500).json({ error: 'Erro ao processar webhook' });
  }
});

export default router;
