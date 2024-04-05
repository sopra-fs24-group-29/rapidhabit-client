const formatDateTime = (dateTimeString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const date = new Date(dateTimeString);
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
};

export default formatDateTime;
