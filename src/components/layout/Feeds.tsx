import { Center, Container, Stack } from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, ReactNode } from "react";
import PostItem from "./PostItem";
import LoaderButton from "../ui/LoaderButton";
import { GetPostResponse } from "@/types/post";

interface FeedsProps {
  queryKey: (string | number | undefined)[];
  queryFn: ({ pageParam }: { pageParam: number }) => Promise<GetPostResponse>;
  renderInput?: ReactNode;
}

function Feeds({
  queryKey,
  queryFn,
  renderInput,
}: FeedsProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.meta.page;
      const maxPage = lastPage?.meta.max_page;
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
        borderColor="gray.700"
        pr="40px"
        minH="100vh"
      >
        {renderInput}

        {data?.pages.map((page, index) =>
          Array.isArray(page?.data)
            ? page.data.map((post) =>
                !post.is_deleted ? (
                  <PostItem
                    key={`${index}-${post.id}`}
                    id={post.id}
                    username={post.user.username}
                    text={post.text}
                    image_url={post.user.image_url}
                    total_likes={post.total_likes}
                  />
                ) : null
              )
            : null
        )}

        <div ref={ref} />

        {isFetchingNextPage && (
          <Center p={50}>
            <LoaderButton />
          </Center>
        )}
      </Stack>
    </Container>
  );
}

export default Feeds;
