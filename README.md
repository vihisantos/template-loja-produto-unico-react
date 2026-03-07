# Template Loja de Produto Único — React + Vite

Landing page de alta conversão para venda de produto digital ou físico único.

## 🚀 Como rodar localmente

```bash
npm install
npm run dev
```

## 🏗️ Build e Deploy

```bash
npm run build
# Deploy no Vercel: importe o repo GitHub no painel
```

## ✏️ Como personalizar

- **Link de checkout**: substitua `[LINK-DO-CHECKOUT]` na constante `CHECKOUT_LINK` pela URL real do Hotmart, Eduzz, Kiwify, etc.
- **Countdown**: o timer começa em 4h23m59s. Para mudar, edite o valor passado para `useCountdown()` em segundos
- **Benefícios**: edite o array `benefits`
- **Depoimentos**: edite o array `testimonials` — use nomes e fotos reais para aumentar a conversão
- **Preços**: edite na seção CTA Final

## 📁 Estrutura

```
src/
 ├── App.tsx   ← Conteúdo da landing page
 ├── index.css ← Estilos e variáveis de cor
 └── main.tsx
```

---
*Template desenvolvido pela [Capybara Holding](https://capybaraholding.com.br)*
