import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAuth } from '../services/api';
import API from '../services/api';

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await checkAuth();
        setUser(response.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await API.post('/auth/logout');
      setUser(null);
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
      navigate('/login');
    }
  };

  if (loading) {
    return (
      <nav className="bg-[#1a1f2e] border-b border-[#3f46e1] p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">ImageCaption AI</h1>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-[#1a1f2e] border-b border-[#3f46e1] p-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-2 justify-between items-start">
        <h1 className="w-fit text-2xl font-bold text-white">ImageCaption AI</h1>

        <div className="w-full md:w-fit flex gap-5 items-center justify-between md:justify-center">
          {user ? (
            <>
              <span className="text-white font-semibold">
                Welcome, {user.username}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-1 md:py-2 rounded transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="text-white hover:text-[#6366f1] font-semibold transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="bg-[#6366f1] hover:bg-[#4f46e5] text-white font-semibold px-4 py-2 rounded transition"
              >
                Register
              </button>
            </>
          )}
        </div>

        
      </div>
    </nav>
  );
};

export default NavBar;
