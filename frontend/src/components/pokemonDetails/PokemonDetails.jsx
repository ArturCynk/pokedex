import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

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

const Container = styled.div`
  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 10px;
`;

const FlavorText = styled.p`
  text-align: center;
  font-style: italic;
  margin-bottom: 20px;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ImageWrapper = styled.div`
  margin: 10px;
`;

const Image = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const SelectWrapper = styled.div`
  margin-top: 10px;
  text-align: center;
`;

const Select = styled.select`
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 20px;
`;

const Details = styled.div`
  margin-top: 20px;
`;

const SectionTitle = styled.h2`
  margin-bottom: 10px;
`;

const AbilityButton = styled.button`
  background-color: #6699ff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  margin-right: 10px;
  margin-bottom: 10px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #0056b3;
  }
`;

const TypesWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const Type = styled.div`
  background-color: ${props => getTypeColor(props.type)};
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  margin: 5px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

const VariantsWrapper = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const VariantLink = styled(Link)`
  display: block;
  margin: 5px 0;
  color: #007bff;
  text-decoration: underline;
`;

const EvolutionsWrapper = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const EvolutionLink = styled(Link)`
  display: inline-block;
  margin: 0 10px;
  text-align: center;
  text-decoration: none;
`;

const EvolutionImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 25%;
  border: 2px solid #ccc;
  margin-bottom: 10px;
`;

const EvolutionName = styled.p`
  margin-top: 5px;
  color: #000;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => (props.show ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
`;

const CloseButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  display: block;
  margin-left: auto;
`;

const StatContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const StatItem = styled.div`
  flex: 1 1 25%;
  margin: 10px;
  text-align: center;
`;

const StatName = styled.span`
  font-size: 1rem;
  color: #495057;
`;

const StatBarContainer = styled.div`
  width: 100%;
  background-color: #dee2e6;
  border-radius: 10px;
  overflow: hidden;
`;

const StatBar = styled.div`
  width: ${({ value }) => value}%;
  background-color: #6c757d;
  padding: 5px 0;
`;

const PokemonDetails = () => {
  const { name } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageType, setImageType] = useState('default');
  const [abilityModalOpen, setAbilityModalOpen] = useState(false);
  const [selectedAbility, setSelectedAbility] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/pokedex/${name}`)
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [name]);

  const handleAbilityClick = (ability) => {
    setSelectedAbility(ability);
    setAbilityModalOpen(true);
  };

  const closeModal = () => {
    setAbilityModalOpen(false);
    setSelectedAbility(null);
  };

  if (loading) {
    return (
      <Container>
        <p>Loading...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <p>Error: {error.message}</p>
      </Container>
    );
  }

  return (
    <Container>
      <Title>{data.name.charAt(0).toUpperCase() + data.name.slice(1)}</Title>
      <FlavorText>{data.tekst.flavor_text}</FlavorText>
      <Grid>
        <ImageWrapper>
          <Image src={imageType === 'default' ? data.image : data.imagesShiny} alt={data.name} />
          <SelectWrapper>
            <Select value={imageType} onChange={(e) => setImageType(e.target.value)}>
              <option value="default">Default</option>
              <option value="shiny">Shiny</option>
            </Select>
          </SelectWrapper>
        </ImageWrapper>
        <Details>
        <SectionTitle>Details</SectionTitle>
        <p>Habitat: {data.habitat.name}</p>
        <p>Generation: {data.generation.name}</p>
        <p>Egg Groups: {data.egg.map(group => group.name).join(', ')}</p>
        <SectionTitle>Abilities</SectionTitle>
          <AbilityButton key={data.abilities.name} onClick={() => handleAbilityClick(data.abilities.text)}>
            {data.abilities.name}
          </AbilityButton>
      </Details>

      </Grid>
      <TypesWrapper>
        {data.types.map(type => (
          <Type key={type} type={type}>{type}</Type>
        ))}
      </TypesWrapper>
      <EvolutionsWrapper>
        <SectionTitle>Evolutions</SectionTitle>
        {data.evolutions.map((evo, index) => (
          <React.Fragment key={evo.name}>
            {index > 0 && <span>→</span>}
            <EvolutionLink to={`/pokemon/${evo.name}`}>
              <EvolutionImage src={evo.img} alt={evo.name} />
              <EvolutionName>{evo.name.charAt(0).toUpperCase() + evo.name.slice(1)}</EvolutionName>
              <TypesWrapper>
                {evo.types.map(type => (
                  <Type key={type} type={type}>{type}</Type>
                ))}
              </TypesWrapper>
            </EvolutionLink>
          </React.Fragment>
        ))}
      </EvolutionsWrapper>
      <Title>Base Stats</Title>
      <StatContainer>
        {data.stats.map(stat => (
          <StatItem key={stat.name}>
            <StatName>{stat.name.toUpperCase()}</StatName>
            <StatBarContainer>
              <StatBar value={stat.base_stat}></StatBar>
            </StatBarContainer>
            {stat.base_stat}
          </StatItem>
        ))}
      </StatContainer>
      {data.variantes.length > 1 && (
        <VariantsWrapper>
          <SectionTitle>Variants</SectionTitle>
          {data.variantes.map(variant => (
            <VariantLink key={variant.pokemon.name} to={`/pokemon/${variant.pokemon.name}`}>
              {variant.pokemon.name.replace(/-/g, ' ')}
            </VariantLink>
          ))}
        </VariantsWrapper>
      )}

      <ModalOverlay show={abilityModalOpen} onClick={closeModal}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <h3>Ability Details</h3>
          <p>{selectedAbility}</p>
          <CloseButton onClick={closeModal}>Close</CloseButton>
        </ModalContent>
      </ModalOverlay>
    </Container>
  );
};

export default PokemonDetails;

