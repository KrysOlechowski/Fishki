export const getVisibleAndHiddenText = (front: string, back: string) => {
  const randomNumber = Math.floor(Math.random() * 2);

  const visibleText = randomNumber === 0 ? front : back;
  const hiddenText = randomNumber === 0 ? back : front;
  const cardAnswers = {
    visibleText,
    hiddenText,
  };
  return cardAnswers;
};

export const getAnswersColumnsChart = (
  goodAnswers: number,
  badAnswers: number
): {
  firstColumn: number;
  secondColumn: number;
  goodAnswers: number;
  badAnswers: number;
} => {
  const total = goodAnswers + badAnswers;

  const result: number = parseInt(((goodAnswers * 100) / total).toFixed(2), 10);
  const firstColumn = result;
  const secondColumn = 100 - firstColumn;

  return {
    firstColumn: firstColumn,
    secondColumn: secondColumn,
    goodAnswers: goodAnswers,
    badAnswers: badAnswers,
  };
};

export const milisecondsToDate = (ms: number) => {
  let seconds = Number((ms / 1000).toFixed());
  let minutes = Number((ms / (1000 * 60)).toFixed());
  let hours = Number((ms / (1000 * 60 * 60)).toFixed());
  let days = Number((ms / (1000 * 60 * 60 * 24)).toFixed());
  if (seconds < 60) return seconds + " seconds";
  else if (minutes === 1) return minutes + " minute";
  else if (minutes < 60) return minutes + " minutes";
  else if (hours === 1) return hours + " hour";
  else if (hours < 24) return hours + " hours";
  else if (days === 1) return hours + " day";
  else return days + " days";
};
