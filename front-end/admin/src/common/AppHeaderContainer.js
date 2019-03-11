import { connect } from 'react-redux'
import AppHeader from './AppHeader';
const mapStateToProps = (state) => ({
    authen:state.authenReducer
})

const mapDispatchToProps =dispatch=> {
    return {
       // onLogout:()=>dispatch(logOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader)
