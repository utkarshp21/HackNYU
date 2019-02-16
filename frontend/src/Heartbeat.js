import React, {Component} from 'react';
import {Chart} from 'react-google-charts';

class Hearbeat extends Component {

    render(){
        return(
            <div className="row">
                <div className="col-12">
                    <Chart
                        width={'600px'}
                        height={'400px'}
                        chartType="LineChart"
                        loader={<div>Loading Chart</div>}
                        data={this.props.data}
                        options={{
                            hAxis: {
                                title: 'Time',
                            },
                            vAxis: {
                                title: 'Heart Rate',
                            },
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />
                </div>
            </div>
        )
    }
}

export default Hearbeat;