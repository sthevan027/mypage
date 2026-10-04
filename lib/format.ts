const TZ = "America/Sao_Paulo";

/** "03 out 2026" */
export function formatDate(value: string) {
  const date = new Date(value.length === 10 ? `${value}T12:00:00-03:00` : value);
  return date
    .toLocaleDateString("pt-BR", {day: "2-digit", month: "short", year: "numeric", timeZone: TZ})
    .replace(/\./g, "")
    .replace(/ de /g, " ");
}

/** "03 out" */
export function formatShortDate(value: string) {
  return formatDate(value).split(" ").slice(0, 2).join(" ");
}

/** "hoje", "há 3 d", "há 2 sem", "há 4 meses" */
export function timeAgo(value: string, now = new Date()) {
  const date = new Date(value.length === 10 ? `${value}T12:00:00-03:00` : value);
  const days = Math.floor((now.getTime() - date.getTime()) / 86_400_000);
  if (days <= 0)
    return "hoje";
  if (days === 1)
    return "ontem";
  if (days < 14)
    return `há ${days} d`;
  if (days < 60)
    return `há ${Math.floor(days / 7)} sem`;
  return `há ${Math.floor(days / 30)} meses`;
}
