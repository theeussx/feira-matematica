# 🔧 SOLUÇÃO: Erro de pnpm na Vercel

## ❌ Problema

Você está recebendo este erro ao fazer deploy na Vercel:

```
ERR_PNPM_META_FETCH_FAIL  GET https://registry.npmjs.org/@builder.io%2Fvite-plugin-jsx-loc: 
Value of "this" must be of type URLSearchParams
```

**Causa:** O pnpm está tendo problemas ao fazer download das dependências no npm registry.

---

## ✅ SOLUÇÃO (3 Passos)

### 1️⃣ Substitua o `package.json`

**Problema:** Seu `package.json` usa `pnpm` como package manager.

**Solução:** Use `npm` em vez de `pnpm` na Vercel.

**O que fazer:**
1. Abra seu `package.json`
2. **Remova estas linhas do final:**
   ```json
   "packageManager": "pnpm@10.4.1+sha512...",
   "pnpm": {
     "patchedDependencies": { ... },
     "overrides": { ... }
   }
   ```

3. **Atualize os scripts para usar npm:**
   ```json
   {
     "scripts": {
       "dev": "vite --host",
       "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
       "start": "NODE_ENV=production node dist/index.js",
       "preview": "vite preview --host",
       "check": "tsc --noEmit",
       "format": "prettier --write ."
     }
   }
   ```

4. **Remova dependências desnecessárias:**
   - `"add": "^2.0.6"` ❌ Remova
   - `"baseline-browser-mapping": "^2.10.31"` ❌ Remova
   - `"pnpm": "^10.15.1"` ❌ Remova
   - `"tw-animate-css": "^1.4.0"` ❌ Remova

### 2️⃣ Substitua o `vercel.json`

**Problema:** Seu `vercel.json` usa `pnpm install` e `pnpm build`.

**Solução:** Use `npm ci` e `npm run build`.

**Novo vercel.json:**
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "installCommand": "npm ci",
  "framework": "vite",
  "outputDirectory": "dist",
  "routes": [
    {
      "src": "/api/sensors/(.*)",
      "dest": "server/index.ts",
      "methods": ["GET", "POST", "PUT", "DELETE", "PATCH"]
    },
    {
      "src": "/assets/(.*)",
      "dest": "dist/public/assets/$1",
      "headers": {
        "cache-control": "public, max-age=31536000, immutable"
      }
    },
    {
      "src": "/(.*)",
      "dest": "dist/public/index.html",
      "status": 200
    }
  ]
}
```

### 3️⃣ Regenere o `package-lock.json`

**Localmente, execute:**

```bash
# 1. Remova pnpm-lock.yaml
rm pnpm-lock.yaml

# 2. Remova node_modules
rm -rf node_modules

# 3. Instale com npm
npm install

# 4. Commit
git add package.json package-lock.json
git commit -m "Switch from pnpm to npm for Vercel compatibility"
git push origin main
```

---

## 🚀 Trigger Deploy

1. Acesse [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecione seu projeto
3. Clique em **"Redeploy"**
4. Aguarde o build completar

---

## ✅ Verificar Se Funcionou

Quando o deploy terminar:
- ✅ Status deve estar **"Ready"** (verde)
- ✅ Não deve haver erros de `pnpm`
- ✅ Site deve estar acessível

---

## 📋 Checklist

- [ ] Remover `packageManager` e `pnpm` do `package.json`
- [ ] Remover dependências desnecessárias
- [ ] Atualizar `vercel.json` para usar `npm`
- [ ] Remover `pnpm-lock.yaml` localmente
- [ ] Executar `npm install`
- [ ] Fazer commit e push
- [ ] Trigger redeploy na Vercel
- [ ] Verificar se deploy foi bem-sucedido

---

## 💡 Alternativa: Usar Render em vez de Vercel

Se continuar tendo problemas, considere usar **Render** que suporta melhor Node.js com Express:

```bash
# Render suporta Docker nativamente
docker build -t seu-projeto .
```

---

## 🆘 Se Ainda Não Funcionar

1. **Limpe cache da Vercel:**
   - Dashboard → Settings → Git
   - Clique em "Disconnect Git"
   - Reconecte o repositório

2. **Verifique logs:**
   - Dashboard → Deployments → Clique no deploy
   - Veja os logs completos

3. **Teste localmente:**
   ```bash
   npm run build
   npm start
   ```

---

**Pronto! Seu projeto deve funcionar na Vercel agora! 🎉**
