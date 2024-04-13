import { Input } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { FaSlack } from "react-icons/fa";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Flex, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ".././css/Sign-up.css";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });
  const toast = useToast();

  async function userReg(email, password, password_confirmation) {
    try {
      const data = await fetch("http://206.189.91.54/api/v1/auth/", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          password_confirmation,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await data.json();
      console.log(response);
      if (response.errors) {
        throw response.errors.full_messages[0];
      } else if (response.status === "success") {
        navigate("/");
        toast({
          title: "Sign-up successful.",
          description: "You may now sign-in",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log("Error Occurred");
      toast({
        title: "Sign-up failed.",
        description: error,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      console.log(error);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    userReg(
      formData["email"],
      formData["password"],
      formData["password_confirmation"]
    );
  };

  return (
    <>
      <div className="sign-up-container">
        <FaSlack className="slack-icon" />
        <h1>Sign up by completing the form below:</h1>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" align="center" justify="center" gap="1rem">
            <FormControl isRequired>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address here"
                width="30vw"
              />
            </FormControl>

            <FormControl isRequired>
              <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password here"
                width="30vw"
              />
            </FormControl>

            <FormControl isRequired>
              <Input
                name="password_confirmation"
                type="password"
                value={formData["password_confirmation"]}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                width="30vw"
              />
            </FormControl>

            <Button type="submit" colorScheme="blue">
              Sign-up
            </Button>
          </Flex>
        </form>
        <Link to="/">Return to Login page</Link>
      </div>
    </>
  );
}
