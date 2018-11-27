import React, { Component } from 'react'

// const logo = require('../../assets/img/brand/logo-patraniaga.png')

class Dashboard extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        {/* <div
          style={{
            backgroundImage: `url(${logo})`,
            height: '200px',
            width: '400px',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            height: 'auto',
            width: '100%',
            maxWidth: '450px',
          }}
        /> */}
        <div style={{ height: '560px' }}>
          <img
            src={require('../../assets/img/brand/logo-patraniaga-big.png')}
            alt="logo-pertamina"
            align="middle"
            style={{
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              height: 'auto',
              width: '100%',
              maxWidth: '850px',
            }}
          />
        </div>
      </div>
    )
  }
}

export default Dashboard
