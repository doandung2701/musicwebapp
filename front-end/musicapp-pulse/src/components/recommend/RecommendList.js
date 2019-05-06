import React, { Fragment } from 'react';
import RecommentItem from './RecommentItem';


export default class RecommendList extends React.Component {

    componentDidMount(){
        if (this.props.authentication.currentUser&&this.props.authentication.currentUser.id){
            let ids = [];
            for (let cat of this.props.authentication.currentUser.favoriteCategory){
                ids.push(cat.categoryId);
            }
            this.props.getRecommendedSongs(ids);
        }
    }

    componentDidUpdate(prevProps){
        if (this.props.authentication.currentUser&&
            prevProps.authentication.currentUser!==this.props.authentication.currentUser){
            let ids = [];
            for (let cat of this.props.authentication.currentUser.favoriteCategory){
                ids.push(cat.categoryId);
            }
            this.props.getRecommendedSongs(ids);
        }
    }

    render() {
        let {recommendedSongs} = this.props;
        return (
            <Fragment>
                <h2 className="widget-title h4 m-b">Recommended for you</h2>
                <div className="row item-list item-list-md m-b">
                    {recommendedSongs.map(value => (
                        <RecommentItem key={value.songId} type="track" track={value}/>
                    ))}
                </div>
            </Fragment>
        )
    }
}