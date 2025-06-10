/*
  # AgentHub Database Schema

  1. New Tables
    - `clientes` - Stores client information
      - `id` (uuid, primary key)
      - `cliente_id` (text, unique identifier)
      - `nome` (text, client name)
      - `created_at` (timestamp)
    
    - `numeros_whatsapp` - WhatsApp numbers linked to clients
      - `id` (bigint, auto-increment primary key)
      - `cliente_id` (uuid, foreign key to clientes)
      - `numero` (text, unique WhatsApp number)
    
    - `agentes` - AI agent configurations per client
      - `id` (uuid, primary key)
      - `cliente_id` (uuid, foreign key to clientes)
      - `modelo` (text, AI model name)
      - `temperatura` (float, model temperature)
      - `prompt_base` (text, base prompt)
      - `memoria_tempo_min` (integer, memory time in minutes)
    
    - `plugins` - Active plugins per client
      - `id` (bigint, auto-increment primary key)
      - `cliente_id` (uuid, foreign key to clientes)
      - `plugin_nome` (text, plugin name)
      - `ativo` (boolean, whether plugin is active)
    
    - `bases_conhecimento` - Knowledge base files per client
      - `id` (uuid, primary key)
      - `cliente_id` (uuid, foreign key to clientes)
      - `arquivo_url` (text, file URL or path)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their data
    - Public read access for API usage

  3. Indexes
    - Unique constraints on cliente_id and numero
    - Foreign key indexes for better performance
*/

-- Create clientes table
CREATE TABLE IF NOT EXISTS clientes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id text UNIQUE NOT NULL,
  nome text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create numeros_whatsapp table
CREATE TABLE IF NOT EXISTS numeros_whatsapp (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  cliente_id uuid REFERENCES clientes(id) ON DELETE CASCADE,
  numero text UNIQUE NOT NULL
);

-- Create agentes table
CREATE TABLE IF NOT EXISTS agentes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id uuid REFERENCES clientes(id) ON DELETE CASCADE,
  modelo text DEFAULT 'gpt-3.5-turbo',
  temperatura float DEFAULT 0.7,
  prompt_base text DEFAULT 'Você é um assistente útil e amigável.',
  memoria_tempo_min integer DEFAULT 30
);

-- Create plugins table
CREATE TABLE IF NOT EXISTS plugins (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  cliente_id uuid REFERENCES clientes(id) ON DELETE CASCADE,
  plugin_nome text NOT NULL,
  ativo boolean DEFAULT false,
  UNIQUE(cliente_id, plugin_nome)
);

-- Create bases_conhecimento table
CREATE TABLE IF NOT EXISTS bases_conhecimento (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_id uuid REFERENCES clientes(id) ON DELETE CASCADE,
  arquivo_url text
);

-- Enable Row Level Security
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE numeros_whatsapp ENABLE ROW LEVEL SECURITY;
ALTER TABLE agentes ENABLE ROW LEVEL SECURITY;
ALTER TABLE plugins ENABLE ROW LEVEL SECURITY;
ALTER TABLE bases_conhecimento ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
-- For now, we'll allow all operations for development
-- In production, you should restrict based on user authentication

CREATE POLICY "Allow all operations on clientes"
  ON clientes
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations on numeros_whatsapp"
  ON numeros_whatsapp
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations on agentes"
  ON agentes
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations on plugins"
  ON plugins
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations on bases_conhecimento"
  ON bases_conhecimento
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_numeros_whatsapp_cliente_id ON numeros_whatsapp(cliente_id);
CREATE INDEX IF NOT EXISTS idx_numeros_whatsapp_numero ON numeros_whatsapp(numero);
CREATE INDEX IF NOT EXISTS idx_agentes_cliente_id ON agentes(cliente_id);
CREATE INDEX IF NOT EXISTS idx_plugins_cliente_id ON plugins(cliente_id);
CREATE INDEX IF NOT EXISTS idx_plugins_ativo ON plugins(ativo);
CREATE INDEX IF NOT EXISTS idx_bases_conhecimento_cliente_id ON bases_conhecimento(cliente_id);
