import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layouts
import { DashboardLayout } from './components/layout/DashboardLayout';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';

// Dashboard Pages
import { EntrepreneurDashboard } from './pages/dashboard/EntrepreneurDashboard';
import { InvestorDashboard } from './pages/dashboard/InvestorDashboard';

// Profile Pages
import { EntrepreneurProfile } from './pages/profile/EntrepreneurProfile';
import { InvestorProfile } from './pages/profile/InvestorProfile';

// Feature Pages
import { InvestorsPage } from './pages/investors/InvestorsPage';
import { EntrepreneursPage } from './pages/entrepreneurs/EntrepreneursPage';
import { MessagesPage } from './pages/messages/MessagesPage';
import { NotificationsPage } from './pages/notifications/NotificationsPage';
import { DocumentsPage } from './pages/documents/DocumentsPage';
import { SettingsPage } from './pages/settings/SettingsPage';
import { HelpPage } from './pages/help/HelpPage';
import { DealsPage } from './pages/deals/DealsPage';

// Chat Pages
import { ChatPage } from './pages/chat/ChatPage';

function App() {
  return (
    
      
        
          {/* Authentication Routes */}
          } />
          } />
          
          {/* Dashboard Routes */}
          }>
            } />
            } />
          
          
          {/* Profile Routes */}
          }>
            } />
            } />
          
          
          {/* Feature Routes */}
          }>
            } />
          
          
          }>
            } />
          
          
          }>
            } />
          
          
          }>
            } />
          
          
          }>
            } />
          
          
          }>
            } />
          
          
          }>
            } />
          
          
          }>
            } />
          
          
          {/* Chat Routes */}
          }>
            } />
            } />
          
          
          {/* Redirect root to login */}
          } />
          
          {/* Catch all other routes and redirect to login */}
          } />
        
      
    
  );
}

export default App;
