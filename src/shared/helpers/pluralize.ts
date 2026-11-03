const pluralRules = new Intl.PluralRules("ru");

// Формы слова для 1, 2 и 5: ["бомба", "бомбы", "бомб"].
export const pluralize = (count: number, [one, few, many]: [string, string, string]) => {
  const form = pluralRules.select(count);
  if (form === "one") return one;
  if (form === "few") return few;
  return many;
};
