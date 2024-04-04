import { Input } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { useState } from "react";

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });

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
      }
    } catch (error) {
      console.log("Error Occurred");
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
      <div>
        <h1>Sign up by completing the form below</h1>
        <FormControl>
          <Flex direction="column" align="center" justify="center" gap="1rem">
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email address here"
              width="30vw"
            />
            <Input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password here"
              width="30vw"
            />
            <Input
              name="password_confirmation"
              type="password"
              value={formData["password_confirmation"]}
              onChange={handleInputChange}
              placeholder="Confirm your password"
              width="30vw"
            />
            <Button type="submit" colorScheme="blue" onClick={handleSubmit}>
              Sign-up
            </Button>
          </Flex>
        </FormControl>
      </div>
    </>
  );
}
