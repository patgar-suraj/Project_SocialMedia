import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import ImageCaption from './ImageCaption';
import { checkAuth } from '../services/api';

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await checkAuth();
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div className="w-full h-screen bg-gradient-to-tr from-[#0c1019] via-[#0c1019] to-[#1e293b] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="bg-gradient-to-tr from-[#0c1019] via-[#0c1019] to-[#1e293b] w-full min-h-screen">
      <NavBar />
      <ImageCaption />
    </div>
  );
};

export default Home;
