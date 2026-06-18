import { useEffect, useMemo } from "react";
import Lenis from "@studio-freight/lenis";
import { motion, type Variants } from "framer-motion";
import { Blocks, BrainCircuit, CheckCircle2, Code2, Container, Database, ExternalLink, FileCode2, GitBranch, Globe2, LockKeyhole, Network, Play, ServerCog, Sparkles, Terminal, Users2, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CruxNavbar } from "@/components/crux/CruxNavbar";
import { MagneticButton } from "@/components/crux/MagneticButton";
import { PreviewIDE } from "@/components/crux/PreviewIDE";
import { cn } from "@/lib/utils";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const features = [
  { icon: Zap, title: "Instant Environments", copy: "Node.js, Python, Go, databases, previews, and tasks boot as project-native workspaces." },
  { icon: Users2, title: "Real-Time Collaboration", copy: "Shared file system state, presence, cursors, terminals, and review context without noisy overlays." },
  { icon: BrainCircuit, title: "Context-Aware AI", copy: "RAG retrieval and MCP orchestration keep suggestions grounded in repo history and system state." },
  { icon: Container, title: "Secure Sandboxes", copy: "Docker-isolated execution profiles for multi-language builds, tests, and ephemeral previews." },
  { icon: GitBranch, title: "GitHub Sync", copy: "Branches, PRs, commits, environments, and deploy previews stay connected to your workflow." },
  { icon: Globe2, title: "Live Project Showcase", copy: "Share running previews with collaborators, stakeholders, and reviewers in seconds." },
];

const files = ["crux.config.ts", "apps/web/Editor.tsx", "services/rag/index.ts", "packages/db/schema.prisma", "docker/node/Dockerfile"];
const codeLines = [
  "import { createWorkspace } from '@crux/runtime'",
  "import { retrieveContext } from '@crux/rag'",
  "",
  "const workspace = await createWorkspace({",
  "  repo: 'github.com/acme/platform',",
  "  sandbox: { image: 'node-20', gpu: false },",
  "  intelligence: retrieveContext({ mcp: true }),",
  "  collaborators: ['maya', 'noah'],",
  "})",
  "",
  "workspace.patch.inline('server.ts', ai.diff)",
  "workspace.preview.publish()",
];
const terminalLines = ["$ pnpm dev --filter @crux/web", "✓ postgres connected", "✓ sandbox node-20 mounted in 412ms", "✓ embeddings indexed 1,284 files", "✓ preview available at crux.run/acme"];

function ParticleField() {
  const particles = useMemo(() => Array.from({ length: 44 }, (_, index) => ({
    id: index,
    left: `${(index * 31) % 100}%`,
    top: `${(index * 43) % 100}%`,
    delay: `${(index % 8) * 0.28}s`,
    duration: `${7 + (index % 5)}s`,
  })), []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-60 mask-fade" aria-hidden="true">
      {particles.map((particle) => <span key={particle.id} className="absolute h-1 w-1 rounded-full bg-primary shadow-neon" style={{ left: particle.left, top: particle.top, animation: `float ${particle.duration} ease-in-out ${particle.delay} infinite` }} />)}
    </div>
  );
}

function WorkspacePreview() {
  return (
    <motion.div id="workspace" initial={{ opacity: 0, y: 36, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto max-w-6xl perspective-1000">
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="glass-panel relative overflow-hidden rounded-2xl">
        <div className="flex items-center justify-between border-b border-crux-line/10 px-4 py-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground"><span className="h-3 w-3 rounded-full bg-destructive" /><span className="h-3 w-3 rounded-full bg-crux-warning" /><span className="h-3 w-3 rounded-full bg-crux-success" /><span className="ml-3 hidden md:inline">acme-platform · main</span></div>
          <div className="flex items-center gap-2 rounded-full border border-crux-line/10 bg-surface-glass/5 px-3 py-1 text-xs text-muted-foreground"><Sparkles className="h-3.5 w-3.5 text-primary" />RAG index fresh · MCP synced</div>
        </div>
        <div className="grid min-h-[560px] grid-cols-1 lg:grid-cols-[230px_1fr_310px]">
          <aside className="hidden border-r border-crux-line/10 bg-background/22 p-4 lg:block">
            <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-muted-foreground"><FileCode2 className="h-4 w-4 text-primary" />Files</div>
            {files.map((file, index) => <div key={file} className={cn("mb-2 rounded-lg px-3 py-2 font-mono text-xs text-muted-foreground transition", index === 2 && "bg-primary/10 text-foreground")}>{file}</div>)}
            <div className="mt-8 rounded-xl border border-crux-line/10 bg-surface-glass/5 p-3">
              <div className="mb-3 text-xs text-muted-foreground">Collaborators</div>
              {["Maya", "Noah", "Lin"].map((name, index) => <div key={name} className="mb-2 flex items-center gap-2 text-sm"><span className="grid h-6 w-6 place-items-center rounded-full bg-primary/15 text-xs text-primary">{name[0]}</span>{name}<span className="ml-auto h-1.5 w-1.5 rounded-full bg-crux-success" style={{ opacity: 1 - index * 0.18 }} /></div>)}
            </div>
          </aside>
          <section className="relative overflow-hidden p-5 font-mono text-[13px] leading-7 md:p-6">
            <div className="mb-4 flex items-center justify-between rounded-xl border border-crux-line/10 bg-surface-glass/5 px-4 py-2 text-xs text-muted-foreground"><span>services/rag/index.ts</span><span>TypeScript · indexed</span></div>
            {codeLines.map((line, index) => (
              <motion.div key={`${line}-${index}`} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 + index * 0.08 }} className="grid grid-cols-[34px_1fr] gap-3">
                <span className="select-none text-muted-foreground/45">{index + 1}</span>
                <span className={cn("text-muted-foreground", line.includes("createWorkspace") && "text-primary", line.includes("retrieveContext") && "text-crux-fuchsia", line.includes("patch") && "text-crux-success")}>{line || "\u00A0"}</span>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6 }} className="mt-5 rounded-xl border border-primary/20 bg-primary/10 p-4">
              <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-primary"><BrainCircuit className="h-4 w-4" />Inline patch</div>
              <p className="text-sm text-foreground">Replace stale env access with typed workspace binding.</p>
              <p className="mt-2 font-mono text-xs text-muted-foreground">+ const token = workspace.env.require('CRUX_API_TOKEN')</p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0.35, 1, 0.35] }} transition={{ duration: 1.6, repeat: Infinity }} className="absolute left-[49%] top-[238px] h-6 w-px bg-primary" />
          </section>
          <aside className="grid gap-4 border-t border-crux-line/10 p-4 lg:border-l lg:border-t-0">
            <div className="rounded-xl border border-crux-line/10 bg-background/48 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground"><Terminal className="h-4 w-4 text-primary" />Terminal</div>
              <div className="font-mono text-xs leading-6 text-muted-foreground">{terminalLines.map((line, index) => <motion.p key={line} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 + index * 0.12 }}>{line}</motion.p>)}</div>
            </div>
            <div className="rounded-xl border border-crux-line/10 bg-surface-glass/5 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground"><ExternalLink className="h-4 w-4 text-primary" />Preview</div>
              <PreviewIDE />
            </div>
          </aside>
        </div>
      </motion.div>
      <motion.div className="glass-panel absolute -left-5 top-32 hidden rounded-xl px-4 py-3 font-mono text-xs text-primary lg:block" animate={{ y: [0, -16, 0] }} transition={{ duration: 6, repeat: Infinity }}>noah · reviewing diff</motion.div>
      <motion.div className="glass-panel absolute -right-8 bottom-24 hidden rounded-xl p-4 text-sm lg:block" animate={{ y: [0, 14, 0] }} transition={{ duration: 6.5, repeat: Infinity }}><CheckCircle2 className="mb-2 h-5 w-5 text-crux-success" />Sandbox healthy</motion.div>
    </motion.div>
  );
}

function FeaturesSection() {
  return <section id="features" className="relative z-10 mx-auto max-w-7xl px-6 py-24">
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-12 max-w-3xl">
      <p className="mb-4 text-sm uppercase tracking-[0.32em] text-primary">Product system</p>
      <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">A cloud IDE stack that feels calm, fast, and deeply technical.</h2>
    </motion.div>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, index) => <motion.article key={feature.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: index * 0.05 }} whileHover={{ y: -8, scale: 1.012 }} className="glass-panel group relative min-h-[245px] overflow-hidden rounded-2xl p-7">
        <div className="absolute inset-x-0 top-0 h-px bg-crux-button opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <feature.icon className="mb-8 h-7 w-7 text-primary transition-transform duration-500 group-hover:scale-110" />
        <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
        <p className="leading-7 text-muted-foreground">{feature.copy}</p>
      </motion.article>)}
    </div>
  </section>;
}

function ArchitectureSection() {
  const layers = [
    { icon: Code2, title: "React + Vite Web", copy: "Workspace shell, editor surfaces, auth, previews, command menus, and collaborative presence." },
    { icon: ServerCog, title: "Express API", copy: "Sessions, GitHub sync, workspace orchestration, auth boundaries, and platform APIs." },
    { icon: Database, title: "PostgreSQL + Prisma", copy: "Projects, embeddings metadata, collaborators, repositories, runs, and audit trails." },
    { icon: Network, title: "RAG + MCP Services", copy: "Retrieval, embeddings, model routing, tool context, and repo-aware code intelligence." },
  ];
  return <section id="architecture" className="relative z-10 mx-auto max-w-7xl px-6 py-24">
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass-panel overflow-hidden rounded-3xl">
      <div className="grid gap-0 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="border-b border-crux-line/10 p-8 md:p-12 lg:border-b-0 lg:border-r">
          <p className="mb-4 text-sm uppercase tracking-[0.32em] text-primary">Architecture</p>
          <h2 className="text-4xl font-semibold md:text-5xl">Designed as an ecosystem, not a single-page concept.</h2>
          <p className="mt-5 leading-7 text-muted-foreground">The generated repository scaffold mirrors a production cloud IDE platform with isolated apps, shared packages, AI services, and Docker runtimes.</p>
        </div>
        <div className="grid gap-3 p-4 md:grid-cols-2">
          {layers.map((layer) => <div key={layer.title} className="rounded-2xl border border-crux-line/10 bg-surface-glass/5 p-6"><layer.icon className="mb-5 h-6 w-6 text-primary" /><h3 className="mb-2 font-semibold">{layer.title}</h3><p className="text-sm leading-6 text-muted-foreground">{layer.copy}</p></div>)}
        </div>
      </div>
    </motion.div>
  </section>;
}

function DeveloperFlow() {
  return <section className="relative z-10 mx-auto max-w-7xl px-6 py-24">
    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <p className="mb-4 text-sm uppercase tracking-[0.32em] text-primary">Workflow</p>
        <h2 className="text-4xl font-semibold md:text-6xl">Open repo. Ask context. Patch code. Ship preview.</h2>
        <p className="mt-6 max-w-xl leading-8 text-muted-foreground">CRUX keeps the developer in an IDE mindset: files, terminals, diffs, collaborators, sandboxes, and deployable previews stay visible without becoming an AI chat product.</p>
      </motion.div>
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass-panel rounded-3xl p-4">
        <div className="grid gap-3 md:grid-cols-2">
          {["Repo indexed", "Sandbox running", "Patch reviewed", "Preview shared"].map((item, index) => <div key={item} className="rounded-2xl border border-crux-line/10 bg-background/42 p-5"><div className="mb-8 text-4xl font-semibold text-primary/35">0{index + 1}</div><p className="font-medium">{item}</p></div>)}
        </div>
      </motion.div>
    </div>
  </section>;
}

const Index = () => {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    let frame = 0;
    const raf = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(raf); };
    frame = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(frame); lenis.destroy(); };
  }, []);

  return <main className="relative min-h-screen overflow-hidden bg-crux-canvas text-foreground transition-colors duration-500">
    <ParticleField />
    <div className="pointer-events-none fixed inset-0 crux-grid opacity-50" aria-hidden="true" />
    <CruxNavbar />

    <section className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-36 md:pt-44">
      <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mx-auto mb-12 max-w-5xl text-center">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary"><Blocks className="h-4 w-4" />Cloud IDE infrastructure for serious teams</div>
        <h1 className="text-5xl font-semibold tracking-tight md:text-7xl lg:text-8xl">The workspace where code, context, and compute converge.</h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl">CRUX is a cloud IDE ecosystem with repo-aware intelligence, MCP orchestration, Docker sandboxes, real-time collaboration, and GitHub-native workflows.</p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"><MagneticButton>Start Coding Now</MagneticButton><MagneticButton variant="glass" to="#workspace">Explore Workspace</MagneticButton></div>
      </motion.div>
      <WorkspacePreview />
    </section>

    <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-3 md:grid-cols-5">{["Cursor-grade flow", "Vercel speed", "Linear calm", "Raycast polish", "Docker runtime"].map((item) => <div key={item} className="glass-panel rounded-xl px-5 py-4 text-center text-sm font-medium text-muted-foreground transition duration-300 hover:border-primary/30 hover:text-foreground">{item}</div>)}</div>
    </section>

    <FeaturesSection />
    <ArchitectureSection />
    <DeveloperFlow />

    <section className="relative z-10 mx-auto max-w-5xl px-6 py-28 text-center">
      <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="glass-panel rounded-3xl p-10 md:p-16">
        <LockKeyhole className="mx-auto mb-6 h-10 w-10 text-primary" />
        <h2 className="text-4xl font-semibold md:text-6xl">Build from a workspace developers trust instantly.</h2>
        <div className="mt-8 flex justify-center"><MagneticButton>Launch CRUX</MagneticButton></div>
      </motion.div>
    </section>

    <footer className="relative z-10 mx-auto flex max-w-7xl flex-col gap-6 border-t border-crux-line/10 px-6 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between"><Link to="/" className="font-semibold tracking-[0.24em] text-foreground">CRUX</Link><div className="flex flex-wrap gap-6"><a className="hover:text-primary" href="#architecture">Architecture</a><a className="hover:text-primary" href="https://github.com" target="_blank" rel="noreferrer">GitHub</a><Link className="hover:text-primary" to="/signin">Sign in</Link><a className="hover:text-primary" href="mailto:hello@crux.dev">Contact</a></div></footer>
  </main>;
};

export default Index;
