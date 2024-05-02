export type Ids = number[];
export interface Item {
  by: string;
  descendants: number;
  id: number;
  score: number;
  time: number;
  title: string;
  // type сделать enum
  type: string;
  url: string;
  kids?: number[];
  text: string;
  deleted?: boolean;
}
