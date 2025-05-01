import { format, isToday, isTomorrow, differenceInDays, parseISO } from "date-fns";

export function formatDeadline(isoDate: string): string {
  const deadline = parseISO(isoDate);
  const now = new Date();
  const diffDays = differenceInDays(deadline, now);

  if (isToday(deadline)) {
    return `Today, ${format(deadline, "HH:mm")}`;
  } else if (isTomorrow(deadline)) {
    return `Tomorrow, ${format(deadline, "HH:mm")}`;
  } else if (diffDays <= 7 && diffDays > 1) {
    return `In ${diffDays} days`;
  } else if (diffDays === 7) {
    return `In a week`;
  } else {
    return format(deadline, "do MMMM");
  }
}
