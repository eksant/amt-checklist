import React, { Component } from 'react'

class Dashboard extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <img
          src={require('../../assets/img/brand/logo-symbol.png')}
          alt="logo-pertamina"
          align="middle"
          style={{
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            height: 'auto',
            width: '100%',
            maxWidth: '450px',
          }}
        />
      </div>
    )
  }
}

export default Dashboard
