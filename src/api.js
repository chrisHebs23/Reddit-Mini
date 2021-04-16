export const API = "https://www.reddit.com";

export const getSubreddits = async () => {
  const response = await fetch(`${API}/subreddits.json`);
  const json = await response.json();

  return json.data.children.map((sub) => sub.data);
};

export const getRedditPosts = async (subreddits) => {
  const response = await fetch(`${API}/${subreddits}.json`);
  const json = await response.json();

  return json.data.children.map((post) => post.data);
};

export const getRedditSearch = async (search) => {
  const response = await fetch(`${API}/search.json?q=${search}`);
  const json = await response.json();
  return json.data.children.map((search) => search.data);
};

export const getRedditComments = async (permalink) => {
  const response = await fetch(`${API}${permalink}.json`);
  const json = await response.json();
  return json[1].data.children.map((comment) => comment.data);
};
