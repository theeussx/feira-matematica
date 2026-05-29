# 🔧 SOLUÇÃO: Gerar package-lock.json para Vercel

## ❌ Problema

```
npm error The `npm ci` command can only install with an existing package-lock.json or
npm error npm-shrinkwrap.json with lockfileVersion >= 1
```

**Causa:** Você ainda tem `pnpm-lock.yaml` no repositório, mas a Vercel espera `package-lock.json`.

---

## ✅ SOLUÇÃO RÁPIDA (No Seu Codespace)

### 1️⃣ Remova arquivos antigos do pnpm

```bash
cd seu-projeto

# Remova pnpm-lock.yaml
rm pnpm-lock.yaml

# Remova node_modules
rm -rf node_modules

# Verifique se foram removidos
ls -la | grep -E "pnpm-lock|node_modules"
```

### 2️⃣ Instale com npm (gera package-lock.json)

```bash
# Instale com npm
npm install

# Aguarde completar (pode levar 3-5 minutos)
```

### 3️⃣ Verifique se foi criado

```bash
# Deve existir package-lock.json agora
ls -la package-lock.json

# Não deve existir pnpm-lock.yaml
ls -la pnpm-lock.yaml  # Deve dar erro "No such file"
```

### 4️⃣ Faça commit e push

```bash
# Adicione os arquivos
git add package.json package-lock.json

# Remova o pnpm-lock.yaml do git
git rm --cached pnpm-lock.yaml
git add .gitignore

# Commit
git commit -m "Switch from pnpm to npm - generate package-lock.json"

# Push
git push origin main
```

### 5️⃣ Trigger redeploy na Vercel

1. Acesse [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecione seu projeto
3. Clique em **"Redeploy"**
4. Aguarde 5-10 minutos

---

## 🎯 Checklist

- [ ] Remover `pnpm-lock.yaml`
- [ ] Remover `node_modules`
- [ ] Executar `npm install`
- [ ] Verificar se `package-lock.json` foi criado
- [ ] Fazer commit e push
- [ ] Trigger redeploy

---

## 🆘 Se Ainda Não Funcionar

### Opção 1: Limpar cache da Vercel

1. Acesse [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecione seu projeto
3. Vá em **Settings** → **Git**
4. Clique em **"Disconnect Git"**
5. Reconecte o repositório
6. Clique em **"Redeploy"**

### Opção 2: Forçar rebuild

```bash
# Localmente
git commit --allow-empty -m "Trigger rebuild"
git push origin main
```

### Opção 3: Usar npm install em vez de npm ci

Se o `package-lock.json` ainda não funcionar, atualize `vercel.json`:

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "framework": "vite",
  "outputDirectory": "dist"
}
```

---

## ✅ Resultado Esperado

Quando o deploy funcionar:
- ✅ Status: **"Ready"** (verde)
- ✅ Sem erros de `npm ci`
- ✅ Build completa com sucesso
- ✅ Site acessível em `https://seu-projeto.vercel.app`

---

**Pronto! Seu projeto deve funcionar agora! 🎉**
