import React, { Component } from 'react';
import './Home.css'
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Search from './Search';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {movies: [], search: '', filterTitle: true, filterDirector: true, filterRating: true}
    this.source = axios.CancelToken.source();
    this.onSearch = this.onSearch.bind(this);
    this.filterMovies = this.filterMovies.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.filterTitleRef = React.createRef();
    this.filterDirectorRef = React.createRef();
    this.filterRatingRef = React.createRef();
  }

  componentDidMount(){
    axios.get('http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies', {cancelToken: this.source.token})
    .then((res) => {
      this.setState({movies: res.data});
    })
    .catch((thrown) => {
      console.log(thrown);
    })
  }
  componentWillUnmount(){
    this.source.cancel('Data request canceled');
  }
  deleteMovie(id){
    axios.delete(`http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/${id}`, {cancelToken: this.source.token})
    .then((res) => {
      for(let i = 0; i < this.state.movies.length; i++){
        if(this.state.movies[i].id === id){
          let movies = this.state.movies;
          movies.splice(i, 1);
          this.setState({movies});
        }
      }
    })
    .catch((thrown) => {
      console.log(thrown);
    })
  }
  onSearch(e){
    this.setState({search: e.target.value});
  }
  filterMovies(){
    return this.state.movies.filter((movie) => {
      let movieRating = JSON.stringify(movie.rating);
      if((movie.title.toLowerCase().includes(this.state.search.toLowerCase()) && this.state.filterTitle) ||
      (movie.director.toLowerCase().includes(this.state.search.toLowerCase()) && this.state.filterDirector) ||
      (movieRating.includes(this.state.search) && this.state.filterRating)){
        return movie;
      }
      else {
        return null;
      }
    })
  }
  onFilterChange(e){
    this.filterTitleRef.current.checked ? (this.setState({filterTitle: true})) : (this.setState({filterTitle: false}));
    this.filterDirectorRef.current.checked ? (this.setState({filterDirector: true})) : (this.setState({filterDirector: false}));
    this.filterRatingRef.current.checked ? (this.setState({filterRating: true})) : (this.setState({filterRating: false}));
  }
  render(){

    const moviesArray = this.filterMovies().map((movie) => {
      return(
        <tr key={movie.id}>
          <td className='movie-table__td'><Link to={`/details/${movie.id}`} className='movie-table__link'>{movie.title}</Link></td>
          <td className='movie-table__td'>{movie.director}</td>
          <td className='movie-table__td'>{movie.rating}</td>
          <td className='movie-table__icon-td'><Link to={{pathname:`/edit/${movie.id}`, state: movie}} className='movie-table__btn movie-table__btn-edit'><i className="material-icons">edit</i></Link></td>
          <td className='movie-table__icon-td'><button className='movie-table__btn movie-table__btn-delete' onClick={(e) => {this.deleteMovie(movie.id)}}><i className="material-icons">delete</i></button></td>
        </tr>
      )
    })

    if(moviesArray.length < 1){
      return(
        <>
        <Search onSearch={this.onSearch} onFilterChange={this.onFilterChange} filterTitleRef={this.filterTitleRef} filterDirectorRef={this.filterDirectorRef} filterRatingRef={this.filterRatingRef}></Search>
        <div className='movie-table-container'>
          <Helmet>
            <title>Home</title>
          </Helmet>
          <table className='movie-table'>
            <thead>
              <tr>
                <th className='movie-table__th'>Title</th>
                <th className='movie-table__th'>Director</th>
                <th className='movie-table__th'>Rating</th>
                <th className='movie-table__th'></th>
                <th className='movie-table__th'></th>
              </tr>
            </thead>
          </table>
          <span className='movie-table-container__no-movies'>No movies found</span>
        </div>
        </>
    )
    }
    return(
      <>
      <Search onSearch={this.onSearch} onFilterChange={this.onFilterChange} filterTitleRef={this.filterTitleRef} filterDirectorRef={this.filterDirectorRef} filterRatingRef={this.filterRatingRef}></Search>
      <div className='movie-table-container'>
        <Helmet>
          <title>Home</title>
        </Helmet>

        <table className='movie-table'>
          <thead>
            <tr>
              <th className='movie-table__th'>Title</th>
              <th className='movie-table__th'>Director</th>
              <th className='movie-table__th'>Rating</th>
              <th className='movie-table__th'></th>
              <th className='movie-table__th'></th>
            </tr>
          </thead>
          <tbody>
            {moviesArray}
          </tbody>
        </table>
      </div>
      </>
    )
  }
}

export default Home;
