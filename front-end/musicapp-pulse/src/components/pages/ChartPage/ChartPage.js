import React, { Fragment } from 'react';
import ColXs12TrackItem from '../../tracks/ColXs12TrackItem';
import { getAllCategoriesApi } from '../../../Api/CategoryApi';
import { getChartSongByCatIdApi } from '../../../Api/SongApi';
import { withTranslation } from 'react-i18next';

class ChartPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      songs: [],
      active: null
    }
    Promise.all([getAllCategoriesApi(), getChartSongByCatIdApi()]).then(data => {
      this.setState({
        categories: data[0].data,
        songs: data[1].data
      })
    })
  }

  changeCategory = async (id,index)=>{
    let items = document.getElementsByClassName("dropdown-item");
    for (let item of items){
      item.classList.remove("active");
    }
    items[index].classList.add("active");
    let i = this.state.categories.findIndex(value=>value.categoryId===id);
    try{
      let data = await getChartSongByCatIdApi(id);
      this.setState({
        songs: data.data,
        active: i>-1?this.state.categories[i]:null
      })
    }catch(err){
      console.log(err)
    }
  }

  getActiveCat = ()=>{
    if (this.state.active ===null){
      return this.props.t('all');
    }else {
      return this.state.active.categoryName;
    }
  }

  render() {
    let { categories, songs ,active} = this.state;
    let {t} = this.props;
    return (
      <Fragment>
        <div className="page-title m-b">
          <h1 className="inline m-a-0">{t('charts')}</h1>
          <div className="dropdown inline">
            <button className="btn btn-sm no-bg h4 m-y-0 v-b dropdown-toggle text-primary" 
            data-toggle="dropdown">{this.getActiveCat()}</button>
            <div className="dropdown-menu">
              {categories.map((value,index)=>(
                <a onClick={()=>this.changeCategory(value.categoryId,index)}
                key={value.categoryId}className="dropdown-item">
                {value.categoryName}
              </a>
              ))}
              <a onClick={()=>this.changeCategory(null,categories.length)}
              className="dropdown-item active">
                {t('all')}
              </a>
            </div>
          </div>
        </div>
        <div className="row item-list item-list-md item-list-li m-b">
          {songs.map(value => (
            <ColXs12TrackItem type="track" key={value.songId} track={value} />
          ))}
        </div>
      </Fragment>
    )
  }
}

export default withTranslation('common')(ChartPage);