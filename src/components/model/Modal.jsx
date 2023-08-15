import React, { useState } from 'react'
import { Modal, Form, Button, Alert, Spinner } from 'react-bootstrap'
import axios from 'axios'
import Dropdown from 'react-bootstrap/Dropdown'

const UserProfileModal = (props) => {
  const [show, setShow] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [propertyData, setPropertyData] = useState({
    type: '',
    title: '',
    totalPrice: '',
    address: '',
    city: '',
    state: '',
    numberOfFloors:'',
    view:''
  })
  console.log('modal state is :', show)

  const [showSpinner, setShowSpinner] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => {
    getUserData()
    setShowAlert(false)
    setShow(true)
  }
  console.log('user data is is :', propertyData)

  const getUserData = async () => {
    try {
      //   const response = await axios.get(
      //     `${process.env.REACT_APP_API_URL}v1/admin/properties`
      //   );
      //   const userData = 0;

      setPropertyData({
        title: propertyData.title,
        totalPrice: propertyData.totalPrice,
        address: propertyData.address,
        city: propertyData.city,
        state: propertyData.state,
        numberOfFloors:propertyData.numberOfFloors,
        view:propertyData.view
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
    //setShowAlert(true);
    setShowSpinner(true)
    const { title, totalPrice, address, city, state,numberOfFloors } = propertyData
    console.log('title is :', title)
    axios
      .post(`${process.env.REACT_APP_API_URL}v1/admin/properties`, {
        title: title,
        totalPrice: totalPrice,
        address: address,
        city: city,
        state: state,
        numberOfFloors:numberOfFloors
      })
      .then((response) => {
        console.log('response is :', response)
        // console.log("name is :", response.data.firstName);
        // console.log("last is :", response.data.lastName);
        // console.log("age is :", response.data.age);
        // console.log("email is :", response.data.email);
        // console.log("user gender is :", response.data.gender);

        if (response.status === 200) {
          setTimeout(() => {
            setShowSpinner(false)
            setShowAlert(true)
          }, 300)
        }
      })
      .catch((error) => {
        console.error('Error updating user profile:', error)
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
                Updated Data successfully
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
                type="number"
                placeholder="Number of Floors"
                autoFocus
                name="state"
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
