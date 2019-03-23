import React from 'react';
import { Statistic, Icon } from 'antd';
import './dashboard.css'

//cần thống kê gì thì vào đây sửa

class Dashboard extends React.Component{
    render(){
        return(
            <div className="dashboard">
                <div className="statistic-section">
                    <div className="statistic-card" style={{backgroundColor: 'green'}}>
                        <Statistic className="card" title={<div
                            className= "card-header"
                            ><Icon type="team" />
                            &nbsp;
                            Registered Users</div>}
                        value={10000}  />
                    </div>
                    <div className="statistic-card"  style={{backgroundColor: 'crimson'}}>
                        <Statistic className="card" value={9999} title={<div className= "card-header" >
                        <Icon type="shopping-cart" /> &nbsp;Products</div>} />
                    </div>
                    <div className="statistic-card" style={{backgroundColor: '#147EFB'}}>
                        <Statistic className="card" value={18000} prefix="$" 
                        title={<div className= "card-header" >
                        <Icon type="dollar" /> &nbsp;Income this month</div>}/>
                    </div>
                    <div className="statistic-card" style={{backgroundColor: '#CC660E'}}>
                    <Statistic className="card" value={500} 
                        title={<div className= "card-header" >
                        <Icon type="shopping" /> &nbsp;Orders this month</div>}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;