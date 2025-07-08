# Juris Framework Types & IntelliSense

Complete TypeScript definitions and IntelliSense support for the Juris JavaScript framework, providing full type safety for VDOM, components, state management, and async operations.

## 🚀 Quick Start

### Installation

```bash
# No installation needed - just add the types folder to your project
types/
├── index.d.ts           # Main TypeScript definitions
├── index.js             # JavaScript implementation
├── html-helper.js       # Shortcuts for HTML inline scripts
└── README.md           # This file
```

### Setup for VS Code IntelliSense

1. Create `jsconfig.json` in your project root:

```json
{
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@types": ["./types/index.d.ts"],
            "@types/*": ["./types/*"]
        },
        "checkJs": true
    },
    "include": ["**/*.js", "**/*.d.ts"]
}
```

2. Start using types immediately:

```javascript
/**
 * @param {Object} props
 * @param {import('@types').JurisContext} context
 * @returns {import('@types').JurisVDOMElement}
 */
export const MyComponent = (props, context) => {
    // Full IntelliSense and type checking! 🎉
};
```

## 📖 Usage Guide

### Component Types

#### Basic Component

```javascript
/**
 * @param {Object} props
 * @param {import('@types').JurisContext} context
 * @returns {import('@types').JurisVDOMElement}
 */
export const SimpleComponent = (props, context) => {
    const {getState, setState} = context;

    return {
        div: {
            className: 'simple',
            text: () => getState('message', 'Hello World'),
            onClick: async e => {
                await setState('clicked', true);
            }
        }
    };
};
```

#### Component with Typed Props

```javascript
/**
 * @param {{
 *   title: string,
 *   count?: number,
 *   items: Array<{id: string, name: string}>,
 *   onItemClick?: (item: {id: string, name: string}) => void
 * }} props
 * @param {import('@types').JurisContext} context
 * @returns {import('@types').JurisVDOMElement}
 */
export const TypedComponent = (props, context) => {
    const {title, count = 0, items, onItemClick} = props;

    return {
        div: {
            className: 'typed-component',
            children: [
                {h1: {text: title}},
                {p: {text: `Count: ${count}`}},
                {
                    ul: {
                        children: items.map(item => ({
                            li: {
                                text: item.name,
                                onClick: () => onItemClick?.(item)
                            }
                        }))
                    }
                }
            ]
        }
    };
};
```

#### Generic Component

```javascript
/**
 * @template T
 * @param {{
 *   items: T[],
 *   renderItem: (item: T) => import('@types').JurisVDOMElement,
 *   keyExtractor?: (item: T) => string
 * }} props
 * @param {import('@types').JurisContext} context
 * @returns {import('@types').JurisVDOMElement}
 */
export const GenericList = (props, context) => {
    const {items, renderItem, keyExtractor} = props;

    return {
        div: {
            className: 'generic-list',
            children: items.map((item, index) => ({
                div: {
                    key: keyExtractor ? keyExtractor(item) : index.toString(),
                    children: [renderItem(item)]
                }
            }))
        }
    };
};
```

### VDOM Element Types

#### All Properties Support Async

```javascript
return {
    div: {
        // Static values
        className: 'container',

        // Reactive functions
        text: () => getState('dynamicText'),

        // Async Promises
        style: Promise.resolve({color: 'blue'}),

        // Async functions
        children: async () => {
            const data = await fetchData();
            return data.map(item => ({p: {text: item.name}}));
        },

        // Async event handlers
        onClick: async e => {
            await saveData();
            setState('saved', true);
        }
    }
};
```

#### Form Elements with Full Typing

```javascript
return {
    form: {
        onSubmit: async e => {
            e.preventDefault();
            await handleSubmit();
        },
        children: [
            {
                input: {
                    type: 'email',
                    value: () => getState('user.email'),
                    placeholder: 'Enter your email',
                    required: true,
                    onChange: e => setState('user.email', e.target.value)
                }
            },
            {
                select: {
                    value: () => getState('user.country'),
                    onChange: e => setState('user.country', e.target.value),
                    children: [{option: {value: 'us', text: 'United States'}}, {option: {value: 'uk', text: 'United Kingdom'}}, {option: {value: 'ca', text: 'Canada'}}]
                }
            },
            {
                button: {
                    type: 'submit',
                    disabled: () => !getState('formValid', false),
                    text: 'Submit'
                }
            }
        ]
    }
};
```

### Context & State Management

#### Typed State Management

```javascript
/**
 * @param {import('@types').JurisContext<{
 *   user: { name: string, email: string },
 *   ui: { loading: boolean, error?: string },
 *   data: Array<{id: number, title: string}>
 * }>} context
 */
function useTypedState(context) {
    const {getState, setState} = context;

    // Typed getState with dot notation
    const userName = getState('user.name', '');
    const isLoading = getState('ui.loading', false);
    const items = getState('data', []);

    // Typed setState
    setState('user.email', 'new@email.com');
    setState('ui.loading', true);

    // Batch updates
    context.executeBatch(() => {
        setState('ui.loading', false);
        setState('ui.error', null);
        setState('data', newData);
    });
}
```

#### Subscriptions

```javascript
export const ReactiveComponent = (props, context) => {
    const {subscribe, getState} = context;

    // Subscribe to state changes
    const unsubscribe = subscribe('user.preferences', (newValue, oldValue, path) => {
        console.log(`${path} changed from`, oldValue, 'to', newValue);
    });

    // Subscribe to exact path only (no children)
    const unsubscribeExact = context.subscribeExact?.('ui.theme', theme => {
        document.body.className = `theme-${theme}`;
    });

    return {
        div: {
            text: () => `Hello, ${getState('user.name', 'Guest')}`
        }
    };
};
```

## 🔧 Advanced Usage

### Framework Configuration

```javascript
/**
 * @type {import('@types').JurisConfig}
 */
const config = {
    logLevel: 'info',
    states: {
        user: {name: 'John', email: 'john@example.com'},
        ui: {theme: 'dark', loading: false}
    },
    components: {
        MyComponent,
        TypedComponent
    },
    headlessComponents: {
        DataManager: {
            fn: DataManagerComponent,
            options: {autoInit: true}
        }
    },
    renderMode: 'fine-grained',
    middleware: [
        ({path, oldValue, newValue}) => {
            console.log(`State change: ${path}`, {oldValue, newValue});
            return newValue; // Return modified value or undefined to keep original
        }
    ]
};

const juris = new Juris(config);
```

### Headless Components

```javascript
/**
 * @param {Object} props
 * @param {import('@types').JurisContext} context
 * @returns {import('@types').HeadlessComponent}
 */
export const DataManager = (props, context) => {
    const {getState, setState} = context;

    return {
        api: {
            async fetchUser(id) {
                setState('ui.loading', true);
                try {
                    const user = await api.getUser(id);
                    setState('user', user);
                    return user;
                } finally {
                    setState('ui.loading', false);
                }
            },

            clearUser() {
                setState('user', null);
            }
        },

        hooks: {
            onRegister() {
                console.log('DataManager registered');
            },

            onUnregister() {
                console.log('DataManager unregistered');
            }
        }
    };
};

// Usage in component
export const UserProfile = (props, context) => {
    const dataManager = context.components?.getHeadlessAPI('DataManager');

    return {
        div: {
            children: [
                {
                    button: {
                        text: 'Load User',
                        onClick: () => dataManager?.fetchUser(123)
                    }
                }
            ]
        }
    };
};
```

### Enhancement System

```javascript
/**
 * @type {import('@types').Enhancement}
 */
const buttonEnhancement = {
    className: 'enhanced-button',
    style: {
        transition: 'all 0.2s ease',
        cursor: 'pointer'
    },
    onClick: e => {
        e.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.target.style.transform = 'scale(1)';
        }, 100);
    }
};

// Apply to all buttons
juris.enhance('button', buttonEnhancement);

// Enhanced form with selectors
juris.enhance('.form-container', {
    className: 'enhanced-form',
    selectors: {
        'input[type="text"]': {
            style: {borderRadius: '4px', padding: '8px'},
            onFocus: e => (e.target.style.borderColor = 'blue'),
            onBlur: e => (e.target.style.borderColor = '')
        },
        '.submit-btn': {
            style: {background: 'green', color: 'white'},
            onClick: async e => {
                e.target.textContent = 'Submitting...';
                await submitForm();
                e.target.textContent = 'Submit';
            }
        }
    }
});
```

## 📁 File Structure Examples

### Separate Component Files

```javascript
// components/UserCard.js
/**
 * @param {{
 *   user: {name: string, email: string, avatar?: string},
 *   onEdit?: () => void,
 *   onDelete?: () => void
 * }} props
 * @param {import('../types').JurisContext} context
 * @returns {import('../types').JurisVDOMElement}
 */
export const UserCard = (props, context) => {
    // Component implementation
};
```

### HTML Inline Scripts

```html
<!DOCTYPE html>
<html>
    <head>
        <script src="./lib/juris.0.8.1.js" type="module"></script>
    </head>
    <body>
        <div id="app"></div>

        <script type="module">
            /**
             * @param {Object} props
             * @param {import('./types/html-helper.js').Context} context
             * @returns {import('./types/html-helper.js').VDOMElement}
             */
            const InlineComponent = (props, context) => {
                return {
                    div: {
                        className: 'inline',
                        text: 'Hello from inline script!'
                    }
                };
            };
        </script>
    </body>
</html>
```

## 🎯 IntelliSense Features

### What You Get

-   ✅ **Full autocomplete** for all VDOM properties
-   ✅ **Type checking** for props and return values
-   ✅ **Event handler signatures** with proper event types
-   ✅ **Async/Promise support** throughout
-   ✅ **Context method completion** (getState, setState, etc.)
-   ✅ **Error detection** for typos and wrong types
-   ✅ **Documentation tooltips** on hover
-   ✅ **Go to definition** for types and methods

### Error Detection Examples

```javascript
// ❌ These will show TypeScript errors:
{
  div: {
    clss: 'wrong',           // Error: 'clss' should be 'className'
    txt: 'wrong',            // Error: 'txt' should be 'text'
    onclick: () => {},       // Error: 'onclick' should be 'onClick'
  }
}

// ❌ Wrong prop types:
const component = MyComponent({
  title: 123,              // Error: title expects string
  count: 'wrong',          // Error: count expects number
  items: 'not-array'       // Error: items expects array
});

// ❌ Wrong context usage:
setState(123, 'value');    // Error: first param should be string path
getState();                // Error: missing required path parameter
```

## 🛠️ Configuration Files

### tsconfig.json (for TypeScript projects)

```json
{
    "compilerOptions": {
        "target": "ES2020",
        "module": "ES2020",
        "moduleResolution": "node",
        "allowJs": true,
        "checkJs": true,
        "baseUrl": ".",
        "paths": {
            "@types": ["./types/index.d.ts"],
            "@types/*": ["./types/*"]
        }
    },
    "include": ["**/*.js", "**/*.ts", "types/**/*"]
}
```

### jsconfig.json (for JavaScript projects)

```json
{
    "compilerOptions": {
        "target": "ES2020",
        "module": "ES2020",
        "checkJs": true,
        "allowJs": true,
        "baseUrl": ".",
        "paths": {
            "@types": ["./types/index.d.ts"]
        }
    },
    "include": ["**/*.js", "**/*.d.ts"]
}
```

### VS Code Settings (.vscode/settings.json)

```json
{
    "typescript.validate.enable": true,
    "javascript.validate.enable": true,
    "typescript.preferences.checkJs": true,
    "javascript.preferences.checkJs": true,
    "html.validate.scripts": true,
    "typescript.suggest.autoImports": true
}
```

## 🔍 Troubleshooting

### Common Issues

#### "Cannot find module '@types'"

**Solution**: Make sure `jsconfig.json` is in your project root with the correct paths configuration.

#### "Types not working in HTML inline scripts"

**Solution**: Use the html-helper import:

```javascript
/**
 * @param {import('./types/html-helper.js').Context} context
 */
```

#### "Property does not exist on type 'Window'"

**Solution**: The global window extensions are included in the types. Make sure you're importing the types properly.

#### "Type 'Element[]' is not assignable"

**Solution**: Use the spread operator to flatten arrays:

```javascript
const content = [...(icon ? [iconElement] : []), ...(Array.isArray(children) ? children : [children])];
```

### Performance Tips

-   Use `executeBatch()` for multiple state updates
-   Prefer `subscribeExact()` for non-hierarchical subscriptions
-   Use `getState(path, defaultValue, false)` to skip reactivity tracking when not needed
-   Enable async caching for frequently used Promise-based props

## 📚 API Reference

### Core Types

-   `JurisInstance` - Main framework instance
-   `JurisContext` - Component context object
-   `JurisVDOMElement` - Virtual DOM element
-   `JurisComponentFunction` - Component function signature
-   `JurisConfig` - Framework configuration

### Utility Types

-   `ReactiveValue<T>` - Value that can be static, function, or Promise
-   `AsyncCapable<T>` - Type that supports async variants
-   `SafeDotNotation<T>` - Type-safe dot notation paths
-   `SmartEventHandler<E>` - Event handler supporting async

### Element Types

-   Form: `InputElement`, `TextAreaElement`, `SelectElement`, `FormElement`
-   Media: `ImageElement`, `VideoElement`, `AudioElement`, `CanvasElement`
-   Table: `TableElement`, `TableRowElement`, `TableCellElement`
-   Interactive: `ButtonElement`, `DetailsElement`, `DialogElement`

## 🤝 Contributing

To extend or modify the types:

1. **Edit `types/index.d.ts`** for TypeScript definitions
2. **Update `types/index.js`** for JavaScript JSDoc types
3. **Modify `types/html-helper.js`** for HTML shortcuts
4. **Test in both TypeScript and JavaScript** projects
5. **Update this README** with new examples

## 📄 License

These type definitions are provided under the same license as the Juris framework.

---

**Happy coding with full type safety! 🎉**
