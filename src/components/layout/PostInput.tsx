import { Button, Flex, HStack, Input } from "@chakra-ui/react";
import AvatarProfile, { AvatarProfileProps } from "../ui/AvatarProfile";
import { useForm } from "react-hook-form";
import { CreatePostProps } from "@/types/post";
import { useCreatePost } from "@/hooks/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";


function PostInput({ username, image_url }: AvatarProfileProps) {
  const { register, handleSubmit, resetField } = useForm<CreatePostProps>();
  const queryClient = useQueryClient();

  const { createPost } = useCreatePost();

  const {mutate, isPending } = useMutation({
    mutationFn: createPost, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate({
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
        <Button
          width={100}
          alignSelf="flex-end"
          type="submit"
          mt={4}
          _hover={{ bg: "light", transition: "background-color 0.3s ease" }}
        >
          {isPending ? <ClipLoader color="white" size={25} /> : "Post"}
        </Button>
      </Flex>
    </form>
  );
}

export default PostInput;
