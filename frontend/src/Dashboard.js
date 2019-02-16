import React, { Component } from 'react';
import HeartBeat from './Heartbeat';
import _ from 'lodash';
import logo from './logo.svg';

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.interval = null;
        this.state = {
            data: { "heartBeat": 75 },
            prev: {
                "heartBeat": [['x', 'y']]
            },
            user:{

            }
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    

    getHeartBeat(rate) {
        let d = new Date();
        let time = d.getHours()+ ":" + d.getMinutes() + ":" + d.getSeconds();
        return [
            time,
            parseInt(rate)
        ]
    }

    getCurrentHeartBeat(){
        let len = this.state.prev.heartBeat.length;
        return this.state.prev.heartBeat[len-1][1];
    }

    componentDidMount() {
        this.interval = setInterval(async () => {
            let response = await fetch('https://9d7e18d3.ngrok.io/values');
            let sensorValues = await response.json();
            let user = sensorValues.values.userProfile;
            console.log(user);
            let prevBeats = this.state.prev.heartBeat;
            let addBeats = this.getHeartBeat(sensorValues.values.hrm.heartRate);
            let newHeartBeats = _.concat(prevBeats, [addBeats]);

            this.setState({
                prev: {
                    "heartBeat": newHeartBeats
                },
                user
            })
        }, 2000);

    }

    render() {
        return (
            <div id="wrapper">
                {/* <!-- Sidebar --> */}
        
                {/* <!-- End of Sidebar --> */}

                {/* <!-- Content Wrapper --> */}
                <div id="content-wrapper" className="d-flex flex-column">

                    {/* <!-- Main Content --> */}
                    <div id="content">

                        {/* <!-- Topbar --> */}
                        
                        {/* <!-- End of Topbar --> */}

                        {/* <!-- Begin Page Content --> */}
                        <div className="container-fluid mt-3">

                            {/* <!-- Page Heading --> */}
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                                <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i className="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
                            </div>

                            {/* <!-- Content Row --> */}
                            <div className="row">
                              
                                {/* <!-- Earnings (Monthly) Card Example --> */}
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-primary shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Height</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.user.height}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* <!-- Earnings (Monthly) Card Example --> */}
                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-success shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">Weight</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.user.weight}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-primary shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">BMR</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.user.bmr}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-left-primary shadow h-100 py-2">
                                        <div className="card-body">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">AGE</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{this.state.user.age}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                

                            </div>

                            {/* <!-- Content Row --> */}

                            <div className="row">

                                {/* <!-- Area Chart --> */}
                                <div className="col-xl-8 col-lg-7">
                                    <div className="card shadow mb-4">
                                        {/* <!-- Card Header - Dropdown --> */}
                                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                            <h6 className="m-0 font-weight-bold text-primary">Realtime Heart Rate</h6>
                                            <div className="dropdown no-arrow">
                                                <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                                                    <div className="dropdown-header">Dropdown Header:</div>
                                                    <a className="dropdown-item" href="#">Action</a>
                                                    <a className="dropdown-item" href="#">Another action</a>
                                                    <div className="dropdown-divider"></div>
                                                    <a className="dropdown-item" href="#">Something else here</a>
                                                </div>
                                            </div>
                                        </div>
                                        <HeartBeat data={this.state.prev.heartBeat}></HeartBeat>
                                        {/* <!-- Card Body -->
                                        <div className="card-body">
                                            <div className="chart-area">
                    
                                                
                                               
                                            </div>
                                        </div> */}
                                    </div>
                                </div>

                                {/* <!-- Pie Chart --> */}
                                <div className="col-xl-4 col-lg-5">
                                    <div className="card shadow mb-4">
                                        {/* <!-- Card Header - Dropdown --> */}
                                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                            <h6 className="m-0 font-weight-bold text-primary">BPM</h6>
                                            <div className="dropdown no-arrow">
                                                <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                                                    <div className="dropdown-header">Dropdown Header:</div>
                                                    <a className="dropdown-item" href="#">Action</a>
                                                    <a className="dropdown-item" href="#">Another action</a>
                                                    <div className="dropdown-divider"></div>
                                                    <a className="dropdown-item" href="#">Something else here</a>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <!-- Card Body --> */}
                                        <div className="card-body">
                                            <div className="chart-pie pt-4 pb-2 d-flex justify-content-center">
                                                <i style={{"color":"red", "fontSize":"12em"}} className="far fa-heart"></i>
                                            </div>
                                            <div className="mt-4 text-center">
                                                <p className="font-weight-bold" style={{"fontSize":"30px"}}>
                                                    {this.getCurrentHeartBeat()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Content Row --> */}
                            <div className="row">

                                {/* <!-- Content Column --> */}
                                <div className="col-lg-6 mb-4">

                                    {/* <!-- Project Card Example --> */}
                                    <div className="card shadow mb-4">
                                        <div className="card-header py-3">
                                            <h6 className="m-0 font-weight-bold text-primary">Projects</h6>
                                        </div>
                                        <div className="card-body">
                                            <h4 className="small font-weight-bold">Server Migration <span className="float-right">20%</span></h4>
                                            <div className="progress mb-4">
                                                <div className="progress-bar bg-danger" role="progressbar" style={{"width": "20%"}} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <h4 className="small font-weight-bold">Sales Tracking <span className="float-right">40%</span></h4>
                                            <div className="progress mb-4">
                                                <div className="progress-bar bg-warning" role="progressbar" style={{"width": "40%"}} aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <h4 className="small font-weight-bold">Customer Database <span className="float-right">60%</span></h4>
                                            <div className="progress mb-4">
                                                <div className="progress-bar" role="progressbar" style={{"width": "60%"}} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <h4 className="small font-weight-bold">Payout Details <span className="float-right">80%</span></h4>
                                            <div className="progress mb-4">
                                                <div className="progress-bar bg-info" role="progressbar" style={{"width": "80%"}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <h4 className="small font-weight-bold">Account Setup <span className="float-right">Complete!</span></h4>
                                            <div className="progress">
                                                <div className="progress-bar bg-success" role="progressbar" style={{"width": "100%"}} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <!-- Color System --> */}
                                    <div className="row">
                                        <div className="col-lg-6 mb-4">
                                            <div className="card bg-primary text-white shadow">
                                                <div className="card-body">
                                                    Primary
                      <div className="text-white-50 small">#4e73df</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 mb-4">
                                            <div className="card bg-success text-white shadow">
                                                <div className="card-body">
                                                    Success
                      <div className="text-white-50 small">#1cc88a</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 mb-4">
                                            <div className="card bg-info text-white shadow">
                                                <div className="card-body">
                                                    Info
                      <div className="text-white-50 small">#36b9cc</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 mb-4">
                                            <div className="card bg-warning text-white shadow">
                                                <div className="card-body">
                                                    Warning
                      <div className="text-white-50 small">#f6c23e</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 mb-4">
                                            <div className="card bg-danger text-white shadow">
                                                <div className="card-body">
                                                    Danger
                      <div className="text-white-50 small">#e74a3b</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 mb-4">
                                            <div className="card bg-secondary text-white shadow">
                                                <div className="card-body">
                                                    Secondary
                      <div className="text-white-50 small">#858796</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="col-lg-6 mb-4">

                                    {/* <!-- Illustrations --> */}
                                    <div className="card shadow mb-4">
                                        <div className="card-header py-3">
                                            <h6 className="m-0 font-weight-bold text-primary">Illustrations</h6>
                                        </div>
                                        <div className="card-body">
                                            <div className="text-center">
                                                <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{"width": "25rem"}} src="img/undraw_posting_photo.svg" alt="" />
                                            </div>
                                            <p>Add some quality, svg illustrations to your project courtesy of <a target="_blank" rel="nofollow" href="https://undraw.co/">unDraw</a>, a constantly updated collection of beautiful svg images that you can use completely free and without attribution!</p>
                                            <a target="_blank" rel="nofollow" href="https://undraw.co/">Browse Illustrations on unDraw &rarr;</a>
                                        </div>
                                    </div>

                                    {/* <!-- Approach --> */}
                                    <div className="card shadow mb-4">
                                        <div className="card-header py-3">
                                            <h6 className="m-0 font-weight-bold text-primary">Development Approach</h6>
                                        </div>
                                        <div className="card-body">
                                            <p>SB Admin 2 makes extensive use of Bootstrap 4 utility classes in order to reduce CSS bloat and poor page performance. Custom CSS classes are used to create custom components and custom utility classes.</p>
                                            <p className="mb-0">Before working with this theme, you should become familiar with the Bootstrap framework, especially the utility classes.</p>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                        {/* <!-- /.container-fluid --> */}

                    </div>
                    {/* <!-- End of Main Content --> */}

                    {/* <!-- Footer --> */}
                    <footer className="sticky-footer bg-white">
                        <div className="container my-auto">
                            <div className="copyright text-center my-auto">
                                <span>Copyright &copy; Your Website 2019</span>
                            </div>
                        </div>
                    </footer>
                    {/* <!-- End of Footer --> */}

                </div>
                {/* <!-- End of Content Wrapper --> */}

            </div>
            //  <!-- End of Page Wrapper --> 


        
    )
    }
}

export default Dashboard;