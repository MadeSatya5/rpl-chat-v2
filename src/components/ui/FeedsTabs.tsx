import { HStack, Text } from "@chakra-ui/react";

function FeedsTabs() {
  return (
    <HStack justify="center" borderColor="gray.600" pb="2">
      <Text
        fontWeight="bold"
        px={4}
        py={2}
        borderBottom="2px solid"
        borderColor="white"
        cursor="pointer"
      >
        For You
      </Text>
      <Text
        color="gray.400"
        px={4}
        py={2}
        _hover={{ color: "white" }}
        cursor="pointer"
      >
        Following
      </Text>
    </HStack>
  );
}

export default FeedsTabs;
