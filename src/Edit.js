import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Stars from './Stars';
class Edit extends Component {
  constructor(props){
    super(props);
    this.state = {title: '', rating: 0, description: '', director: '', redirectDetails: false, redirectHome: false, titleErrorText: false, descriptionErrorText: false, directorErrorText: false}
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onRatingChange = this.onRatingChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onDirectorChange = this.onDirectorChange.bind(this);
    this.onEditSubmit = this.onEditSubmit.bind(this);
    this.titleRef = React.createRef();
    this.descriptionRef = React.createRef();
    this.directorRef = React.createRef();
    this.CancelToken = axios.CancelToken;
    this.source = axios.CancelToken.source();
  }
  componentDidMount(){
    if(!this.props.location.state){
      this.setState({redirectDetails: true});
      return;
    }
    let rating = Number(this.props.location.state.rating);
    this.setState({title: this.props.location.state.title, rating: rating, description: this.props.location.state.description, director: this.props.location.state.director})
  }
  componentWillUnmount(){
    this.source.cancel('Data request canceled');
  }
  onTitleChange(e){
    this.setState({title: e.target.value});
  }
  onRatingChange(e){
    let rating = Number(e.target.value);
    this.setState({rating})
  }
  onDescriptionChange(e){
    this.setState({description: e.target.value});
  }
  onDirectorChange(e){
    this.setState({director: e.target.value});
  }
  onEditSubmit(e){
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
    const data = {
      title: this.state.title,
      rating: this.state.rating,
      description: this.state.description,
      director: this.state.director
    }
    axios.put(`http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/${this.props.match.params.id}`, data , {cancelToken: this.source.token})
    .then((res) => {
      this.setState({redirectDetails: true});
    })
    .catch((thrown) => {
      if(thrown.response && thrown.response.status === 404){
        this.setState({redirectHome: true});
      }
      console.log(thrown);
    })
  }
  render(){
    if(this.state.redirectHome){
      return (
        <Redirect to='/'></Redirect>
      )
    }
    else if(this.state.redirectDetails){
      return(
        <Redirect to={`/details/${this.props.match.params.id}`}></Redirect>
      )
    }

    if(this.state.titleErrorText || this.state.descriptionErrorText || this.state. directorErrorText){
      return (
        <div className='add-edit-movie-container'>
          <Helmet>
            <title>{this.props.location.state.title} - edit</title>
          </Helmet>
          <form className='add-edit-movie__form' onSubmit={this.onEditSubmit}>
            <label className='add-edit-movie__label'>Title
              <input className='add-edit-movie__title' ref={this.titleRef} type='text' minLength='1' maxLength='40' value={this.state.title} onChange={this.onTitleChange}></input>
              {this.state.titleErrorText ? <p className='add-edit-movie__error-text'>Must contain 1 - 40 characters</p> : null}
            </label>
            <label className='add-edit-movie__label'>Rating
              <input className='add-edit-movie__rating-input' type='range' min='0' max='5' step='0.1' value={this.state.rating} onChange={this.onRatingChange}></input>
              <span className='add-edit-movie__rating'><Stars rating={this.state.rating} color='#F9A825'/>{this.state.rating}</span>
            </label>
            <label className='add-edit-movie__label'>Description
              <textarea className='add-edit-movie__description' ref={this.descriptionRef} rows='8' minLength='1' maxLength='300' value={this.state.description} onChange={this.onDescriptionChange}></textarea>
              {this.state.descriptionErrorText ? <p className='add-edit-movie__error-text'>Must contain 1 - 300 characters</p> : null}
            </label>
            <label className='add-edit-movie__label'>Director
              <input className='add-edit-movie__director' ref={this.directorRef} type='text' minLength='1' maxLength='40' value={this.state.director} onChange={this.onDirectorChange}></input>
              {this.state.directorErrorText ? <p className='add-edit-movie__error-text'>Must contain 1 - 40 characters</p> : null}
            </label>
            <button type='submit' className='add-edit-movie__submit-btn'>Save</button>
          </form>
        </div>
      )
    }
    return (
      <div className='add-edit-movie-container'>
        <Helmet>
          <title>{this.props.location.state.title} - edit</title>
        </Helmet>
        <form className='add-edit-movie__form' onSubmit={this.onEditSubmit}>
          <label className='add-edit-movie__label'>Title
            <input className='add-edit-movie__title' ref={this.titleRef} type='text' minLength='1' maxLength='40' value={this.state.title} onChange={this.onTitleChange}></input>
          </label>
          <label className='add-edit-movie__label'>Rating
            <input className='add-edit-movie__rating-input' type='range' min='0' max='5' step='0.1' value={this.state.rating} onChange={this.onRatingChange}></input>
            <span className='add-edit-movie__rating'><Stars rating={this.state.rating} color='#F9A825'/>{this.state.rating}</span>
          </label>
          <label className='add-edit-movie__label'>Description
            <textarea className='add-edit-movie__description' ref={this.descriptionRef} rows='8' minLength='1' maxLength='300' value={this.state.description} onChange={this.onDescriptionChange}></textarea>
          </label>
          <label className='add-edit-movie__label'>Director
            <input className='add-edit-movie__director' ref={this.directorRef} type='text' minLength='1' maxLength='40' value={this.state.director} onChange={this.onDirectorChange}></input>
          </label>
          <button type='submit' className='add-edit-movie__submit-btn'>Save</button>
        </form>
      </div>
    )
  }
}

export default Edit;
