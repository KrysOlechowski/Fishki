export interface Card extends CardCreate {
  _id: string;
  createdAt: string;
  updatedAt: string;
  goodAnswers: number;
  badAnswers: number;
  lastAnswerTime: number;
  currentAnswerTime: number;
  timeBetweenAnswers: number;
}

export interface CardCreate {
  front: string;
  back: string;
  status: CardStatus;
  collectionName: string;
}

export interface CardUpdate {
  id?: string;
  front?: string;
  back?: string;
  collectionName?: string;
  goodAnswers?: number;
  badAnswers?: number;
  status?: CardStatus;
  lastAnswerTime?: number;
  currentAnswerTime?: number;
}

export enum CardStatus {
  new = "new",
  good = "good",
  bad = "bad",
}

export interface ContextLessonMode {
  goodAnswers: number;
  badAnswers: number;
  numberOfCards: number;
}

export interface Context {
  activeCardIndex: number;
  increaseActiveCardIndex: () => void;
  cards: Card[];
  error: boolean;
  fetchCards: () => void;
  lessonMode: ContextLessonMode;
  setLessonMode: (lessonMode: ContextLessonMode) => void;
  isTestMode: boolean;
  setIsTestMode: (bool: boolean) => void;
  isLessonMode: boolean;
  setIsLessonMode: (bool: boolean) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (bool: boolean) => void;
  checkSession: () => void;
  isSessionChecking: boolean;
}
