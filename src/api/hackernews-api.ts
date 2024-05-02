import axios from "axios";
import { Ids, Item } from "../types/types";

export const getItem = async (id: number | undefined) => {
  try {
    const { data } = await axios.get<Item>(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getIds = async () => {
  try {
    const { data: ids } = await axios.get<Ids>(
      "https://hacker-news.firebaseio.com/v0/newstories.json"
    );
    const storiesIds = ids.slice(0, 100);
    return storiesIds;
  } catch (error) {
    console.error(error);
  }
};
