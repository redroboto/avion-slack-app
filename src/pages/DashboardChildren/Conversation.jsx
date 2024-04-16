import React from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../utilities/ConstList";
import { useState, useEffect } from "react";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
  useDisclosure,
  Textarea,
  Button,
} from "@chakra-ui/react";

import AsyncSelect from "react-select/async";
import { useMemo } from "react";
import { LuSendHorizonal } from "react-icons/lu";
import { MdAddCircleOutline } from "react-icons/md";
import "../.././css/Conversation.css";

async function fetchRecentConversation(headers, id, receiver_class) {
  try {
    const data = await fetch(
      `${BASE_URL}/messages?receiver_id=${id}&receiver_class=${receiver_class}`,
      {
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      }
    );

    const res = await data.json();
    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
  }
}

// added getAllUsers from Channels.jsx for the select user option when adding new users to current channel

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

export default function Conversation({ receiver_class }) {
  const params = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const headers = JSON.parse(localStorage.getItem("headers") || "{}");
  const [conversation, setConversation] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [newUser, setNewUser] = useState([]);
  const [userList, setUserList] = useState([]);
  const options = useMemo(() => {
    return userList.map((user) => ({
      value: user.id,
      label: user.email,
    }));
  }, [userList]);
  const currentUser = JSON.parse(localStorage.getItem("userInfo") || "{}");

  async function getRecentConversation() {
    const data = await fetchRecentConversation(
      headers,
      params.id,
      receiver_class
    );
    console.log(data.data);
    console.log(currentUser.id);
    setConversation(data.data);
  }

  useEffect(() => {
    if (headers && params.id) {
      getRecentConversation();
    }
  }, [params.id]);

  // added getCurrentUserList & useEffect below from Channels.jsx for the select user option when adding new users to current channel

  async function getCurrentUserList() {
    const data = await getAllUsers(headers);
    console.log(data);
    setUserList(data.data);
  }

  useEffect(() => {
    if (headers) {
      // getAllChannels();
      getCurrentUserList();
    }
  }, []);

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

  const handleMessageChange = (e) => setNewMessage(e.target.value);

  async function handleSendMessage(e) {
    e.preventDefault();
    const data = await sendMessage(headers, {
      receiver_id: params.id,
      receiver_class: receiver_class,
      body: newMessage,
    });
    setNewMessage("");
    getRecentConversation();
  }

  //  loadOptions copied from Channels.jsx for selecting users to add to channel

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

  // handleSelectUser, saveNewUser, and handleSaveNewUser all added for saving new users to the channel

  function handleSelectUser(e) {
    console.log(e[0].value);
    setNewUser(e[0].value);
  }

  async function saveNewUser(headers, body) {
    try {
      const data = await fetch(`${BASE_URL}/channel/add_member`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify(body),
      });
      const res = await data.json();
      console.log(res);
      if (res.errors) {
        toast({
          title: "Failed to add new user",
          description: res.errors[0],
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: "New user added",
          description: "See message above",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSaveNewUser() {
    const data = await saveNewUser(headers, {
      id: params.id,
      member_id: newUser,
    });

    getRecentConversation();
    onClose();
  }

  return (
    <>
      <div className="conversation-header-container">
        <h1>Current conversation with: </h1>
        <div className="add-user-btn-container">
          {typeof receiver_id !== "number" ? (
            <>
              <button onClick={onOpen}>
                <MdAddCircleOutline />
              </button>
              <button onClick={onOpen}>
                <span> Add User</span>
              </button>
            </>
          ) : (
            ""
          )}
        </div>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add User to Channel</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form>
                <FormLabel>Add members:</FormLabel>
                <AsyncSelect
                  // defaultValue={messageRecipient}
                  onChange={handleSelectUser}
                  loadOptions={loadOptions}
                  isMulti
                />
              </form>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost" onClick={handleSaveNewUser}>
                Add User
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
      <div className="conversation-display-container">
        {conversation.map((message) => {
          return (
            <div
              className={
                message.sender.id === currentUser.id
                  ? "conversation-line-sender"
                  : "conversation-line-receiver"
              }
            >
              <div
                className={
                  message.sender.id === currentUser.id
                    ? "conversation-bubble-sender"
                    : "conversation-bubble-receiver"
                }
              >
                <p key={message.id}>
                  <span id="message-sender-uid">{message.sender.uid}</span>
                  <br></br>
                  {message.body}
                  <br></br>
                  <span>sent on: </span>
                  {message.created_at}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="conversation-new-message-container">
        <form onSubmit={handleSendMessage}>
          <InputGroup>
            <Input
              type="text"
              onChange={handleMessageChange}
              value={newMessage}
            />
            <InputRightAddon>
              <button type="submit">
                <LuSendHorizonal />
              </button>
            </InputRightAddon>
          </InputGroup>
        </form>
      </div>
    </>
  );
}
