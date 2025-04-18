import { Center, Container, Stack } from "@chakra-ui/react";
import FeedsTabs from "../ui/FeedsTabs";
import PostInput from "./PostInput";
import PostItem from "./PostItem";
import { ShowProfileResponse } from "@/types/profile";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useGetPost } from "@/hooks/post";
import { useEffect } from "react";
import Loader from "../ui/Loader";

interface MainFeedsProps {
  profileData: ShowProfileResponse | null | undefined;
}

function MainFeeds({ profileData }: MainFeedsProps) {
  const { getPost } = useGetPost();

  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: async ({ pageParam = 1 }) => {
      return await getPost(pageParam);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.data.meta.page;
      const maxPage = lastPage?.data.meta.max_page;
      return currentPage && currentPage < (maxPage ?? 0)
        ? currentPage + 1
        : undefined;
    },
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <Container px="4" maxW="700px">
      <Stack
        gap={4}
        borderRight="1px solid"
        borderColor="light"
        pr="40px"
        minH="100vh"
      >
        <FeedsTabs />
        <PostInput
          username={profileData?.data.username}
          image_url={profileData?.data.image_url}
        />

        {posts?.pages.map((post, postIndex) =>
          post?.data.data.map((post) =>
            !post.is_deleted ? (
              <PostItem
                key={`${postIndex}-${post.id}`}
                id={post.id}
                username={post.user.username}
                text={post.text}
                image_url={post.user.image_url}
              />
            ) : null
          )
        )}

        <div ref={ref} />

        {isFetchingNextPage ? (
          <>
            <Center p={50}>
              <Loader />
            </Center>
          </>
        ) : null}
      </Stack>
    </Container>
  );
}

export default MainFeeds;
