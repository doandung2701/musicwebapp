import { connect } from "react-redux";
import SideNav from "./SideNav";
import { logout } from "../../actions/AuthentcationAction";
const mapStateToProps = (state) => {
    return {
        authentication:state.authentication
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        logout: ()=>{
            dispatch(logout())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SideNav);
