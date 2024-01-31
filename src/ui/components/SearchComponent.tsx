import { useState } from 'react';

import { useData } from '../../DataContext';
import { useGetArticlesQuery } from '../../slices/apiSlice';

export const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState(null);
  const [context] = useData();
  const { updateData } = context;

  const handleChange = (e: any) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const { data: articles } = useGetArticlesQuery(searchTerm);

  updateData(articles);

  return (
    <div>
      <input
        name='search'
        className='rounded-lg focus:outline-blue-500 p-1 bg-slate-100'
        type='search'
        placeholder='Search Task'
        onChange={handleChange}
      />
    </div>
  );
};
