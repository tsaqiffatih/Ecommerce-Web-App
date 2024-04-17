import React, { useState } from 'react';
import reactLogo from '../assets/react.svg'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

/**
di tulisan logout, buat jadi dinamis, saat sudah login maka tulisan log 

 */

function NavbarComponent() {
    const [openBasic, setOpenBasic] = useState(false);
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
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-auto">
                        <Link to={"/"} className="navbar-brand" >
                            <img src={reactLogo} className="logo react" alt="React logo" style={{ marginRight: '5px' }} />
                            Hactiv Grocery
                        </Link>
                    </div>
                </div>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    onClick={() => setOpenBasic(!openBasic)}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={"collapse navbar-collapse" + (openBasic ? ' show' : '')} id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to={"/"}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to={"/add-grocery"}>Add</Link>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <button className="btn btn-outline-success" type='button' onClick={HandleLogout} >Logout</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default NavbarComponent;