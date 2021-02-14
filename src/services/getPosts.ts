import { PostsFetchingData } from "./types/Posts";

export default async function getPosts() {
  return fetch("https://www.reddit.com/top.json?limit=50")
    .then((res) => {
      return res.json();
    })
    .then((res: PostsFetchingData) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
}
