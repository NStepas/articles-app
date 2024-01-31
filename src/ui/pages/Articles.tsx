import { useState } from 'react';

import { NavBar } from '../components/customComponents/Navbar';
import { FetchArticles } from '../components/FetchArticle';
import Modal from '../components/addNewArticle/ModalWindow';

export const Articles = () => {
  const [articleInfoShown, setArticleInfoShown] = useState(false);

  const showArticleInfoHandler = () => {
    setArticleInfoShown(true);
  };

  const hideArticleInfoHandler = () => {
    setArticleInfoShown(false);
  };

  return (
    <div>
      <NavBar showModal={showArticleInfoHandler} />
      <FetchArticles />
      {articleInfoShown ? <Modal onClose={hideArticleInfoHandler} /> : null}
    </div>
  );
};
