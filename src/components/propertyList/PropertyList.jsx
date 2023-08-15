import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { CButton } from '@coreui/react'
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
              <div className="d-flex text-center " style={{ paddingLeft: '1100px' }}>
                <CButton color="dark">Add</CButton>
              </div>
            </div>

            <div className="card-body">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    {/* Add more column headers here */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Property 1</td>
                    <td>Description 1</td>
                    {/* Add more rows and data here */}
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Property 2</td>
                    <td>Description 2</td>
                  </tr>
                  {/* Add more rows and data here */}
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
