import { useNavigate } from 'react-router-dom';
import EgenTest from '../../components/EgenTest';

const EgenTestPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return <EgenTest onBack={handleBack} />;
};

export default EgenTestPage;