import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { routes } from './routes/routes';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <ToastContainer />
      <div className="app">
        <nav className="nav">
          {routes
            .filter(route => route.showInNav)
            .map(route => (
              <Link key={route.path} to={route.path}>
                {route.label}
              </Link>
            ))}
        </nav>
        
        <Routes>
          {routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
