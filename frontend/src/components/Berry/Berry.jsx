import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s ease-in-out;
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  font-size: 2.5rem;
  color: #333;
  text-transform: uppercase;
`;

const FlavorText = styled.p`
  text-align: center;
  font-style: italic;
  margin-bottom: 30px;
  font-size: 1.2rem;
  color: #666;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
  border-radius: 12px;
  border: 2px solid #ccc;
  background: #fdfdfd;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
  }
`;

const Section = styled.div`
  margin-top: 20px;
`;

const SectionTitle = styled.h2`
  margin-bottom: 10px;
  font-size: 1.5rem;
  color: #555;
`;

const Text = styled.p`
  font-size: 1rem;
  color: #444;
  line-height: 1.5;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ListItem = styled.li`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  margin-right: 20px;
  flex-direction: column;
  text-align: center;
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  border-radius: 50%;
  border: 2px solid #ccc;
  margin-bottom: 10px;
  background: #fdfdfd;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
  }
`;

const Type = styled.div`
  background-color: ${props => getTypeColor(props.type)};
  color: white;
  padding: 5px 10px;
  border-radius: 8px;
  margin: 5px 0;
  font-size: 14px;
  text-transform: capitalize;
`;

const FlavorContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 30px;
`;

const Flavor = styled.span`
  background-color: ${props => getFlavorColor(props.flavor)};
  color: white;
  padding: 10px 20px;
  border-radius: 12px;
  margin: 5px;
  font-size: 1rem;
  text-transform: capitalize;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
`;

const getTypeColor = (type) => {
  switch (type) {
    case 'normal': return '#A8A77A';
    case 'fire': return '#EE8130';
    case 'water': return '#6390F0';
    case 'electric': return '#F7D02C';
    case 'grass': return '#7AC74C';
    case 'ice': return '#96D9D6';
    case 'fighting': return '#C22E28';
    case 'poison': return '#A33EA1';
    case 'ground': return '#E2BF65';
    case 'flying': return '#A98FF3';
    case 'psychic': return '#F95587';
    case 'bug': return '#A6B91A';
    case 'rock': return '#B6A136';
    case 'ghost': return '#735797';
    case 'dragon': return '#6F35FC';
    case 'dark': return '#705746';
    case 'steel': return '#B7B7CE';
    case 'fairy': return '#D685AD';
    default: return '#A8A8A8';
  }
};

const getFlavorColor = (flavor) => {
  switch (flavor) {
    case 'spicy': return '#FF6347';
    case 'dry': return '#B0E0E6';
    case 'sweet': return '#FFC0CB';
    case 'bitter': return '#8FBC8F';
    case 'sour': return '#FFD700';
    default: return '#A8A8A8';
  }
};

const BerryDetails = () => {
  const { name } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/berry/${name}`)
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [name]);

  if (loading) {
    return <Container><p>Loading...</p></Container>;
  }

  if (error) {
    return <Container><p>Error: {error.message}</p></Container>;
  }

  return (
    <Container>
      <Title>{data.name.replace('-', ' ').toUpperCase()}</Title>
      <FlavorText>{data.flavorText}</FlavorText>
      <ImageWrapper>
        <Image src={data.image} alt={data.name} />
      </ImageWrapper>
      <FlavorContainer>
        {data.flavor.map(flavor => (
          <Flavor key={flavor} flavor={flavor}>{flavor}</Flavor>
        ))}
      </FlavorContainer>
      <Section>
        <SectionTitle>Category</SectionTitle>
        <Text>{data.category}</Text>
      </Section>
      <Section>
        <SectionTitle>Effect</SectionTitle>
        <Text>{data.effect}</Text>
      </Section>
      <Section>
        <SectionTitle>Held By</SectionTitle>
        <List>
          {data.held.map(pokemon => (
            <ListItem key={pokemon.pokemon}>
              <ItemImage src={pokemon.image} alt={pokemon.pokemon} />
              <div>
                <span>{pokemon.pokemon}</span>
                <div>
                  {pokemon.types.map(type => (
                    <Type key={type} type={type}>{type}</Type>
                  ))}
                </div>
              </div>
            </ListItem>
          ))}
        </List>
      </Section>
    </Container>
  );
};

export default BerryDetails;
