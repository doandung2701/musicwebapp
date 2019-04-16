import React, { Fragment } from 'react';
import CommentItem from './CommentItem';

let cmts = [{
    img: "/images/a0.jpg",
    author: 'Peter Joo',
    time: Date.now(),
    content: 'Check your Internet connection',
    reply: [
        {
            img: "/images/a0.jpg",
            author: 'Peter Joo',
            time: Date.now(),
            content: 'Check your Internet connection',
        },
        {
            img: "/images/a0.jpg",
            author: 'Peter Joo',
            time: Date.now(),
            content: 'Check your Internet connection',
        },
    ]
},
{
    img: "/images/a0.jpg",
    author: 'Peter Joo',
    time: Date.now(),
    content: 'Check your Internet connection',
    reply: [
        {
            img: "/images/a0.jpg",
            author: 'Peter Joo',
            time: Date.now(),
            content: 'Check your Internet connection',
        },
        {
            img: "/images/a0.jpg",
            author: 'Peter Joo',
            time: Date.now(),
            content: 'Check your Internet connection',
        },
    ]
},
{
    img: "/images/a0.jpg",
    author: 'Peter Joo',
    time: Date.now(),
    content: 'Check your Internet connection',
    reply: [
        {
            img: "/images/a0.jpg",
            author: 'Peter Joo',
            time: Date.now(),
            content: 'Check your Internet connection',
        },
        {
            img: "/images/a0.jpg",
            author: 'Peter Joo',
            time: Date.now(),
            content: 'Check your Internet connection',
        },
    ]
},
{
    img: "/images/a0.jpg",
    author: 'Peter Joo',
    time: Date.now(),
    content: 'Check your Internet connection',
    reply: [
        {
            img: "/images/a0.jpg",
            author: 'Peter Joo',
            time: Date.now(),
            content: 'Check your Internet connection',
        },
        {
            img: "/images/a0.jpg",
            author: 'Peter Joo',
            time: Date.now(),
            content: 'Check your Internet connection',
        },
    ]
},
{
    img: "/images/a0.jpg",
    author: 'Peter Joo',
    time: Date.now(),
    content: 'Check your Internet connection',
    reply: [
        {
            img: "/images/a0.jpg",
            author: 'Peter Joo',
            time: Date.now(),
            content: 'Check your Internet connection',
        },
        {
            img: "/images/a0.jpg",
            author: 'Peter Joo',
            time: Date.now(),
            content: 'Check your Internet connection',
        },
    ]
}]

class CommentsList extends React.Component {
    render() {
        return (
            <Fragment>
                <h5 className="m-b">Comments</h5>
                <div className="streamline m-b m-l">
                    {cmts.map((value) => (
                        <CommentItem id={Math.random()}
                        key={Math.random()/* luc lam nho thay bang id nhe*/} cmt={value} />
                    ))}
                </div>
            </Fragment>
        )
    }
}

export default CommentsList;