import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = (props) => {
  const { Component } = props
  const navigate = useNavigate()
  console.log("components are :",Component);

  useEffect(() => {
    let login = localStorage.getItem('token')
    let pathname = sessionStorage.getItem('pathname')
    if (!login) {
      navigate('/login')
    }
  })

  return (
    <div>
      <Component />
    </div>
  )
}

ProtectedRoute.propTypes = {
  Component: PropTypes.elementType.isRequired,
}

export default ProtectedRoute
