import React, { Component } from 'react';
import axios from 'axios';
import './Details.css'
import { Redirect, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
class Details extends Component {
  constructor(props){
    super(props);
    this.state = {movie: {}, redirectHome: false}
  }
  componentDidMount(){
    axios.get(`http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/${this.props.match.params.id}`)
    .then((res) => {
      this.setState({movie: res.data})
    })
    .catch((thrown) => {
      this.setState({redirectHome: true});
      console.log(thrown);
    })
  }
  render(){
    if(this.state.redirectHome){
      return(
        <Redirect to='/' />
      )
    }
    const ratingFloor = Math.floor(this.state.movie.rating);
    const starArr = [];
    for(let i = 0; i < ratingFloor; i++){
      starArr.push(<i key={i} className="material-icons">star</i>);
    }
    return (
      <div className='details'>
        <Helmet>
          <title>{this.state.movie.title}</title>
        </Helmet>
        <div className='details-wrapper'>
          <div className='details__header'>
            <h1 className='details__title'>{this.state.movie.title}</h1>
          </div>
          <div className='details__rating-wrapper'>
            <p className='details__rating'>{this.state.movie.rating} / 5</p>
            <span className='details__stars'>{starArr}</span>
          </div>
          <div className='details__content-wrapper'>
            <span className='details__subtext'>Director</span>
            <p className='details__director'>{this.state.movie.director}</p>
            <span className='details__subtext'>Description</span>
            <p className='details__description'>{this.state.movie.description}</p>
            <Link className='details__edit-link' to={{pathname: `/edit/${this.props.match.params.id}`, state: this.state.movie}}>Edit</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Details;
