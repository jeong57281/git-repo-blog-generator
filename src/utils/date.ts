export const getRelativeDate = (
  date: number,
  from: Date = new Date()
): Date => {
  const tmp = new Date(from);

  return new Date(tmp.setDate(tmp.getDate() + date));
};

export const getRelativeMonth = (
  month: number,
  from: Date = new Date()
): Date => {
  const tmp = new Date(from);

  return new Date(tmp.setMonth(tmp.getMonth() + month));
};

export const getRelativeYear = (
  year: number,
  from: Date = new Date()
): Date => {
  const tmp = new Date(from);

  return new Date(tmp.setFullYear(tmp.getFullYear() + year));
};
