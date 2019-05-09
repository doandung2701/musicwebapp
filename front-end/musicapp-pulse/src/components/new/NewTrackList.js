import React, { Fragment } from 'react';
import SubMediumTrackList from '../tracks/SubMediumTrackList';

export default class NewTrackList extends React.Component {

    constructor(props){
        super(props);
        this.props.getNewest8();
    }

    render() {
        let {newest8Songs,isGetting,t} = this.props;
        return (
            <Fragment>
                <h2 className="widget-title h4 m-b">{t('new')}</h2>
                <SubMediumTrackList type="track" list={newest8Songs}/>
            </Fragment>
        )
    }
}