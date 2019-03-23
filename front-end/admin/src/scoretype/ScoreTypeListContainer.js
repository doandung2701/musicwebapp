import { connect } from 'react-redux'
import { getAllScoreType, deleteScoreType, openModal } from './ScoreTypeAction';
import ScoreTypeList from './ScoreTypeList';
const mapStateToProps = (state) => ({
    scoreTypeList:state.scoreTypeList
});

const mapDispatchToProps =dispatch=> {
  return {
    loadAllScoreType:()=>dispatch(getAllScoreType()),
    deleteScoreType:(id)=>dispatch(deleteScoreType(id)),
    openModal:(data)=>dispatch(openModal(data))
  };
};
export default  connect(mapStateToProps,mapDispatchToProps)(ScoreTypeList);
