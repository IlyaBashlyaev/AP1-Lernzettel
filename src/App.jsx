import {
  Route,
  Routes
} from 'react-router-dom';

import Sidebar from "./components/Sidebar.jsx";
import StartPage from './components/StartPage.jsx';
import DisplayPage from "./components/DisplayPage.jsx";
import './App.css';

export default function App() {
  if (localStorage.getItem('theme') === null)
      localStorage.setItem('theme', 'light');

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="content">
        <main className="content__body">
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route
              path="/page/:pageNumber"
              element={<DisplayPage/>}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
};