import {
  CreatePostProps,
  CreatePostResponse,
  EditPostProps,
  GetPostByIdResponse,
  GetPostResponse,
} from "@/types/post";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useState } from "react";
import toast from "react-hot-toast";

const accessToken = getCookie("accessToken");

export const useCreatePost = () => {
  const createPost = async (data: CreatePostProps) => {
    try {
      const res = await axios.post<CreatePostResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/post`,
        {
          text: data.text,
          parent_id: data.parent_id,
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
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  return { getPost };
};

export const useGetPostUser = (liked?: boolean | undefined) => {
  const [isLoadingGetPostUser, setIsLoadingGetPostUser] = useState(false);

  const getPostUser = async (username: string | undefined, page: number) => {
    try {
      setIsLoadingGetPostUser(true);
      const res = await axios.get<GetPostResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${username}/posts?page=${page}&per_page=10${liked ? "&is_liked=true": ""}`
      );
      console.log(username, page)
      console.log(res.data)
      return res.data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to fetch posts");
    } finally {
      setIsLoadingGetPostUser(false);
    }
  };

  return { getPostUser, isLoadingGetPostUser };
};

export const useGetPostById = () => {
  const getPostById = async (postId: number, page = 1, perPage = 10) => {
    try {
      const res = await axios.get<GetPostByIdResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${postId}?page=${page}&per_page=${perPage}`
      );
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  return { getPostById };
};

export const useDeletePost = () => {
  const deletePost = async (id: number | undefined) => {
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

export const useEditPost = () => {
  const editPost = async ({id, text}: EditPostProps) => {
    try {

      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${id}`,
        {
          text: text,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);

    } catch (error) {
      console.log(error);
    }
  };
  return { editPost };
};

export const useLikePost = () => {
  const [isLoadingLike, setIsLoadingLike] = useState(false);

  const likePost = async(id: number | undefined) => {
    try {
      setIsLoadingLike(true);
      const res = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/likes/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ) 
      console.log(res)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoadingLike(false);
    }
  }
  return { likePost, isLoadingLike }
}

export const useUnlikePost = () => {
  const [isLoadingUnlike, setIsLoadingUnlike] = useState(false);

  const unlikePost = async(id: number | undefined) => {
    try {
      setIsLoadingUnlike(true);
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/likes/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ) 
      console.log(res)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoadingUnlike(false);
    }
  }
  return { unlikePost, isLoadingUnlike }
}