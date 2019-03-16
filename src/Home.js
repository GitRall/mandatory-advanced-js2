import React, { Component } from 'react';
import './Home.css'
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {movies: []}
    this.CancelToken = axios.CancelToken;
    this.source = this.CancelToken.source();
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
  render(){
    const moviesArray = this.state.movies.map((movie) => {
      return(
        <tr key={movie.id}>
          <td className='movie-table__td'>{movie.title}</td>
          <td className='movie-table__td'>{movie.director}</td>
          <td className='movie-table__td'>{movie.rating}</td>
          <td><Link to={`/details/${movie.id}`} className='movie-table__btn movie-table__btn-details'>Details</Link></td>
          <td><button className='movie-table__btn movie-table__btn-edit'>Edit</button></td>
          <td><button className='movie-table__btn movie-table__btn-delete' onClick={(e) => {this.deleteMovie(movie.id)}}>Delete</button></td>
        </tr>
      )
    })
    return(
      <div className='movie-table-container'>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <table>
          <thead>
            <tr>
              <th className='movie-table__th'>Title</th>
              <th className='movie-table__th'>Director</th>
              <th className='movie-table__th'>Rating</th>
              <th className='movie-table__th'></th>
              <th className='movie-table__th'></th>
              <th className='movie-table__th'></th>
            </tr>
          </thead>
          <tbody>
            {moviesArray}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Home;
