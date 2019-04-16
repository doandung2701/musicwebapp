import React, { Fragment } from 'react';
import { largeCarouselData } from '../../../fakedata/fakedata';
import ColXs12TrackItem from '../../tracks/ColXs12TrackItem';

export default class ChartPage extends React.Component {
    render() {
        return (
    <Fragment>
         <div className="page-title m-b">
          <h1 className="inline m-a-0">Charts</h1>
          <div className="dropdown inline">
            <button className="btn btn-sm no-bg h4 m-y-0 v-b dropdown-toggle text-primary" data-toggle="dropdown">Last week</button>
            <div className="dropdown-menu">
              <a href="#" className="dropdown-item active">
                Last week
              </a>
              <a href="#" className="dropdown-item">
                Last month
              </a>
              <a href="#" className="dropdown-item">
                Last year
              </a>
              <a href="#" className="dropdown-item">
                All the time
              </a>
            </div>
          </div>
        </div>
        <div className="row item-list item-list-md item-list-li m-b">
        {largeCarouselData.map(value=>(
            <ColXs12TrackItem type="track" key={value.id} track={value}/>
        ))}
        </div>
            </Fragment>
        )
    }
}