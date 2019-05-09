import { connect } from 'react-redux';
import fetchOnSroll from "../components/HOC/FetchOnSroll";
import SubMediumTrackList from "../components/tracks/SubMediumTrackList";
import ArtistList from "../components/artist/ArtistList";
import UserTrackList from '../components/user/UserTrackList';
import AlbumTrackList from '../components/pages/AlbumPage/AlbumTrackList';
import PlayListTrackList from '../components/pages/PlaylistPage/PlayListTrackList';
import UserTrackListLike from '../components/user/UserTrackListLike';

const BrowsePageFetchOnSroll = fetchOnSroll(SubMediumTrackList);
const ArtistListFetchOnScroll = fetchOnSroll(ArtistList);
const UserTrackListFetchOnScroll = fetchOnSroll(UserTrackList);

const UserTrackListLikeFetchOnScroll=fetchOnSroll(UserTrackListLike);

const AlbumTrackListFetchOnScroll = fetchOnSroll(AlbumTrackList);
const PlayListTrackListFetchOnScroll = fetchOnSroll(PlayListTrackList);
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
        case 'likeSongs':
        return {
            data:state.likeSongs
        }    
        default:
    }
}

let mapDispatchToProps = dispatch => ({
    fetchData: (page, func, singerId) => {
        dispatch(func(page, singerId));
    },
    wipeData: (wipeFunc) => {
        dispatch(wipeFunc());
    }
})

const BrowsePageFetchOnSrollContainer = connect(mapStateToProps, mapDispatchToProps)(BrowsePageFetchOnSroll);

const ArtistListFetchOnScrollContainer = connect(mapStateToProps, mapDispatchToProps)(ArtistListFetchOnScroll);

const UserTrackListFetchOnScrollContainer = connect(mapStateToProps, mapDispatchToProps)(UserTrackListFetchOnScroll);

const UserTrackListLikeFetchOnScrollContainer=connect(mapStateToProps,mapDispatchToProps)(UserTrackListLikeFetchOnScroll)

const AlbumTrackListFetchOnScrollContainer = connect(mapStateToProps, mapDispatchToProps)(AlbumTrackListFetchOnScroll);
const PlayListTrackListFetchOnScrollContainer = connect(mapStateToProps, mapDispatchToProps)(PlayListTrackListFetchOnScroll);
export { BrowsePageFetchOnSrollContainer, ArtistListFetchOnScrollContainer,PlayListTrackListFetchOnScrollContainer, UserTrackListFetchOnScrollContainer, AlbumTrackListFetchOnScrollContainer,UserTrackListLikeFetchOnScrollContainer };