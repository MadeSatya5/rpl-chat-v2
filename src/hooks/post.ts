import {
  CreatePostProps,
  CreatePostResponse,
  GetPostResponse,
} from "@/types/post";
import axios from "axios";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";

const accessToken = getCookie("accessToken");

export const useCreatePost = () => {
  const createPost = async (data: CreatePostProps) => {
    try {
      const res = await axios.post<CreatePostResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/post`,
        {
          text: data.text,
          //   parent_id:
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      return res;
    } catch (error) {
      console.log(error);
      toast.error("Failed to Post!!");
    }
  };
  return { createPost };
};

export const useGetPost = () => {
  const getPost = async (page: number) => {
    try {
      const res = await axios.get<GetPostResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/post?page=${page}&per_page=10`
      );
      // console.log(res.data);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return { getPost };
};

export const useDeletePost = () => {
  const deletePost = async (id: number) => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);

    } catch (error) {
      console.log(error);
    }
  };
  return { deletePost };
};
