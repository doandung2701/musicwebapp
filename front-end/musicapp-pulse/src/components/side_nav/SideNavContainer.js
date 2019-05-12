import { connect } from "react-redux";
import SideNav from "./SideNav";
import { logout } from "../../actions/AuthentcationAction";
import { changeAudioSrc } from "../player/PlayerAction";
const mapStateToProps = (state) => {
    return {
        authentication:state.authentication
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        logout: ()=>{
            dispatch(logout())
        },
        changeAudioSrc: (src)=>{
            dispatch(changeAudioSrc(src))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SideNav);
