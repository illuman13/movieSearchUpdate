import React, { Component } from 'react';

import ItemList from '../item-list';
import InputSearch from '../inputSearch';
import Rated from '../rated';
import Offline from '../offline';
import './app.css';
import SwapiService from '../../services/swapi-service';
import { GenreProvider } from '../genreContext';

export default class App extends Component {
  swapiService = new SwapiService();
  state = {
    query: '',
    history: '',
    ratedArr: [],
    genres: [],
    search: true,
    rated: false,
    arr: [],
  };
  selectSearch() {
    this.setState({
      search: true,
      rated: false,
    });
  }
  selectRated() {
    this.setState({
      search: false,
      rated: true,
    });
  }
  componentDidMount() {
    this.swapiService.getAllGenre().then((res) => {
      this.setState({
        genres: res,
      });
    });
  }
  queryMovies = (value) => {
    this.setState({
      query: value,
    });
  };
  updateQuery = () => {
    this.setState({ query: '' });
  };
  ratedFn = (e, arr) => {
    this.setState({
      star: e,
      ratedArr: arr,
    });
  };
  renderMovies = (arr) => {
    this.setState({ arr });
  };
  renderQuery = (history) => {
    this.setState({ history });
  };
  render() {
    const { query, ratedArr, star, genres, rated, search, arr, history } = this.state;
    const searchItem = search ? (
      <>
        <InputSearch queryMovies={this.queryMovies} />
        <ItemList
          history={history}
          renderQuery={this.renderQuery}
          reloadSearch={arr}
          renderMovies={this.renderMovies}
          query={query}
          clickOnMovie={this.clickOnMovie}
          retedFn={this.ratedFn}
          updateQuery={this.updateQuery}
        />
      </>
    ) : null;
    const ratedItem = rated ? <Rated ratedArr={ratedArr} star={star} /> : null;
    return (
      <Offline>
        <GenreProvider value={genres}>
          <div className="select">
            <button onClick={() => this.selectSearch()} className={search ? 'selected selectedBtn' : 'selected'}>
              Search
            </button>
            <button onClick={() => this.selectRated()} className={rated ? 'selected selectedBtn' : 'selected'}>
              Rated
            </button>
          </div>
          {searchItem}
          {ratedItem}
        </GenreProvider>
      </Offline>
    );
  }
}
