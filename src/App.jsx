import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { HomePage } from './pages/HomePage';
import { DestinationsPage } from './pages/DestinationsPage';
import { ShowcasePage } from './pages/ShowcasePage';
import { StoryPage } from './pages/StoryPage';
import { ModulesPage } from './pages/ModulesPage';
import { ContactPage } from './pages/ContactPage';
import { deckData } from '../shared/deckData.js';

function isValidDeck(data) {
  return Boolean(
    data
    && data.property
    && Array.isArray(data.dashboardPages)
    && data.dashboardPages.length > 0
    && Array.isArray(data.quickStats)
    && Array.isArray(data.journey)
    && data.modules
    && Array.isArray(data.actionCards)
  );
}

function AppRoutes() {
  const [deck, setDeck] = useState(deckData);

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/deck', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Deck API failed with status ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        if (isValidDeck(data)) {
          setDeck(data);
          return;
        }

        setDeck(deckData);
      })
      .catch(() => setDeck(deckData));

    return () => controller.abort();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage deck={deck} />} />
      <Route path="/destinations" element={<DestinationsPage deck={deck} />} />
      <Route path="/:pageId" element={<ShowcasePage deck={deck} />} />
      <Route path="/story" element={<StoryPage deck={deck} />} />
      <Route path="/modules" element={<ModulesPage deck={deck} />} />
      <Route path="/contact" element={<ContactPage deck={deck} />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <Layout deck={deckData}>
        <AppRoutes />
      </Layout>
    </Router>
  );
}

export default App;
