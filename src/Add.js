import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Add.css';
import axios from 'axios';
import { Helmet } from 'react-helmet';

class Add extends Component{
  constructor(props){
    super(props);
    this.state = {title: '', description: '', director: '', rating: 0, redirectRef: false}
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onDirectorChange = this.onDirectorChange.bind(this);
    this.onRatingChange = this.onRatingChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.titleRef = React.createRef();
    this.descriptionRef = React.createRef();
    this.directorRef = React.createRef();
    this.CancelToken = axios.CancelToken;
    this.source = this.CancelToken.source();
  }
  componentWillUnmount(){
    this.source.cancel('Data request canceled');
  }
  onFormSubmit(e){
    e.preventDefault();
    if(this.titleRef.current.value.length < 1 || this.titleRef.current.value.length > 40) return;
    else if(this.descriptionRef.current.value.length < 1 || this.descriptionRef.current.value.length > 300) return;
    else if(this.directorRef.current.value.length < 1 || this.directorRef.current.value.length > 40) return;
    else{
      const data = {
        title: this.state.title,
        description: this.state.description,
        director: this.state.director,
        rating: this.state.rating,
      }
      axios.post('http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies', data, {cancelToken: this.source.token})
      .then((response) => {
        console.log(response);
        this.setState({redirectRef: true});
      })
      .catch((thrown) => {
        console.log(thrown);
      })
    }
  }
  onTitleChange(e){
    this.setState({title: e.target.value});
  }
  onDescriptionChange(e){
    this.setState({description: e.target.value});
  }
  onDirectorChange(e){
    this.setState({director: e.target.value});
  }
  onRatingChange(e){
    let num = e.target.value;
    this.setState({rating: num});
  }
  render(){
    if(this.state.redirectRef){
      return(
        <Redirect to='/' />
      )
    }
    else{
      return (
        <div className='add-movie-container'>
          <Helmet>
            <title>Add Movie</title>
          </Helmet>
          <form className='add-movie__form' onSubmit={this.onFormSubmit}>
            <label className='add-movie__label'>Title</label>
            <input className='add-movie__title' ref={this.titleRef} onChange={this.onTitleChange} type='text' minLength='1' maxLength='40'></input>
            <label className='add-movie__label'>Description</label>
            <textarea className='add-movie__description' ref={this.descriptionRef} onChange={this.onDescriptionChange} rows='8' minLength='1' maxLength='300'></textarea>
            <label className='add-movie__label'>Director</label>
            <input className='add-movie__director' ref={this.directorRef} onChange={this.onDirectorChange} type='text' minLength='1' maxLength='40'></input>
            <label className='add-movie__label'>Rating</label>
            <input className='add-movie__rating-input' onChange={this.onRatingChange} type='range' min='0' max='5' step='0.1' value={this.state.rating}></input>
            <span className='add-movie__rating'>{this.state.rating}</span>
            <button className='add-movie__submit-btn'>Add</button>
          </form>
        </div>
      )
    }
  }
}

export default Add;
