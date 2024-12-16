import Navbar from './components/Navbar';
import TourPackagesPage from './components/TravelPage';
import PackageBookingPage from './components/PackageBooking';
import Dashboard from './components/Admin';
import TourPackagesTablePage from './components/TravelTable'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InvoiceDownloader from './components/InvoiceDownloader';
import InvoicePage from './components/Invoice';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<TourPackagesPage />} />
        <Route path='/PackageDetail/:id' element={<PackageBookingPage />} />
        <Route path='/Admin' element={<Dashboard />} />
        <Route path='/Table' element={<TourPackagesTablePage />} />
        <Route path='/download-invoice/:bookingId' element={<InvoicePage />} />
        <Route path='/Invoice' element={<InvoiceDownloader />} />
      </Routes>
    </Router>
  );
}

export default App;
