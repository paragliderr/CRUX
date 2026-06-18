import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Token = { t: string; c?: string };
type Line = Token[];

const scenes: { file: string; lang: string; lines: Line[] }[] = [
  {
    file: "src/components/Hero.tsx",
    lang: "TypeScript React",
    lines: [
      [{ t: "import", c: "kw" }, { t: " React " }, { t: "from", c: "kw" }, { t: " " }, { t: "'react'", c: "str" }],
      [{ t: "import", c: "kw" }, { t: " { motion } " }, { t: "from", c: "kw" }, { t: " " }, { t: "'framer-motion'", c: "str" }],
      [],
      [{ t: "export", c: "kw" }, { t: " " }, { t: "function", c: "kw" }, { t: " " }, { t: "Hero", c: "fn" }, { t: "() {" }],
      [{ t: "  " }, { t: "const", c: "kw" }, { t: " ref = " }, { t: "useRef", c: "fn" }, { t: "<" }, { t: "HTMLDivElement", c: "type" }, { t: ">(" }, { t: "null", c: "num" }, { t: ")" }],
      [{ t: "  " }, { t: "useEffect", c: "fn" }, { t: "(() => {" }],
      [{ t: "    " }, { t: "const", c: "kw" }, { t: " node = " }, { t: "document", c: "var" }, { t: "." }, { t: "querySelector", c: "fn" }, { t: "(" }, { t: "'.cta'", c: "str" }, { t: ")" }],
      [{ t: "    node?." }, { t: "addEventListener", c: "fn" }, { t: "(" }, { t: "'click'", c: "str" }, { t: ", handler)" }],
      [{ t: "  }, [])" }],
      [{ t: "  " }, { t: "return", c: "kw" }, { t: " <" }, { t: "motion.section", c: "type" }, { t: " ref={ref} />" }],
      [{ t: "}" }],
    ],
  },
  {
    file: "server/api/auth.ts",
    lang: "Node · Prisma",
    lines: [
      [{ t: "import", c: "kw" }, { t: " { PrismaClient } " }, { t: "from", c: "kw" }, { t: " " }, { t: "'@prisma/client'", c: "str" }],
      [{ t: "import", c: "kw" }, { t: " bcrypt " }, { t: "from", c: "kw" }, { t: " " }, { t: "'bcrypt'", c: "str" }],
      [{ t: "import", c: "kw" }, { t: " jwt " }, { t: "from", c: "kw" }, { t: " " }, { t: "'jsonwebtoken'", c: "str" }],
      [],
      [{ t: "const", c: "kw" }, { t: " db = " }, { t: "new", c: "kw" }, { t: " " }, { t: "PrismaClient", c: "fn" }, { t: "()" }],
      [],
      [{ t: "export", c: "kw" }, { t: " " }, { t: "async", c: "kw" }, { t: " " }, { t: "function", c: "kw" }, { t: " " }, { t: "signIn", c: "fn" }, { t: "(email, password) {" }],
      [{ t: "  " }, { t: "const", c: "kw" }, { t: " user = " }, { t: "await", c: "kw" }, { t: " db.user." }, { t: "findUnique", c: "fn" }, { t: "({ where: { email } })" }],
      [{ t: "  " }, { t: "const", c: "kw" }, { t: " ok = " }, { t: "await", c: "kw" }, { t: " bcrypt." }, { t: "compare", c: "fn" }, { t: "(password, user.hash)" }],
      [{ t: "  " }, { t: "if", c: "kw" }, { t: " (!ok) " }, { t: "throw", c: "kw" }, { t: " " }, { t: "new", c: "kw" }, { t: " " }, { t: "Error", c: "type" }, { t: "(" }, { t: "'Invalid'", c: "str" }, { t: ")" }],
      [{ t: "  " }, { t: "return", c: "kw" }, { t: " jwt." }, { t: "sign", c: "fn" }, { t: "({ id: user.id }, " }, { t: "process", c: "var" }, { t: ".env.JWT)" }],
      [{ t: "}" }],
    ],
  },
  {
    file: "ml/train.py",
    lang: "Python · PyTorch",
    lines: [
      [{ t: "import", c: "kw" }, { t: " torch" }],
      [{ t: "import", c: "kw" }, { t: " torch.nn " }, { t: "as", c: "kw" }, { t: " nn" }],
      [{ t: "from", c: "kw" }, { t: " torch.utils.data " }, { t: "import", c: "kw" }, { t: " DataLoader" }],
      [],
      [{ t: "class", c: "kw" }, { t: " " }, { t: "Encoder", c: "type" }, { t: "(nn." }, { t: "Module", c: "type" }, { t: "):" }],
      [{ t: "    " }, { t: "def", c: "kw" }, { t: " " }, { t: "__init__", c: "fn" }, { t: "(self, dim=" }, { t: "768", c: "num" }, { t: "):" }],
      [{ t: "        " }, { t: "super", c: "fn" }, { t: "().__init__()" }],
      [{ t: "        self.proj = nn." }, { t: "Linear", c: "fn" }, { t: "(dim, " }, { t: "512", c: "num" }, { t: ")" }],
      [],
      [{ t: "model = " }, { t: "Encoder", c: "fn" }, { t: "()." }, { t: "cuda", c: "fn" }, { t: "()" }],
      [{ t: "opt = torch.optim." }, { t: "AdamW", c: "fn" }, { t: "(model." }, { t: "parameters", c: "fn" }, { t: "(), lr=" }, { t: "3e-4", c: "num" }, { t: ")" }],
      [{ t: "# train loop", c: "cm" }],
      [{ t: "for", c: "kw" }, { t: " epoch " }, { t: "in", c: "kw" }, { t: " " }, { t: "range", c: "fn" }, { t: "(" }, { t: "10", c: "num" }, { t: "): loss." }, { t: "backward", c: "fn" }, { t: "()" }],
    ],
  },
];

const colorMap: Record<string, string> = {
  kw: "#c586c0",
  str: "#ce9178",
  fn: "#dcdcaa",
  type: "#4ec9b0",
  num: "#b5cea8",
  var: "#9cdcfe",
  cm: "#6a9955",
};

function tokenLength(line: Line) {
  return line.reduce((n, t) => n + t.t.length, 0);
}

function sliceLine(line: Line, chars: number): Line {
  const out: Line = [];
  let remaining = chars;
  for (const tok of line) {
    if (remaining <= 0) break;
    if (tok.t.length <= remaining) {
      out.push(tok);
      remaining -= tok.t.length;
    } else {
      out.push({ ...tok, t: tok.t.slice(0, remaining) });
      remaining = 0;
    }
  }
  return out;
}

export function PreviewIDE() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [typed, setTyped] = useState(0);

  const scene = scenes[sceneIdx];
  const totalChars = scene.lines.reduce((n, l) => n + tokenLength(l) + 1, 0);

  useEffect(() => {
    setTyped(0);
    const id = window.setInterval(() => {
      setTyped((t) => {
        if (t >= totalChars) {
          window.setTimeout(() => setSceneIdx((s) => (s + 1) % scenes.length), 1400);
          return t;
        }
        return t + 2;
      });
    }, 22);
    return () => window.clearInterval(id);
  }, [sceneIdx, totalChars]);

  let consumed = 0;
  const renderedLines = scene.lines.map((line) => {
    const len = tokenLength(line) + 1;
    const visible = Math.max(0, Math.min(len, typed - consumed));
    consumed += len;
    return sliceLine(line, visible);
  });

  const lastLineIdx = (() => {
    let acc = 0;
    for (let i = 0; i < scene.lines.length; i++) {
      acc += tokenLength(scene.lines[i]) + 1;
      if (typed <= acc) return i;
    }
    return scene.lines.length - 1;
  })();

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/5 bg-[#1e1e1e] shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
      {/* title bar */}
      <div className="flex items-center justify-between border-b border-black/40 bg-[#252526] px-3 py-1.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="font-mono text-[9px] text-[#858585]">{scene.lang}</span>
      </div>
      {/* tab */}
      <div className="flex border-b border-black/40 bg-[#2d2d2d]">
        <AnimatePresence mode="wait">
          <motion.div
            key={scene.file}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-center gap-2 border-r border-black/40 border-t-2 border-t-[#0098ff] bg-[#1e1e1e] px-3 py-1.5 font-mono text-[10px] text-[#cccccc]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#0098ff]" />
            {scene.file}
          </motion.div>
        </AnimatePresence>
      </div>
      {/* editor */}
      <div className="flex h-full overflow-hidden font-mono text-[10px] leading-[1.55]">
        <div className="select-none border-r border-black/30 bg-[#1e1e1e] px-2 py-2 text-right text-[#5a5a5a]">
          {scene.lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <div className="relative flex-1 py-2 pl-2 pr-2">
          {renderedLines.map((line, i) => (
            <div key={i} className="flex min-h-[1.55em] whitespace-pre">
              {line.map((tok, j) => (
                <span key={j} style={{ color: tok.c ? colorMap[tok.c] : "#d4d4d4" }}>
                  {tok.t}
                </span>
              ))}
              {i === lastLineIdx && typed < totalChars && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.9, repeat: Infinity }}
                  className="ml-[1px] inline-block h-[1.1em] w-[5px] bg-[#aeafad]"
                />
              )}
            </div>
          ))}
        </div>
      </div>
      {/* status bar */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-[#0098ff] px-2 py-0.5 font-mono text-[8px] text-white">
        <span>● main</span>
        <span>Ln {lastLineIdx + 1} · UTF-8 · CRUX</span>
      </div>
    </div>
  );
}
