import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
  from 'mdb-react-ui-kit';
import reactLogo from '../../assets/react.svg'
import '../../App.css'
import './Authentication.css'
import { Link, useNavigate } from 'react-router-dom'
import { LocalRequest } from '../../utils/axios';
import Swal from 'sweetalert2'

function RegisterPage() {
  const [input, setInput] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const handleForm = async (e) => {
    e.preventDefault()
    try {

      await LocalRequest({
        method: 'post',
        url: '/register',
        data: input
      })

      navigate("/login")
      // console.log('berhasil!!!')

    } catch (error) {
      console.log(error.response)
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: `${error.response.data.message}!!!`
      })
    }
  }


  return (
    <MDBContainer fluid>
      <MDBRow>

        <MDBCol sm='6'>

          <div className='d-flex flex-row ps-5 pt-5'>
            <img className='logo react' src={reactLogo} alt='reactLogo' style={{ color: '#709085' }} />
            <span className="h1 fw-bold mb-0">Hactiv Grocery</span>
          </div>

          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px' }}>Register</h3>

            <form onSubmit={handleForm}>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Email address' id='email' type='email' size="lg" name='email' onChange={handleChange} />

              <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Password' id='password' type='password' size="lg" name='password' onChange={handleChange} />

              <MDBBtn type='submit' className="mb-4 px-5 mx-5 w-100" color='info' size='lg'>Register</MDBBtn>
            </form>

            <p className='ms-5'>already have an account?
              <Link to={"/login"} className="link-info">
                Login here
              </Link>
            </p>

          </div>

        </MDBCol>

        <MDBCol sm='6' className='d-none d-sm-block px-0'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
            alt="Login image" className="w-100" style={{ objectFit: 'cover', objectPosition: 'left' }} />
        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default RegisterPage;