import {
  Input,
  InputGroup,
  InputRightAddon,
  Textarea,
  FormControl,
  FormLabel,
  Button,
  useToast,
} from "@chakra-ui/react";
import AsyncSelect from "react-select/async";
import { useState, useEffect } from "react";
import { LuSendHorizonal } from "react-icons/lu";
import { BASE_URL } from "../../utilities/ConstList";
import { useMemo } from "react";

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
  const [newMessage, setNewMessage] = useState("");
  const toast = useToast();

  const options = useMemo(() => {
    return userList.map((user) => ({
      value: user.id,
      label: user.email,
    }));
  }, [userList]);

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

  function loadOptions(searchValue) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredOptions = options?.filter((option) => {
          return option.label.toLowerCase().includes(searchValue.toLowerCase());
        });
        resolve(filteredOptions);
      }, 500);
    });
  }

  const handleSelectRecipient = (e) => {
    setMessageRecipient(e.value);
  };

  const handleMessageChange = (e) => setNewMessage(e.target.value);

  async function sendMessage(headers, body) {
    try {
      const data = await fetch(`${BASE_URL}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify(body),
      });
      const res = await data.json();
      console.log(res);
    } catch (error) {}
  }

  async function handleSendMessage(e) {
    e.preventDefault();
    const data = await sendMessage(headers, {
      receiver_id: messageRecipient,
      receiver_class: "User",
      body: newMessage,
    });
    if (!messageRecipient) {
      toast({
        title: "Please select a recipient",
        description: "umayos ka",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else if (newMessage === "") {
      toast({
        title: "Please enter a message",
        description: "umayos ka",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      setNewMessage("");
      toast({
        title: "Message Sent",
        description: "ok na",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <>
      <form onSubmit={handleSendMessage}>
        <FormLabel>Send to:</FormLabel>
        <AsyncSelect
          defaultValue={messageRecipient}
          onChange={handleSelectRecipient}
          loadOptions={loadOptions}
        />
        <p>Create a new message here:</p>
        {/* <Textarea type="text" onChange={handleMessageChange}></Textarea> */}
        <InputGroup>
          <Input
            type="text"
            value={newMessage}
            onChange={handleMessageChange}
          ></Input>
          <InputRightAddon>
            <button type="submit">
              <LuSendHorizonal />
            </button>
          </InputRightAddon>
        </InputGroup>
      </form>
    </>
  );
}
