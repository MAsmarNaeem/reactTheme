import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { CButton } from '@coreui/react'
import Modal from './subTypesModel'
const PropertyList = () => {
  const [usersList, setUsersList] = useState([])
  const get_users_list = () => {
    const token = localStorage.getItem('token')

    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    axios
      .get(`${process.env.REACT_APP_API_URL}v1/admin/property-subtype`, config)
      .then((response) => {
        setUsersList(response.data.data)
      })
      .catch((error) => {
        console.error('Error fetching user list:', error)
      })
  }

  useEffect(() => {
    get_users_list()
  }, [])
  console.log('users List :', usersList)
  return (
    <div className="container" style={{ marginTop: '70px' }}>
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header d-flex">
              <div>Property List</div>
              <div className="d-flex text-center " style={{ paddingLeft: '850px' }}>
                <CButton color="dark">
                  <Modal />
                </CButton>
              </div>
            </div>

            <div className="card-body">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList.map((user, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.title}</td>
                      <td>{user.description}</td>
                      <td>{user.type.title}</td>

                      <td className="d-flex">
                        {/* <UserProfileModal id={user.id} name={<AiOutlineEdit />} className="ms-2" show={false}/> */}
                        {/* <div variant="none" onClick={() => deleteUser(user.id)}> */}

                        {/* <AiFillDelete className="text-danger ms-3"  show="false" style={{cursor:"pointer"}}/>
                    
                  </div> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyList
