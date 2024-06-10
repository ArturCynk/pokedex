// Header.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import useNavbarToggle from './useNavbarToggle';

const Navbar = styled.nav`
  background-color: #343a40;
  padding: 1rem;
`;

const NavBrand = styled(NavLink)`
  color: #fff;
  font-size: 1.5rem;
  text-decoration: none;
`;

const NavItem = styled(NavLink)`
  color: #adb5bd;
  margin-left: 1rem;
  text-decoration: none;

  &.active {
    color: #fff;
  }
`;

const Header = () => {
  const { isCollapsed, toggleNavbar } = useNavbarToggle();

  return (
    <header>
      <Navbar className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <NavBrand to="/">Pokemons</NavBrand>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar}
            aria-controls="navbarNav"
            aria-expanded={!isCollapsed}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`} id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavItem className="nav-link" to="/pokedex">Pokedex</NavItem>
              </li>
              <li className="nav-item">
                <NavItem className="nav-link" to="/moves">Ruchy</NavItem>
              </li>
              <li className="nav-item">
                <NavItem className="nav-link" to="/abilities">Zdolności</NavItem>
              </li>
              <li className="nav-item">
                <NavItem className="nav-link" to="/items">Przedmioty</NavItem>
              </li>
              <li className="nav-item">
                <NavItem className="nav-link" to="/locations">Lokalizacje</NavItem>
              </li>
              <li className="nav-item">
                <NavItem className="nav-link" to="/types">Typy</NavItem>
              </li>
              <li className="nav-item">
                <NavItem className="nav-link" to="/natures">Natury</NavItem>
              </li>
              <li className="nav-item">
                <NavItem className="nav-link" to="/berries">Berry</NavItem>
              </li>
            </ul>
          </div>
        </div>
      </Navbar>
    </header>
  );
};

export default Header;
