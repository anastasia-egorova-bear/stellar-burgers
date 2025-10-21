import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { login, selectErrorMessage } from '../../services/slice/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const errorText = useSelector(selectErrorMessage);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const result = dispatch(login({ email, password }));
    if (login.fulfilled.match(result)) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  };

  return (
    <LoginUI
      errorText={errorText || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
