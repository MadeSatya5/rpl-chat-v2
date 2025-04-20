import { Heading, VStack } from "@chakra-ui/react";
import Logo from "./Logo";

function PathInfo({ text }: { text: string }) {
  return (
    <VStack width="300px" gap={50}>
      <Heading size="4xl" mt={30}>
        {text}
      </Heading>
      <Logo />
    </VStack>
  );
}

export default PathInfo;
