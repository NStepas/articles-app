import { NavBar } from '../components/customComponents/Navbar';
import { FetchArticles } from '../components/FetchArticle';

export const PublicArticle = () => {
  return (
    <div>
      <NavBar />
      <FetchArticles />
    </div>
  );
};
