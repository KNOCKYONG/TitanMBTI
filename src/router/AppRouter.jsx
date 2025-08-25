import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import HomePage from '../pages/Home/HomePage';
import TestPage from '../pages/Test/TestPage';
import TypeDetailPage from '../pages/Types/TypeDetailPage';
import TypesListPage from '../pages/Types/TypesListPage';
import BlogListPage from '../pages/Blog/BlogListPage';
import BlogPostPage from '../pages/Blog/BlogPostPage';
import GuidePage from '../pages/Guide/GuidePage';
import AboutPage from '../pages/About/AboutPage';
import ContactPage from '../pages/Contact/ContactPage';
import PrivacyPage from '../pages/Privacy/PrivacyPage';
import TermsPage from '../pages/Terms/TermsPage';
import WorldCupPage from '../pages/Games/WorldCupPage';
import EgenTestPage from '../pages/Games/EgenTestPage';
import RomanceStylePage from '../pages/Games/RomanceStylePage';
import TitanQuizPage from '../pages/Games/TitanQuizPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="test" element={<TestPage />} />
        <Route path="worldcup" element={<WorldCupPage />} />
        <Route path="egen" element={<EgenTestPage />} />
        <Route path="romance" element={<RomanceStylePage />} />
        <Route path="titanquiz" element={<TitanQuizPage />} />
        <Route path="types" element={<TypesListPage />} />
        <Route path="types/:mbtiType" element={<TypeDetailPage />} />
        <Route path="blog" element={<BlogListPage />} />
        <Route path="blog/:slug" element={<BlogPostPage />} />
        <Route path="guide" element={<GuidePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="terms" element={<TermsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;