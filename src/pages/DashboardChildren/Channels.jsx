import {
  Input,
  FormLabel,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";
import { BASE_URL } from "../../utilities/ConstList";
import { useState, useEffect } from "react";
import AsyncSelect from "react-select/async";
import { useMemo } from "react";
import "../../css/Messages.css";

async function fetchAllChannels(headers) {
  try {
    const data = await fetch(`${BASE_URL}/channels`, {
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    });

    const res = await data.json();
    if (res.errors) {
      throw res.errors.full_messages[0];
    } else {
      return res;
    }
  } catch (error) {
    console.error(error);
  }
}

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

export default function Channels() {
  const headers = JSON.parse(localStorage.getItem("headers") || "{}");
  const [channels, setChannels] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userList, setUserList] = useState([]);
  const [channelName, setChannelName] = useState("");
  const [channelMembers, setChannelMembers] = useState([]);
  const options = useMemo(() => {
    return userList.map((user) => ({
      value: user.id,
      label: user.email,
    }));
  }, [userList]);

  async function getAllChannels() {
    const data = await fetchAllChannels(headers);
    console.log(data);
    setChannels(data.data);
  }

  async function getCurrentUserList() {
    const data = await getAllUsers(headers);
    console.log(data);
    setUserList(data.data);
  }

  useEffect(() => {
    if (headers) {
      getAllChannels();
      getCurrentUserList();
    }
  }, []);

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

  const handleSelectMembers = (e) => {
    setChannelMembers(e.map((member) => member.value));
  };

  async function saveChannel(headers, body) {
    try {
      const data = await fetch(`${BASE_URL}/channels`, {
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

  async function handleSaveChannel() {
    const data = await saveChannel(headers, {
      name: channelName,
      user_ids: channelMembers,
    });
    getAllChannels();
    onClose();
  }

  function handleInputChange(e) {
    setChannelName(e.target.value);
  }

  return (
    <>
      <div className="messages-container">
        <div className="messsages-directory">
          <div className="message-directory-header">
            <h1>Channels</h1>
          </div>

          <Button onClick={onOpen}>Create New Channel</Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create a Channel</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form>
                  <FormLabel>Channel Name:</FormLabel>
                  <Input type="text" onChange={handleInputChange}></Input>
                  <FormLabel>Add members:</FormLabel>
                  <AsyncSelect
                    // defaultValue={messageRecipient}
                    onChange={handleSelectMembers}
                    loadOptions={loadOptions}
                    isMulti
                  />
                </form>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button variant="ghost" onClick={handleSaveChannel}>
                  Save Channel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Input
            type="text"
            placeholder="add searchbar functionality here"
          ></Input>
          <h1>Display channels here</h1>
          <div className="conversation-list">
            {channels.map((channel) => (
              <Link key={channel.id} to={`${channel.id}`}>
                {channel.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="conversation-display">
          <Outlet />
        </div>
      </div>
    </>
  );
}
