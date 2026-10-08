import { AdminUser } from '../types';
import { storageService } from './storageService';

const SESSION_KEY = 'citizengrant_admin_session';

export interface AdminSession {
  user: AdminUser;
  token: string;
  loginTime: string;
}

export const authService = {
  /**
   * Check if an admin is currently logged in locally
   */
  getCurrentSession(): AdminSession | null {
    try {
      const data = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
      if (!data) return null;
      return JSON.parse(data) as AdminSession;
    } catch {
      return null;
    }
  },

  /**
   * Login method
   * Note: In this frontend-only client architecture, authentication is handled via a local credential layer.
   * In a future production backend migration, this will make a POST /api/auth/login request.
   */
  async login(email: string, pass: string, rememberMe = true): Promise<{ success: boolean; error?: string; user?: AdminUser }> {
    if (email.trim().toLowerCase() !== 'humayoonkhan003@gmail.com' || pass !== 'adminehsasprogram') {
      return {
        success: false,
        error: 'غلط ای میل یا پاسورڈ درج کیا گیا ہے۔ (Invalid credentials.)',
      };
    }

    const admins = storageService.getAdmins();
    const matched = admins.find((a) => a.email.toLowerCase() === email.trim().toLowerCase());

    if (!matched) {
      return {
        success: false,
        error: 'ایڈمن ریکارڈ نہیں ملا۔ (Administrator profile not found.)',
      };
    }

    // Update last login
    matched.lastLogin = new Date().toISOString();
    storageService.saveAdmins(admins);

    const session: AdminSession = {
      user: matched,
      token: 'dev_mock_jwt_' + Math.random().toString(36).substring(2),
      loginTime: new Date().toISOString(),
    };

    if (rememberMe) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } else {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }

    storageService.addAuditLog('LOGIN', undefined, `Admin signed into portal (${matched.role})`, matched.email, matched.name);

    return { success: true, user: matched };
  },

  logout(): void {
    const session = this.getCurrentSession();
    if (session) {
      storageService.addAuditLog('LOGOUT', undefined, 'Admin signed out of portal', session.user.email, session.user.name);
    }
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_KEY);
  },

  isAuthenticated(): boolean {
    return this.getCurrentSession() !== null;
  },

  getCurrentUser(): AdminUser | null {
    const session = this.getCurrentSession();
    return session ? session.user : null;
  },
};
