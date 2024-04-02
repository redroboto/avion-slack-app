import { Input } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ".././css/Login.css";

export default function Login() {
  return (
    <>
      <div className="login-form-container">
        <p>The logo should probably go here</p>
        <h1>Sign in to your workspace</h1>
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
            <Button type="submit" colorScheme="blue">
              Sign-in
            </Button>
          </Flex>
        </FormControl>
      </div>
      <div className="sign-up-link-container">
        <p>New to Slack?</p>
        <Link to="/signup">Sign-up for an account here.</Link>
      </div>
    </>
  );
}
