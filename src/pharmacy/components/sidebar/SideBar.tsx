import { ReactNode } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Button,
  Image,
} from "@chakra-ui/react";
import { FiHome, FiStar, FiMenu } from "react-icons/fi";
import { FaWarehouse } from "react-icons/fa6";
import { MdListAlt, MdNotifications } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa";
import { IconType } from "react-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserStore } from "../../stores/user";
import pharmadistLogo from "../../assets/pharmadistLogo.jpg";

interface LinkItemProps {
  name: string;
  icon: IconType;
  url: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, url: "/" },
  { name: "Medicines", icon: FiStar, url: "/medicines" },
  { name: "Warehouses", icon: FaWarehouse, url: "/warehouses" },
  { name: "Orders", icon: MdListAlt, url: "/orders" },
  { name: "Notifications", icon: MdNotifications, url: "/notifications" },
  { name: "Cart", icon: FaCartArrowDown, url: "/cart" },
];

export default function SideBar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { logout } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  const handleLogout = () => {
    logout();
    navigate("/login"); 
    localStorage.removeItem('cart');
    
    
  };

  return (
    <Box
      minH="100vh"
      bg={useColorModeValue("white.100", "white.900")}
      w="250px"
    >
      <SidebarContent
        onClose={onClose}
        handleLogout={handleLogout}
        display={{ base: "none", md: "block" }}
        location={location} // Pass location to SidebarContent
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent
            onClose={onClose}
            handleLogout={handleLogout}
            location={location}
          />
        </DrawerContent>
      </Drawer>
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
  handleLogout: () => void;
  location: any; // Add location to SidebarProps
}

const SidebarContent = ({
  onClose,
  handleLogout,
  location,
  ...rest
}: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Box>
          <Image
            src={pharmadistLogo}
            alt="Logo"
            boxSize="200px"
            objectFit="contain"
          />
        </Box>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          to={link.url}
          isActive={location.pathname === link.url}
        >
          {link.name}
        </NavItem>
      ))}
      <NavItem
        icon={null}
        
        onClick={handleLogout}
        _hover={{ bg: "white" }}
      >
        <Button bg="red.400" color="white" _hover={{ bg: "red.500" }} w="100%">
          Logout
        </Button>
      </NavItem>
    </Box>
  );
};

interface NavItemProps {
  icon: any;
  to: string;
  children: ReactNode;
  isActive?: boolean;
}

const NavItem = ({ icon, to, children, isActive, ...rest }: NavItemProps) => {
  return (
    <Box
      as="a"
      href={to}
      display="flex"
      alignItems="center"
      p="4"
      bg={isActive ? "green.400" : "transparent"}
      color={isActive ? "white" : "inherit"}
      _hover={{ bg: "green.400", color: "white" }}
      {...rest}
    >
      {icon && <Box mr="4" as={icon} />}
      {children}
    </Box>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Image
        src={pharmadistLogo}
        alt="Logo"
        boxSize="50px"
        objectFit="contain"
        ml="8"
      />
    </Flex>
  );
};
