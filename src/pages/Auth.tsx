import { FormEvent, useMemo, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { CheckCircle2, Code2, Cpu, Github, GitBranch, Loader2, Mail, Server, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function FloatingField({ label, type = "text", error }: { label: string; type?: string; error?: string }) {
  return (
    <label className="group relative block">
      <input
        type={type}
        placeholder=" "
        className={cn(
          "peer h-[3.75rem] w-full rounded-2xl border border-crux-line/10 bg-surface-glass/[0.05] px-4 pt-5 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-transparent hover:border-primary/20 focus:border-primary/40 focus:bg-surface-glass/[0.085] focus:shadow-[0_0_0_4px_hsl(var(--primary)/0.08),0_18px_48px_hsl(var(--primary)/0.08)]",
          error && "border-[hsl(var(--error-soft)/0.45)] focus:border-[hsl(var(--error-soft)/0.62)]",
        )}
      />
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground transition-all duration-300 peer-focus:top-3 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-xs">
        {label}
      </span>
      {error && <span className="mt-2 block text-xs text-[hsl(var(--error-soft))]">{error}</span>}
    </label>
  );
}

function AuthButton({ children, icon: Icon }: { children: string; icon: typeof Github }) {
  return (
    <Button
      variant="glass"
      className="auth-shimmer group relative h-[3.25rem] overflow-hidden rounded-2xl border-crux-line/10 bg-surface-glass/[0.045] text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:bg-surface-glass/[0.075] hover:text-foreground active:translate-y-0"
    >
      <Icon className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />
      {children}
    </Button>
  );
}

const codeLines = ["const workspace = await crux.boot(repo);", "rag.index('/src', { live: true });", "collab.sync({ cursors, fs, presence });", "sandbox.run('pnpm test --watch');"];
const codeIcons = [Code2, GitBranch, Server, Cpu];

const Auth = () => {
  const mode = useLocation().pathname.includes("signup") ? "signup" : "signin";
  const isSignup = mode === "signup";
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const cursorX = useMotionValue(50);
  const cursorY = useMotionValue(34);
  const spotX = useSpring(cursorX, { stiffness: 70, damping: 24 });
  const spotY = useSpring(cursorY, { stiffness: 70, damping: 24 });

  const copy = useMemo(
    () => ({
      title: isSignup ? "Create your workspace" : "Welcome back",
      body: isSignup ? "Provision a repo-aware environment tuned for your stack." : "Enter the workspace where your context is already warm.",
      switchLead: isSignup ? "Already have an account?" : "New to CRUX?",
      switchAction: isSignup ? "Sign in" : "Create account",
    }),
    [isSignup],
  );

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      window.setTimeout(() => setSuccess(false), 1600);
    }, 950);
  };

  return (
    <main
      onMouseMove={(event) => {
        cursorX.set((event.clientX / window.innerWidth) * 100);
        cursorY.set((event.clientY / window.innerHeight) * 100);
      }}
      className="relative min-h-screen overflow-hidden bg-crux-canvas px-5 py-8 text-foreground transition-colors duration-500 lg:px-10"
    >
      <div className="auth-mesh pointer-events-none absolute -inset-16 opacity-90" />
      <div className="pointer-events-none absolute inset-0 crux-grid opacity-35" />
      <div className="auth-noise pointer-events-none absolute inset-0 opacity-[0.08]" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute h-[34rem] w-[34rem] rounded-full bg-primary/10 blur-3xl"
        style={{ left: spotX, top: spotY, translateX: "-50%", translateY: "-50%" }}
      />
      <div className="pointer-events-none absolute left-1/2 top-24 h-px w-[min(1080px,86vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-crux-line/24 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 26, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center gap-8 lg:grid-cols-[0.92fr_1.08fr]"
      >
        <section className="relative hidden h-full min-h-[42rem] overflow-hidden rounded-[2.25rem] p-10 lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-gradient-to-br from-surface-glass/[0.12] via-surface-glass/[0.035] to-transparent backdrop-blur-xl" />
          <div className="absolute inset-0 crux-grid mask-fade opacity-45" />
          <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-primary/16 blur-3xl" />
          <div className="absolute bottom-6 right-0 h-80 w-80 rounded-full bg-secondary/12 blur-3xl" />
          <div className="relative flex items-center gap-2 text-base font-semibold tracking-[0.32em]"><Cpu className="h-5 w-5 text-primary" />CRUX</div>
          <div className="relative max-w-xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-surface-glass/[0.06] px-3 py-1 text-xs text-primary"><Sparkles className="h-3.5 w-3.5 animate-soft-pulse" />Repo-aware cloud workspace</p>
            <h1 className="text-5xl font-semibold leading-[1.02] tracking-normal xl:text-6xl">Enter the environment where code is already in motion.</h1>
            <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">Secure sandboxes, shared file systems, live context, and orchestration tuned before your first keystroke.</p>
          </div>
          <div className="relative grid gap-3 text-xs text-muted-foreground">
            {codeLines.map((line, index) => (
              <motion.div key={line} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.28 + index * 0.08 }} className="flex items-center gap-3 rounded-2xl bg-background/24 px-4 py-3 backdrop-blur-md">
                {(() => { const Icon = codeIcons[index]; return <Icon className="h-4 w-4 text-primary" />; })()}
                <code>{line}</code>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="auth-glass-panel relative mx-auto w-full max-w-[41rem] rounded-[2.25rem] p-7 sm:p-10 lg:ml-auto">
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-crux-line/40 to-transparent" />
          <div className="pointer-events-none absolute -left-px top-12 h-28 w-px bg-gradient-to-b from-transparent via-primary/45 to-transparent" />
          <Link to="/" className="mx-auto mb-8 flex w-fit items-center gap-2 text-base font-semibold tracking-[0.3em] transition hover:text-primary">
            <Cpu className="h-5 w-5 text-primary" />CRUX
          </Link>

          <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, x: isSignup ? 26 : -26, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: isSignup ? -26 : 26, filter: "blur(8px)" }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-8 text-center">
              <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-primary/14 bg-primary/8 px-3 py-1 text-xs text-primary shadow-[inset_0_1px_0_hsl(var(--line)/0.14)]">
                <Sparkles className="h-3.5 w-3.5 animate-soft-pulse" />Secure cloud workspace
              </div>
              <h1 className="text-3xl font-semibold tracking-normal sm:text-4xl">{copy.title}</h1>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">{copy.body}</p>
              <p className="mt-2 text-xs text-muted-foreground/80">Instant setup. No installs. Start in seconds.</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <AuthButton icon={Github}>GitHub</AuthButton>
              <AuthButton icon={Mail}>Google</AuthButton>
            </div>
            <div className="my-7 flex items-center gap-3 text-xs text-muted-foreground/80"><span className="h-px flex-1 bg-crux-line/10" />or continue with email<span className="h-px flex-1 bg-crux-line/10" /></div>

            <form className="space-y-4" onSubmit={submit}>
              {isSignup && <FloatingField label="Name" />}
              <FloatingField label="Email" type="email" error={error} />
              <FloatingField label="Password" type="password" />
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.985, y: 1 }} transition={{ type: "spring", stiffness: 360, damping: 24 }}>
                <Button variant="crux" className="group relative mt-2 h-14 w-full overflow-hidden rounded-2xl bg-[length:180%_180%] text-sm font-semibold shadow-neon transition-all duration-500 hover:bg-right active:shadow-panel" disabled={loading || success}>
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-crux-line/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  {loading ? <Loader2 className="animate-spin" /> : success ? <CheckCircle2 /> : null}
                  {loading ? "Launching..." : success ? "Workspace ready" : "Launch Workspace"}
                </Button>
              </motion.div>
            </form>
          </motion.div>
          </AnimatePresence>

          <p className="mt-7 text-center text-sm text-muted-foreground">
            {copy.switchLead} <Link className="text-primary transition hover:text-foreground" to={isSignup ? "/signin" : "/signup"}>{copy.switchAction}</Link>
          </p>
        </section>
      </motion.div>
    </main>
  );
};

export default Auth;