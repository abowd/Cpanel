import React, { Component } from 'react';
import { Layout } from './components/Layout';
import { Routes } from './route';
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <Layout>
            <Routes>
            </Routes>
      </Layout>
    );
  }
}
