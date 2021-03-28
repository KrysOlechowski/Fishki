export interface Card extends CardCreate {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface CardCreate {
  title: string;
  front: string;
  back: string;
  status: string;
  collection?: string;
}
