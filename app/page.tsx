"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  IconArrowUpRight, IconBrandGithub, IconBrandReact,
  IconCheck, IconChevronDown, IconCode, IconCommand, IconExternalLink,
  IconFileCode, IconFolder, IconLayersSubtract, IconLink, IconMessage2,
  IconPlayerPlay, IconSparkles, IconTerminal2, IconWand, IconWorldCode,
} from "@tabler/icons-react";
import { appConfig } from "@/config/app.config";

type BuildMode = "prompt" | "remix";
const suggestions = ["Um dashboard de analytics para produto SaaS", "Landing page premium para uma marca de arquitetura", "Aplicativo de tarefas com kanban e calendário"];
const activity = [
  { icon: IconWorldCode, title: "Entender contexto", detail: "briefing + referência", state: "done" },
  { icon: IconLayersSubtract, title: "Compor interface", detail: "componentes React", state: "active" },
  { icon: IconCode, title: "Refinar no preview", detail: "chat + código editável", state: "pending" },
];
const capabilities: [string, string, string, typeof IconMessage2][] = [
  ["01", "Do texto à estrutura", "O briefing vira uma arquitetura de páginas, componentes e conteúdo com uma direção clara.", IconMessage2],
  ["02", "Do visual ao código", "Remixe uma referência sem perder o controle sobre o que foi entendido e gerado.", IconFileCode],
  ["03", "Do primeiro draft ao sim", "Veja a aplicação rodando, converse com o agente e refine até fazer sentido.", IconPlayerPlay],
];
const faqs = [
  ["Preciso saber programar para começar?", "Não. Você começa descrevendo o que quer em linguagem natural. A FORGE transforma a intenção em uma aplicação React editável e mostra cada etapa do processo."],
  ["Posso começar a partir de um site existente?", "Sim. Use o modo Remix de URL para analisar uma referência e indicar o que deve ser preservado, adaptado ou completamente repensado."],
  ["O código gerado fica preso na FORGE?", "Não. O resultado é um projeto React editável. A proposta do Studio é diminuir a distância entre um primeiro resultado e o código que você pode continuar mantendo."],
  ["Como o preview funciona?", "A FORGE aplica os arquivos em um sandbox isolado e atualiza o preview em tempo real, permitindo iterar sem sair do fluxo de conversa."],
];

function ForgeMark() { return <span className="forge-v2-mark" aria-hidden="true"><span>F</span></span>; }
function looksLikeUrl(value: string) { return /^(https?:\/\/)?([\w-]+\.)+[a-z]{2,}(?::\d+)?(?:[/?#][^\s]*)?$/i.test(value.trim()); }

export default function HomePage() {
  const router = useRouter();
  const [mode, setMode] = useState<BuildMode>("prompt");
  const [request, setRequest] = useState("");
  const [context, setContext] = useState("");
  const [model, setModel] = useState(appConfig.ai.defaultModel);
  const [isStarting, setIsStarting] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = request.trim();
    if (!value || isStarting) return;
    const remix = mode === "remix" || (mode === "prompt" && looksLikeUrl(value));
    if (mode === "remix" && !looksLikeUrl(value)) { toast.error("Cole uma URL válida, como exemplo.com"); return; }
    if (!remix && value.length < 8) { toast.error("Conte um pouco mais sobre o que você quer criar."); return; }
    setIsStarting(true);
    sessionStorage.removeItem("siteMarkdown"); sessionStorage.removeItem("brandExtensionMode");
    sessionStorage.setItem("targetUrl", value); sessionStorage.setItem("selectedModel", model);
    if (remix) sessionStorage.setItem("selectedStyle", "4"); else sessionStorage.removeItem("selectedStyle");
    sessionStorage.setItem("autoStart", "true"); sessionStorage.setItem("directPrompt", remix ? "false" : "true");
    if (context.trim()) sessionStorage.setItem("additionalInstructions", context.trim()); else sessionStorage.removeItem("additionalInstructions");
    router.push(`${process.env.NEXT_PUBLIC_STUDIO_URL || "http://localhost:3000"}/generation`);
  };

  return <main className="forge-v2 min-h-screen overflow-hidden">
    <div className="forge-v2-noise" aria-hidden="true" />
    <header className="forge-v2-nav">
      <Link href="/" className="forge-v2-brand" aria-label="FORGE Studio — início"><ForgeMark /><span>FORGE</span><em>STUDIO</em></Link>
      <nav className="forge-v2-navlinks" aria-label="Navegação principal"><a href="#produto">Produto</a><a href="#processo">Processo</a><a href="#capacidades">Capacidades</a><a href="#faq">FAQ</a><a href="https://github.com/kvantjs/forge-studio" target="_blank" rel="noreferrer"><IconBrandGithub size={16} /> GitHub <IconExternalLink size={12} /></a></nav>
      <a className="forge-v2-nav-cta" href="#composer">Começar <IconArrowUpRight size={15} /></a>
    </header>

    <section className="forge-v2-hero" aria-labelledby="hero-title">
      <div className="forge-v2-hero-copy">
        <motion.div className="forge-v2-kicker" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }}>
          <span className="forge-v2-pulse" /> DESIGN → CODE, SEM ATRITO
        </motion.div>
        <motion.h1 id="hero-title" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .05 }}>
          A interface começa<br /><span>com uma intenção.</span>
        </motion.h1>
        <motion.p className="forge-v2-lede" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .12 }}>
          Dê à FORGE um briefing ou uma referência. Ela transforma o ponto de partida em uma aplicação React que você pode abrir, conversar e editar.
        </motion.p>
        <div className="forge-v2-proof">
          <span><IconSparkles size={14} /> Contexto de verdade</span>
          <span><IconPlayerPlay size={14} /> Preview ao vivo</span>
          <span><IconBrandReact size={14} /> React editável</span>
        </div>
      </div>
      <motion.aside className="forge-v2-build-card" aria-label="Pipeline de criação" initial={{ opacity: 0, y: 18, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .7, delay: .16 }}>
        <div className="forge-v2-card-top"><span>PIPELINE DE CRIAÇÃO</span><span className="forge-v2-live"><i /> AO VIVO</span></div>
        <div className="forge-v2-activity">
          {activity.map(({ icon: Icon, title, detail, state }, index) => (
            <div className={`forge-v2-activity-row is-${state}`} key={title}>
              <span className="forge-v2-activity-icon"><Icon size={17} /></span>
              <div><strong>{title}</strong><small>{detail}</small></div>
              <span className="forge-v2-activity-index">0{index + 1}</span>
            </div>
          ))}
        </div>
        <div className="forge-v2-card-footer"><span><IconTerminal2 size={13} /> Sandbox isolado</span><span>●</span><span>Streaming</span><span>●</span><span>Open-source</span></div>
        <div className="forge-v2-blueprint-mark" aria-hidden="true">F</div>
      </motion.aside>
    </section>

    <section className="forge-v2-composer-section" id="composer" aria-labelledby="composer-title"><div className="forge-v2-section-meta"><span id="composer-title">COMECE POR AQUI</span><span>01 <b>/</b> 03</span></div><form className="forge-v2-composer" onSubmit={handleSubmit}><div className="forge-v2-composer-head"><div className="forge-v2-tabs" role="tablist" aria-label="Modo de criação"><button type="button" role="tab" aria-selected={mode === "prompt"} className={mode === "prompt" ? "is-selected" : ""} onClick={() => setMode("prompt")}><IconWand size={15} /> Criar do zero</button><button type="button" role="tab" aria-selected={mode === "remix"} className={mode === "remix" ? "is-selected" : ""} onClick={() => setMode("remix")}><IconLink size={15} /> Remix de URL</button></div><span className="forge-v2-shortcut"><kbd>⌘</kbd><kbd>↵</kbd></span></div><label className="sr-only" htmlFor="forge-request">{mode === "remix" ? "URL do site de referência" : "Descreva o produto que deseja criar"}</label><textarea id="forge-request" value={request} onChange={(event) => setRequest(event.target.value)} placeholder={mode === "remix" ? "Cole a URL do site que quer recriar…" : "Descreva seu produto, uma página ou um componente…"} rows={3} maxLength={4000} required onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }} />{mode === "remix" && <div className="forge-v2-context"><label htmlFor="forge-context">O que deseja mudar? <small>opcional</small></label><input id="forge-context" value={context} onChange={(event) => setContext(event.target.value)} placeholder="Ex.: adapte para um dashboard de finanças" /></div>}{mode === "prompt" && <div className="forge-v2-suggestions" aria-label="Sugestões de briefing">{suggestions.map((suggestion) => <button key={suggestion} type="button" onClick={() => setRequest(suggestion)}>{suggestion}</button>)}</div>}<div className="forge-v2-composer-foot"><div className="forge-v2-model"><IconCommand size={14} /><select aria-label="Modelo de IA" value={model} onChange={(event) => setModel(event.target.value)}>{appConfig.ai.availableModels.map((item) => <option key={item} value={item}>{appConfig.ai.modelDisplayNames[item] || item}</option>)}</select><IconChevronDown size={13} /></div><span className="forge-v2-hint">{mode === "remix" ? "A página será analisada antes de gerar" : "Enter para enviar · Shift + Enter para nova linha"}</span><button className="forge-v2-submit" type="submit" disabled={isStarting || !request.trim()}>{isStarting ? <span className="forge-v2-spinner" /> : <IconArrowUpRight size={17} />}<span>{isStarting ? "Abrindo studio" : "Criar app"}</span></button></div></form></section>

    <section className="forge-v2-trust"><span>UM FLUXO PARA CADA PONTO DE PARTIDA</span><div><b>Briefing</b><i>×</i><b>URL</b><i>×</i><b>Screenshot</b><i>×</i><b>Componentes</b><i>×</i><b>Preview</b><i>×</i><b>Código</b></div></section>

    <section className="forge-v2-showcase" id="produto" aria-labelledby="showcase-title"><div className="forge-v2-showcase-copy"><span className="forge-v2-label">O PRODUTO EM FLUXO</span><h2 id="showcase-title">Não é uma caixa preta.<br /><span>É um estúdio aberto.</span></h2><p>Você acompanha o que a FORGE está fazendo, confere o resultado e escolhe a próxima direção. A superfície é simples; o processo por trás é legível.</p><a className="forge-v2-text-link" href="#processo">Conheça o processo <IconArrowUpRight size={15} /></a></div><div className="forge-v2-window"><div className="forge-v2-window-bar"><span className="forge-v2-window-dots"><i /><i /><i /></span><span>forge / workspace / preview</span><span className="forge-v2-window-live"><i /> running</span></div><div className="forge-v2-window-body"><aside><div className="forge-v2-window-logo"><ForgeMark /><strong>FORGE</strong></div><small>WORKSPACE</small><span className="is-current"><IconPlayerPlay size={13} /> Preview</span><span><IconMessage2 size={13} /> Conversation</span><span><IconFolder size={13} /> Files</span><small>PROJECT</small><span><IconFileCode size={13} /> app/page.tsx</span><span><IconFileCode size={13} /> styles.css</span></aside><div className="forge-v2-preview"><div className="forge-v2-preview-header"><span>Live preview</span><span>localhost:5173</span></div><div className="forge-v2-preview-content"><div className="forge-v2-preview-kicker">NORTH / PRODUCT STUDIO</div><strong>Build a useful<br />first version.</strong><p>A considered interface for teams that want to move from idea to something testable.</p><div className="forge-v2-preview-actions"><span>Start a project <IconArrowUpRight size={13} /></span><span>View work</span></div><div className="forge-v2-preview-grid"><i /><i /><i /><i /></div></div></div></div></div></section>

    <section className="forge-v2-process" id="processo" aria-labelledby="process-title"><div className="forge-v2-process-intro"><span className="forge-v2-label">O MÉTODO</span><h2 id="process-title">Do primeiro pensamento<br /><span>ao produto que responde.</span></h2><p>A FORGE encurta a distância entre dizer o que você quer e ter algo real para testar. Cada etapa mantém você no controle.</p></div><div className="forge-v2-steps">{capabilities.map(([number, title, description, Icon]) => <div className="forge-v2-step" key={title}><span>{number}</span><Icon size={21} /><h3>{title}</h3><p>{description}</p></div>)}</div></section>

    <section className="forge-v2-capabilities" id="capacidades" aria-labelledby="cap-title"><div className="forge-v2-capabilities-head"><div><span className="forge-v2-label">FEITO PARA COMEÇAR BEM</span><h2 id="cap-title">Menos tela em branco.<br /><span>Mais decisões concretas.</span></h2></div><p>Uma fundação que entende design, código e contexto como partes da mesma conversa.</p></div><div className="forge-v2-bento"><article className="forge-v2-bento-card forge-v2-bento-card--large"><span className="forge-v2-card-number">A / CONTEXTO</span><IconSparkles size={22} /><h3>Referências que viram direção</h3><p>Briefing, URL, screenshot e instruções entram no mesmo fluxo — para a interface nascer com intenção, não como um template genérico.</p><div className="forge-v2-mini-line"><span /><span /><span /></div></article><article className="forge-v2-bento-card"><span className="forge-v2-card-number">B / AGENTE</span><IconTerminal2 size={22} /><h3>Trabalho visível</h3><p>Veja decisões, arquivos e aplicação acontecendo sem esperar pelo resultado final.</p><div className="forge-v2-code-lines"><i /><i /><i /><i /></div></article><article className="forge-v2-bento-card forge-v2-bento-card--accent"><span className="forge-v2-card-number">C / ITERAÇÃO</span><IconWand size={22} /><h3>Mudar faz parte</h3><p>Peça ajustes em linguagem natural e acompanhe cada mudança no preview.</p><a href="#composer">Abrir o composer <IconArrowUpRight size={14} /></a></article></div></section>

    <section className="forge-v2-usecases" aria-labelledby="usecases-title"><div className="forge-v2-usecases-head"><span className="forge-v2-label">UM PONTO DE PARTIDA PARA CADA IDEIA</span><h2 id="usecases-title">O que você quer colocar<br /><span>em movimento?</span></h2></div><div className="forge-v2-usecase-grid"><article><span>01</span><h3>Produto digital</h3><p>Estruture o primeiro fluxo de um SaaS, marketplace ou ferramenta interna antes de investir em meses de implementação.</p><a href="#composer">Começar com um briefing <IconArrowUpRight size={14} /></a></article><article><span>02</span><h3>Site de marca</h3><p>Transforme uma direção visual em uma página consistente, responsiva e pronta para receber conteúdo real.</p><a href="#composer">Remixar uma referência <IconArrowUpRight size={14} /></a></article><article><span>03</span><h3>Experimento</h3><p>Teste uma hipótese com uma interface concreta. O que antes era um documento agora pode ser clicado e discutido.</p><a href="#composer">Explorar uma ideia <IconArrowUpRight size={14} /></a></article></div></section>

    <section className="forge-v2-proof-section" aria-labelledby="proof-title"><div><span className="forge-v2-label">A IDEIA POR TRÁS DO STUDIO</span><h2 id="proof-title">Construir é uma conversa<br /><span>com alguma coisa real.</span></h2></div><blockquote>“A diferença não está em gerar mais uma tela. Está em criar um primeiro resultado que dá vontade de continuar.”<cite>— FORGE Studio, open-source by Firecrawl</cite></blockquote></section>

    <section className="forge-v2-pricing" aria-labelledby="pricing-title"><div className="forge-v2-pricing-copy"><span className="forge-v2-label">OPEN-SOURCE, SEM PORTA DE ENTRADA</span><h2 id="pricing-title">Comece onde<br /><span>a ideia está.</span></h2><p>A FORGE Studio existe para tornar o primeiro passo mais curto. Rode localmente, leia o código e adapte o fluxo ao seu trabalho.</p><a className="forge-v2-dark-button" href="https://github.com/kvantjs/forge-studio" target="_blank" rel="noreferrer"><IconBrandGithub size={16} /> Ver no GitHub <IconArrowUpRight size={15} /></a></div><div className="forge-v2-plan"><div className="forge-v2-plan-top"><span>FORGE STUDIO</span><span className="forge-v2-plan-badge">OPEN-SOURCE</span></div><strong>Seu próximo primeiro draft.</strong><p>Uma base para experimentar, prototipar e aprender fazendo.</p><ul><li><IconCheck size={15} /> Prompt-first e Remix de URL</li><li><IconCheck size={15} /> Preview isolado em tempo real</li><li><IconCheck size={15} /> Código React editável</li><li><IconCheck size={15} /> Chat iterativo com o agente</li></ul><a href="#composer">Começar agora <IconArrowUpRight size={15} /></a></div></section>

    <section className="forge-v2-faq" id="faq" aria-labelledby="faq-title"><div><span className="forge-v2-label">AINDA QUER SABER</span><h2 id="faq-title">Perguntas<br /><span>frequentes.</span></h2></div><div className="forge-v2-faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<IconChevronDown size={17} /></summary><p>{answer}</p></details>)}</div></section>

    <section className="forge-v2-final-cta"><span className="forge-v2-label">03 / 03</span><h2>Uma boa ideia merece<br /><span>um primeiro sim.</span></h2><p>Descreva o que você quer criar. O resto pode começar a tomar forma.</p><a className="forge-v2-light-button" href="#composer">Abrir a FORGE <IconArrowUpRight size={16} /></a></section>

    <footer className="forge-v2-footer"><Link href="/" className="forge-v2-brand"><ForgeMark /><span>FORGE</span><em>STUDIO</em></Link><div><span>OPEN-SOURCE BUILDER</span><a href="https://github.com/kvantjs/forge-studio" target="_blank" rel="noreferrer">Ver no GitHub <IconArrowUpRight size={14} /></a></div></footer>
  </main>;
}
