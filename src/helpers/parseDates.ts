function parseDates(str: string) {
  const dateRegex = /\b(\d{1,2})([/.-])(\d{1,2})\2(\d{4})\b/g;
  const datesFound = str.match(dateRegex);

  return datesFound || [];
}

export default parseDates;
