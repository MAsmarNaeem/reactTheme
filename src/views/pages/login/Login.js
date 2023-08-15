import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  const [logindata, setlogindata] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate()

  const [error, seterror] = useState({})

  const getdata = (e) => {
    const { value, name } = e.target
    console.log('getting value is :', value)

    setlogindata((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const submitbutton = (e) => {
    e.preventDefault()
    const { email, password } = logindata

    axios
      .post(`${process.env.REACT_APP_API_URL}v1/user/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        // localStorage.setItem('token', response.user.token)
        navigate('/dashboard')
        console.log('response is :', response)
      })

      .catch((error) => {
        seterror({ Error: error.response.data.message })
        console.log('Error response:', error.response)
      })
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>

                    <p className="text-medium-emphasis">Sign In to your account</p>
                    {error.Error && (
                      <Alert variant="danger" className="w-80 ">
                        {error.Error}
                      </Alert>
                    )}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        onChange={getdata}
                        value={logindata.email}
                        name="email"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={getdata}
                        name="password"
                        value={logindata.password}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={submitbutton}>
                          Login
                        </CButton>
                      </CCol>

                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login