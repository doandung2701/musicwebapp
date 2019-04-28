import { connect } from "react-redux";
import SideNav from "./SideNav";
const mapStateToProps = (state) => {
    return {
        authentication:state.authentication
    }
}

export default connect(mapStateToProps,null)(SideNav);
