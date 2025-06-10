import { supabase } from '../utils/supabase.js';

export interface MensagemRequest {
  remoteJid: string;
  mensagem: string;
  usuario_id: string;
  tipo: string;
}

export interface RespostaAI {
  resposta: string;
  acao: string;
  dados: any;
}

export const responderService = {
  async processarMensagem(request: MensagemRequest): Promise<RespostaAI> {
    try {
      // 1. Identificar cliente pelo remoteJid
      const cliente = await this.identificarCliente(request.remoteJid);
      
      if (!cliente) {
        return {
          resposta: "Número não cadastrado no sistema.",
          acao: "erro",
          dados: { erro: "numero_nao_cadastrado" }
        };
      }

      // 2. Carregar configurações do agente
      const configuracao = await this.carregarConfiguracaoAgente(cliente.id);
      
      // 3. Processar mensagem com IA (simulado por enquanto)
      const resposta = await this.processarComIA(request.mensagem, configuracao);
      
      return resposta;
    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
      return {
        resposta: "Desculpe, ocorreu um erro interno. Tente novamente.",
        acao: "erro",
        dados: { erro: "erro_interno" }
      };
    }
  },

  async identificarCliente(remoteJid: string) {
    // Extrair número do remoteJid (formato: 5511999999999@s.whatsapp.net)
    const numero = remoteJid.split('@')[0];
    
    const { data, error } = await supabase
      .from('numeros_whatsapp')
      .select(`
        *,
        clientes (*)
      `)
      .eq('numero', numero)
      .single();
    
    if (error || !data) return null;
    return data.clientes;
  },

  async carregarConfiguracaoAgente(clienteId: string) {
    // Carregar agente
    const { data: agente } = await supabase
      .from('agentes')
      .select('*')
      .eq('cliente_id', clienteId)
      .single();

    // Carregar plugins ativos
    const { data: plugins } = await supabase
      .from('plugins')
      .select('*')
      .eq('cliente_id', clienteId)
      .eq('ativo', true);

    // Carregar base de conhecimento
    const { data: baseConhecimento } = await supabase
      .from('bases_conhecimento')
      .select('*')
      .eq('cliente_id', clienteId)
      .single();

    return {
      agente: agente || {},
      plugins: plugins || [],
      baseConhecimento: baseConhecimento || null
    };
  },

  async processarComIA(mensagem: string, configuracao: any): Promise<RespostaAI> {
    // Por enquanto, retorna uma resposta simulada
    // Aqui seria integrado com OpenAI, Anthropic, etc.
    
    const { agente, plugins, baseConhecimento } = configuracao;
    
    // Simular processamento baseado na configuração
    let resposta = "Olá! Sou seu assistente de IA. ";
    let acao = "resposta_simples";
    let dados = {};

    // Verificar se tem plugin de agendamento ativo
    const temAgendamento = plugins.some((p: any) => 
      p.plugin_nome === 'calendar_agendamento'
    );

    if (temAgendamento && mensagem.toLowerCase().includes('agendar')) {
      resposta = "Vou ajudar você a agendar. Que tipo de serviço você precisa?";
      acao = "agendar";
      dados = { step: "tipo_servico" };
    } else if (mensagem.toLowerCase().includes('preço') || mensagem.toLowerCase().includes('valor')) {
      resposta = "Nossos preços variam conforme o serviço. Posso enviar nossa tabela de preços?";
      acao = "enviar_tabela_precos";
    } else {
      resposta += `Como posso ajudar você hoje?
      
Configuração ativa:
- Modelo: ${agente.modelo || 'padrão'}
- Temperatura: ${agente.temperatura || 0.7}
- Plugins: ${plugins.map((p: any) => p.plugin_nome).join(', ') || 'nenhum'}`;
    }

    return { resposta, acao, dados };
  }
};