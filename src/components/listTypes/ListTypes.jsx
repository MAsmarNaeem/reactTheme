import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { CButton } from '@coreui/react'
import Modal from '../../components/listTypeModel/ListTypeModel'
const PropertyList = () => {
  const [usersList, setUsersList] = useState([])
  const get_users_list = () => {
    axios.get(`${process.env.REACT_APP_API_URL}v1/admin/property-type?per_page=15&page=1`).then((response) => {
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
              <div>Property List Types</div>
              <div className="d-flex text-center " style={{ paddingLeft: '800px' }}>
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
                    <th>Created At</th>
                    <th>Updated At</th>
                   
                  </tr>
                </thead>
                <tbody>
                  {usersList.map((user, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.title}</td>
                      <td>{user.description}</td>
                      <td>{user.created_at}</td>
                      <td>{user.updated_at}</td>

                

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
