import { connect } from 'react-redux';
import fetchOnSroll from "../components/HOC/FetchOnSroll";
import SubMediumTrackList from "../components/tracks/SubMediumTrackList";
import ArtistList from "../components/artist/ArtistList";
import UserTrackList from '../components/user/UserTrackList';

const BrowsePageFetchOnSroll = fetchOnSroll(SubMediumTrackList);
const ArtistListFetchOnScroll = fetchOnSroll(ArtistList);
const UserTrackListFetchOnScroll = fetchOnSroll(UserTrackList);

let mapStateToProps = (state, ownProps) => {
    switch (ownProps.me) {
        case 'artists':
            return {
                data: state.artists
            }
        case 'songs':
            return {
                data: state.songs
            }
        default:
    }
}

let mapDispatchToProps = dispatch => ({
    fetchData: (page, func,singerId) => {
        dispatch(func(page,singerId));
    },
    wipeData: (wipeFunc)=>{
        dispatch(wipeFunc());
    }
})

const BrowsePageFetchOnSrollContainer = connect(mapStateToProps, mapDispatchToProps)(BrowsePageFetchOnSroll);

const ArtistListFetchOnScrollContainer = connect(mapStateToProps, mapDispatchToProps)(ArtistListFetchOnScroll);

const UserTrackListFetchOnScrollContainer = connect(mapStateToProps, mapDispatchToProps)(UserTrackListFetchOnScroll);
export { BrowsePageFetchOnSrollContainer, ArtistListFetchOnScrollContainer,UserTrackListFetchOnScrollContainer };