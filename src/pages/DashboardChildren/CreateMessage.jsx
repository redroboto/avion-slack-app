import {
  Input,
  Select,
  Textarea,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { LuSendHorizonal } from "react-icons/lu";
import { BASE_URL } from "../../utilities/ConstList";

async function getAllUsers(headers) {
  try {
    const data = await fetch(`${BASE_URL}/users`, {
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });

    const res = await data.json();
    return res;
  } catch (error) {
    console.error(error);
  }
}

export default function CreateMessage() {
  const headers = JSON.parse(localStorage.getItem("headers") || "{}");
  const [userList, setUserList] = useState([]);

  async function getCurrentUserList() {
    const data = await getAllUsers(headers);
    console.log(data);
    setUserList(data.data);
  }

  useEffect(() => {
    if (headers) {
      getCurrentUserList();
    }
  }, [headers]);

  return (
    <>
      <form action="">
        <FormLabel>Send to:</FormLabel>
        <Select placeholder="Select a User">
          {userList.map((user) => (
            <option value={user.email}>{user.email}</option>
          ))}
        </Select>
        <p>hello create a new message here</p>
        <Textarea type="text"></Textarea>
        <Button>
          <LuSendHorizonal />
        </Button>
      </form>
    </>
  );
}
