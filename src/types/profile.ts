export interface ShowProfileProps {
  username: string;
}

export interface ShowProfileResponse {
  status: boolean;
  message: true;
  data: {
    id: string;
    name: string;
    username: string;
    bio?: string | number | readonly string[];
    image_url?: string  | undefined;
  };
}

export interface EditProfileProps {
  name: string | undefined,
  bio?: string | number | readonly string[],
  image_url?: null | File | string
}

export interface EditProfileResponse {
  status: boolean;
  message: true;
  data: {
    id: string;
    name: string;
    username: string;
    bio?: string | number | readonly string[];
    image_url?: string  | undefined;
  };
}

