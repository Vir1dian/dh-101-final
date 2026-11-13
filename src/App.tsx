import { Route, Routes } from 'react-router'
import SiteLayout from './components/SiteLayout'
import AboutPage from './pages/AboutPage'
import AnalysisPage from './pages/AnalysisPage'
import ChapterPage from './pages/ChapterPage'
import DataPage from './pages/DataPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import SourcesPage from './pages/SourcesPage'

// Adding a page: create it in src/pages, add a <Route> here, and a tab in content/site.ts.
export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="analysis" element={<AnalysisPage />} />
        <Route path="analysis/:slug" element={<ChapterPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="data" element={<DataPage />} />
        <Route path="sources" element={<SourcesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
