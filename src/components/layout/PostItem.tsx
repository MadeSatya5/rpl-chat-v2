import { Box, Text, HStack, Button, Stack } from "@chakra-ui/react";
import AvatarProfile from "../ui/AvatarProfile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDeletePost } from "@/hooks/post";
// import { useDeletePost } from "@/hooks/post";

interface PostItemProps {
  id: number;
  username: string;
  image_url: string;
  text: string;
}

const PostItem: React.FC<PostItemProps> = ({
  id,
  username,
  image_url,
  text,
}) => {
  const queryClient = useQueryClient();

  const { deletePost } = useDeletePost();

  const handleDeletePost = useMutation({
    mutationFn: async (id: number) => {
      await deletePost(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
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
      <Text mt={2}>{text}</Text>
      <HStack mt={4} gap={4}>
        <Button size="sm" colorScheme="blue">
          Comment
        </Button>
        <Button size="sm" colorScheme="blue">
          Like
        </Button>
        <Button
          size="sm"
          colorScheme="blue"
          onClick={() => handleDeletePost.mutate(id)}
        >
          Delete
        </Button>
      </HStack>
    </Box>
  );
};

export default PostItem;
