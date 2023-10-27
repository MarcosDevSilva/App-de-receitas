import { useEffect, useState } from 'react';
import DoneRecipesCard from '../components/DoneRecipesCard';
import DoneRecipesFilter from '../components/DoneRecipesFilter';
import { DoneRecipeType } from '../types';

const MOCKdoneRecipesData = [{
  id: '52772',
  type: 'meal',
  nationality: 'Japanese',
  category: 'Chicken',
  alcoholicOrNot: '',
  name: 'Teriyaki Chicken Casserole',
  image: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg',
  doneDate: '30/10/2021',
  tags: ['Meat', 'Pasta', 'Curry'],
},
{
  id: '52732',
  type: 'drink',
  nationality: 'brasil',
  category: 'cachaça',
  alcoholicOrNot: 'alcoholic',
  name: 'Caipeirinha',
  image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
  doneDate: '30/10/2031',
  tags: ['Limão', 'Cachaça', 'Gelo'],
},
{
  id: '5233',
  type: 'drink',
  nationality: 'holanda',
  category: 'cerveja',
  alcoholicOrNot: 'alcoholic',
  name: 'Brahma',
  image: 'https://www.thecocktaildb.com/images/media/drink/xsqrup1441249130.jpg',
  doneDate: '30/10/2231',
  tags: ['Cristal', 'Skoll'],
},
];

export default function DoneRecipes() {
  const [doneRecipesData, setDoneRecipesData] = useState([]);
  const [doneRecipesFilter, setDoneRecipesFilter] = useState('all');

  useEffect(() => {
    const data = localStorage.getItem('doneRecipes');
    const dataJSON = data ? JSON.parse(data) : [];
    setDoneRecipesData(dataJSON);
    // setDoneRecipesData(MOCKdoneRecipesData);
  }, []);

  const filterdata = (doneRecipesFilter === 'all')
    ? doneRecipesData
    : doneRecipesData.filter((item : DoneRecipeType) => item.type === doneRecipesFilter);

  const handleFilter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setDoneRecipesFilter(e.currentTarget.name);
  };

  return (
    <>
      <DoneRecipesFilter handleFilter={ handleFilter } />
      { filterdata.length > 0 && filterdata.map(({ id, image, name, category,
        nationality, doneDate, tags, type, alcoholicOrNot }, index) => (
          <DoneRecipesCard
            key={ id }
            id={ id }
            img={ image }
            name={ name }
            category={ category }
            nationality={ nationality }
            doneDate={ doneDate }
            tags={ tags }
            index={ index }
            type={ type }
            alcoholicOrNot={ alcoholicOrNot }
          />))}
    </>
  );
}
