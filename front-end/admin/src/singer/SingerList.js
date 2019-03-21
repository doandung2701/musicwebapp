import React from 'react';

class SingerList extends React.Component{

    constructor(props){
        super(props);
        this.props.getAllSingers();
    }

    render(){
        console.log(this.props.singerList)
        return (
            <div>
                
            </div>
        )
    }
}

export default SingerList;