import {
  EditProfileProps,
  EditProfileResponse,
  ShowProfileProps,
  ShowProfileResponse,
} from "@/types/profile";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useState } from "react";

const accessToken = getCookie("accessToken");

export const useShowProfile = () => {
  const [isLoadingShowProfile, setIsLoadingShowProfile] = useState<boolean>(false);

  const showProfile = async (data: ShowProfileProps) => {
    setIsLoadingShowProfile(true);
    try {
      const res = await axios.get<ShowProfileResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${data.username}`
      );
      return res.data;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingShowProfile(false);
    }
  };

  return { showProfile, isLoadingShowProfile };
};

export const useEditProfile = () => {
  const [isLoadingEditProfile, setIsLoadingEditProfile] = useState<boolean>(false);

  const editProfile = async (data: EditProfileProps) => {
    setIsLoadingEditProfile(true);
    try {
      const res = await axios.patch<EditProfileResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/update`,
        {
          name: data.name,
          bio: data.bio,
          image: data.image_url,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingEditProfile(false);
    }
  };

  return { editProfile, isLoadingEditProfile};
};
