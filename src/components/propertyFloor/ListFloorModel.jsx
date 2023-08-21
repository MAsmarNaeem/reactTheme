import React, { useState, useEffect } from 'react'
import { Modal, Form, Button, Alert, Spinner } from 'react-bootstrap'
import axios from 'axios'
import Dropdown from 'react-bootstrap/Dropdown'
import { useNavigate } from 'react-router-dom'

const UserProfileModal = (props) => {
  const [show, setShow] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [optionsData, setOptionsData] = useState([])
  const [message, setMessage] = useState('')
  const token = localStorage.getItem('token')
  const [propertyData, setPropertyData] = useState({
    property_title: '',
    no_of_floor: '',
    size_of_floor: '',
    type: '',
    estimated_value: '',
    actual_value: '',
    map: '',
  })

  const navigate = useNavigate()
  const [showSpinner, setShowSpinner] = useState(false)
  useEffect(() => {
    fetchOptionsData()
  }, [])

  const fetchOptionsData = async () => {
    try {
      const config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}v1/admin/property-type?per_page=5&page=2`,
        config,
      )

      setOptionsData(response.data.data)
    } catch (error) {
      console.error('Error fetching options data:', error)
    }
  }

  const handleClose = () => setShow(false)
  const handleShow = () => {
    if (!token) {
      navigate('/login')
    }
    getUserData()
    setShowAlert(false)
    setShow(true)
  }

  const getUserData = async () => {
    try {
      setPropertyData({
        property_title: propertyData.property_title,
        no_of_floor: propertyData.no_of_floor,
        size_of_floor: propertyData.size_of_floor,
        type: propertyData.type,
        estimated_value: propertyData.estimated_value,
        actual_value: propertyData.actual_value,
        map: propertyData.map,
      })
    } catch (error) {
      console.error('Error fetching user data for floor:', error)
    }
  }
      console.log("property Data :",propertyData);
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
    const { property_title, no_of_floor, size_of_floor, type, estimated_value, actual_value, map } =
      propertyData

    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const requestBody = {
      property_title: property_title,
      no_of_floor: no_of_floor,
      size_of_floor: size_of_floor,
      type: type,
      estimated_value: estimated_value,
      actual_value: actual_value,
      map: map,
    }

    axios
      .post(`${process.env.REACT_APP_API_URL}v1/admin/property-floor`, requestBody, config)
      .then((response) => {
        if (response.status === 200) {
          setTimeout(() => {
            setShowSpinner(false)
            setShowAlert(true)
            setMessage('Added data successfully')
          }, 10)
        }
      })
      .catch((error) => {
        console.error('Error updating user profile for floor:', error)
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
                <Form.Label>Property Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Property title"
                  autoFocus
                  name="property_title"
                  value={propertyData.property_title}
                  onChange={handleInputChange}
                />
                <Form.Label>Number of Floors</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Number of Floors"
                  autoFocus
                  name="no_of_floor"
                  value={propertyData.no_of_floor}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="" controlId="exampleForm.ControlInput1">
                <Form.Label>size of floor</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="size of floor"
                  autoFocus
                  name="size_of_floor"
                  value={propertyData.size_of_floor}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="" controlId="exampleForm.ControlInput2">
                <Form.Label>Type</Form.Label>
                {/* <Form.Control
                  type="address"
                  placeholder="type"
                  autoFocus
                  name="type"
                  value={propertyData.type}
                  onChange={handleInputChange}
                /> */}
                <select
                  className="form-select"
                  aria-label="Select a type"
                  name="type"
                  value={propertyData.type}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    Select a type
                  </option>

                  {optionsData.map((option) => (
                    <option key={option.id} value={option.id}>
                    
                      {option.title} 
                    </option>
                  ))}
                </select>
              </Form.Group>
              <Form.Group className="" controlId="exampleForm.ControlInput2">
                <Form.Label>Estimated value</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Estimated Value"
                  autoFocus
                  name="estimated_value"
                  value={propertyData.estimated_value}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Label>Actual value</Form.Label>
              <Form.Control
                type="text"
                placeholder="Actual value"
                autoFocus
                name="actual_value"
                value={propertyData.actual_value}
                onChange={handleInputChange}
              />
              <Form.Label>Map</Form.Label>
              <Form.Control
                type="text"
                placeholder="map"
                autoFocus
                name="map"
                value={propertyData.map}
                onChange={handleInputChange}
              />
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
