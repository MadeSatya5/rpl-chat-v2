import { Button, Flex, HStack, Input } from "@chakra-ui/react";
import AvatarProfile from "../ui/AvatarProfile";
import { AvatarProfileProps } from "@/types/profile";
import { useForm } from "react-hook-form";
import { CreatePostProps } from "@/types/post";
import { useCreatePost } from "@/hooks/post";

function PostInput({ username, image_url }: AvatarProfileProps) {
  const {
    register,
    handleSubmit,
    resetField,
  } = useForm<CreatePostProps>();

  const { createPost } = useCreatePost();

  const onSubmit = handleSubmit((data) => {
    
    createPost({
      text: data.text,
    });
    resetField("text");
  });

  return (
    <form onSubmit={onSubmit}>
      <HStack>
        <AvatarProfile username={username} image_url={image_url} />
        <Input
          {...register("text", { required: true })}
          variant="flushed"
          placeholder="What's your thought?"
          autoComplete="off"
        />
      </HStack>
      <Flex direction="column">
        <Button width={100} alignSelf="flex-end" type="submit" mt={4}>
          Post
        </Button>
      </Flex>
    </form>
  );
}

export default PostInput;
