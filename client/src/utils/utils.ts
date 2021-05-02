
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
): { firstColumn: number; secondColumn: number; goodAnswers:number; badAnswers:number} => {
  const total = goodAnswers+badAnswers;

  const result: number = parseInt(((goodAnswers * 100) / total).toFixed(2), 10);
  const firstColumn = result;
  const secondColumn = 100 - firstColumn;

  return {
    firstColumn: firstColumn,
    secondColumn: secondColumn,
    goodAnswers:goodAnswers,badAnswers:badAnswers
  };
};
