export interface CreatePostProps {
  text: string;
  parent_id?: number | null,
}

export interface PostInputProps {
  username: string | undefined;
  image_url: string | undefined;
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
  data: {
    id: number;
    is_deleted: boolean,
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
  }[],
  meta: {
    page: number,
    per_page: number,
    max_page: number,
    count: number
  }
}

export interface GetPostByIdResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    text: string;
    total_likes: number;
    parent_id: number | null;
    is_deleted: boolean;
    user: {
      id: string;
      name: string;
      username: string;
      bio: string;
      image_url: string;
    };
    replies: {
      id: number;
      text: string;
      total_likes: number;
      parent_id: number | null;
      is_deleted: boolean;
      user: {
        id: string;
        name: string;
        username: string;
        bio: string;
        image_url: string;
      };

    }[];
  };
  meta: {
    page: number;
    per_page: number;
    max_page: number;
    count: number;
  };
}

export interface EditPostProps{
  id?: number,
  text?: string ,
}
