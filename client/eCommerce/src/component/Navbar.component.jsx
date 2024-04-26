import { Navbar, Dropdown, Avatar } from "flowbite-react";
import { DarkThemeToggle, useThemeMode } from "flowbite-react";
import Swal from "sweetalert2";
import reactLogo from '../assets/react.svg'
import { Link, useNavigate } from "react-router-dom";

function NavbarComponent() {
  const { toggleMode } = useThemeMode();

  const navigate = useNavigate()

  const HandleLogout = async () => {
    const isConfirmed = await Swal.fire({
      icon: 'question',
      title: 'Anda Yakin Mau Keluar?',
      showCancelButton: true,
      confirmButtonText: 'Ya',
      cancelButtonText: 'Tidak'
    })

    if (isConfirmed.value) {
      localStorage.removeItem('access_token')
      navigate('/login')
    } else {
      console.log('gak jadi');
    }
  }

  return (
    <Navbar fluid className="border-b-4 border-blue-500 dark:border-gray-600">
      <Navbar.Brand href="https://flowbite-react.com">

        <img src={reactLogo} className="mr-3 h-6 sm:h-9" alt="Flowbite" />

        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Let's Shop</span>

        <Navbar.Collapse style={{ marginLeft: '20px' }}>
          <Link to={'/'}>
            <Navbar.Link className="font-semibold">
              Home
            </Navbar.Link>
          </Link>
        </Navbar.Collapse>

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
          <Dropdown.Item>My Cart</Dropdown.Item>
          <Dropdown.Item>My Profile</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={HandleLogout}>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />

      </div>
    </Navbar>
  );
}

export default NavbarComponent;