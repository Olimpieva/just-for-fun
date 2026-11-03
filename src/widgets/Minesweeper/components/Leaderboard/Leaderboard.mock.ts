import type { IRecord } from "./Leaderboard";

// todo: remove this mock once the leaderboard api is ready
export const demoRecords: Omit<IRecord, "rank">[] = [
  { id: "demo-1", name: "Emmett_Brown", durationMs: 52000 },
  { id: "demo-2", name: "nagibator_2000", durationMs: 65000 },
  { id: "demo-3", name: "neo", durationMs: 68000 },
  { id: "demo-4", name: "gendalf_the_grey", durationMs: 75000 },
  { id: "demo-5", name: "Sauron_the_dark_lord", durationMs: 90000 },
  { id: "demo-6", name: "JamesBond007", durationMs: 82000 },
  { id: "demo-7", name: "Indiana_Jones", durationMs: 98000 },
  { id: "demo-8", name: "LukeSkywalker", durationMs: 112000 },
  { id: "demo-9", name: "Rocky", durationMs: 120000 },
];
