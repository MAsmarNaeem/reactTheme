import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { CButton } from '@coreui/react'
import PaginationComponent from '../pagination/pagination'
import ListTypeModel from './ListTypeModel'

import { AiOutlineEdit } from 'react-icons/ai'
const PropertyList = () => {
  const [usersList, setUsersList] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setPageCount] = useState('')
  const token = localStorage.getItem('token')
  const get_users_list = (page) => {
    const config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    axios
      .get(
        `${process.env.REACT_APP_API_URL}v1/admin/property-type?per_page=15&page=${page}`,
        config,
      )
      .then((response) => {
        setUsersList(response.data.data)

        setPageCount(Math.ceil(response.data.meta.total / response.data.meta.per_page))
      })
      .catch((error) => {
        console.error('Error fetching user list:', error)
      })
  }
  useEffect(() => {
    // eslint-disable-next-line
    //  GetProducts(currentPage);
    // eslint-disable-next-line

    get_users_list(currentPage)
    // eslint-disable-next-line
  }, [currentPage])
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  return (
    <div className="container" style={{ marginTop: '70px' }}>
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header d-flex">
              <div>Property List Types</div>
              <div className="d-flex text-center " style={{ paddingLeft: '800px' }}>
                <CButton>
                  <ListTypeModel name="Add" />
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
                    <th>Action</th>
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
                        <ListTypeModel
                          id={user.id}
                          name={<AiOutlineEdit />}
                          className="ms-2"
                          show={false}
                        />
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
