import { Navbar, Dropdown, Avatar } from "flowbite-react";
import { DarkThemeToggle, useThemeMode } from "flowbite-react";
import reactLogo from '../assets/react.svg'
import { Link } from "react-router-dom";

function NavbarComponent() {
  const { toggleMode } = useThemeMode();

  return (
    <Navbar fluid className="border-b-4 border-blue-500 dark:border-gray-600">
      <Navbar.Brand href="https://flowbite-react.com">
        <img src={reactLogo} className="mr-3 h-6 sm:h-9" alt="Flowbite" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Let's Shop</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <DarkThemeToggle />
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">name@flowbite.com</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />

      </div>
      <Navbar.Collapse>

        {/* <Link to={'/'}> */}
          <Navbar.Link >Home</Navbar.Link>
        {/* </Link> */}

        {/* <Link > */}
          <Navbar.Link >My Order</Navbar.Link>
        {/* </Link> */}

        {/* <Link> */}
          <Navbar.Link href="#">Pricing</Navbar.Link>
        {/* </Link> */}

        {/* <Link> */}
          <Navbar.Link href="#">Contact</Navbar.Link>
        {/* </Link> */}

      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComponent;