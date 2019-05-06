import React from 'react';

const LoadingIndicator = (props)=>{
    return (
        <img style={{display: props.isGetting?'block':'none',
                    height:props.height,width:props.width,position: 'relative',marginLeft: '45%'}}
                     src="/images/Ellipsis-2.5s-200px.gif"alt="loading" />
    )
}

export default LoadingIndicator;