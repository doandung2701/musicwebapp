import React, { Fragment } from 'react';
import { ArtistListFetchOnScrollContainer } from '../../../containers/FetchOnSrollContainer';
import { getAllSingersPaging, wipeFetchOnScrollSingers } from '../../../actions/ArtistAction';
import {withTranslation} from 'react-i18next';

class ArtistsPage extends React.Component{
    render(){
      let {t} = this.props;
        return(
            <Fragment>
          <div className="page-title m-b">
          <h1 className="inline m-a-0">{t('artist')}</h1>
          <div className="dropdown inline">
          </div>
        </div>
        <ArtistListFetchOnScrollContainer me="artists" wipeFunc= {wipeFetchOnScrollSingers} func={getAllSingersPaging} />
        </Fragment>
        )
    }
}

export default withTranslation('common')(ArtistsPage);