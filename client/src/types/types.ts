export interface Card extends CardCreate {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface CardCreate {
  front: string;
  back: string;
  status: string;
  collection?: string;
}

export interface CardUpdate {
  id: string;
  front: string;
  back: string;
  status: CardStatus;
  collection?: string;
}

export enum CardStatus {
  new = "new",
  good = "good",
  bad = "bad",
}
