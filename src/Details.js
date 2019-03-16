import React, { Component } from 'react';
import axios from 'axios';
import './Details.css'
import { Redirect } from 'react-router-dom';

class Details extends Component {
  constructor(props){
    super(props);
    this.state = {movie: {}, redirectHome: false}
  }
  componentDidMount(){
    axios.get(`http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/${this.props.match.params.id}`)
    .then((res) => {
      console.log(res.data);
      this.setState({movie: res.data})
      console.log(this.state);
    })
    .catch((thrown) => {
      this.setState({redirectHome: true});
      console.log(thrown);
    })
    console.log(this.props.match.params.id);
  }
  render(){
    if(this.state.redirectHome){
      return(
        <Redirect to='/' />
      )
    }
    return (
      <div className='details'>
        <div className='details-wrapper'>
          <h1 className='details__title'>{this.state.movie.title}</h1>
          <span className='details__subtext'>Rating</span>
          <p className='details__rating'>{this.state.movie.rating} / 5</p>
          <span className='details__subtext'>Director</span>
          <p className='details__director'>{this.state.movie.director}</p>
          <span className='details__subtext'>Description</span>
          <p className='details__description'>{this.state.movie.description}</p>
        </div>
      </div>
    )
  }
}

export default Details;
