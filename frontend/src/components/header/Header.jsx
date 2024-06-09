import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importuj styl Bootstrapa

// Komponent nagłówka
const Header = () => {
  return (
    <header className="bg-dark py-4">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <NavLink className="navbar-brand" to="/">Pokemons</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/pokedex">Pokedex</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/moves">Ruchy</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/abilities">Zdolności</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/items">Przedmioty</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/locations">Lokalizacje</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/types">Typy</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/natures">Natury</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeClassName="active" to="/berries">Berry</NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
