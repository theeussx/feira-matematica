# AR Mathematics Fair - Guia de Configuração

Bem-vindo ao site da Feira de Matemática 2026! Este guia irá ajudá-lo a configurar e personalizar o projeto.

## 📋 Estrutura do Projeto

```
ar-math-fair/
├── client/
│   ├── public/
│   │   └── participants/          # Pasta para adicionar fotos dos participantes
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx          # Página inicial (Hero + O que é AR)
│   │   │   ├── Sensors.tsx       # Aba de Sensores
│   │   │   ├── Math.tsx          # Aba de Matemática
│   │   │   ├── Demo.tsx          # Aba de Demonstração
│   │   │   ├── Quiz.tsx          # Aba de Quiz
│   │   │   └── Participants.tsx  # Aba de Participantes
│   │   ├── components/           # Componentes reutilizáveis
│   │   └── index.css             # Estilos globais
│   └── index.html
├── .env.example                   # Variáveis de ambiente (exemplo)
└── package.json
```

## 🚀 Como Começar

### 1. Instalar Dependências

```bash
cd ar-math-fair
pnpm install
```

### 2. Iniciar o Servidor de Desenvolvimento

```bash
pnpm dev
```

O site estará disponível em `http://localhost:3000`

### 3. Compilar para Produção

```bash
pnpm build
```

## 📸 Adicionar Fotos dos Participantes

### Passo 1: Preparar as Imagens

1. Coloque as fotos dos 5 participantes na pasta `client/public/participants/`
2. Nomeie os arquivos como:
   - `participant-1.jpg`
   - `participant-2.jpg`
   - `participant-3.jpg`
   - `participant-4.jpg`
   - `participant-5.jpg`

### Passo 2: Atualizar os Dados

Abra o arquivo `client/src/pages/Participants.tsx` e atualize o array `participants`:

```typescript
const participants = [
  {
    id: 1,
    name: "Nome do Participante 1",
    role: "Função/Cargo",
    image: "/participants/participant-1.jpg",
  },
  {
    id: 2,
    name: "Nome do Participante 2",
    role: "Função/Cargo",
    image: "/participants/participant-2.jpg",
  },
  // ... continue para os outros 3 participantes
];
```

## 🎨 Personalizar o Design

### Cores

As cores principais estão definidas em `client/src/index.css`:

- **Azul Elétrico**: `#0066FF` (destaque primário)
- **Roxo**: `#7C3AED` (destaque secundário)
- **Laranja**: `#FF6B35` (botões e CTAs)
- **Preto Profundo**: `#0A0E27` (modo escuro)

### Tipografia

- **Títulos**: Poppins Bold (700)
- **Corpo**: Inter Regular (400)
- **Fórmulas**: Courier New (monospace)

### Modo Claro/Escuro

O site suporta alternância automática entre modo claro e escuro. O botão está no header (canto superior direito).

## 📝 Editar Conteúdo

### Home (Página Inicial)

Edite `client/src/pages/Home.tsx` para alterar o conteúdo da página inicial.

### Sensores

Edite `client/src/components/SensorsSection.tsx` para modificar a seção de sensores.

### Matemática

Edite `client/src/components/MathSection.tsx` para alterar o conteúdo matemático.

### Demonstração

Edite `client/src/components/S20DemoSection.tsx` para modificar a demonstração do S20.

### Quiz

Edite `client/src/components/QuizSection.tsx` para adicionar/modificar perguntas do quiz.

### Participantes

Edite `client/src/pages/Participants.tsx` para adicionar nomes, funções e fotos dos participantes.

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto baseado em `.env.example`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```
VITE_APP_TITLE=AR Mathematics Fair
VITE_APP_ID=ar-math-fair
VITE_ANALYTICS_ENDPOINT=https://analytics.example.com
VITE_ANALYTICS_WEBSITE_ID=your-website-id
NODE_ENV=development
```

## 📱 Responsividade

O site é totalmente responsivo e funciona perfeitamente em:

- ✅ Celulares (320px+)
- ✅ Tablets (768px+)
- ✅ Desktops (1024px+)
- ✅ Projetores (tela cheia)

## 🎯 Seções do Site

### 1. **Início**
   - Hero Section com título impactante
   - Explicação sobre Realidade Aumentada

### 2. **Sensores**
   - Informações sobre giroscópio, acelerômetro, magnetômetro e câmera
   - Visualização 3D dos eixos de movimento
   - Fluxo de dados em tempo real

### 3. **Matemática**
   - Conceitos matemáticos fundamentais (coordenadas, distância, ângulos, vetores)
   - Fórmulas estilizadas
   - Visualização matemática

### 4. **Demonstração**
   - Explicação sobre o Samsung S20
   - Painel de indicadores de movimento
   - Aplicações futuras de AR

### 5. **Quiz**
   - 5 questões interativas
   - Feedback visual imediato
   - Pontuação final

### 6. **Participantes**
   - Espaço para fotos dos 5 participantes
   - Nome e função de cada um
   - Design elegante e profissional

## 🐛 Troubleshooting

### O servidor não inicia

```bash
# Limpe o cache e reinstale dependências
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm dev
```

### Imagens não aparecem

Certifique-se de que:
1. As imagens estão em `client/public/participants/`
2. Os caminhos em `Participants.tsx` estão corretos
3. O servidor foi reiniciado após adicionar as imagens

### Tema não alterna

Verifique se o `ThemeProvider` está ativo em `App.tsx` com `switchable` habilitado.

## 📦 Estrutura de Componentes

### Componentes Principais

- `Header.tsx` - Navegação e tema toggle
- `Footer.tsx` - Rodapé com informações
- `HeroSection.tsx` - Seção hero da página inicial
- `ARExplainedSection.tsx` - Explicação sobre AR
- `SensorsSection.tsx` - Informações sobre sensores
- `MathSection.tsx` - Conceitos matemáticos
- `S20DemoSection.tsx` - Demonstração do S20
- `QuizSection.tsx` - Quiz interativo
- `FutureSection.tsx` - Impacto e futuro
- `ThemeToggle.tsx` - Botão para alternar tema

## 🚀 Deploy

Para fazer deploy do site:

1. Compile o projeto: `pnpm build`
2. Upload os arquivos da pasta `dist/` para seu servidor
3. Configure o servidor para servir `index.html` para todas as rotas (SPA)

## 📞 Suporte

Para dúvidas ou problemas, consulte a documentação do Manus ou entre em contato com o desenvolvedor.

---

**Desenvolvido com ❤️ para a Feira de Matemática 2026**
