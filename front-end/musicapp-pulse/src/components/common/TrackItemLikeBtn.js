import React from 'react';

export default class TrackItemLikeBtn extends React.Component {

    
    render() {
        let { isLiked, likeSong, userId, songId } = this.props;
        
        return (
            <button style={{
                color: 'white',
                border: 'none', background: 'transparent', cursor: 'pointer', marginRight: 10
            }}
                className="btn-favorite" onClick={() => likeSong(userId, songId)}>
                <i className={`fa fa-heart${isLiked ? '' : '-o'}`} />
            </button>
        )
    }
}