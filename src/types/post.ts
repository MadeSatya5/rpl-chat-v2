export interface CreatePostProps {
  text: string;
}

export interface CreatePostResponse {
  status: string;
  message: string;
  data: {
    id: number;
    text: string;
    total_likes: number;
    parent_id: number | null;
    user: {
      id: string;
      name: string;
      username: string;
      bio: string;
      image_url: string;
    };
  };
}

export interface GetPostResponse {
  message: string;
  data: [
    {
      id: number;
      text: string;
      total_likes: number;
      parent_id: number | null;
      user: {
        id: string;
        name: string;
        username: string;
        bio: string;
        image_url: string;
      };
    }
  ];
}
