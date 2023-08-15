import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { CButton } from '@coreui/react'
import Modal from "../../components/model/Modal"
const PropertyList = () => {
  const [usersList, setUsersList] = useState([])
  const get_users_list = () => {
    axios.get(`${process.env.REACT_APP_API_URL}v1/admin/properties`).then((response) => {
      //   console.log("response : ",response);
      //console.log("response:", response.data.users);
      // setPageCount(Math.ceil(response.data.total / rowsPerPage));
      setUsersList(response.data.data)
    })
  }

  useEffect(() => {
    // eslint-disable-next-line
    //  GetProducts(currentPage);
    // eslint-disable-next-line

    get_users_list()
    // eslint-disable-next-line
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
                <CButton color="dark"><Modal/></CButton>
                
              </div>
            </div>

            <div className="card-body">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Total Value</th>
                    <th>address</th>
                    <th>city</th>
                    <th>State</th>
                    <th>Action</th>

                  </tr>
                </thead>
                <tbody>
            {usersList.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.title}</td>
                <td>{user.total_value_of_property}</td>
                <td>{user.address}</td>
                <td>{user.city}</td>
                <td>{user.state}</td>
                <td>{user.gender}</td>
                <td>{user.age}</td>

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
