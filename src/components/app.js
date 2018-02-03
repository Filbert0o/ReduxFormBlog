import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import PostsIndex from '../containers/posts_index';
import PostsShow from './posts_show';
import PostsNew from './posts_new';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/posts/new" component={PostsNew} />
            <Route path="/posts/:id" component={PostsShow} />
            <Route path="/" component={PostsIndex} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
