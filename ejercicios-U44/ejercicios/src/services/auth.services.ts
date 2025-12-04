export interface UserState {
  isAuthenticated: boolean;
  role: 'Guest' | 'Editor' | 'Admin';
}

let currentUser: UserState = { isAuthenticated: true, role: 'Editor' };

export function getCurrentUser(): UserState {
  return currentUser;
}

export function setCurrentUser(user: UserState) {
  currentUser = user;
}