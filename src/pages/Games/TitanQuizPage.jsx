import { useNavigate } from 'react-router-dom';
import TitanQuiz from '../../components/TitanQuiz';

const TitanQuizPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return <TitanQuiz onBack={handleBack} />;
};

export default TitanQuizPage;