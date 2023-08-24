import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { CButton } from '@coreui/react'
import PaginationComponent from '../pagination/pagination'
import { AiOutlineEdit } from 'react-icons/ai'

import ListFloorModel from './ListFloorModel'
const PropertyList = () => {
  const [usersList, setUsersList] = useState([])
  const [currentPage, setCurrentPage] = useState(1); 
  const[pageCount,setPageCount]=useState("")
  const token = localStorage.getItem('token')

  const get_users_list = async (page) => {
    try {
      const config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}v1/admin/property-floor?page=${page}`,
        config,
      )
     //  console.log("response is :",response.data.total);
     setPageCount(Math.ceil(response.data.total /response.data.per_page))
      setUsersList(response.data.data)
    } catch (error) {
      console.error('Error fetching property list:', error)
    }

  }

  useEffect(() => {
    // eslint-disable-next-line
    //  GetProducts(currentPage);
    // eslint-disable-next-line

    get_users_list(currentPage)
    // eslint-disable-next-line
  }, [currentPage])
  const handlePageChange = (newPage) => {
   
    setCurrentPage(newPage);
  };
  return (
    <div className="container" style={{ marginTop: '70px' }}>
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header d-flex">
              <div>Property Floor</div>
              <div className="d-flex text-center " style={{ paddingLeft: '850px' }}>
                <CButton color="dark">
                  <ListFloorModel name="Add"/>
                </CButton>
              </div>
            </div>

            <div className="card-body">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Number of Floors</th>
                    <th>size of Floors</th>
                    <th>Type</th>
                    <th>Estimated value</th>
                    <th>Actual value</th>
                    <th>Map</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList.map((user, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.no_of_floor}</td>
                      <td>{user.size_of_floor}</td>
                      <td>{user.type}</td>
                      <td>{user.estimated_value}</td>
                      <td>{user.actual_value}</td>

                      <td>{user.map}</td>
                      <td className="d-flex">
                        <ListFloorModel
                          id={user.id}
                          name={<AiOutlineEdit />}
                          className="ms-2"
                          show={false}
                        />
                        </td>

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
              <PaginationComponent
                currentPage={currentPage}
                onPageChange={handlePageChange}
                pageCount={pageCount}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyList
