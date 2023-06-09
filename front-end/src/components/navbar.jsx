import {
  Button,
  Flex,
  VStack,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const onSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <VStack
      justify="space-evenly"
      align="flex-end"
      shadow="base"
      bgColor="gray.50"
      w="100vw"
      h="16"
    >
      <Flex justify="space-evenly">
        {token ? (
          <>
            <Avatar
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
              mr="2"
            />
            <Menu>
              <MenuButton as={Button} mr="2">
                Welcome, name
              </MenuButton>
              <MenuList>
                <MenuItem>User Profile</MenuItem>
                <MenuItem>Setting</MenuItem>
                <MenuItem onClick={() => onSignOut()}>Sign Out</MenuItem>
              </MenuList>
            </Menu>
          </>
        ) : (
          <>
            <Button
              onClick={() => navigate("/login")}
              rounded={"full"}
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              mr="2"
            >
              Login
            </Button>
            <Button
              mr="2"
              rounded={"full"}
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </>
        )}
      </Flex>
    </VStack>
  );
};
