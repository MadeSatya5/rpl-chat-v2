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
    bio: string | null;
    image_url: string  | undefined;
  };
}

