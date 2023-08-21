import React, { useState } from 'react'
import { Modal, Form, Button, Alert, Spinner } from 'react-bootstrap'
import axios from 'axios'
import Dropdown from 'react-bootstrap/Dropdown'
import { useNavigate } from 'react-router-dom'

const UserProfileModal = (props) => {
  const [show, setShow] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [message, setMessage] = useState('')
  const [propertyData, setPropertyData] = useState({
    id: '',
    title: '',
    description: '',
  })
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  console.log('modal state is :', show)

  const [showSpinner, setShowSpinner] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => {
    if (!token) {
      navigate('/login')
    }
    getUserData()
    setShowAlert(false)
    setShow(true)
  }
  console.log('user data is is :', propertyData)

  const getUserData = async () => {
    try {
      setPropertyData({
        id: propertyData.id,
        title: propertyData.title,
        description: propertyData.description,
      })
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target

    setPropertyData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const updateUserProfile = () => {
    setShowAlert(true)
    setShowSpinner(true)
    const { id, description, title } = propertyData
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    axios
      .post(
        `${process.env.REACT_APP_API_URL}v1/admin/property-subtype`,

        {
          property_type_id: id,
          description: description,
          title: title,
        },
        config,
      )
      .then((response) => {
        console.log('response is :', response)
        if (response.status === 201) {
          setTimeout(() => {
            setShowSpinner(false)
            setShowAlert(true)
            setMessage(response.data.message)
          }, 10)
        }
      })
      .catch((error) => {
        console.error('Error updating user profile:', error)
        setMessage(error.response.data.message)
        setShowSpinner(false)
      })
  }

  return (
    <div>
      <>
        <Dropdown.Item className="cursor" onClick={handleShow}>
          Add
        </Dropdown.Item>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Property</Modal.Title>
          </Modal.Header>
          {showAlert && (
            <>
              <Alert key="success" variant="success">
                {message}
              </Alert>
            </>
          )}
          <Modal.Body>
            <Form>
              <Form.Group className="" controlId="exampleForm.ControlInput1">
                <Form.Label>id</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="id"
                  autoFocus
                  name="id"
                  value={propertyData.id}
                  onChange={handleInputChange}
                />
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="description"
                  autoFocus
                  name="description"
                  value={propertyData.description}
                  onChange={handleInputChange}
                />
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  autoFocus
                  name="title"
                  value={propertyData.title}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={updateUserProfile}>
              Save
              {showSpinner ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  style={{ marginLeft: '5px' }}
                />
              ) : null}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  )
}

export default UserProfileModal
