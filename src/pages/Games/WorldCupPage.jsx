import { useNavigate } from 'react-router-dom';
import WorldCup from '../../components/WorldCup';

const WorldCupPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return <WorldCup onBack={handleBack} />;
};

export default WorldCupPage;