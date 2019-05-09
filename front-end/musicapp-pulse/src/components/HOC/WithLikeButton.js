import React from 'react';

const withLikeButton = (Component)=>{
    return class extends React.Component{

        isLiked = ()=>{
            let {song,userId} = this.props;
            let isLiked = song&&song.likeUserIds?song.likeUserIds.some(value=>{
                return userId===value
            }):false;
            return isLiked;
        }

        render(){
            let {song,userId,...rest} = this.props;
            let isLiked = this.isLiked();
            return(
                <Component isLiked={isLiked} userId={userId} {...rest}/>
            )
        }
    }
}

export default withLikeButton;