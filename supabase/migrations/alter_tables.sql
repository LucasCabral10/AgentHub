/*
  # Alterações nas Tabelas

  1. Alterar Tabela: numeros_whatsapp
    - Adicionar coluna `ativo` (boolean, default true)

  2. Alterar Tabela: agentes
    - Adicionar coluna `api_key` (text)

  3. Criar Tabela: instancias
    - `id` (uuid, primary key)
    - `cliente_id` (uuid, foreign key)
    - `nome` (text, not null)
    - `tipo` (text, check constraint)
    - `url` (text, not null)
    - `token` (text)
    - `ativa` (boolean, default true)
    - `numeros_autorizados` (text[], default '{}')
    - `created_at` (timestamptz, default now())

  4. Criar Tabela: mensagens
    - `id` (bigint, primary key)
    - `cliente_id` (uuid, foreign key)
    - `numero` (text)
    - `conteudo` (text)
    - `resposta` (text)
    - `tipo` (text)
    - `recebido_em` (timestamptz, default now())
*/

ALTER TABLE numeros_whatsapp
ADD COLUMN IF NOT EXISTS ativo boolean DEFAULT true;

ALTER TABLE agentes
ADD COLUMN IF NOT EXISTS api_key text;

CREATE TABLE IF NOT EXISTS instancias (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id uuid REFERENCES clientes(id) ON DELETE CASCADE,
  nome text NOT NULL,
  tipo text CHECK (tipo IN ('manual', 'automatica')) DEFAULT 'manual',
  url text NOT NULL,
  token text,
  ativa boolean DEFAULT true,
  numeros_autorizados text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS mensagens (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  cliente_id uuid REFERENCES clientes(id) ON DELETE CASCADE,
  numero text,
  conteudo text,
  resposta text,
  tipo text,
  recebido_em timestamptz DEFAULT now()
);
