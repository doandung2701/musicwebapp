import React, { Fragment } from 'react';
import TrendingItem from './TrendingItem';
import { Carousel } from 'antd';

export default class Trending extends React.Component {

    constructor(props){
        super(props);
        this.props.getTrendingSongs();
    }

    splitDataToRender = () => {
        let {trendingSongs} = this.props.songs;
        let res = [];
        for (var i = 0; i < trendingSongs.length; i++) {
            if ((i + 1) % 3 === 0) {
                res.push(trendingSongs.slice(i - 2, i + 1));
            }
        }
        if (i % 3 === 1)
            res.push(trendingSongs.slice(i - 1, trendingSongs.length));
        else if (i % 3 === 2)
            res.push(trendingSongs.slice(i - 2, trendingSongs.length));
        return res;
    }

    render() {
        let res = this.splitDataToRender();
        let {t} = this.props;
        return (
            <Fragment>
                <h2 className="widget-title h4 m-b">{t("trending")}</h2>
                <Carousel vertical={false} className="carousel-sm">
                    {res.map((value, index) => (
                        <div key={index}>
                            {value.map(value => (
                                <TrendingItem key={value.songId} track={value} />
                            ))}
                        </div>
                    ))}
                </Carousel>
            </Fragment>

        )
    }

}