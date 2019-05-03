import React from 'react';

const withLikeButton = (Component)=>{
    return class extends React.Component{

        componentDidUpdate(){
            console.log(this.props.song)
        }

        render(){
            let {song,userId,...rest} = this.props;
            let isLiked = song&&song.likeUserIds?song.likeUserIds.some(value=>{
                return userId===value
            }):false;
            return(
                <Component isLiked={isLiked} userId={userId} {...rest}/>
            )
        }
    }
}

export default withLikeButton;