import React from 'react';
import {CommentBox} from "CommentBox";
React.render(
    <CommentBox url="./api/comments.json" pollInterval={2000} />,
        document.getElementById('content')
);
