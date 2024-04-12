import {
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import Select from "react-select";
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
  const [messageRecipient, setMessageRecipient] = useState(null);

  const options = userList.map((user) => ({
    value: user.email,
    label: user.email,
  }));

  async function getCurrentUserList() {
    const data = await getAllUsers(headers);
    console.log(data);
    setUserList(data.data);
  }

  useEffect(() => {
    if (headers) {
      getCurrentUserList();
    }
  }, []);

  //   removed headers from dependency first to end infinite loop

  return (
    <>
      <form>
        <FormLabel>Send to:</FormLabel>
        <Select
          defaultValue={selectedOption}
          onChange={setMessageRecipient}
          options={options}
        />
        <p>hello create a new message here</p>
        <Textarea type="text"></Textarea>
        <Button>
          <LuSendHorizonal />
        </Button>
      </form>
    </>
  );
}
