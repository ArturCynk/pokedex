import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TailSpin } from 'react-loader-spinner';

const PokedexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px 0;
  min-height: 80vh;
`;

const PokemonCard = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 10px;
  padding: 20px;
  text-align: center;
  width: 200px;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const PokemonImage = styled.img`
  height: 150px;
  width: 150px;
`;

const PokemonName = styled.h5`
  color: #343a40;
  margin-top: 10px;
`;

const PokemonLink = styled(Link)`
  text-decoration: none;
  color: #343a40;

  &:hover {
    color: #007bff;
  }
`;

const PokemonTypes = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5px;
`;

const PokemonType = styled.p`
  background-color: ${({ type }) => getTypeColor(type)};
  border-radius: 10px;
  color: white;
  display: inline-block;
  margin: 2px;
  padding: 5px 10px;
`;

const getTypeColor = type => {
  switch (type) {
    case 'normal':
      return '#A8A77A';
    case 'fighting':
      return '#C22E28';
    case 'flying':
      return '#A98FF3';
    case 'poison':
      return '#A33EA1';
    case 'ground':
      return '#E2BF65';
    case 'rock':
      return '#B6A136';
    case 'bug':
      return '#A6B91A';
    case 'ghost':
      return '#735797';
    case 'steel':
      return '#B7B7CE';
    case 'fire':
      return '#EE8130';
    case 'water':
      return '#6390F0';
    case 'grass':
      return '#7AC74C';
    case 'electric':
      return '#F7D02C';
    case 'psychic':
      return '#F95587';
    case 'ice':
      return '#96D9D6';
    case 'dragon':
      return '#6F35FC';
    case 'dark':
      return '#705746';
    case 'fairy':
      return '#D685AD';
    case 'stellar':
      return '#F2C5FD';
    case 'unknown':
      return '#A8A8A8';
    default:
      return '#A8A8A8';
  }
};

const ControlsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const LoadMoreButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
`;

const LoadMoreButton = styled.button`
  background-color: #007bff;
  border: none;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  padding: 10px 20px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

const SortDropdown = styled.select`
  margin: 0 10px;
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
  border: 1px solid #dee2e6;
`;

const SearchInput = styled.input`
  margin: 0 10px;
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
  border: 1px solid #dee2e6;
  width: 200px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [page, setPage] = useState(1);
  const [sortOption, setSortOption] = useState('id-asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPokemonData(1, sortOption, searchQuery);
  }, [sortOption, searchQuery]);

  useEffect(() => {
    fetchPokemonData(page, sortOption, searchQuery);
  }, [page]);

  const fetchPokemonData = async (page, sort, search) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/pokedex?page=${page}&sort=${sort}&search=${search}`);
      if (page === 1) {
        setPokemonList(response.data.pokemon);
      } else {
        setPokemonList(prevList => [...prevList, ...response.data.pokemon]);
      }
    } catch (error) {
      console.error('Error fetching the pokemon data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMorePokemon = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setPage(1); 
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  return (
    <>
      <ControlsContainer>
        <SearchInput 
          type="text" 
          placeholder="Search Pokémon" 
          value={searchQuery} 
          onChange={handleSearchChange} 
        />
        <SortDropdown onChange={handleSortChange} value={sortOption}>
          <option value="id-asc">Sort by ID (Ascending)</option>
          <option value="id-desc">Sort by ID (Descending)</option>
          <option value="name-asc">Sort by name (Ascending)</option>
          <option value="name-desc">Sort by name (Descending)</option>
        </SortDropdown>
      </ControlsContainer>
      {loading ? (
        <LoadingContainer>
          <TailSpin color="#00BFFF" height={80} width={80} />
        </LoadingContainer>
      ) : (
        <>
          <PokedexContainer>
            {pokemonList.map(pokemon => (
              <PokemonLink to={`/pokemon/${pokemon.name}`}>
                <PokemonCard key={pokemon.id}>
                  <PokemonImage src={pokemon.image} alt={pokemon.name} />
                    <PokemonName>{pokemon.name}</PokemonName>
                  <PokemonTypes>
                    {pokemon.types.map(type => (
                      <PokemonType key={type} type={type}>
                        {type}
                      </PokemonType>
                    ))}
                  </PokemonTypes>
                </PokemonCard>
              </PokemonLink>
            ))}
          </PokedexContainer>
          <LoadMoreButtonContainer>
            <LoadMoreButton onClick={loadMorePokemon}>Load More</LoadMoreButton>
          </LoadMoreButtonContainer>
        </>
      )}
    </>
  );
};

export default Pokedex;
