# AgentHub - Sistema de Gerenciamento de Agentes IA

AgentHub é um sistema completo para gerenciar múltiplos agentes de IA conectados ao WhatsApp via n8n e Evolution API.

## 🚀 Funcionalidades

### Backend
- **API REST** completa com Node.js + Express + TypeScript
- **Endpoint /responder** para processar mensagens do WhatsApp
- **CRUD completo** para clientes, números, agentes, plugins e bases de conhecimento
- **Integração Supabase** para banco de dados
- **Arquitetura modular** com services, routes e utils

### Frontend
- **Interface moderna** com React + Chakra UI
- **Gerenciamento de clientes** com busca e filtros
- **Configuração de agentes** com modelos, temperatura, prompts
- **Sistema de plugins** configurável
- **Design responsivo** para todos os dispositivos

### Banco de Dados
- **Supabase** com schema completo
- **Row Level Security** configurado
- **Migrations** organizadas
- **Relacionamentos** entre tabelas

## 🛠️ Tecnologias

**Backend:**
- Node.js + Express + TypeScript
- Supabase JS SDK
- CORS, Helmet para segurança
- Dotenv para configurações

**Frontend:**
- React + TypeScript
- Chakra UI para componentes
- Framer Motion para animações
- React Router para navegação

**Banco de Dados:**
- Supabase (PostgreSQL)
- Row Level Security
- Migrations SQL

## 📦 Estrutura do Projeto

```
agenthub/
├── backend/                 # API Backend
│   ├── src/
│   │   ├── routes/         # Rotas da API
│   │   ├── services/       # Lógica de negócio
│   │   ├── utils/          # Utilitários
│   │   └── index.ts        # Servidor principal
│   ├── .env.example        # Variáveis de ambiente
│   └── package.json
├── supabase/
│   └── migrations/         # Migrações do banco
├── src/                    # Frontend React
│   ├── components/         # Componentes React
│   ├── lib/               # Bibliotecas e utilitários
│   ├── theme/             # Tema Chakra UI
│   └── App.tsx
├── package.json           # Dependências frontend
└── README.md
```

## 🚀 Como Executar

### 1. Configurar Supabase

1. Crie um projeto no [Supabase](https://supabase.com)
2. Execute a migration em `supabase/migrations/create_agenthub_schema.sql`
3. Copie as credenciais do projeto

### 2. Configurar Backend

```bash
cd backend
cp .env.example .env
# Edite o .env com suas credenciais Supabase
npm install
npm run dev
```

### 3. Configurar Frontend

```bash
cp .env.example .env
# Edite o .env com suas credenciais
npm install
npm run dev
```

### 4. Testar o Sistema

- Frontend: http://localhost:5173
- Backend: http://localhost:3001
- Health check: http://localhost:3001/health

## 📡 API Endpoints

### Clientes
- `GET /api/clientes` - Lista todos os clientes
- `POST /api/clientes` - Cria novo cliente
- `PUT /api/clientes/:id` - Atualiza cliente
- `DELETE /api/clientes/:id` - Remove cliente

### Endpoint Principal (WhatsApp)
- `POST /api/responder` - Processa mensagem do WhatsApp

**Exemplo de request:**
```json
{
  "remoteJid": "5511999999999@s.whatsapp.net",
  "mensagem": "Olá, preciso de ajuda",
  "usuario_id": "user123",
  "tipo": "text"
}
```

**Exemplo de response:**
```json
{
  "resposta": "Olá! Como posso ajudar você?",
  "acao": "resposta_simples",
  "dados": {}
}
```

## 🔒 Segurança

- **Row Level Security** habilitado em todas as tabelas
- **CORS** configurado para origem específica
- **Helmet** para headers de segurança
- **Validação** de entrada em todos os endpoints

## 🎨 Design System

- **Cores principais:** Azul (#3182CE), Teal (#319795), Laranja (#F97316)
- **Tipografia:** Inter font family
- **Espaçamento:** Sistema de 8px
- **Componentes:** Chakra UI customizado
- **Animações:** Framer Motion para transições suaves

## 🔧 Desenvolvimento

### Comandos Úteis

```bash
# Frontend
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run lint         # Linting

# Backend
npm run dev          # Servidor com hot reload
npm run build        # Build TypeScript
npm start            # Produção
```

### Estrutura de Dados

**Cliente:**
- ID único, nome, data de criação

**Números WhatsApp:**
- Vinculados ao cliente, únicos

**Agente:**
- Configuração de modelo IA, temperatura, prompt, memória

**Plugins:**
- Sistema modular de funcionalidades

**Base de Conhecimento:**
- URLs de arquivos para consulta

## 📝 Próximos Passos

- [ ] Integração com OpenAI/Anthropic
- [ ] Sistema de logs detalhado
- [ ] Dashboard de analytics
- [ ] Webhooks para n8n
- [ ] Sistema de templates
- [ ] Multi-tenancy
- [ ] Testes automatizados

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.
