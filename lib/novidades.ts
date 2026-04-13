import fs from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "content/novidades.json");

export type NovidadeItem = {
  id: string;
  date: string;
  title: string;
  body: string;
};

type FileShape = {
  items: NovidadeItem[];
};

export function getNovidades(): NovidadeItem[] {
  if (!fs.existsSync(FILE)) {
    return [];
  }
  const raw = fs.readFileSync(FILE, "utf8");
  const data = JSON.parse(raw) as FileShape;
  return [...(data.items ?? [])].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
