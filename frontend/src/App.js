import React from 'react';
import { BrowserRouter as Router, NavLink, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importuj styl Bootstrapa
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Pokedex from './components/pokedex/Pokedex';



const Moves = () => {
  return <h2>Ruchy</h2>;
};

const Abilities = () => {
  return <h2>Zdolności</h2>;
};

const Items = () => {
  return <h2>Przedmioty</h2>;
};

const Locations = () => {
  return <h2>Lokalizacje</h2>;
};

const Types = () => {
  return <h2>Typy</h2>;
};

const Natures = () => {
  return <h2>Natury</h2>;
};

const Berries = () => {
  return <h2>Berry</h2>;
};

// Główny komponent aplikacji
const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <main className="container">
          {/* Definicje tras wewnątrz komponentu <Routes> */}
          <Routes>
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/moves" element={<Moves />} />
            <Route path="/abilities" element={<Abilities />} />
            <Route path="/items" element={<Items />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/types" element={<Types />} />
            <Route path="/natures" element={<Natures />} />
            <Route path="/berries" element={<Berries />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
