import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Public Components & Pages
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { Home } from './pages/Home';
import { Apply } from './pages/Apply';
import { ApplyData } from './pages/ApplyData';
import { ApplicationStatus } from './pages/ApplicationStatus';
import { AboutUs } from './pages/AboutUs';
import { Guidelines } from './pages/Guidelines';
import { FAQPage } from './pages/FAQPage';
import { ContactUs } from './pages/ContactUs';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsConditions } from './pages/TermsConditions';
import { DisclaimerPage } from './pages/DisclaimerPage';

// Admin Components & Pages
import { AdminLayout } from './admin/AdminLayout';
import { AdminLogin } from './admin/AdminLogin';
import { Dashboard } from './admin/Dashboard';
import { Applications } from './admin/Applications';
import { ApplicationDetails } from './admin/ApplicationDetails';
import { FormBuilder } from './admin/FormBuilder';
import { ProgramSettingsPage } from './admin/ProgramSettings';
import { WhatsAppSettingsPage } from './admin/WhatsAppSettingsPage';
import { Analytics } from './admin/Analytics';
import { AdminsPage } from './admin/Admins';
import { AuditLogsPage } from './admin/AuditLogs';
import { DataManagementPage } from './admin/DataManagement';

// Public Layout Wrapper with sticky Navbar, Footer, and AdSense Cookie Consent
const PublicLayout: React.FC = () => {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      <CookieConsentBanner />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Website Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/apply-data" element={<ApplyData />} />
            <Route path="/application-status" element={<ApplicationStatus />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/guidelines" element={<Guidelines />} />
            <Route path="/guides" element={<Guidelines />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
          </Route>

          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Suite */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="applications" element={<Applications />} />
            <Route path="applications/:id" element={<ApplicationDetails />} />
            <Route path="form-builder" element={<FormBuilder />} />
            <Route path="settings" element={<ProgramSettingsPage />} />
            <Route path="whatsapp" element={<WhatsAppSettingsPage />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="admins" element={<AdminsPage />} />
            <Route path="audit-logs" element={<AuditLogsPage />} />
            <Route path="data" element={<DataManagementPage />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
