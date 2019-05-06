import React, { Fragment } from 'react';
import SearchResultListTrack from './SearchResultListTrack';
import SearchResultListArtist from './SearchResultListArtist';
import LoadingIndicator from '../common/LoadingIndicator';

export default class SearchModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }

    handleInputChange = async (e) => {
        let target = e.target;
        let value = target.value;
        let name = target.name;
        await this.setState({
            [name]: value
        })
        if (this.state.name.length >= 3) {
            this.props.getSearchData(this.state.name);
        }
    }
    render() {
        let { songs, singers, isSearching } = this.props.search;
        return (
            <div className="white lt" id="search-modal" >
                <a onClick={this.props.onClose} className="text-muted text-lg p-x modal-close-btn">×</a>
                <div className="row-col">
                    <div className="p-a-lg h-v row-cell v-m">
                        <div className="row">
                            <div className="col-md-8 offset-md-2">
                                <form className="m-b-md">
                                    <div className="input-group input-group-lg">
                                        <input type="text" className="form-control" name="name"
                                            value={this.state.name} onChange={this.handleInputChange}
                                            placeholder="Type keyword"
                                            data-ui-target="#search-result" />
                                        <span className="input-group-btn">
                                            <button className="btn b-a no-shadow white" type="submit">Search</button>
                                        </span>
                                    </div>
                                </form>
                                <div id="search-result" className="animated fadeIn">
                                    <p className="m-b-md"><strong>{songs.length + singers.length}</strong>
                                        &nbsp;<span className="text-muted">Results found for: </span><strong>{this.state.name}</strong></p>
                                    {<Fragment>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <h6 style={{ color: 'white' }}>Songs: </h6>
                                                {songs.length>0?<SearchResultListTrack 
                                                onCloseSearch={this.props.onClose}
                                                tracks={songs} />:
                                                <div>No results</div>}
                                            </div>
                                            <div className="col-sm-6">
                                                <h6 style={{ color: 'white' }}>Artists: </h6>
                                                {singers.length>0?
                                                <SearchResultListArtist artists={singers} 
                                                onCloseSearch={this.props.onClose}/>:
                                                <div>No results</div>}
                                            </div>
                                        </div>
                                        <LoadingIndicator height={100} width={100} isGetting={isSearching} />
                                    </Fragment>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}