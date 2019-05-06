import React from 'react';
import './Recommend.css';
import { Divider, message } from 'antd';
import { getAllCategoriesApi } from '../../Api/CategoryApi';
import LoadingIndicator from '../common/LoadingIndicator';

export default class CustomerRecommendAsk extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            categoryIds: [],
            active: null,
        }
        getAllCategoriesApi().then(data => {
            this.setState({
                categories: data.data,
            })
        })
    }

    onSelectFavCat = (id) => {
        let index = this.state.categoryIds.indexOf(id);
        if (index<0) {
            let categoryIds = this.state.categoryIds;
            categoryIds.push(id);
            this.setState({
                categoryIds
            })
        }else{
            let categoryIds = this.state.categoryIds;
            categoryIds.splice(index,1)
            this.setState({
                categoryIds
            })
        }
    }

    isSelected = (id)=>{
        return this.state.categoryIds.indexOf(id)>=0;
    }

    saveFavCat = (data) => {
        if (data.categoryIds.length===0){
            message.info("Please select one",3);
            return ;
        }else{
            this.props.saveFavCat(data);
        }
    }

    render() {
        let { categories } = this.state;
        return (
            <div className="rm-wrapper">
                <div className="rm-inner-wrapper">
                    <div className="header">
                        <h4>What is your liking ?</h4>
                    </div>
                    {categories.map((value, index) =>
                        (<button onClick={()=>this.onSelectFavCat(value.categoryId)}
                         key={value.categoryId}><span>{value.categoryName}</span>
                    &nbsp; { this.isSelected(value.categoryId)&&<i className="fa fa-check"></i>}</button>))}
                    <Divider style={{ backgroundColor: 'black' }} />
                    <div className="footer">
                    <LoadingIndicator isGetting={this.props.isSavingFavCat} height={50} width={50} />
                        <button onClick={()=>this.saveFavCat({
                            categoryIds: this.state.categoryIds,
                            userId: this.props.userId
                        })}
                        className="btnOk">OK</button>
                    </div>
                </div>
            </div>
        )
    }
}