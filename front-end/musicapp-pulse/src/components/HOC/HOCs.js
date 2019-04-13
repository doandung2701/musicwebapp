import React from 'react';

//Khi nao viet reducer lay cac bai hat thi gop chung cac cai do vao 1 reducer viet 1
// cai container dung cai nay thi khong phai viet container cho cac list khac nhau
// or kho hieu qua thi thoi cu lam binh thuong :v

export const trackListHOC = function (WarppedComponent, trackList) {
    return class extends React.Component {
        render() {
            return (
                <WarppedComponent tracks={trackList} />
            )
        }
    }
}


export const TrackItemHOC = function ({ component: WarppedComponent, ...rest }) {
    return (
        <WarppedComponent {...rest} />
    )
}

export const UserHOC = function ({ component: WarppedComponent, ...rest }) {
    return (
        <WarppedComponent {...rest} />
    )
}


