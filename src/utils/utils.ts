export function formatTime(unixTime: number): string {
  const date = new Date(unixTime * 1000); // Преобразуем Unix time в миллисекунды
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const formattedDate = date.toLocaleString("ru-RU", options);
  return formattedDate.replace(",", " в");
}
