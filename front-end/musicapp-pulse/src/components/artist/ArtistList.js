import React from "react";
import ArtistItem from "./ArtistItem";
import { artists } from "../../fakedata/fakedata";

export default class ArtistList extends React.Component {
    render() {
        return (
            <div className="jscroll-inner">
                <div className="row row-lg">
                    {artists.map(value => (
                        <div key={value.id} className="col-xs-4 col-sm-4 col-md-3">
                            <ArtistItem artist={value} />
                        </div>))
                    }
                    <a href="scroll.author.html" className="btn btn-sm white rounded jscroll-next">Show More</a>
                </div>
            </div>
        )
    }
}