import { HStack } from "@chakra-ui/react";
import { MoonLoader } from "react-spinners";

function LoaderPage() {
  return (
    <HStack justify="center" align="center" minH="100vh">
      <MoonLoader color="white" />
    </HStack>
  );
}

export default LoaderPage;
