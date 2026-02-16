import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { NoteList } from './components/NoteList';
import { NoteForm } from './components/NoteForm';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="app-header">
          <h1><Link to="/">Notes App</Link></h1>
          <nav>
            <Link to="/" className="nav-link">Active</Link>
            <Link to="/archived" className="nav-link">Archived</Link>
            <Link to="/new" className="button header-button">New Note</Link>
          </nav>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<NoteList archived={false} />} />
            <Route path="/archived" element={<NoteList archived={true} />} />
            <Route path="/new" element={<NoteForm />} />
            <Route path="/edit/:id" element={<NoteForm />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
