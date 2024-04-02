import { Input } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import ".././css/Login.css";

export default function Login() {
  return (
    <>
      <div className="login-form-container">
        <h1>Sign in to your workspace</h1>
        <FormControl>
          <Input type="email" placeholder="Enter your email address here" />
          <Input type="password" placeholder="Enter your password here" />
          <Button type="submit" colorScheme="blue">
            Sign-in
          </Button>
        </FormControl>
      </div>
      <div className="sign-up-link-container">
        <p>New to Slack?</p>
        <p>Sign-up for an account here.</p>
      </div>
    </>
  );
}
