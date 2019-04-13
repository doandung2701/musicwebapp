import React, { Fragment } from 'react';
import TrendingItem from './TrendingItem';
import { Carousel } from 'antd';

export default class Trending extends React.Component {

    splitDataToRender = () => {
        let res = [];
        for (var i = 0; i < this.props.data.length; i++) {
            if ((i + 1) % 3 === 0) {
                res.push(this.props.data.slice(i - 2, i + 1));
            }
        }
        if (i % 3 === 1)
            res.push(this.props.data.slice(i - 1, this.props.data.length));
        else if (i % 3 === 2)
            res.push(this.props.data.slice(i - 2, this.props.data.length));
        return res;
    }

    render() {
        let res = this.splitDataToRender();
        return (
            <Fragment>
                <h2 className="widget-title h4 m-b">Trending</h2>
                <Carousel vertical={false} className="carousel-sm">
                    {res.map((value, index) => (
                        <div key={index}>
                            {value.map(value => (
                                <TrendingItem key={value.id} track={value} />
                            ))}
                        </div>
                    ))}
                </Carousel>
            </Fragment>

        )
    }

}