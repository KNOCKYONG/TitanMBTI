import { useNavigate } from 'react-router-dom';
import RomanceStyleTest from '../../components/RomanceStyleTest';

const RomanceStylePage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return <RomanceStyleTest onBack={handleBack} />;
};

export default RomanceStylePage;