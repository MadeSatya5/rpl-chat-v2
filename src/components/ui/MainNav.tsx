"use client"

import { Flex, Heading } from "@chakra-ui/react"

function MainNav() {
  return (
    <Flex justifyContent="center" borderBottom="1px solid" borderColor="gray.200" pb={3} mb={4}>
      <Heading
        as="h4"
        size="md"
        mr={6}
        cursor="pointer"
        fontWeight="bold"
        borderBottom="2px solid"
        borderColor="teal.500"
        pb={2}
      >
        For You
      </Heading>
      <Heading as="h4" size="md" cursor="pointer" color="gray.500" pb={2}>
        Following
      </Heading>
    </Flex>
  )
}

export default MainNav
