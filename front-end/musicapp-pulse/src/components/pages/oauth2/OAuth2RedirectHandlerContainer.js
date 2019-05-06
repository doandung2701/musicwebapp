import { connect } from 'react-redux'
import { loginSuccessFully, loginFailed } from '../SignIn/SignInAction';
import OAuth2RedirectHandler from './OAuth2RedirectHandler';
import { loadCurrentUser } from '../../../actions/AuthentcationAction';

const mapDispatchToProps =dispatch=> {
   return {
    loginSuccess:()=>dispatch(loginSuccessFully()),
    loadCurrentUser: ()=>dispatch(loadCurrentUser()),
    loginError:()=>dispatch(loginFailed())
   }
}
export default connect(null,mapDispatchToProps)(OAuth2RedirectHandler);
