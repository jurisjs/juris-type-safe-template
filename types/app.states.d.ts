// types/app.d.ts
/**
 * Application-specific type definitions for User Management System
 */

export type UserRole = 'Admin' | 'Moderator' | 'User';
export type UserStatus = 'Active' | 'Inactive';
export type LayoutType = 'dashboard' | 'minimal' | 'mobile';
export type ThemeType = 'light' | 'dark' | 'auto';

/**
 * User form data structure
 */
export interface UserFormData {
    /** User's full name */
    name: string;
    /** User's email address */
    email: string;
    /** User's role (Admin, Moderator, User) */
    role: UserRole;
    /** User's status (Active, Inactive) */
    status: UserStatus;
    /** Whether form has been initialized */
    initialized?: boolean;
}

/**
 * User entity structure
 */
export interface User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
}

/**
 * Application state structure
 */
export interface AppState {
    layout: LayoutType;
    theme: ThemeType;
    initialized: boolean;
}

/**
 * Router configuration
 */
export interface RouterConfig {
    basePath: string;
    currentRoute: string;
}

/**
 * User filter options
 */
export interface UserFilters {
    role: UserRole | 'all';
    status: UserStatus | 'all';
}

/**
 * Users state structure
 */
export interface UsersState {
    list: User[];
    search: string;
    filter: UserFilters;
}
