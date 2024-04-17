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
import {LocalRequest} from '../../utils/axios';
import Swal from 'sweetalert2';

function LoginPage() {
  const [input, setInput] = useState({
    email: '',
    password: ''
  })

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const navigate = useNavigate()

  const handleForm = async (e) => {

    e.preventDefault()
    try {
      const { data } = await LocalRequest({
        method: 'post',
        url: '/login',
        data: input
      })

      // console.log(data.access_token);
      localStorage.setItem('access_token', data.access_token)

      navigate("/")
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: error.response.data.message
      })
    }
  }

  return (
    <MDBContainer fluid>
      <MDBRow>

        <MDBCol sm='6' className='d-none d-sm-block px-0'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
            alt="Login image" className="w-100" style={{ objectFit: 'cover', objectPosition: 'left' }} />
        </MDBCol>

        <MDBCol sm='6'>

          <div className='d-flex flex-row ps-5 pt-5'>
            <img className='logo react' src={reactLogo} alt='reactLogo' style={{ color: '#709085' }} />
            <span className="h1 fw-bold mb-0">Hactiv Grocery</span>
          </div>

          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{ letterSpacing: '1px' }}>Login</h3>

            <form onSubmit={handleForm}>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Email address' id='email' type='email' size="lg" name='email' onChange={handleInput} />

              <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Password' id='password' type='password' size="lg" name='password' onChange={handleInput} />

              <MDBBtn type='submit' className="mb-4 px-5 mx-5 w-100" color='info' size='lg'>Login</MDBBtn>
            </form>

  
            <p className='ms-5'>Does not have an account? <Link to={"/register"}>
              Register here
            </Link></p>

          </div>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default LoginPage;