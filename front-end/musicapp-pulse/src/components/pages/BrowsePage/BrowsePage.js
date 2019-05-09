import React, { Fragment } from 'react';
import { BrowsePageFetchOnSrollContainer } from '../../../containers/FetchOnSrollContainer';
import { getAllSongPaging, wipeFetchOnScrollSongs, getSongsByCategoryPaging } from '../../../actions/SongAction';
import { withTranslation } from 'react-i18next';
import { getAllCategoriesApi } from '../../../Api/CategoryApi';


class BrowsePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      active: null
    }
    getAllCategoriesApi().then(data => {
      this.setState({
        categories: data.data,
      })
    })
  }

  changeCategory = async (id, index) => {
    let items = document.getElementsByClassName("dropdown-item");
    for (let item of items) {
      item.classList.remove("active");
    }
    items[index].classList.add("active");
    let i = this.state.categories.findIndex(value => value.categoryId === id);
    try {
      await this.setState({
        active: i > -1 ? this.state.categories[i] : null
      })
    } catch (err) {
      console.log(err)
    }
  }

  getActiveCat = () => {
    if (this.state.active === null) {
      return this.props.t('all');
    } else {
      return this.state.active.categoryName;
    }
  }

  render() {
    let { categories } = this.state;
    let {t} = this.props;
    return (
      <Fragment>
        <div className="page-title m-b">
          <h1 className="inline m-a-0">{t('browse')}</h1>
          <div className="dropdown inline">
            <button className="btn btn-sm no-bg h4 m-y-0 v-b dropdown-toggle text-primary"
              data-toggle="dropdown">{this.getActiveCat()}</button>
            <div className="dropdown-menu">
              {categories.map((value, index) => (
                <a onClick={() => this.changeCategory(value.categoryId, index)}
                  key={value.categoryId} className="dropdown-item">
                  {value.categoryName}
                </a>
              ))}
              <a onClick={() =>this.changeCategory(null,categories.length)}
                className="dropdown-item active">
                {t('all')}
              </a>
            </div>
          </div>
        </div>
        <BrowsePageFetchOnSrollContainer type="track" wipeFunc={wipeFetchOnScrollSongs}
          me="songs" singerId={this.state.active?this.state.active.categoryId:"0"}
          func={this.state.active ? getSongsByCategoryPaging : getAllSongPaging} />
        {/* <SubMediumTrackList type="track" tracks={largeCarouselData} /> */}
      </Fragment>
    )
  }
}

export default withTranslation('common')(BrowsePage);