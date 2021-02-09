export type Post = {
  data: {
    approved_at_utc?: string;
    author: string;
    saved: boolean;
    selftext: string;
    selftext_html: string;
    send_replies: boolean;
    spoiler: boolean;
    stickied: boolean;
    subreddit: string;
    subreddit_id: string;
    subreddit_name_prefixed: string;
    subreddit_subscribers: number;
    subreddit_type: string;
    suggested_sort: string;
    thumbnail: string;
    title: string;
    url: string;
  };
  kind: string;
};

export type PostsFetchingData = {
  data: {
    after?: string;
    before?: string;
    children: Post[];
    dist: number;
  };
};
