import React from "react";
import { Box, Heading, Text, Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      height="80vh"
      bg="black"
    >
      <Box textAlign="center">
        <Heading as="h1" size="4xl" mb={4} textColor="white">
          404
        </Heading>
        <Text fontSize="xl" mb={4}>
          Oops! The page you're looking for doesn't exist.
        </Text>
        <Button
          as={Link}
          to="/"
          border={"1px solid white"}
          textColor="white"
          size="lg"
        >
          Go to Home
        </Button>
      </Box>
    </Flex>
  );
};

export default ErrorPage;
