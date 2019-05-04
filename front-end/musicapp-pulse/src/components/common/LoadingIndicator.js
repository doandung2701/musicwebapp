import React from 'react';

const LoadingIndicator = (props)=>{
    return (
        <img style={{display: props.isGetting?'block':'none',
                    height:100,width:100,position: 'relative',marginLeft: '45%'}}
                     src="/images/Ellipsis-2.5s-200px.gif"alt="loading" />
    )
}

export default LoadingIndicator;