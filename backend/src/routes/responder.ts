import { Router } from 'express';
import { responderService } from '../services/responderService.js';

const router = Router();

// POST /api/responder
router.post('/responder', async (req, res) => {
  try {
    const { remoteJid, mensagem, usuario_id, tipo } = req.body;
    
    if (!remoteJid || !mensagem) {
      return res.status(400).json({ 
        error: 'remoteJid e mensagem são obrigatórios' 
      });
    }

    console.log('📨 Nova mensagem recebida:', {
      remoteJid,
      mensagem: mensagem.substring(0, 100) + '...',
      usuario_id,
      tipo
    });

    const resposta = await responderService.processarMensagem({
      remoteJid,
      mensagem,
      usuario_id,
      tipo
    });

    console.log('🤖 Resposta gerada:', {
      acao: resposta.acao,
      resposta: resposta.resposta.substring(0, 100) + '...'
    });

    res.json(resposta);
  } catch (error) {
    console.error('Erro no endpoint /responder:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      resposta: 'Desculpe, ocorreu um erro. Tente novamente.',
      acao: 'erro',
      dados: {}
    });
  }
});

export default router;
