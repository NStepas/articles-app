import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CustomTable } from './customComponents/CustomTable';
import { useGetArticlesQuery } from '../../slices/apiSlice';

export const FetchArticles = () => {
  const {
    data: articles,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetArticlesQuery();

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = articles;
  } else if (isError) {
    toast.error(error?.data?.message, {
      position: 'bottom-left',
    });
  }

  return (
    <div>
      <CustomTable articles={content} />
      <ToastContainer />
    </div>
  );
};
