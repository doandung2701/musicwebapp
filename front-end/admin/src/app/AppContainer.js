import {connect} from 'react-redux';
import App from './App';
import { loadCurrentUser } from '../login/LoginAction';

const mapStateToProps = (state) => ({
  ...state
})

const mapDispatchToProps =dispatch=> {
    return {
      loadCurrentUserLogged:()=>dispatch(loadCurrentUser())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);