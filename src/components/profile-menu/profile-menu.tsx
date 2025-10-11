import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logout } from '../../services/slice/userSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // const handleLogout = () => {
  //   dispatch(logout());
  //   navigate('/login');
  // };

    const handleLogout = async () => {
    await dispatch(logout());
    navigate('/');
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
