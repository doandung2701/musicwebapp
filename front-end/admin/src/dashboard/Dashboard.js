import React from 'react';
import { Statistic, Icon } from 'antd';
import './dashboard.css'
import Axios from 'axios';
import { statSync } from 'fs';

//cần thống kê gì thì vào đây sửa

class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            registeredUser:0,
            numOfSongs:0,
            numOfComments:0,
            numOfSingers:0
        }
    }
    componentDidMount=()=>{
       Axios.get("https://localhost:8443/dashboard").then(data=>{
           let myData=data.data;
           console.log(myData);
           
           this.setState({
            registeredUser:myData.numOfUsers,
            numOfSongs:myData.numOfSongs,
            numOfComments:myData.numOfComments,
            numOfSingers:myData.numOfSingers
           })
       })
    }
    render(){
        const{registeredUser,numOfComments,numOfSingers,numOfSongs}=this.state;
        console.log(this.state);
        
        return(
            <div className="dashboard">
                <div className="statistic-section">
                    <div className="statistic-card" style={{backgroundColor: 'green'}}>
                        <Statistic className="card" title={<div
                            className= "card-header"
                            ><Icon type="team" />
                            &nbsp;
                            Registered Users</div>}
                        value={registeredUser}  />
                    </div>
                    <div className="statistic-card"  style={{backgroundColor: 'crimson'}}>
                        <Statistic className="card" value={numOfSongs} title={<div className= "card-header" >
                        <Icon type="shopping-cart" /> &nbsp;Songs</div>} />
                    </div>
                    <div className="statistic-card" style={{backgroundColor: '#147EFB'}}>
                        <Statistic className="card" value={numOfComments}
                        title={<div className= "card-header" >
                        <Icon type="dollar" /> &nbsp;Comments</div>}/>
                    </div>
                    <div className="statistic-card" style={{backgroundColor: '#CC660E'}}>
                    <Statistic className="card" value={numOfSingers} 
                        title={<div className= "card-header" >
                        <Icon type="shopping" /> &nbsp;Singers</div>}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;