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
import { useState } from "react";
import ".././css/Login.css";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userLogin(formData["email"], formData["password"]);
  };

  async function userLogin(email, password) {
    try {
      const data = await fetch("http://206.189.91.54/api/v1/auth/sign_in", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      //   grab data from login headers
      const accessToken = data.headers.get("access-token");
      const client = data.headers.get("client");
      const expiry = data.headers.get("expiry");
      const uid = data.headers.get("uid");

      // store data in headers variable
      const headers = {
        "access-token": accessToken,
        client: client,
        expiry: expiry,
        uid: uid,
      };
      // store headers variable in local storage
      localStorage.setItem("headers", JSON.stringify(headers));

      const response = await data.json();
      if (response.errors) {
        throw response.errors.full_messages[0];
      }
    } catch (error) {
      console.log("Error Occurred");
      console.log(error);
    }
  }

  return (
    <>
      <div className="login-form-container">
        <p>The logo should probably go here</p>
        <h1>Sign in to your workspace</h1>
        <FormControl onSubmit={handleSubmit}>
          <Flex direction="column" align="center" justify="center" gap="1rem">
            <Input
              name="email"
              type="email"
              value={formData["email"]}
              onChange={handleInputChange}
              placeholder="Enter your email address here"
              width="30vw"
              required
            />
            <Input
              name="password"
              type="password"
              value={formData["password"]}
              onChange={handleInputChange}
              placeholder="Enter your password here"
              width="30vw"
              required
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
