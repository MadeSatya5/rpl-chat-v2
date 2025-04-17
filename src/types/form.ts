export interface LoginProps {
  username: string;
  password: string;
}

export interface LoginResponse {
  status: boolean;
  message: string;
  data: {
    token: string;
  };
}

export interface CheckUsernameProps {
  username: string,
}

export interface CheckUsernameResponse {
  status: boolean,
  message: string,
  error: null | string,
}

export interface RegisterProps {
    name: string,
    username: string,
    password: string,
}

export interface RegisterResponse {
  status: boolean,
  message: string,
  data: {
    id: string,
    name: string,
    username: string,
    bio: null | string,
    image_url: null | string,
  }
}