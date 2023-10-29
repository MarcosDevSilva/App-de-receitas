import { useEffect, useState } from 'react';
import DoneRecipesCard from '../components/DoneRecipesCard';
import DoneRecipesFilter from '../components/DoneRecipesFilter';
import { DoneRecipeType } from '../types';

export default function DoneRecipes() {
  const [doneRecipesData, setDoneRecipesData] = useState([]);
  const [doneRecipesFilter, setDoneRecipesFilter] = useState('all');

  useEffect(() => {
    const data = localStorage.getItem('doneRecipes');
    const dataJSON = data ? JSON.parse(data) : [];
    setDoneRecipesData(dataJSON);
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
