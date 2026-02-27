export const colors = {
  green: "var(--status-green)",
  yellow: "var(--status-yellow)",
  red: "var(--status-red)",
  black: "var(--status-black)",
};

export const bgGlows = {
  green: "var(--glow-green)",
  yellow: "var(--glow-yellow)",
  red: "var(--glow-red)",
  black: "var(--glow-black)",
};

export type StatusLevel = "Green" | "Yellow" | "Red" | "Black";

export const getStatusColor = (status: StatusLevel) => colors[status.toLowerCase() as keyof typeof colors];
export const getStatusGlow = (status: StatusLevel) => bgGlows[status.toLowerCase() as keyof typeof bgGlows];
