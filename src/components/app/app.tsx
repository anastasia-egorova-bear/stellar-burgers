import { ConstructorPage, Feed } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => (
  <Router>
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path="/" element={<ConstructorPage />} /> 
        <Route path="/feed" element={<Feed />} />  
      </Routes>
    </div>
  </Router>
);

export default App;
