import React, { Component } from 'react';
import loading from '../../../public/img/loading.gif'

class Loading extends Component {
  render() {
    return (
      <div className="text-center">
        <img src={loading} alt="loading" style={{marginTop: "5%", height: "50%", width: "50%"}} />
      </div>
    )
  }
}

export default Loading;
