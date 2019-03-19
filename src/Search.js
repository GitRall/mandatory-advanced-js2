import React, { Component } from 'react';
import './Search.css';

const Search = (props) => (
  <div className='movie-search'>
    <div className='movie-search__filter-container'>
      <div className='movie-search__checkbox-container'>
        <span className='movie-search__filter-title'>Title</span>
        <div className='movie-search__checkbox-wrapper'>
          <input type='checkbox' className='movie-search__checkbox' id='checkbox-title' defaultChecked={true} onChange={props.onFilterChange} ref={props.filterTitleRef}/>
          <label htmlFor='checkbox-title' className='movie-search__checkbox-label'></label>
        </div>
      </div>
      <div className='movie-search__checkbox-container'>
        <span className='movie-search__filter-title'>Director</span>
        <div className='movie-search__checkbox-wrapper'>
          <input type='checkbox' className='movie-search__checkbox' id='checkbox-director' defaultChecked={true} onChange={props.onFilterChange} ref={props.filterDirectorRef}/>
          <label htmlFor='checkbox-director' className='movie-search__checkbox-label'></label>
        </div>
      </div>
      <div className='movie-search__checkbox-container'>
        <span className='movie-search__filter-title'>Rating</span>
        <div className='movie-search__checkbox-wrapper'>
          <input type='checkbox' className='movie-search__checkbox' id='checkbox-rating' defaultChecked={true} onChange={props.onFilterChange} ref={props.filterRatingRef}/>
          <label htmlFor='checkbox-rating' className='movie-search__checkbox-label'></label>
        </div>
      </div>
    </div>
    <input className='movie-search__input' onChange={props.onSearch} placeholder='search'/>
  </div>
)

export default Search;
