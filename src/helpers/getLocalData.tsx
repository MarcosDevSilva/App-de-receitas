export default function getLocalData(key: string) {
  const data = localStorage.getItem(key);
  console.log(data);

  if (key === 'inProgressRecipes') {
    return data ? JSON.parse(data) : {
      meals: {},
      drinks: {},
    };
  }
  return data ? JSON.parse(data) : [];
}
