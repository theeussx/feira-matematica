# 🎓 Feira de Matemática: Realidade Aumentada e Sensores

<div align="center">

![Feira de Matemática](https://img.shields.io/badge/Projeto-Feira%20de%20Matemática-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript)
![Express](https://img.shields.io/badge/Express-4.21-000000?style=for-the-badge&logo=express)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Como celulares conseguem entender o espaço usando matemática e sensores?**

Um projeto educativo interativo que demonstra como a Realidade Aumentada funciona através de sensores, matemática e cálculos espaciais em tempo real.

[🌐 Acesse o Site](#-como-acessar) • [📚 Documentação](#-documentação) • [🚀 Começar](#-começar) • [🤝 Contribuir](#-contribuir)

</div>

---

## 🎯 Sobre o Projeto

Este é um **projeto educativo completo** desenvolvido para uma Feira de Matemática que explora o funcionamento da **Realidade Aumentada** através de uma abordagem prática e interativa. O projeto demonstra como smartphones modernos (como o Samsung S20FE 5G) utilizam sensores internos, cálculos matemáticos e algoritmos de rastreamento espacial para entender e interpretar o mundo real.

### 🌟 Características Principais

- **🎨 Design Minimalista Moderno** - Interface limpa com Tailwind CSS 4 e componentes Radix UI
- **⚡ Demonstração ao Vivo** - Simulador de sensores em tempo real no navegador
- **📱 Integração com Sensores Reais** - Recebe dados de acelerômetro e giroscópio via API REST
- **🗄️ Backend Robusto** - Express.js com MySQL para persistência de dados
- **🐳 Containerizado** - Dockerfile pronto para deploy em Render, Vercel, ou qualquer plataforma
- **📊 Visualização 3D** - Representação visual do movimento do dispositivo
- **🎓 Conteúdo Educativo** - 7 seções explicando conceitos de AR e matemática

---

## 📋 Estrutura do Projeto

```
feira-matematica/
├── 📁 client/                    # Frontend React + Vite
│   ├── src/
│   │   ├── pages/               # Páginas principais
│   │   │   ├── Home.tsx         # Página inicial (Hero + O que é AR)
│   │   │   ├── Sensors.tsx      # Explicação de sensores
│   │   │   ├── Math.tsx         # Conceitos matemáticos
│   │   │   ├── Demo.tsx         # Demonstração ao vivo com simulador
│   │   │   ├── Quiz.tsx         # Quiz interativo
│   │   │   └── Participants.tsx # Equipe do projeto
│   │   ├── components/          # Componentes reutilizáveis
│   │   │   ├── SensorSimulator.tsx  # Simulador de sensores
│   │   │   ├── Header.tsx       # Navegação
│   │   │   ├── Footer.tsx       # Rodapé
│   │   │   └── ...
│   │   └── index.css            # Estilos globais
│   └── vite.config.ts
│
├── 📁 server/                    # Backend Express.js
│   ├── index.ts                 # Servidor principal
│   ├── routes/
│   │   └── sensorsRoutes.ts     # API de sensores
│   ├── socket.ts                # WebSocket (Socket.io)
│   └── db.ts                    # Conexão com banco de dados
│
├── 📁 drizzle/                   # Schema do banco de dados
│   └── schema.ts                # Tabela de sensores
│
├── 📁 api/                       # Funções serverless (opcional)
├── Dockerfile                    # Build em 2 estágios
├── docker-compose.yml           # Setup local com MySQL
├── package.json                 # Dependências
└── tsconfig.json                # Configuração TypeScript
```

---

## 🎨 Seções do Site

### 1️⃣ **Home (Página Inicial)**
- Hero section com título impactante
- Explicação do conceito de Realidade Aumentada
- Navegação para outras seções

### 2️⃣ **Sensores**
- Como o celular entende movimento
- Explicação dos eixos X, Y, Z
- Acelerômetro vs Giroscópio
- Visualização interativa

### 3️⃣ **Matemática**
- Conceitos matemáticos por trás da AR
- Matrizes de rotação
- Coordenadas espaciais
- Fórmulas e exemplos

### 4️⃣ **Demonstração** ⭐ **[PRINCIPAL]**
- **Simulador de Sensores** - Controle deslizante para cada eixo
- **Simulação Automática** - Animação realista de movimento
- **Gravação em Tempo Real** - Envie dados para o servidor
- **Visualização 3D** - Cubo 3D que rotaciona com os dados
- **Status em Tempo Real** - Conexão, gravação e contador de registros

### 5️⃣ **Quiz Interativo**
- 5 questões sobre AR e sensores
- Feedback visual imediato
- Pontuação e resultados

### 6️⃣ **Impacto e Futuro**
- Aplicações de AR em diversos campos
- Tendências tecnológicas
- Oportunidades de carreira

### 7️⃣ **Participantes**
- Equipe do projeto
- Fotos e funções de cada membro
- Links para redes sociais

---

## 🚀 Começar

### Pré-requisitos

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **pnpm** 10+ (`npm install -g pnpm`)
- **MySQL** 8+ (ou use Docker Compose)
- **Git**

### Instalação Local

#### 1. Clone o repositório

```bash
git clone https://github.com/theeussx/feira-matematica.git
cd feira-matematica
```

#### 2. Instale as dependências

```bash
pnpm install
```

#### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local`:

```env
# Banco de Dados
DB_HOST=localhost
DB_PORT=3306
DB_USER=app
DB_PASSWORD=password
DB_NAME=feira

# Servidor
NODE_ENV=development
PORT=3000
```

#### 4. Inicie o MySQL (com Docker Compose)

```bash
docker-compose up -d
```

#### 5. Rode o servidor de desenvolvimento

```bash
pnpm dev
```

O site estará disponível em: **http://localhost:5173**

---

## 🐳 Deploy com Docker

### Build da Imagem

```bash
docker build -t feira-matematica:latest .
```

### Rodando Localmente

```bash
docker run -p 3000:3000 \
  -e DB_HOST=host.docker.internal \
  -e DB_USER=app \
  -e DB_PASSWORD=password \
  -e DB_NAME=feira \
  feira-matematica:latest
```

### Deploy no Render

1. Conecte seu repositório GitHub ao [Render](https://render.com)
2. Crie um novo **Web Service**
3. Configure as variáveis de ambiente:
   - `DB_HOST` - Host do MySQL
   - `DB_USER` - Usuário do banco
   - `DB_PASSWORD` - Senha do banco
   - `DB_NAME` - Nome do banco
   - `NODE_ENV=production`
4. Clique em **Deploy**

---

## 📡 API REST

### Endpoints de Sensores

#### Registrar Dados de Sensor

```bash
POST /api/sensors/record
Content-Type: application/json

{
  "accelerationX": 0.45,
  "accelerationY": -0.32,
  "accelerationZ": 9.8,
  "rotationX": 0.1,
  "rotationY": 0.2,
  "rotationZ": 0.3,
  "deviceId": "S20FE-001"
}
```

**Resposta (200):**
```json
{
  "success": true,
  "id": 123,
  "message": "Dados salvos com sucesso"
}
```

#### Obter Últimos Dados

```bash
GET /api/sensors/latest?deviceId=S20FE-*
```

**Resposta (200):**
```json
{
  "id": 123,
  "accelerationX": 0.45,
  "accelerationY": -0.32,
  "accelerationZ": 9.8,
  "rotationX": 0.1,
  "rotationY": 0.2,
  "rotationZ": 0.3,
  "deviceId": "S20FE-001",
  "createdAt": "2026-05-25T10:30:00Z"
}
```

---

## 🎮 Usando o Simulador de Sensores

### No Navegador

1. Acesse a aba **"Demonstração"**
2. Clique em **"Iniciar Simulação"** para animar automaticamente
3. Ou use os **controles deslizantes** para ajustar manualmente:
   - **Aceleração**: -50 a +50 m/s²
   - **Rotação**: -360 a +360 rad/s
4. Clique em **"Iniciar Gravação"** para enviar dados ao servidor
5. Veja os dados em tempo real na seção "Dados em Tempo Real"

### Com Aplicativo Android (S20FE)

1. Compile o app Android (veja seção abaixo)
2. Instale no Samsung S20FE via USB
3. Abra o app
4. Altere a URL do servidor para seu domínio
5. Clique em "Iniciar"
6. Os dados aparecem em tempo real no site

---

## 📱 Compilar Aplicativo Android

### Pré-requisitos

- Android Studio
- Java 11+
- Gradle

### Passos

```bash
# 1. Abra o projeto Android em Android Studio
# Arquivo → Open → pasta "android/"

# 2. Aguarde o Gradle sincronizar

# 3. Altere a URL do servidor em build.gradle.kts
# Procure por: BuildConfig.SERVER_URL

# 4. Compile
./gradlew assembleDebug

# 5. Instale no dispositivo
adb install app/build/outputs/apk/debug/app-debug.apk
```

---

## 🛠️ Stack Tecnológico

### Frontend
- **React 19** - UI library
- **TypeScript 5.6** - Type safety
- **Vite 7** - Build tool
- **Tailwind CSS 4** - Styling
- **Radix UI** - Component library
- **Framer Motion** - Animations
- **Recharts** - Data visualization

### Backend
- **Express.js 4.21** - Web framework
- **Node.js 18+** - Runtime
- **MySQL 8** - Database
- **Drizzle ORM** - Database ORM
- **Socket.io** - Real-time communication

### DevOps
- **Docker** - Containerization
- **Render** - Hosting
- **GitHub** - Version control

---

## 📊 Banco de Dados

### Tabela: `sensorData`

```sql
CREATE TABLE sensorData (
  id INT AUTO_INCREMENT PRIMARY KEY,
  accelerationX DECIMAL(10, 4),
  accelerationY DECIMAL(10, 4),
  accelerationZ DECIMAL(10, 4),
  rotationX DECIMAL(10, 4),
  rotationY DECIMAL(10, 4),
  rotationZ DECIMAL(10, 4),
  deviceId VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🎓 Conceitos Educativos

### O que é Realidade Aumentada?

Realidade Aumentada (AR) é a sobreposição de conteúdo digital no mundo real. Diferente da Realidade Virtual, que cria um mundo totalmente artificial, a AR mistura elementos digitais com o ambiente real.

### Como Funciona?

1. **Sensores** - Acelerômetro e Giroscópio capturam movimento
2. **Matemática** - Algoritmos calculam posição e orientação
3. **Processamento** - O dispositivo entende a geometria do espaço
4. **Renderização** - Objetos 3D são posicionados no espaço real
5. **Câmera** - Imagem é exibida na tela do dispositivo

### Fórmulas Matemáticas

#### Aceleração
```
a = Δv / Δt
```

#### Rotação (Matriz 3D)
```
R = [cos(θ)  -sin(θ)  0]
    [sin(θ)   cos(θ)  0]
    [0        0       1]
```

#### Coordenadas Espaciais
```
P' = R × P + T
```

---

## 🤝 Contribuir

Contribuições são bem-vindas! Siga os passos abaixo:

1. **Fork** o repositório
2. **Crie uma branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. **Abra um Pull Request**

### Diretrizes

- Mantenha o código limpo e bem documentado
- Use TypeScript para type safety
- Siga o padrão de código do projeto
- Escreva testes para novas funcionalidades
- Atualize a documentação conforme necessário

---

## 📝 Licença

Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 👥 Autores

Desenvolvido com ❤️ pela equipe da Feira de Matemática 2026.

**Participantes:**
- [Seu Nome] - Desenvolvedor Full Stack
- [Nome 2] - Designer
- [Nome 3] - Pesquisador
- [Nome 4] - Coordenador
- [Nome 5] - Suporte

---

## 🌐 Como Acessar

### Online
- **URL Principal**: [https://feira-matematica.onrender.com](https://feira-matematica.onrender.com)
- **Aba de Demonstração**: [/demo](https://feira-matematica.onrender.com/demo)

### Localmente
```bash
pnpm dev
# Acesse: http://localhost:5173
```

---

## 📚 Documentação

- [Guia de Instalação](./docs/INSTALACAO.md)
- [API Reference](./docs/API.md)
- [Arquitetura do Projeto](./docs/ARQUITETURA.md)
- [Troubleshooting](./docs/TROUBLESHOOTING.md)

---

## 🐛 Reportar Bugs

Encontrou um bug? Abra uma [Issue](https://github.com/theeussx/feira-matematica/issues) com:

- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado vs. atual
- Screenshots (se aplicável)
- Ambiente (OS, navegador, versão)

---

## 💡 Sugestões de Melhorias

Tem uma ideia? Abra uma [Discussion](https://github.com/theeussx/feira-matematica/discussions) ou uma [Issue](https://github.com/theeussx/feira-matematica/issues) com a tag `enhancement`.

---

## 📞 Suporte

Para dúvidas ou suporte:

1. Verifique a [Documentação](./docs)
2. Procure por [Issues similares](https://github.com/theeussx/feira-matematica/issues)
3. Abra uma nova [Discussion](https://github.com/theeussx/feira-matematica/discussions)

---

## 🎉 Agradecimentos

- **React** - Framework UI
- **Tailwind CSS** - Styling
- **Radix UI** - Components
- **Express.js** - Backend
- **Render** - Hosting
- **GitHub** - Version control

---

<div align="center">

**Desenvolvido com 💙 para a Feira de Matemática 2026**

⭐ Se este projeto foi útil, considere dar uma estrela! ⭐

[⬆ Voltar ao Topo](#-feira-de-matemática-realidade-aumentada-e-sensores)

</div>
