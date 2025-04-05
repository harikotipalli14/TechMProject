import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

export interface LoginResponse {
  success: boolean;
  message: string;
  user?: {
    id: number;
    email: string;
  };
}

export interface SignupResponse {
  success: boolean;
  message: string;
  user?: {
    id: number;
    email: string;
  };
}

export interface User {
  id: number;
  email: string;
  password: string;
  name?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserKey = 'currentUser';
  private usersKey = 'users';
  private isBrowser: boolean;
  private currentUserSubject = new BehaviorSubject<{ id: number; email: string } | null>(null);
  public currentUserValue = this.currentUserSubject.asObservable();
  
  // Mock user data
  private mockUsers: User[] = [
    {
      id: 1,
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User'
    }
  ];

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) { 
    this.isBrowser = isPlatformBrowser(platformId);
    
    // Initialize users from localStorage if available and in browser environment
    if (this.isBrowser) {
      this.loadUsersFromStorage();
    }

    // Initialize current user from storage
    if (this.isBrowser) {
      const storedUser = localStorage.getItem(this.currentUserKey);
      if (storedUser) {
        this.currentUserSubject.next(JSON.parse(storedUser));
      }
    }
  }

  private loadUsersFromStorage(): void {
    if (!this.isBrowser) return;
    
    const storedUsers = localStorage.getItem(this.usersKey);
    if (storedUsers) {
      this.mockUsers = JSON.parse(storedUsers);
    } else {
      // Save initial mock users to localStorage
      localStorage.setItem(this.usersKey, JSON.stringify(this.mockUsers));
    }
  }

  private saveUsersToStorage(): void {
    if (!this.isBrowser) return;
    
    localStorage.setItem(this.usersKey, JSON.stringify(this.mockUsers));
  }

  login(email: string, password: string): Observable<LoginResponse> {
    // Find user by email
    const user = this.mockUsers.find(u => u.email === email);
    
    let response: LoginResponse;
    
    if (!user) {
      response = {
        success: false,
        message: 'Invalid email or password'
      };
    } else if (user.password !== password) {
      response = {
        success: false,
        message: 'Invalid email or password'
      };
    } else {
      response = {
        success: true,
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email
        }
      };
    }
    
    // Update currentUserSubject when login is successful
    if (user) {
      const userData = { id: user.id, email: user.email };
      this.currentUserSubject.next(userData);
      if (this.isBrowser) {
        localStorage.setItem(this.currentUserKey, JSON.stringify(userData));
      }
    }
    
    // Return as observable
    return of(response).pipe(
      tap(response => {
        if (response.success && response.user && this.isBrowser) {
          // Store user info in localStorage
          localStorage.setItem(this.currentUserKey, JSON.stringify(response.user));
        }
      })
    );
  }

  signup(email: string, password: string, name?: string): Observable<SignupResponse> {
    // Check if email already exists
    const existingUser = this.mockUsers.find(u => u.email === email);
    
    if (existingUser) {
      return of({
        success: false,
        message: 'Email already registered'
      });
    }
    
    // Create new user
    const newUser: User = {
      id: this.mockUsers.length > 0 ? Math.max(...this.mockUsers.map(u => u.id)) + 1 : 1,
      email,
      password,
      name
    };
    
    // Add to users array
    this.mockUsers.push(newUser);
    
    // Save to localStorage
    this.saveUsersToStorage();
    
    // Return success response
    return of({
      success: true,
      message: 'Account created successfully',
      user: {
        id: newUser.id,
        email: newUser.email
      }
    }).pipe(
      tap(response => {
        if (response.success && response.user && this.isBrowser) {
          // Store user info in localStorage
          localStorage.setItem(this.currentUserKey, JSON.stringify(response.user));
        }
      })
    );
  }

  logout(): void {
    this.currentUserSubject.next(null);
    if (this.isBrowser) {
      localStorage.removeItem(this.currentUserKey);
    }
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  getCurrentUser(): { id: number; email: string } | null {
    if (!this.isBrowser) return null;
    
    const userStr = localStorage.getItem(this.currentUserKey);
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }
} 