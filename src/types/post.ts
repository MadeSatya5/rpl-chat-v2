export interface CreatePostProps {
  text: string;
}

export interface PostInputProps {
  username: string | undefined;
  image_url: string | undefined;
  // onAddPost: (newPost: any) => void; // bisa ganti `any` dengan tipe post kamu
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
