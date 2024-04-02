import { Input } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";

export default function SignUp() {
  return (
    <>
      <div>
        <h1>Sign up by completing the form below</h1>
        <FormControl>
          <Flex direction="column" align="center" justify="center" gap="1rem">
            <Input
              type="email"
              placeholder="Enter your email address here"
              width="30vw"
            />
            <Input
              type="password"
              placeholder="Enter your password here"
              width="30vw"
            />
            <Input
              type="password"
              placeholder="Confirm your password"
              width="30vw"
            />
            <Button type="submit" colorScheme="blue">
              Sign-up
            </Button>
          </Flex>
        </FormControl>
      </div>
    </>
  );
}
