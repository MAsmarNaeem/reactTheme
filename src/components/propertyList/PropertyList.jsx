import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CButton } from '@coreui/react';
import Modal from './Modal';
import PaginationComponent from '../pagination/pagination';
import { AiOutlineEdit } from 'react-icons/ai'
import PropTypes from 'prop-types'

const PropertyList = () => {
  const [usersList, setUsersList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); 
  const[pageCount,setPageCount]=useState("")
  const token = localStorage.getItem('token');

  const getPropertiesList = async (page) => {
    try {
      const config = {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}v1/admin/properties?page=${page}`,
        config
      );
     // console.log("response is :",response);
      setPageCount(Math.ceil(response.data.meta.total /response.data.meta.per_page));
      setUsersList(response.data.data);
    } catch (error) {
      console.error('Error fetching property list:', error);
    }
  };

  useEffect(() => {
    getPropertiesList(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
   
    setCurrentPage(newPage);
  };

  return (
    <div className="container" style={{ marginTop: '70px' }}>
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header d-flex">
              <div>Property List</div>
              <div className="d-flex text-center " style={{ marginLeft: 'auto' }}>
                <CButton color="dark">
                  <Modal name="Add"/>
                </CButton>
              </div>
            </div>

            <div className="card-body">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>property_type_id</th>
                    <th>Title</th>
                    <th>Total value of property</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Country</th>
                    <th>action</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList.map((property, index) => (
                    <tr key={property.id}>
                      <td>{property.id}</td>
                      <td>{property.property_type_id}</td>
                      <td>{property.title}</td>
                      <td>{property.total_value_of_property}</td>
                      <td>{property.address}</td>
                      <td>{property.city}</td>
                      <td>{property.state}</td>
                      <td>{property.country}</td>
                     
                      <td className="d-flex">
                        <Modal
                          id={property.id}
                          name={<AiOutlineEdit />}
                          className="ms-2"
                          show={false}
                        />
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
  );
};
PropertyList.propTypes = {
  name: PropTypes.string.isRequired,
  //id: PropTypes.number.isRequired,
}
export default PropertyList;
