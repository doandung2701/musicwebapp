import React from 'react';

const TrackPageHeaderLikeBtn = ({isLiked,likeSong,userId,songId}) => (
    <button style={{
        color: 'white',
        border: 'none', background: 'transparent', cursor: 'pointer', marginRight: 10
    }} className="btn btn-icon rounded btn-favorite" onClick={()=>likeSong(userId,songId)}>
        <i className={`fa fa-heart${isLiked?'':'-o'}`} />
    </button>
)

export default TrackPageHeaderLikeBtn;