import {
  EditProfileProps,
  EditProfileResponse,
  ShowProfileProps,
  ShowProfileResponse,
} from "@/types/profile";
import axios from "axios";
import {  getCookie } from "cookies-next";
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
      const formData = new FormData();
      if (data.name) formData.append("name", data.name);
      if (data.bio) formData.append("bio", String(data.bio));

      if (data.image_url) {
        formData.append("image", data.image_url[0]);
      }

      const res = await axios.patch<EditProfileResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
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

  return { editProfile, isLoadingEditProfile };
};
