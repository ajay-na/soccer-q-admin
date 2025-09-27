export function formatDateToInput(date: Date) {
  const offset = date.getTimezoneOffset(); // in minutes
  const istOffset = -330; // IST = UTC+5:30 → -330 minutes
  const diff = istOffset - offset;

  const istDate = new Date(date.getTime() + diff * 60000);

  const year = istDate.getFullYear();
  const month = String(istDate.getMonth() + 1).padStart(2, "0");
  const day = String(istDate.getDate()).padStart(2, "0");
  const hours = String(istDate.getHours()).padStart(2, "0");
  const minutes = String(istDate.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export const formatDate = (date: Date): string => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
  const dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
};

export const isSameDay = (currentDate: string, matchDate: string): boolean => {
  if (currentDate === matchDate.split("T")[0]) {
    return true;
  }
  return false;
};

export const getDateInTextFormat = (matchDate: string): string => {
  const date = new Date(matchDate);
  const currentDate = new Date();
  if (date.getDate() === currentDate.getDate()) {
    return "TODAY";
  }
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
  return formattedDate;
};

export const getMatchStatus = (
  match_start_time: string | undefined,
  half_time: string | undefined,
  end_time: string | undefined,
  status: string
): "UPCOMING" | "LIVE" | "FT" | "HT" => {
  if (match_start_time === null) {
    return "UPCOMING";
  }
  if (end_time && status === "finished") {
    return "FT";
  }
  if (half_time && status === "ht") {
    return "HT";
  }
  if (
    (match_start_time && status === "live") ||
    (half_time && status === "live")
  ) {
    console.log("LIVE");
    return "LIVE";
  }
  return "FT";
};
