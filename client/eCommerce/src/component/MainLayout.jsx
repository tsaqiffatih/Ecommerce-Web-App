import { Outlet } from "react-router-dom";
import NavbarComponent from "./Navbar.component";


function MainLayout() {
    return (
        <>
            <NavbarComponent />
            <Outlet />
        </>
    )
}

export default MainLayout;