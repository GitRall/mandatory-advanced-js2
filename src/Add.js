import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './AddEdit.css';
import axios from 'axios';
import { Helmet } from 'react-helmet';

class Add extends Component{
  constructor(props){
    super(props);
    this.state = {title: '', description: '', director: '', rating: 0, redirectRef: false, titleErrorText: false, descriptionErrorText: false, directorErrorText: false}
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onDirectorChange = this.onDirectorChange.bind(this);
    this.onRatingChange = this.onRatingChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.titleRef = React.createRef();
    this.descriptionRef = React.createRef();
    this.directorRef = React.createRef();
    this.source = axios.CancelToken.source();
  }
  componentWillUnmount(){
    this.source.cancel('Data request canceled');
  }
  onFormSubmit(e){
    e.preventDefault();
    this.setState({titleErrorText: false, descriptionErrorText: false, directorErrorText: false});
    if(this.state.title.length < 1 || this.state.title.length > 40) {
      this.setState({titleErrorText: true});
      this.titleRef.current.focus();
      return;
    }
    else if(this.state.description.length < 1 || this.state.description.length > 300) {
      this.setState({descriptionErrorText: true});
      this.descriptionRef.current.focus();
      return;
    }
    else if(this.state.director.length < 1 || this.state.director.length > 40) {
      this.setState({directorErrorText: true});
      this.directorRef.current.focus();
      return;
    }
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
    const ratingFloor = Math.floor(this.state.rating);
    console.log(ratingFloor);
    const starArr = []
    for(let i = 0; i < ratingFloor; i++){
      starArr.push(<i key={i} className="material-icons">star</i>);
    }
    console.log(starArr);
    if(this.state.titleErrorText || this.state.descriptionErrorText || this.state.directorErrorText){
      return (
        <div className='add-edit-movie-container'>
          <Helmet>
            <title>Add Movie</title>
          </Helmet>
          <form className='add-edit-movie__form' onSubmit={this.onFormSubmit}>
            <label className='add-edit-movie__label'>Title
              <input className='add-edit-movie__title' ref={this.titleRef} onChange={this.onTitleChange} type='text' minLength='1' maxLength='40'></input>

              {this.state.titleErrorText ? <p className='add-edit-movie__error-text'>Must contain 1 - 40 characters</p> : null}
            </label>
            <label className='add-edit-movie__label'>Rating
              <input className='add-edit-movie__rating-input' onChange={this.onRatingChange} type='range' min='0' max='5' step='0.1' value={this.state.rating}></input>
              <span className='add-edit-movie__rating'><span className='add-edit-movie__stars'>{starArr}</span>{this.state.rating}</span>
            </label>
            <label className='add-edit-movie__label'>Description
              <textarea className='add-edit-movie__description' ref={this.descriptionRef} onChange={this.onDescriptionChange} rows='8' minLength='1' maxLength='300'></textarea>
              {this.state.descriptionErrorText ? <p className='add-edit-movie__error-text'>Must contain 1 - 300 characters</p> : null}
            </label>
            <label className='add-edit-movie__label'>Director
              <input className='add-edit-movie__director' ref={this.directorRef} onChange={this.onDirectorChange} type='text' minLength='1' maxLength='40'></input>
              {this.state.directorErrorText ? <p className='add-edit-movie__error-text'>Must contain 1 - 40 characters</p> : null}
            </label>
            <button className='add-edit-movie__submit-btn'>Add movie</button>
          </form>
        </div>
      )
    }
    else{
      return (
        <div className='add-edit-movie-container'>
          <Helmet>
            <title>Add Movie</title>
          </Helmet>
          <form className='add-edit-movie__form' onSubmit={this.onFormSubmit}>
            <label className='add-edit-movie__label'>Title
              <input className='add-edit-movie__title' ref={this.titleRef} onChange={this.onTitleChange} type='text' minLength='1' maxLength='40'></input>
            </label>
            <label className='add-edit-movie__label'>Rating
              <input className='add-edit-movie__rating-input' onChange={this.onRatingChange} type='range' min='0' max='5' step='0.1' value={this.state.rating}></input>
              <span className='add-edit-movie__rating'><span className='add-edit-movie__stars'>{starArr}</span>{this.state.rating}</span>
            </label>
            <label className='add-edit-movie__label'>Description
              <textarea className='add-edit-movie__description' ref={this.descriptionRef} onChange={this.onDescriptionChange} rows='8' minLength='1' maxLength='300'></textarea>
            </label>
            <label className='add-edit-movie__label'>Director
              <input className='add-edit-movie__director' ref={this.directorRef} onChange={this.onDirectorChange} type='text' minLength='1' maxLength='40'></input>
            </label>
            <button className='add-edit-movie__submit-btn'>Add movie</button>
          </form>
        </div>
      )
    }
  }
}

export default Add;
