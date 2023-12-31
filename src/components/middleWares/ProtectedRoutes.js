import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = (props) => {
  const { Component } = props
  const navigate = useNavigate()
 

  useEffect(() => {
    let login = localStorage.getItem('token')

    if (!login) {
      navigate('/login')
    }
  },[navigate])

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
