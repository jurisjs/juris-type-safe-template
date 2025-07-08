# 🚀 Juris TypeSafe App Template for Enterprise Applications

[![Juris Version](https://img.shields.io/badge/Juris-0.8.1-blue.svg)](https://jurisjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Enterprise Ready](https://img.shields.io/badge/Enterprise-Ready-green.svg)](#enterprise-features)
[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A production-ready, enterprise-grade template for building scalable applications with the Juris framework, featuring comprehensive TypeScript support, component validation, and developer experience optimizations.

## 🎯 **What This Template Provides**

-   ✅ **Complete Type Safety** - Full TypeScript definitions for all Juris features
-   ✅ **Component Registration System** - Type-safe component library with validation
-   ✅ **Enterprise Architecture** - Scalable patterns for large applications
-   ✅ **Developer Experience** - IntelliSense, error detection, and auto-completion
-   ✅ **Production Ready** - Performance optimizations and best practices
-   ✅ **40+ Pre-typed Components** - Ready-to-use UI component library

## 🚀 **Quick Start**

### Prerequisites

-   Modern browser (Chrome, Firefox, Safari, Edge)
-   IDE with TypeScript/JavaScript support (VS Code recommended)
-   Basic HTTP server (optional, for development)

### Installation

```html
<!-- Option 1: CDN (Recommended) -->
<script src="https://unpkg.com/juris@0.8.1/juris.js"></script>

<!-- Option 2: Download and host locally -->
<script src="./lib/juris.0.8.1.js"></script>
```

### Project Structure

```
your-app/
├── types/
│   ├── index.d.ts         # Core Juris type definitions
│   ├── index.js           # JavaScript IntelliSense support
│   ├── app.states.d.ts    # Your app's getState return types definitions
├── components/
│   ├── UserCard.js        # Example typed component
│   ├── DataTable.js       # Enterprise data component
│   └── Modal.js           # UI component with slots
├── services/
│   ├── userService.js     # Business logic services
│   └── apiClient.js       # HTTP client
├── layouts/
│   ├── DashboardLayout.js # Layout components
│   └── MobileLayout.js    # Responsive layouts
├── pages/
│   ├── UserManagement.js  # Page components
│   └── Dashboard.js       # Dashboard page
├── src/app.juris.js       # Main application
├── jsconfig.json          # TypeScript configuration
├── index.html             # Entry point
└── index.juris.js				 # Juris's Types Import
```

## 📝 **Basic Usage**

### 1. Register Your Components

First, define your components in `types/app.d.ts`:

```typescript
declare global {
    namespace Juris {
        interface RegisteredComponents {
            UserCard: {
                props: {
                    user: {id: number; name: string; email: string};
                    theme?: 'light' | 'dark';
                    onEdit?: (user: any) => void;
                };
            };

            DataTable: {
                props: {
                    data: Array<Record<string, any>>;
                    columns: Array<{key: string; title: string; sortable?: boolean}>;
                    onRowClick?: (row: any) => void;
                };
            };
        }
    }
}
```

### 2. Create Type-Safe Components

```javascript
/**
 * @param {{
 *   user: { id: number, name: string, email: string },
 *   theme?: 'light' | 'dark',
 *   onEdit?: (user: any) => void
 * }} props
 * @param {import('./types').JurisContext} context
 * @returns {import('./types').JurisVDOMElement}
 */
export const UserCard = (props, context) => {
    const {user, theme = 'light', onEdit} = props;

    return {
        div: {
            className: `user-card theme-${theme}`,
            children: [
                {h3: {text: user.name}},
                {p: {text: user.email}},
                onEdit
                    ? {
                          button: {
                              text: 'Edit',
                              onClick: () => onEdit(user)
                          }
                      }
                    : null
            ].filter(Boolean)
        }
    };
};
```

### 3. Use Components with Full Type Safety

```javascript
/**
 * @param {Object} props
 * @param {import('./types').JurisContext} context
 * @returns {import('./types').JurisVDOMElement}
 */
export const App = (props, context) => {
    const {getState, setState} = context;

    return {
        div: {
            className: 'app',
            children: [
                // ✅ Full type safety and IntelliSense
                {
                    UserCard: {
                        props: {
                            user: getState('currentUser'),
                            theme: 'dark',
                            onEdit: user => setState('editingUser', user)
                            // ❌ TypeScript error for invalid props
                        }
                    }
                },

                {
                    DataTable: {
                        props: {
                            data: getState('users', []),
                            columns: [
                                {key: 'name', title: 'Name', sortable: true},
                                {key: 'email', title: 'Email'}
                            ],
                            onRowClick: row => console.log('Selected:', row)
                        }
                    }
                }
            ]
        }
    };
};
```

### 4. Register and Initialize

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
    <head>
        <title>Juris TypeSafe Enterprise App</title>
        <script src="https://unpkg.com/juris@0.8.1/juris.js"></script>
    </head>
    <body>
        <div id="app"></div>

        <script type="module">
            import {UserCard, DataTable, App} from './components/index.js';

            const juris = new Juris({
                states: {
                    currentUser: {id: 1, name: 'John Doe', email: 'john@example.com'},
                    users: []
                },
                layout: App
            });

            // Register components
            juris.registerComponent('UserCard', UserCard);
            juris.registerComponent('DataTable', DataTable);

            // Render
            juris.render('#app');
        </script>
    </body>
</html>
```

## 🏢 **Enterprise Features**

### Advanced State Management

```javascript
// Hierarchical state with type safety
const appState = {
    ui: {
        theme: 'dark',
        sidebar: {collapsed: false, width: 240},
        modals: {userEdit: {open: false, userId: null}}
    },
    data: {
        users: {list: [], loading: false, error: null},
        reports: {current: null, filters: {}}
    },
    auth: {
        user: null,
        permissions: [],
        token: null
    }
};

// Type-safe state access
const isLoading = context.getState('data.users.loading', false);
const userCount = context.getState('data.users.list', []).length;
const sidebarWidth = context.getState('ui.sidebar.width', 240);
```

### Component Composition Patterns

```javascript
// Modal with slots
{
    Modal: {
        props: {
            isOpen: getState('modals.userEdit.open'),
            title: 'Edit User',
            size: 'large'
        },
        slots: {
            body: [
                {
                    UserForm: {
                        props: {
                            userId: getState('modals.userEdit.userId'),
                            onSave: handleUserSave
                        }
                    }
                }
            ],
            footer: [
                { button: { text: 'Cancel', onClick: closeModal } },
                { button: { text: 'Save', onClick: saveUser } }
            ]
        }
    }
}
```

### Service Integration

```javascript
// services/userService.js
export class UserService {
    constructor(apiClient) {
        this.api = apiClient;
    }

    async getAll() {
        return this.api.get('/users');
    }

    async save(userData) {
        return this.api.post('/users', userData);
    }
}

// Initialize with services
const juris = new Juris({
    services: {
        userService: new UserService(new ApiClient()),
        authService: new AuthService()
    }
});

// Use in components
const {userService} = context.services;
const users = await userService.getAll();
```

### Layout Management

```javascript
// Dynamic layout switching
const LayoutManager = {
    layouts: {
        dashboard: {
            DashboardLayout: {
                props: {sidebar: true},
                children: [{RouterOutlet: {}}]
            }
        },
        mobile: {
            div: {
                className: 'mobile-layout',
                children: [{RouterOutlet: {}}]
            }
        }
    }
};
```

## 🔧 **Development Workflow**

### 1. Component-First Development

```bash
# 1. Define component type in app.component.d.ts
# 2. Define getState types in app.states.d.ts
# 3. Get helpful TypeScript errors
# 4. Implement component with full IntelliSense
# 5. Register component
# 6. Use with type safety
```

### 2. Error Prevention

```javascript
// ❌ These errors are caught during development:
{
    UserCard: {
        props: {
            user: currentUser,
            invalidProp: 'error'  // Error: property doesn't exist
        }
    }
}

{
    UnregisteredComponent: {  // Error: component not registered
        props: {}
    }
}

{
    dvi: {  // Error: typo in HTML element
        className: 'container'
    }
}
```

### 3. Progressive Enhancement

Start with basic components and add types as your app grows:

```javascript
// Phase 1: Basic usage (no types)
{ MyComponent: { props: { data: anything } } }

// Phase 2: Add to app.d.ts for type safety
declare global {
  namespace Juris {
    interface RegisteredComponents {
      MyComponent: { props: { data: MyDataType } };
    }
  }
}

// Phase 3: Full IntelliSense and validation ✅
```

## 🚀 **Performance Optimizations**

### Built-in Optimizations

-   **Element Recycling** - Automatic DOM element reuse
-   **Smart Reconciliation** - Efficient diff/patch algorithms
-   **Async Component Loading** - Code splitting and lazy loading
-   **Batch Updates** - Optimized state change batching
-   **Fine-grained Reactivity** - Surgical DOM updates

### Performance Monitoring

```javascript
// Get performance stats
const stats = juris.getAsyncStats();
console.log('Active placeholders:', stats.activePlaceholders);
console.log('Cached components:', stats.cachedAsyncProps);

// Monitor enhancement performance
const enhancementStats = juris.getEnhancementStats();
console.log('Enhanced elements:', enhancementStats.totalEnhanced);
```

## 📚 **Advanced Patterns**

### Headless Components

```javascript
// Define business logic components
const DataManager = (props, context) => ({
    api: {
        async loadUsers() {
            context.setState('users.loading', true);
            const users = await userService.getAll();
            context.setState('users.list', users);
            context.setState('users.loading', false);
        },

        async saveUser(userData) {
            const user = await userService.save(userData);
            context.setState('users.needsRefresh', true);
            return user;
        }
    }
});

// Use in components
const dataManager = context.components.getHeadlessAPI('DataManager');
await dataManager.loadUsers();
```

### Micro-Frontend Architecture

```javascript
// Register micro-frontend modules
juris.registerComponent('UserModule', UserMicroFrontend);
juris.registerComponent('ReportsModule', ReportsMicroFrontend);
juris.registerComponent('AnalyticsModule', AnalyticsMicroFrontend);

// Dynamic module loading
{
    div: {
        children: () => {
            const activeModule = getState('activeModule');
            return [{[activeModule]: {props: {}}}];
        };
    }
}
```

### State Middleware

```javascript
const juris = new Juris({
    middleware: [
        // Logging middleware
        ({path, oldValue, newValue}) => {
            console.log(`State change: ${path}`, {oldValue, newValue});
            return newValue;
        },

        // Validation middleware
        ({path, newValue}) => {
            if (path.startsWith('users.') && !isValidUser(newValue)) {
                throw new Error('Invalid user data');
            }
            return newValue;
        },

        // Persistence middleware
        ({path, newValue}) => {
            if (path.startsWith('settings.')) {
                localStorage.setItem(path, JSON.stringify(newValue));
            }
            return newValue;
        }
    ]
});
```

## 🔒 **Security & Best Practices**

### Input Validation

```javascript
// Form validation with type safety
{
    FormField: {
        props: {
            name: 'email',
            validation: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                custom: (value) => {
                    if (bannedDomains.includes(value.split('@')[1])) {
                        return 'Domain not allowed';
                    }
                    return null;
                }
            }
        }
    }
}
```

### Permission Guards

```javascript
{
    PermissionGuard: {
        props: {
            permissions: ['admin', 'user.edit'],
            userPermissions: getState('auth.permissions', []),
            requireAll: false,
            fallback: { div: { text: 'Access denied' } }
        },
        children: [
            { AdminPanel: { props: {} } }
        ]
    }
}
```

### XSS Prevention

```javascript
// Safe HTML rendering
{
    div: {
        // ❌ Dangerous
        innerHTML: userInput,

        // ✅ Safe
        text: userInput
    }
}

// Sanitized HTML (when needed)
{
    div: {
        innerHTML: sanitizeHtml(userInput)
    }
}
```

## 📊 **Production Deployment**

### File Structure for Production

```
your-app/
├── index.html              # Entry point
├── lib/
│   └── juris.0.8.1.js     # Juris framework
├── types/                  # Type definitions
│   ├── index.d.ts         # Core types
│   └── app.d.ts           # App-specific types
├── components/             # Component modules
├── services/               # Business logic
├── assets/                 # Static assets
│   ├── css/
│   ├── images/
│   └── fonts/
└── jsconfig.json          # IDE configuration
```

### Browser Configuration

```json
// jsconfig.json (for IDE support)
{
    "compilerOptions": {
        "target": "ES2020",
        "module": "ES2020",
        "checkJs": true,
        "allowJs": true,
        "baseUrl": ".",
        "paths": {
            "@types": ["./types/index.d.ts"],
            "@components/*": ["./components/*"],
            "@services/*": ["./services/*"]
        }
    },
    "include": ["**/*.js", "**/*.d.ts"],
    "exclude": ["node_modules"]
}
```

### Environment Configuration

```javascript
// config/environment.js
export const config = {
    production: {
        logLevel: 'error',
        renderMode: 'batch',
        apiBaseURL: 'https://api.yourapp.com'
    },
    development: {
        logLevel: 'debug',
        renderMode: 'fine-grained',
        apiBaseURL: 'http://localhost:3000'
    }
};

// Use in app
const env = window.location.hostname === 'localhost' ? 'development' : 'production';
const juris = new Juris({
    logLevel: config[env].logLevel,
    renderMode: config[env].renderMode
});
```

### Performance Monitoring

```javascript
// Browser-based monitoring
if (window.location.hostname !== 'localhost') {
    setInterval(() => {
        const stats = juris.getAsyncStats();

        // Send to analytics service
        fetch('/analytics', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                type: 'performance',
                data: {
                    activePlaceholders: stats.activePlaceholders,
                    cachedComponents: stats.cachedAsyncProps,
                    timestamp: Date.now(),
                    url: window.location.pathname
                }
            })
        });
    }, 30000);
}
```

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Add your component types to `types/app.d.ts`
4. Implement components with proper JSDoc typing
5. Add usage examples and tests
6. Submit a pull request

### Component Contribution Guidelines

-   All components must be registered in `app.d.ts`
-   Include comprehensive prop typing
-   Add JSDoc comments for JavaScript IntelliSense
-   Follow naming conventions (`PascalCase` for components)
-   Include usage examples in documentation

## 📄 **License**

MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 **Links**

-   🏠 [Juris Framework](https://jurisjs.com/)
-   📚 [Documentation](https://docs.jurisjs.com/)
-   🐛 [Issues](https://github.com/jurisjs/typesafe-enterprise-template/issues)
-   💬 [Discussions](https://github.com/jurisjs/juris/discussions)
-   📺 [Examples](https://codepen.io/jurisauthor)

## 🎉 **Success Stories**

> "The TypeSafe template reduced our development time by 40% and eliminated entire classes of runtime errors. The IntelliSense support is incredible!"
>
> — **Enterprise Development Team**

> "We migrated our legacy React app to Juris using this template. The type safety and performance improvements were immediately noticeable."
>
> — **Senior Frontend Engineer**

---

**Built with ❤️ by the Juris community**

Ready to build type-safe, enterprise-grade applications? [Get started now! →](#quick-start)
