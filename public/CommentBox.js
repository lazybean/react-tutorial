import React from 'react';
import {CommentList} from "CommentList";
import {CommentForm} from "CommentForm";

export var CommentBox = React.createClass({
    getInitialState: function () {
        return {data: []};
    },

    loadCommentsFromServer: function () {
        fetch(this.props.url)
        .then(function(res) {
            return res.json();
        })
        .then(function(res) {
            this.setState({data: res});
        }.bind(this))
        .catch(function (err) {
            console.err(this.props.url, err.toString());
        }.bind(this));
    },

    handleCommentSubmit: function (comment) {
        var comments = this.state.data;
        var newComments = comments.concat(comment);
        this.setState({data: newComments});
        fetch(this.props.url, {"method": "POST", "body": JSON.stringify(comment),
              "headers": {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              }
        })
        .then(function (res) {
           return res.json();
        })
        .then(function (data) {
            this.setState({data});
        })
        .catch(function (err) {
            console.warn('Terrible Problem wile submitting comment ', err);
        });
    },

    componentDidMount: function () {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },

    render: function() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data}/>
                <CommentForm onCommentSubmit={this.handleCommentSubmit} />
            </div>
        );
    }
});
