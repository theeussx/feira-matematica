# 🚀 Guia Completo: Deploy na Vercel

Este guia mostra como fazer deploy do seu projeto **Feira de Matemática** na Vercel de forma simples e rápida.

---

## 📋 Pré-requisitos

- ✅ Conta no [Vercel](https://vercel.com) (grátis)
- ✅ Repositório no GitHub
- ✅ Projeto configurado localmente
- ✅ Banco de dados MySQL (Vercel ou externo)

---

## 🎯 Passo a Passo

### 1️⃣ Preparar o Repositório

Certifique-se de que estes arquivos estão na raiz do seu repositório:

```
seu-projeto/
├── vercel.json          ← NOVO (copie o arquivo)
├── .vercelignore        ← NOVO (copie o arquivo)
├── package.json         ✅ Já existe
├── vite.config.ts       ✅ Já existe
├── server/
│   └── index.ts         ✅ Já existe
└── client/
    └── src/             ✅ Já existe
```

### 2️⃣ Fazer Push para GitHub

```bash
# Adicione os arquivos novos
git add vercel.json .vercelignore

# Commit
git commit -m "Add Vercel configuration"

# Push
git push origin main
```

### 3️⃣ Conectar à Vercel

#### Opção A: Via Dashboard Vercel (Recomendado)

1. Acesse [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Clique em **"Add New..."** → **"Project"**
3. Selecione **"Import Git Repository"**
4. Procure por `theeussx/feira-matematica`
5. Clique em **"Import"**

#### Opção B: Via CLI

```bash
# Instale Vercel CLI
npm i -g vercel

# Faça login
vercel login

# Deploy
vercel
```

### 4️⃣ Configurar Variáveis de Ambiente

No Dashboard Vercel:

1. Vá para seu projeto
2. Clique em **Settings** → **Environment Variables**
3. Adicione as variáveis:

```
DB_HOST=seu-mysql-host.com
DB_PORT=3306
DB_USER=seu_usuario
DB_PASSWORD=sua_senha_secreta
DB_NAME=feira_matematica
NODE_ENV=production
```

**Importante:** Clique em "Save" após adicionar cada variável.

### 5️⃣ Trigger Deploy

1. Volte para **Deployments**
2. Clique em **"Redeploy"** ou faça um novo push para GitHub
3. Aguarde o build completar (5-10 minutos)

---

## ✅ Verificar Deploy

Quando o deploy terminar:

- ✅ Status deve estar **"Ready"** (verde)
- ✅ URL será algo como: `https://seu-projeto.vercel.app`
- ✅ Clique em **"Visit"** para abrir o site

---

## 🧪 Testar Funcionalidades

### 1. Testar Homepage
```
https://seu-projeto.vercel.app/
```

### 2. Testar Aba de Demonstração
```
https://seu-projeto.vercel.app/demo
```

### 3. Testar API de Sensores
```bash
curl -X POST https://seu-projeto.vercel.app/api/sensors/record \
  -H "Content-Type: application/json" \
  -d '{
    "accelerationX": 0.45,
    "accelerationY": -0.32,
    "accelerationZ": 9.8,
    "rotationX": 0.1,
    "rotationY": 0.2,
    "rotationZ": 0.3,
    "deviceId": "S20FE-TEST"
  }'
```

Deve retornar:
```json
{
  "success": true,
  "id": 123,
  "message": "Dados salvos com sucesso"
}
```

---

## 🗄️ Banco de Dados

### Opção 1: MySQL Externo (Recomendado)

Use qualquer provedor MySQL:
- **Render** - MySQL grátis
- **PlanetScale** - MySQL serverless
- **AWS RDS** - MySQL gerenciado
- **DigitalOcean** - MySQL droplet
- **Seu próprio servidor**

Configure a URL em Environment Variables.

### Opção 2: Termux + Ngrok (Seu Celular)

Se estiver usando Termux:

1. Inicie MySQL no Termux
2. Configure Ngrok para expor porta 3306
3. Use a URL do Ngrok em `DB_HOST`

**Exemplo:**
```
DB_HOST=X.tcp.ngrok.io
DB_PORT=XXXXX
```

---

## 🔧 Troubleshooting

### ❌ Build Failed

**Erro:** `esbuild failed`

**Solução:**
```bash
# Localmente
pnpm build

# Se funcionar localmente, o problema é na Vercel
# Verifique se todas as dependências estão em package.json
```

### ❌ Database Connection Error

**Erro:** `ECONNREFUSED 127.0.0.1:3306`

**Solução:**
1. Verifique se `DB_HOST` está correto
2. Teste a conexão localmente
3. Verifique firewall/whitelist do banco

### ❌ API Retorna 404

**Erro:** `Cannot POST /api/sensors/record`

**Solução:**
1. Verifique se `vercel.json` está correto
2. Redeploy o projeto
3. Limpe cache do navegador (Ctrl+Shift+Delete)

### ❌ Dados Não Aparecem em Tempo Real

**Erro:** Demo.tsx não mostra dados

**Solução:**
1. Abra DevTools (F12)
2. Verifique console para erros
3. Verifique se banco de dados tem dados
4. Teste API com cURL

---

## 📊 Monitorar Deploy

No Dashboard Vercel:

- **Deployments** - Histórico de deploys
- **Analytics** - Tráfego e performance
- **Logs** - Logs do servidor
- **Settings** - Configurações gerais

---

## 🔄 Atualizar Projeto

Sempre que fizer mudanças:

```bash
# 1. Commit localmente
git add .
git commit -m "Update features"

# 2. Push para GitHub
git push origin main

# 3. Vercel faz deploy automaticamente!
```

---

## 🎓 Dicas Importantes

### ✅ Boas Práticas

1. **Use Environment Variables** - Nunca commite senhas
2. **Teste Localmente** - Antes de fazer push
3. **Monitore Logs** - Verifique erros no dashboard
4. **Versione Banco** - Mantenha backup dos dados
5. **Use HTTPS** - Vercel fornece SSL grátis

### ⚠️ Limitações Vercel

- **Timeout de 60s** - Requisições longas podem falhar
- **Sem WebSocket** - Socket.io pode ter limitações
- **Sem Banco Integrado** - Use banco externo
- **Cold Starts** - Primeira requisição é mais lenta

---

## 🚀 Próximos Passos

1. ✅ Deploy na Vercel
2. ✅ Configurar banco de dados
3. ✅ Testar todas as funcionalidades
4. ✅ Compartilhar URL com a equipe
5. ✅ Compilar app Android com URL correta
6. ✅ Testar demonstração ao vivo

---

## 📞 Suporte

Se tiver problemas:

1. Verifique os [Logs do Vercel](https://vercel.com/docs/deployments/logs)
2. Consulte [Documentação Vercel](https://vercel.com/docs)
3. Abra uma [Issue no GitHub](https://github.com/theeussx/feira-matematica/issues)

---

## 📋 Checklist Final

- [ ] Arquivos `vercel.json` e `.vercelignore` adicionados
- [ ] Push para GitHub
- [ ] Projeto importado na Vercel
- [ ] Variáveis de ambiente configuradas
- [ ] Build completado com sucesso
- [ ] Site acessível em `https://seu-projeto.vercel.app`
- [ ] API de sensores testada com cURL
- [ ] Dados aparecem em tempo real
- [ ] App Android compilado com URL correta
- [ ] Demonstração ao vivo funcionando

---

**Parabéns! Seu projeto está rodando na Vercel! 🎉**

[⬆ Voltar ao Topo](#-guia-completo-deploy-na-vercel)
