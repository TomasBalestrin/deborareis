# A Arte da Imagem — site reorganizado

Página estática, sem dependências de build. Os arquivos ficam na raiz do repositório,
então Vercel, Netlify e GitHub Pages publicam sem nenhuma configuração.

## Estrutura

```
index.html
assets/
├── css/style.css
├── js/main.js
├── fonts/   Runalto.ttf, Qubic-Grid-Variable.ttf   (fontes da própria marca)
└── img/     antes-1..5, depois-1..5, bastidores-1..6, debora-retrato, logo, icon
LEIA-ME.md
```

## O que precisa ser preenchido antes de publicar

Cada trecho pendente está marcado no HTML com `class="todo"` (sublinhado tracejado no site).
Depois de escrever o texto real, **apague só a tag `<span class="todo">…</span>`**, deixando o conteúdo.

| Onde | O que falta |
|---|---|
| Hero | Data da edição |
| Hero | Cidade / local |
| Seção "Quem conduz" | 3 a 4 linhas de biografia da Débora |
| "O que você leva do dia" (itens 05 e 06) | Confirmar se material de apoio e grupo pós-imersão entram |
| FAQ "Vou trabalhar em modelo?" | Como funciona a prática |
| FAQ "Onde e quando acontece?" | Data, endereço e horário |
| FAQ "Qual é o investimento?" | Valor e formas de pagamento |
| Rodapé | CNPJ / razão social |

Para achar todas de uma vez: `grep -n 'class="todo"' index.html`

## Ajustes rápidos

- **Vagas restantes:** `assets/js/main.js`, linha `var TOTAL = 12, DISPONIVEIS = 8;`
  Altere `DISPONIVEIS` e a legenda em `index.html` (`8 disponíveis` / `4 preenchidas`).
- **WhatsApp:** o número `5547991469483` aparece em 3 links (dois CTAs e o botão flutuante).
- **Legendas do antes/depois:** array `PARES` em `assets/js/main.js`.
- **Vídeo VTurb:** está no hero, dentro de `<div class="frame__inner">`. É o mesmo embed que você passou,
  com um `title` adicionado no iframe por acessibilidade.

## Decisões técnicas

- **Fonte `Fasthin` foi removida.** A licença dela é *personal use only* e o arquivo não tem numerais —
  ela renderiza um bloco com o aviso "PERSONAL USE ONLY" no lugar de qualquer número. Os títulos agora usam
  **Runalto**, que é a fonte do próprio logo, e os rótulos usam **Qubic Grid**. O corpo de texto usa
  **Jost** (Google Fonts, licença aberta).
- **Paleta** vinda das cores globais do site atual: creme `#EEE7D4`, nude `#BCA791`, marrom `#554739`,
  oliva `#787D52`. O oliva virou a cor de ação; nos fundos claros ele aparece em uma variação mais escura
  (`--olive-dk`) para passar no contraste AA.
- **Imagens** convertidas de HEIC, recortadas em 3:4, reamostradas para 900×1200 e salvas progressivas.
  A pasta inteira ficou em ~2,4 MB. Todas com `loading="lazy"`, exceto o que está acima da dobra.
- **Acessibilidade:** foco visível, `prefers-reduced-motion` respeitado, comparador antes/depois operável
  por teclado (é um `input[type=range]` invisível sobre a imagem), `<noscript>` com fallback estático.
- **SEO:** title, description, canonical, Open Graph e JSON-LD `EducationEvent`.
  Ajuste as URLs absolutas no `<head>` se o endereço final não for `deborareis.site/artedaimagem/`.

## Se for republicar dentro do WordPress/Elementor

O conteúdo e a ordem das seções deste `index.html` servem como roteiro. O caminho mais direto é
publicar este repositório como página estática e apontar o domínio ou a subpasta para ele. O Elementor
não reproduz o comparador antes/depois nem a tipografia sem plugin extra.
