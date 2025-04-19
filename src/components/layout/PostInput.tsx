import { Button, Flex, HStack, Textarea } from "@chakra-ui/react";
import AvatarProfile, { AvatarProfileProps } from "../ui/AvatarProfile";
import { useForm } from "react-hook-form";
import { CreatePostProps } from "@/types/post";
import { useCreatePost } from "@/hooks/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import LoaderButton from "../ui/LoaderButton";

interface PostInputProps extends AvatarProfileProps {
  parent_id?: number
}

function PostInput({ username, image_url, parent_id }: PostInputProps) {
  const { register, handleSubmit, resetField } = useForm<CreatePostProps>();
  const queryClient = useQueryClient();

  const { createPost } = useCreatePost();

  const { mutate: handleCreatePost, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const onSubmit = handleSubmit((data) => {
    handleCreatePost({
      text: data.text,
      parent_id: parent_id,
    });
    resetField("text");
  });

  return (
    <form onSubmit={onSubmit}>
      <HStack>
        <AvatarProfile username={username} image_url={image_url} />
        <Textarea
          {...register("text", { required: true })}
          variant="flushed"
          placeholder="What's your thought?"
          autoComplete="off"
          autoresize
          ml={2}
        />
      </HStack>
      <Flex direction="column">
        <Button
          width={100}
          alignSelf="flex-end"
          type="submit"
          mt={4}
          _hover={{ bg: "light", transition: "background-color 0.3s ease" }}
        >
          {isPending ? <LoaderButton /> : "Post"}
        </Button>
      </Flex>
    </form>
  );
}

export default PostInput;
