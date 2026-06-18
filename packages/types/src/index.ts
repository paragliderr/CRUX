export type RuntimeLanguage = "node" | "python" | "go";

export interface CruxWorkspace {
  id: string;
  repo: string;
  branch: string;
  collaborators: string[];
  sandbox: {
    language: RuntimeLanguage;
    image: string;
    status: "booting" | "running" | "stopped";
  };
}

export interface RagContextChunk {
  filePath: string;
  score: number;
  content: string;
}
