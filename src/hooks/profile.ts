import { ShowProfileProps, ShowProfileResponse } from "@/types/profile";
import axios from "axios";

export const useProfile = () => {
  const showProfile = async (data: ShowProfileProps) => {
    const res = await axios.get<ShowProfileResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${data.username}`
    );
    return res.data;
  };
  return { showProfile };
};
