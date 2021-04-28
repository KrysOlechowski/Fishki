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
