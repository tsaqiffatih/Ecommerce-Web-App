import NavbarComponent from "./Navbar";
import { Outlet } from 'react-router-dom'


function MainLayout() {
    return (
        <>
            <NavbarComponent />
            <Outlet/>
        </>
    )
}

export default MainLayout;