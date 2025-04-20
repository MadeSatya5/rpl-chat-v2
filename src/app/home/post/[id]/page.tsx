"use client";
import { useParams } from "next/navigation";
import { useGetPostById } from "@/hooks/post";
import { Container, HStack, Stack } from "@chakra-ui/react";
import PostItem from "@/components/layout/PostItem";
import PostInput from "@/components/layout/PostInput";
import { useQuery } from "@tanstack/react-query";
import SideMenu from "@/components/layout/SideMenu";
import { useShowProfile } from "@/hooks/profile";
import { getCookie } from "cookies-next";
import LoaderPage from "@/components/ui/LoaderPage";
import PathInfo from "@/components/ui/PathInfo";

export default function PostDetailPage() {
  const { id } = useParams();
  const { getPostById } = useGetPostById();

  const { data: postData, refetch: refetchPost } = useQuery({
    queryKey: ["postById", id],
    queryFn: () => getPostById(Number(id)),
  });

  const usernameFromCookie = getCookie("username");
  const username: string =
    typeof usernameFromCookie === "string" ? usernameFromCookie : "Guest";

  const { showProfile } = useShowProfile();

  const { data: profileData, isLoading } = useQuery({
    queryKey: ["profileData"],
    queryFn: async () => {
      return await showProfile({ username });
    },
    refetchOnWindowFocus: false,
  });

  const post = postData?.data;

  return isLoading ? (
    <LoaderPage />
  ) : (
    <HStack maxW="1250px" mx="auto" align="start" pt={3}>
      <SideMenu profileData={profileData} />
      <Container maxW="700px" px={4} pt={10}>
        <Stack
          gap={6}
          py={6}
          borderRight="1px solid"
          borderColor="gray.700"
          pr="40px"
          minH="100vh"
        >
          <PostItem
            id={post?.id}
            username={post?.user.username}
            text={post?.text}
            image_url={post?.user.image_url}
            total_likes={post?.total_likes}
            total_replies={post?.replies.length}
          />

          <PostInput
            username={profileData?.data.username}
            image_url={profileData?.data.image_url}
            parent_id={Number(id)}
            onRefetch={refetchPost}
          />

          <Stack gap={3} pl={4}>
            {post?.replies.map((reply) => (
              <PostItem
                key={reply.id}
                id={reply.id}
                username={reply.user.username}
                text={reply.text}
                image_url={reply.user.image_url}
              />
            ))}
          </Stack>
        </Stack>
      </Container>

      <PathInfo text="Post Replies"/>
    </HStack>
  );
}
