import {connect} from 'react-redux';

var mapStateToProp = state=>({
    //something
})

var mapDispatchToProps = dispatch=>{
    return {
       //something
    }
}

export default connect(mapStateToProp,mapDispatchToProps)(/*something*/);