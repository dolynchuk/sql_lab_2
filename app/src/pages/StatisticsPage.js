import React, {Component} from 'react';
import Statistics from 'components/Statistics';

export default class extends Component {
  render(){
    return (
      <div>
        <div
          style={{
            maxWidth: 1000,
            margin: '0 auto'
          }}
        >
          <Statistics/>
        </div>
      </div>
    );
  }
}
