import React from 'react';
import axios from 'axios';

export default class Acapy extends React.Component {
  state = {
    connections: []
  }

  componentDidMount() {
    this.loadConnections();
  }

  loadConnections() {
    axios.get('http://100.26.108.183:3000/control/')
      .then(res => {
        const connections = res.data.results;
        console.log(connections);
        this.setState({ connections });
      })
      .catch(error => {
        console.error(error);
      })
  }

  acceptrequest(connection_id) {
    axios.post('http://100.26.108.183:3000/control/acceptrequest', {"connection_id": connection_id})
      .then(res => {
        const connections = res.data.results;
        console.log(connections);
      })
      .catch(error => {
        console.error(error);
      })

  }

  render() {
    return (
      <ul>
        {
          this.state.connections
            .map(connection =>
              <li key={connection.connection_id}> 
                Connection_id={connection.connection_id} 
                state={connection.rfc23_state}
                {connection.rfc23_state==="request-received"? <button onClick={() => this.acceptrequest(connection.connection_id)}>Accept</button> : <br/>}
              </li>
            )
        }
      </ul>
    )
  }
}