import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Importujemy Link

const BerriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px auto;
`;

// Zmieniamy BerryCard na Link
const BerryCard = styled(Link)`
  text-decoration: none;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 10px;
  padding: 20px;
  text-align: center;
  width: 200px;
  transition: transform 0.2s, box-shadow 0.2s;
  display: block; /* Dodajemy, aby Link zajmował całą przestrzeń dostępną */

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const BerryImage = styled.img`
  height: 150px;
  width: 150px;
`;

const BerryName = styled.h5`
  color: #343a40;
  margin-top: 10px;
`;

const BerryCategory = styled.p`
  color: #6c757d;
  font-style: italic;
`;

const BerryEffect = styled.p`
  color: #6c757d;
  font-weight: bold;
`;

const SortDropdown = styled.select`
  margin: 10px;
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
  border: 1px solid #dee2e6;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  margin: 10px;
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
  border: 1px solid #dee2e6;
  width: 200px;
`;

const Berrys = () => {
  const [berries, setBerries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchName, setSearchName] = useState('');
  const [searchCategory, setSearchCategory] = useState('');

  useEffect(() => {
    fetchBerries();
  }, []);

  const fetchBerries = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/berry');
      setBerries(response.data.berries);
    } catch (error) {
      console.error('Error fetching berries:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [...new Set(berries.map(berry => berry.category))];

  const filteredBerries = berries.filter(berry => {
    return (
      berry.name.toLowerCase().includes(searchName.toLowerCase()) &&
      (searchCategory === '' || berry.category.toLowerCase().includes(searchCategory.toLowerCase()))
    );
  });

  return (
    <div>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search by name..."
          value={searchName}
          onChange={e => setSearchName(e.target.value)}
        />
        <SortDropdown
          value={searchCategory}
          onChange={e => setSearchCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </SortDropdown>
      </SearchContainer>
      <BerriesContainer>
        {loading ? (
          <p>Loading...</p>
        ) : (
          filteredBerries.map(berry => (
            // Dodajemy Link, który prowadzi do ścieżki /berries/:name
            <BerryCard key={berry.name} to={`/berries/${encodeURIComponent(berry.name)}`}>
              <BerryImage src={berry.image} alt={berry.name} />
              <BerryName>{berry.name}</BerryName>
              <BerryCategory>Category: {berry.category}</BerryCategory>
              <BerryEffect>Effect: {berry.effectBattle}</BerryEffect>
            </BerryCard>
          ))
        )}
      </BerriesContainer>
    </div>
  );
};

export default Berrys;
