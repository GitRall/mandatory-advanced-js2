import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = (props) => (
  <header>
    <nav>
      <ul className='nav__list'>
        <li className='nav__list-item'><NavLink className='nav__link' exact to='/'>Home</NavLink></li>
        <li className='nav__list-item'><NavLink className='nav__link' to='/add'>Add movie</NavLink></li>
      </ul>
    </nav>
  </header>
)

export default Navigation;
