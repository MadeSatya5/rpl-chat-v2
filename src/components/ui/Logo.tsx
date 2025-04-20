import { HStack, Heading } from "@chakra-ui/react";
import Image from "next/image";

function Logo() {
  return (
    <HStack gap={0} my="30px">
      <Image
        src="/uzumakibg.png"
        alt="bunshin-logo"
        width={50}
        height={50}
        style={{ filter: "invert(1)" }}
      />
      <Heading size="4xl" ml={3} >
        Bunshin
      </Heading>
    </HStack>
  );
}

export default Logo;
