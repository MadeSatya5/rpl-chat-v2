import {
  Box,
  Text,
  HStack,
  Button,
  Stack,
  Textarea,
  IconButton,
} from "@chakra-ui/react";
import AvatarProfile from "../ui/AvatarProfile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDeletePost, useEditPost, useLikePost, useUnlikePost } from "@/hooks/post";
import Loader from "../ui/LoaderButton";
import { useState } from "react";
import { EditPostProps } from "@/types/post";
import { FaEdit, FaRegHeart } from "react-icons/fa";
import { MdDelete, MdComment } from "react-icons/md";
import { useRouter } from "next/navigation";

interface PostItemProps {
  id?: number;
  username?: string;
  image_url?: string;
  text?: string ;
  total_likes?: number;
  total_replies?: number;
}

const PostItem: React.FC<PostItemProps> = ({
  id,
  username,
  image_url,
  text,
  total_likes,
  total_replies,
}) => {
  const router = useRouter()
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string | undefined>(text);

  const { deletePost } = useDeletePost();
  const { editPost } = useEditPost();
  const { likePost } = useLikePost();
  const { unlikePost } = useUnlikePost();

  const { mutate: handleDeletePost, isPending: isLoadingDelete } = useMutation({
    mutationFn: async (id: number | undefined) => {
      await deletePost(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const { mutate: handleEditPost, isPending: isLoadingEdit } = useMutation({
    mutationFn: async ({ id, text }: EditPostProps) => {
      await editPost({ id: id, text: text });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const { mutate: handleLikePost } = useMutation({
    mutationFn: async (id: number | undefined) => {
      await likePost(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  })

  const { mutate: handleUnlikePost } = useMutation({
    mutationFn: async (id: number | undefined) => {
      await unlikePost(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  })

  const handleSave = () => {
    handleEditPost({ id, text: editedText });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedText(text);
    setIsEditing(false);
  };
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      borderColor="light"
      p={4}
      shadow="sm"
      _hover={{ boxShadow: "md" }}
    >
      <HStack gap={4}>
        <AvatarProfile username={username} image_url={image_url} />
        <Stack gap={0}>
          <Text fontWeight="bold">{username}</Text>
        </Stack>
      </HStack>

      {isEditing ? (
        <Textarea
          mt={2}
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          autoresize
        />
      ) : (
        <Text mt={2}>{text}</Text>
      )}

      <HStack mt={4} gap={4}>
        {isEditing ? (
          <>
            <Button size="sm" onClick={handleSave}>
              Save
            </Button>
            <Button size="sm" onClick={handleCancel}>
              Cancel
            </Button>
          </>
        ) : isLoadingEdit || isLoadingDelete ? (
          <Loader />
        ) : (
          <HStack gap={4} mx="auto">
            <IconButton onClick={() => router.push(`/post/${id}`)} bgColor="transparent">
              {total_replies}
              <MdComment />
            </IconButton>
            <IconButton bgColor="transparent" onClick={() => handleLikePost(id)}>
              {total_likes}
              <FaRegHeart />
            </IconButton>
            {/* <IconButton bgColor="transparent">
              <FaEdit onClick={() => setIsEditing(true)} />
            </IconButton>
            <IconButton bgColor="transparent">
              <MdDelete onClick={() => handleDeletePost(id)}></MdDelete>
            </IconButton> */}
          </HStack>
        )}
      </HStack>
    </Box>
  );
};

export default PostItem;
