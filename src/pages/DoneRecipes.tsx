import { useState } from 'react';
import DoneRecipesCard from '../components/DoneRecipesCard';
import DoneRecipesFilter from '../components/DoneRecipesFilter';

export default function DoneRecipes() {
  const mockLocalStorage = [{
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
    id: '52772',
    type: 'drink',
    nationality: 'brasil',
    category: 'cachaça',
    alcoholicOrNot: 'alcoholic',
    name: 'Caipeirinha',
    image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
    doneDate: '30/10/2021',
    tags: ['Limão', 'Cachaça', 'Gelo'],
  }];
  const [doneRecipesFilter, setDoneRecipesFilter] = useState('all');

  const filterdata = (doneRecipesFilter === 'all')
    ? mockLocalStorage
    : mockLocalStorage.filter((item) => item.type === doneRecipesFilter);

  const handleFilter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setDoneRecipesFilter(e.currentTarget.name);
  };

  return (
    <>
      <DoneRecipesFilter handleFilter={ handleFilter } />
      {filterdata.map(({ id, image, name, category,
        nationality, doneDate, tags, type }, index) => (
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
          />))}
    </>
  );
}
