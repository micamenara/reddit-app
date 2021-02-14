export type PostStatusType = 'readed' | 'unreaded' | 'dismissed';

export type PostType = {
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
    thumbnail_width: number;
    thumbnail_height: number;
    num_comments: number;
    created: number;
    title: string;
    url: string;
    id: string;
    permalink: string;
    status: PostStatusType;
  };
  kind: string;
};

export type PostsFetchingData = {
  data: {
    after?: string;
    before?: string;
    children: PostType[];
    dist: number;
  };
};
