import {
  Box,
  Text,
  HStack,
  Button,
  Stack,
} from "@chakra-ui/react";
import AvatarProfile from "../ui/AvatarProfile";

interface PostItemProps {
  username: string;
  image_url: string;
  text: string;
  timestamp: string;
}

const PostItem: React.FC<PostItemProps> = ({
  username,
  image_url,
  text,
}) => {

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
        <Button size="sm" colorScheme="blue">
          Share
        </Button>
      </HStack>
    </Box>
  );
};

export default PostItem;
