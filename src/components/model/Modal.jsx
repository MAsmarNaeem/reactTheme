import React, { useState } from 'react'
import { Modal, Form, Button, Alert, Spinner } from 'react-bootstrap'
import axios from 'axios'
import Dropdown from 'react-bootstrap/Dropdown'
import { useNavigate } from 'react-router-dom'

const UserProfileModal = (props) => {
  const [show, setShow] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const[message,setMessage]=useState("")
  const [propertyData, setPropertyData] = useState({
    type: '',
    title: '',
    totalPrice: '',
    address: '',
    city: '',
    state: '',
    numberOfFloors: '',
    view: '',
    numberofcars: '',
    country: '',
    postalcode: '',
  })
  console.log('modal state is :', show)
  const navigate=useNavigate()
  const token=localStorage.getItem('token')

  const [showSpinner, setShowSpinner] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => {
    if(!token)
    {
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
        title: propertyData.title,
        totalPrice: propertyData.totalPrice,
        address: propertyData.address,
        city: propertyData.city,
        state: propertyData.state,
        numberOfFloors: propertyData.numberOfFloors,
        view: propertyData.view,
        type: propertyData.type,
        postalcode: propertyData.postalcode,
        numberofcars: propertyData.numberofcars,
        country: propertyData.country,
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
    setShowAlert(true);
    setShowSpinner(true)
    const {
      type,
      title,
      totalPrice,
      address,
      city,
      state,
      numberOfFloors,
      view,
      numberofcars,
      country,
      postalcode,
    } = propertyData
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
  
    axios
      .post(`${process.env.REACT_APP_API_URL}v1/admin/properties`, {
        property_type: type,
        title: title,
        total_value_of_property: totalPrice,
        address,
        address,
        city: city,
        state: state,
        country: country,
        postal_Code: postalcode,
        no_of_cars: numberofcars,
        view: view,
        no_of_floors: numberOfFloors,
      },config)
      .then((response) => {
        console.log('response is :', response)
      

        if (response.status === 200) {
          setTimeout(() => {
            setShowSpinner(false)
            setShowAlert(true)
            setMessage("Added data successfully")
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
                <Form.Label>Property Type</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Property type"
                  autoFocus
                  name="type"
                  value={propertyData.type}
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
              <Form.Group className="" controlId="exampleForm.ControlInput1">
                <Form.Label>Total Value</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="TotalPrice"
                  autoFocus
                  name="totalPrice"
                  value={propertyData.value}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="" controlId="exampleForm.ControlInput2">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="address"
                  placeholder="Address"
                  autoFocus
                  name="address"
                  value={propertyData.address}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="" controlId="exampleForm.ControlInput2">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City"
                  autoFocus
                  name="city"
                  value={propertyData.city}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="state"
                autoFocus
                name="state"
                value={propertyData.state}
                onChange={handleInputChange}
              />
              <Form.Label>Number of floors</Form.Label>
              <Form.Control
                type="text"
                placeholder="Number of Floors"
                autoFocus
                name="numberOfFloors"
                value={propertyData.numberOfFloors}
                onChange={handleInputChange}
              />
              <Form.Label>view</Form.Label>
              <Form.Control
                type="text"
                placeholder="view"
                autoFocus
                name="view"
                value={propertyData.view}
                onChange={handleInputChange}
              />
              <Form.Label>Number of Cars</Form.Label>
              <Form.Control
                type="text"
                placeholder="number of cars"
                autoFocus
                name="numberofcars"
                value={propertyData.numberofcars}
                onChange={handleInputChange}
              />
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Country"
                autoFocus
                name="country"
                value={propertyData.country}
                onChange={handleInputChange}
              />
              <Form.Label>postal code</Form.Label>
              <Form.Control
                type="text"
                placeholder="postal code"
                autoFocus
                name="postalcode"
                value={propertyData.postalcode}
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
