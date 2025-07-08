// ============================================================================
// SIMPLE ROUTER HEADLESS COMPONENT
// ============================================================================

const SimpleRouter = (props, context) => {
	const { setState, getState, juris } = context;

	// Get basePath from props or default to empty string
	const basePath = (props?.basePath || '').replace(/\/$/, ''); // Remove trailing slash

	const parseRoute = (route) => {
		if (!route || typeof route !== 'string') {
			return { path: '/', params: {}, query: {} };
		}

		const [pathAndQuery] = route.split('#');
		const [path, queryString] = pathAndQuery.split('?');

		const params = {};
		const query = {};

		if (queryString) {
			queryString.split('&').forEach(pair => {
				const [key, value] = pair.split('=');
				if (key) {
					query[decodeURIComponent(key)] = decodeURIComponent(value || '');
				}
			});
		}

		return { path: path || '/', params, query };
	};

	const stripBasePath = (fullPath) => {
		if (!basePath || !fullPath.startsWith(basePath)) {
			return fullPath;
		}

		const stripped = fullPath.slice(basePath.length);
		return stripped || '/';
	};

	const addBasePath = (path) => {
		if (!basePath) {
			return path;
		}

		// Handle root path
		if (path === '/') {
			return basePath + '/';
		}

		// Ensure path starts with /
		const normalizedPath = path.startsWith('/') ? path : '/' + path;
		return basePath + normalizedPath;
	};

	const matchRoute = (currentPath, routePattern) => {
		const currentSegments = currentPath.split('/').filter(Boolean);
		const patternSegments = routePattern.split('/').filter(Boolean);

		if (currentSegments.length !== patternSegments.length) {
			return null;
		}

		const params = {};

		for (let i = 0; i < patternSegments.length; i++) {
			const pattern = patternSegments[i];
			const current = currentSegments[i];

			if (pattern.startsWith(':')) {
				params[pattern.slice(1)] = current;
			} else if (pattern !== current) {
				return null;
			}
		}

		return params;
	};

	const api = {
		setRoute(route) {
			// Strip basePath from incoming route for internal processing
			const internalRoute = stripBasePath(route);
			const parsed = parseRoute(internalRoute);

			setState('route', {
				current: internalRoute,
				path: parsed.path,
				params: parsed.params,
				query: parsed.query,
				fullPath: route // Keep track of the full path with basePath
			});

			return getState('route');
		},

		getRoute() {
			return getState('route', {
				current: '/',
				path: '/',
				params: {},
				query: {},
				fullPath: basePath ? basePath + '/' : '/'
			});
		},

		navigate(route) {
			// Add basePath for browser navigation
			const fullRoute = addBasePath(route);
			this.setRoute(fullRoute);

			if (typeof window !== 'undefined' && window.history) {
				window.history.pushState({}, '', fullRoute);
			}

			return this.getRoute();
		},

		replace(route) {
			// Add basePath for browser navigation
			const fullRoute = addBasePath(route);
			this.setRoute(fullRoute);

			if (typeof window !== 'undefined' && window.history) {
				window.history.replaceState({}, '', fullRoute);
			}

			return this.getRoute();
		},

		buildUrl(pattern, params = {}, query = {}) {
			let url = pattern;

			Object.entries(params).forEach(([key, value]) => {
				url = url.replace(`:${key}`, encodeURIComponent(value));
			});

			const queryString = Object.entries(query)
				.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
				.join('&');

			if (queryString) {
				url += `?${queryString}`;
			}

			// Add basePath to the final URL
			return addBasePath(url);
		},

		matches(pattern) {
			const route = this.getRoute();
			return matchRoute(route.path, pattern) !== null;
		},

		getParams(pattern) {
			const route = this.getRoute();
			return matchRoute(route.path, pattern) || {};
		},

		// Helper methods for basePath management
		getBasePath() {
			return basePath;
		},

		getFullPath() {
			const route = this.getRoute();
			return route.fullPath || addBasePath(route.current);
		}
	};

	return {
		api: api,
		hooks: {
			onRegister() {
				if (typeof window !== 'undefined') {
					window.addEventListener('popstate', () => {
						const currentRoute = window.location.pathname + window.location.search;
						api.setRoute(currentRoute);
					});

					// Initialize with current browser location
					const initialRoute = window.location.pathname + window.location.search;
					api.setRoute(initialRoute);
				}
			}
		}
	};
};

// ============================================================================
// LAYOUT SYSTEM
// ============================================================================

/**
 * Layout Manager - Switches between different layouts
 * @param {Object} props
 * @param {import('@types').JurisContext} context
 * @returns {import('@types').JurisVDOMElement}
 */
const LayoutManager = (props, context) => {
	const { getState } = context;

	return {
		div: {
			className: 'layout-manager',
			children: () => {
				const currentLayout = getState('app.layout', 'dashboard');
				const layouts = props.layouts || {};

				const layout = layouts[currentLayout];
				return layout ? [layout] : [
					{ div: { text: `Layout "${currentLayout}" not found` } }
				];
			}
		}
	};
};

/**
 * Dashboard Layout - Sidebar + Main Content
 * @param {Object} props
 * @param {import('@types').JurisContext} context
 * @returns {import('@types').JurisVDOMElement}
 */
const DashboardLayout = (props, context) => {
	const { getState, setState } = context;
	const router = context.components?.getHeadlessAPI('SimpleRouter');

	return {
		div: {
			className: 'dashboard-layout',
			children: [
				// Header
				{
					header: {
						className: 'app-header',
						children: [
							{
								div: {
									className: 'header-left',
									children: [
										{ h1: { className: 'app-title', text: 'User Management System' } },
										{
											select: {
												className: 'layout-switcher',
												value: () => getState('app.layout', 'dashboard'),
												onChange: (e) => setState('app.layout', e.target.value),
												children: [
													{ option: { value: 'dashboard', text: 'Dashboard' } },
													{ option: { value: 'minimal', text: 'Minimal' } },
													{ option: { value: 'mobile', text: 'Mobile' } }
												]
											}
										}
									]
								}
							},
							{
								div: {
									className: 'header-right',
									children: [
										{
											div: {
												className: 'user-info',
												text: () => `Welcome, ${getState('auth.user.name', 'Admin')}`
											}
										}
									]
								}
							}
						]
					}
				},

				// Main Content Area
				{
					div: {
						className: 'main-content',
						children: [
							// Sidebar Navigation
							{
								nav: {
									className: 'sidebar',
									children: [
										{
											ul: {
												className: 'nav-menu',
												children: [
													{
														li: {
															className: () => {
																if (!router) return '';
																return router.matches('/users') && !router.matches('/users/create') && !router.matches('/users/edit/:id') ? 'active' : '';
															},
															children: [
																{
																	button: {
																		className: 'nav-button',
																		text: '👥 Users',
																		onClick: () => router?.navigate('/users')
																	}
																}
															]
														}
													},
													{
														li: {
															className: () => {
																if (!router) return '';
																return router.matches('/users/create') ? 'active' : '';
															},
															children: [
																{
																	button: {
																		className: 'nav-button',
																		text: '➕ Add User',
																		onClick: () => router?.navigate('/users/create')
																	}
																}
															]
														}
													},
													{
														li: {
															className: () => {
																if (!router) return '';
																return router.matches('/settings') ? 'active' : '';
															},
															children: [
																{
																	button: {
																		className: 'nav-button',
																		text: '⚙️ Settings',
																		onClick: () => router?.navigate('/settings')
																	}
																}
															]
														}
													}
												]
											}
										}
									]
								}
							},

							// Content Area
							{
								main: {
									className: 'content-area',
									children: () => {
										return props.children ? props.children() : [];
									}
								}
							}
						]
					}
				}
			]
		}
	};
};

// ============================================================================
// ROUTER OUTLET COMPONENT
// ============================================================================

/**
 * Router Outlet - Renders components based on current route
 * @param {Object} props
 * @param {import('@types').JurisContext} context
 * @returns {import('@types').JurisVDOMElement}
 */
const RouterOutlet = (props, context) => {
	const router = context.components?.getHeadlessAPI('SimpleRouter');

	if (!router) {
		return {
			div: {
				className: 'error',
				text: 'SimpleRouter not found. Make sure it is registered as a headless component.'
			}
		};
	}

	return {
		div: {
			className: 'router-outlet',
			children: () => {
				const route = router.getRoute();

				// Handle different routes
				if (router.matches('/users/edit/:id')) {
					const params = router.getParams('/users/edit/:id');
					return [{ UserForm: { isEdit: true, userId: params.id } }];
				}

				if (router.matches('/users/create')) {
					return [{ UserForm: { isEdit: false } }];
				}

				if (router.matches('/users')) {
					return [{ UserList: {} }];
				}

				if (router.matches('/settings')) {
					return [{ SettingsPage: {} }];
				}

				// Default/404 fallback
				return [{
					div: {
						className: 'error-page',
						children: [
							{ h2: { text: '404 - Page Not Found' } },
							{ p: { text: `Current route: ${route.path || 'unknown'}` } },
							{
								button: {
									className: 'btn btn-primary',
									text: 'Go to Users',
									onClick: () => router.navigate('/users')
								}
							}
						]
					}
				}];
			}
		}
	};
};

// ============================================================================
// USER MANAGEMENT COMPONENTS
// ============================================================================

/**
 * User List Component with Search
 * @param {Object} props
 * @param {import('@types').JurisContext} context
 * @returns {import('@types').JurisVDOMElement}
 */
const UserList = (props, context) => {
	const { getState, setState, } = context;
	const router = context.components?.getHeadlessAPI('SimpleRouter');

	// Initialize users data if not exists
	if (!getState('users.list')) {
		setState('users.list', [
			{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
			{ id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
			{ id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
			{ id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Moderator', status: 'Active' },
			{ id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'Active' }
		]);
	}

	return {
		div: {
			className: 'user-list-container',
			children: [
				// Page Header
				{
					div: {
						className: 'page-header',
						children: [
							{ h2: { text: 'User Management' } },
							{
								button: {
									className: 'btn btn-primary',
									text: '+ Add New User',
									onClick: () => router?.navigate('/users/create')
								}
							}
						]
					}
				},

				// Search and Filters
				{
					div: {
						className: 'search-section',
						children: [
							{
								div: {
									className: 'search-controls',
									children: [
										{
											input: {
												type: 'text',
												className: 'search-input',
												placeholder: 'Search users by name or email...',
												value: () => getState('users.search', ''),
												onInput: (e) => setState('users.search', e.target.value)
											}
										},
										{
											select: {
												className: 'filter-select',
												value: () => getState('users.filter.role', 'all'),
												onChange: (e) => setState('users.filter.role', e.target.value),
												children: [
													{ option: { value: 'all', text: 'All Roles' } },
													{ option: { value: 'Admin', text: 'Admin' } },
													{ option: { value: 'Moderator', text: 'Moderator' } },
													{ option: { value: 'User', text: 'User' } }
												]
											}
										},
										{
											select: {
												className: 'filter-select',
												value: () => getState('users.filter.status', 'all'),
												onChange: (e) => setState('users.filter.status', e.target.value),
												children: [
													{ option: { value: 'all', text: 'All Status' } },
													{ option: { value: 'Active', text: 'Active' } },
													{ option: { value: 'Inactive', text: 'Inactive' } }
												]
											}
										}
									]
								}
							}
						]
					}
				},

				// Users Table
				{
					div: {
						className: 'users-table-container',
						children: [
							{
								table: {
									className: 'users-table',
									children: [
										// Table Header
										{
											thead: {
												children: [
													{
														tr: {
															children: [
																{ th: { text: 'ID' } },
																{ th: { text: 'Name' } },
																{ th: { text: 'Email' } },
																{ th: { text: 'Role' } },
																{ th: { text: 'Status' } },
																{ th: { text: 'Actions' } }
															]
														}
													}
												]
											}
										},

										// Table Body
										{
											tbody: {
												children: () => {
													const users = getState('users.list', []);
													const search = getState('users.search', '').toLowerCase();
													const roleFilter = getState('users.filter.role', 'all');
													const statusFilter = getState('users.filter.status', 'all');

													// Filter users
													const filteredUsers = users.filter(user => {
														const matchesSearch = !search ||
															user.name.toLowerCase().includes(search) ||
															user.email.toLowerCase().includes(search);

														const matchesRole = roleFilter === 'all' || user.role === roleFilter;
														const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

														return matchesSearch && matchesRole && matchesStatus;
													});

													if (filteredUsers.length === 0) {
														return [{
															tr: {
																children: [
																	{
																		td: {
																			colspan: 6,
																			className: 'no-results',
																			text: 'No users found matching your criteria'
																		}
																	}
																]
															}
														}];
													}

													return filteredUsers.map(user => ({
														tr: {
															key: user.id,
															children: [
																{ td: { text: user.id } },
																{ td: { text: user.name } },
																{ td: { text: user.email } },
																{
																	td: {
																		children: [
																			{
																				span: {
																					className: `role-badge role-${user.role.toLowerCase()}`,
																					text: user.role
																				}
																			}
																		]
																	}
																},
																{
																	td: {
																		children: [
																			{
																				span: {
																					className: `status-badge status-${user.status.toLowerCase()}`,
																					text: user.status
																				}
																			}
																		]
																	}
																},
																{
																	td: {
																		className: 'actions',
																		children: [
																			{
																				button: {
																					className: 'btn btn-sm btn-secondary',
																					text: 'Edit',
																					onClick: () => router?.navigate(`/users/edit/${user.id}`)
																				}
																			},
																			{
																				button: {
																					className: 'btn btn-sm btn-danger',
																					text: 'Delete',
																					onClick: () => {
																						if (confirm(`Delete user ${user.name}?`)) {
																							const users = getState('users.list', []);
																							const updated = users.filter(u => u.id !== user.id);
																							setState('users.list', updated);
																						}
																					}
																				}
																			}
																		]
																	}
																}
															]
														}
													}));
												}
											}
										}
									]
								}
							}
						]
					}
				},

				// Results Summary
				{
					div: {
						className: 'results-summary',
						children: [
							{
								p: {
									text: () => {
										const users = getState('users.list', []);
										const search = getState('users.search', '').toLowerCase();
										const roleFilter = getState('users.filter.role', 'all');
										const statusFilter = getState('users.filter.status', 'all');

										const filteredUsers = users.filter(user => {
											const matchesSearch = !search ||
												user.name.toLowerCase().includes(search) ||
												user.email.toLowerCase().includes(search);

											const matchesRole = roleFilter === 'all' || user.role === roleFilter;
											const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

											return matchesSearch && matchesRole && matchesStatus;
										});

										return `Showing ${filteredUsers.length} of ${users.length} users`;
									}
								}
							}
						]
					}
				}
			]
		}
	};
};

/**
 * User Create/Edit Form
 * @param {Object} props
 * @param {boolean} [props.isEdit=false] - Whether this is edit mode
 * @param {string} [props.userId] - User ID for edit mode
 * @param {import('@types').JurisContext} context  
 * @returns {import('@types').JurisVDOMElement}
 */
const UserForm = (props, context) => {
	const { getState, setState } = context;
	const router = context.components?.getHeadlessAPI('SimpleRouter');

	const isEdit = props.isEdit || false;
	const userId = props.userId;

	// Initialize form state
	if (!getState('userForm.initialized')) {
		if (isEdit && userId) {
			const users = getState('users.list', []);
			const user = users.find(u => u.id === parseInt(userId));
			if (user) {
				setState('userForm', {
					name: user.name,
					email: user.email,
					role: user.role,
					status: user.status,
					initialized: true
				});
			}
		} else {
			setState('userForm', {
				name: '',
				email: '',
				role: 'User',
				status: 'Active',
				initialized: true
			});
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		/** @type {import('@app-states').UserFormData} */
		const form = getState('userForm', {
			name: '',
			email: '',
			role: 'User',
			status: 'Active',
			initialized: false
		});

		/** @type {import('@app-states').User[]} */
		const users = getState('users.list', []);

		if (isEdit && userId) {
			// Update existing user
			const updated = users.map(user =>
				user.id === parseInt(userId)
					? { ...user, name: form.name, email: form.email, role: form.role, status: form.status }
					: user
			);
			setState('users.list', updated);
		} else {
			// Create new user
			/** @type {import('@app-states').User} */
			const newUser = {
				id: Math.max(...users.map(u => u.id), 0) + 1,
				name: form.name,
				email: form.email,
				role: form.role,
				status: form.status
			};
			setState('users.list', [...users, newUser]);
		}

		// Reset form and navigate back
		setState('userForm', { initialized: false });
		router?.navigate('/users');
	};

	return {
		div: {
			className: 'user-form-container',
			children: [
				{
					div: {
						className: 'page-header',
						children: [
							{
								button: {
									className: 'btn btn-secondary',
									text: '← Back to Users',
									onClick: () => router?.navigate('/users')
								}
							},
							{ h2: { text: isEdit ? `Edit User ${userId}` : 'Create New User' } }
						]
					}
				},

				{
					form: {
						className: 'user-form',
						onSubmit: handleSubmit,
						children: [
							{
								div: {
									className: 'form-group',
									children: [
										{ label: { text: 'Name:' } },
										{
											input: {
												type: 'text',
												className: 'form-input',
												required: true,
												value: () => getState('userForm.name', ''),
												onInput: (e) => setState('userForm.name', e.target.value)
											}
										}
									]
								}
							},

							{
								div: {
									className: 'form-group',
									children: [
										{ label: { text: 'Email:' } },
										{
											input: {
												type: 'email',
												className: 'form-input',
												required: true,
												value: () => getState('userForm.email', ''),
												onInput: (e) => setState('userForm.email', e.target.value)
											}
										}
									]
								}
							},

							{
								div: {
									className: 'form-group',
									children: [
										{ label: { text: 'Role:' } },
										{
											select: {
												className: 'form-select',
												value: () => getState('userForm.role', 'User'),
												onChange: (e) => setState('userForm.role', e.target.value),
												children: [
													{ option: { value: 'User', text: 'User' } },
													{ option: { value: 'Moderator', text: 'Moderator' } },
													{ option: { value: 'Admin', text: 'Admin' } }
												]
											}
										}
									]
								}
							},

							{
								div: {
									className: 'form-group',
									children: [
										{ label: { text: 'Status:' } },
										{
											select: {
												className: 'form-select',
												value: () => getState('userForm.status', 'Active'),
												onChange: (e) => setState('userForm.status', e.target.value),
												children: [
													{ option: { value: 'Active', text: 'Active' } },
													{ option: { value: 'Inactive', text: 'Inactive' } }
												]
											}
										}
									]
								}
							},

							{
								div: {
									className: 'form-actions',
									children: [
										{
											button: {
												type: 'button',
												className: 'btn btn-secondary',
												text: 'Cancel',
												onClick: () => {
													setState('userForm', { initialized: false });
													router?.navigate('/users');
												}
											}
										},
										{
											button: {
												type: 'submit',
												className: 'btn btn-primary',
												text: isEdit ? 'Update User' : 'Create User'
											}
										}
									]
								}
							}
						]
					}
				}
			]
		}
	};
};

/**
 * Settings Page
 * @param {Object} props
 * @param {import('@types').JurisContext} context
 * @returns {import('@types').JurisVDOMElement}
 */
const SettingsPage = (props, context) => {
	const { getState, setState } = context;
	const router = context.components?.getHeadlessAPI('SimpleRouter');

	return {
		div: {
			className: 'settings-container',
			children: [
				{ h2: { text: 'Application Settings' } },

				// Layout Settings
				{
					div: {
						className: 'settings-section',
						children: [
							{ h3: { text: 'Layout Preferences' } },
							{
								div: {
									className: 'setting-item',
									children: [
										{ label: { text: 'Default Layout:' } },
										{
											select: {
												className: 'form-select',
												value: () => getState('app.layout', 'dashboard'),
												onChange: (e) => setState('app.layout', e.target.value),
												children: [
													{ option: { value: 'dashboard', text: 'Dashboard' } },
													{ option: { value: 'minimal', text: 'Minimal' } },
													{ option: { value: 'mobile', text: 'Mobile' } }
												]
											}
										}
									]
								}
							},
							{
								div: {
									className: 'setting-item',
									children: [
										{ label: { text: 'Theme:' } },
										{
											select: {
												className: 'form-select',
												value: () => getState('app.theme', 'light'),
												onChange: (e) => setState('app.theme', e.target.value),
												children: [
													{ option: { value: 'light', text: 'Light' } },
													{ option: { value: 'dark', text: 'Dark' } },
													{ option: { value: 'auto', text: 'Auto' } }
												]
											}
										}
									]
								}
							}
						]
					}
				},

				// Router Information Section
				{
					div: {
						className: 'settings-section',
						children: [
							{ h3: { text: 'Router Information' } },
							{
								div: {
									className: 'setting-item',
									children: [
										{ label: { text: 'Current Route:' } },
										{
											code: {
												className: 'code-display',
												text: () => {
													if (!router) return 'Router not available';
													const route = router.getRoute();
													return route?.current || 'Not available';
												}
											}
										}
									]
								}
							},
							{
								div: {
									className: 'setting-item',
									children: [
										{ label: { text: 'Current Path:' } },
										{
											code: {
												className: 'code-display',
												text: () => {
													if (!router) return 'Router not available';
													const route = router.getRoute();
													return route?.path || 'Not available';
												}
											}
										}
									]
								}
							},
							{
								div: {
									className: 'setting-item',
									children: [
										{ label: { text: 'Route Params:' } },
										{
											code: {
												className: 'code-display',
												text: () => {
													if (!router) return 'Router not available';
													const route = router.getRoute();
													return route?.params ? JSON.stringify(route.params) : '{}';
												}
											}
										}
									]
								}
							},
							{
								div: {
									className: 'setting-item',
									children: [
										{ label: { text: 'Query Params:' } },
										{
											code: {
												className: 'code-display',
												text: () => {
													if (!router) return 'Router not available';
													const route = router.getRoute();
													return route?.query ? JSON.stringify(route.query) : '{}';
												}
											}
										}
									]
								}
							}
						]
					}
				},

				// URL Builder Demo Section
				{
					div: {
						className: 'settings-section',
						children: [
							{ h3: { text: 'URL Builder Demo' } },
							{
								div: {
									className: 'setting-item',
									children: [
										{ label: { text: 'Example URL:' } },
										{
											code: {
												className: 'code-display',
												text: () => {
													if (!router) return 'Router not available';
													return router.buildUrl('/users/edit/:id', { id: 123 }, { tab: 'profile', mode: 'edit' });
												}
											}
										}
									]
								}
							}
						]
					}
				},

				// Test Navigation Section
				{
					div: {
						className: 'settings-section',
						children: [
							{ h3: { text: 'Test Navigation' } },
							{
								div: {
									className: 'nav-test-buttons',
									children: [
										{
											button: {
												className: 'btn btn-secondary',
												text: 'Navigate to Users',
												onClick: () => router?.navigate('/users')
											}
										},
										{
											button: {
												className: 'btn btn-secondary',
												text: 'Navigate to Create User',
												onClick: () => router?.navigate('/users/create')
											}
										},
										{
											button: {
												className: 'btn btn-secondary',
												text: 'Navigate to Edit User #1',
												onClick: () => router?.navigate('/users/edit/1')
											}
										},
										{
											button: {
												className: 'btn btn-secondary',
												text: 'Navigate with Query',
												onClick: () => router?.navigate('/users?filter=active&sort=name')
											}
										}
									]
								}
							},
							{
								div: {
									className: 'nav-test-info',
									children: [
										{
											p: {
												text: 'Use these buttons to test navigation. The SimpleRouter supports URL parameters, query strings, and proper browser history integration.'
											}
										}
									]
								}
							}
						]
					}
				}
			]
		}
	};
};

// ============================================================================
// MAIN APPLICATION
// ============================================================================

/**
 * Main Application Component
 * @param {Object} props
 * @param {import('@types').JurisContext} context
 * @returns {import('@types').JurisVDOMElement}
 */
const App = (props, context) => {
	const { getState, setState } = context;

	// Initialize app state
	if (!getState('app.initialized')) {
		setState('app', {
			layout: 'dashboard',
			theme: 'light',
			initialized: true
		});
		setState('auth.user', {
			name: 'Admin User',
			role: 'Admin'
		});
	}

	return {
		div: {
			className: () => `app app-theme-${getState('app.theme', 'light')}`,
			children: [
				{
					LayoutManager: {
						layouts: {
							dashboard: {
								DashboardLayout: {
									children: () => [
										{ RouterOutlet: {} }
									]
								}
							},
							minimal: {
								div: {
									className: 'minimal-layout',
									children: [
										{ h1: { text: 'Minimal Layout' } },
										{ RouterOutlet: {} }
									]
								}
							},
							mobile: {
								div: {
									className: 'mobile-layout',
									children: [
										{ h1: { text: 'Mobile Layout' } },
										{ RouterOutlet: {} }
									]
								}
							}
						}
					}
				}
			]
		}
	};
};

// ============================================================================
// APPLICATION SETUP
// ============================================================================

// @ts-ignore
const juris = new Juris({
	states: {
		app: {
			layout: 'dashboard',
			theme: 'light',
			initialized: false
		},
		route: {
			current: '/users',
			path: '/users',
			params: {},
			query: {}
		},
		users: {
			list: [],
			search: '',
			filter: {
				role: 'all',
				status: 'all'
			}
		},
		userForm: {
			initialized: false
		},
		auth: {
			user: {
				name: 'Admin User',
				role: 'Admin'
			}
		}
	},
	components: {
		App,
		LayoutManager,
		DashboardLayout,
		RouterOutlet,
		UserList,
		UserForm,
		SettingsPage
	},
	headlessComponents: {
		SimpleRouter: {
			fn: SimpleRouter,
			options: {
				autoInit: true,
				basePath: '/code-with-juris/user-management/', // For XAMPP deployment at localhost/myapp/ }
			}
		},
	},
	layout: { App: {} },
});


/**
 * @param {Object} props
 * @param {import('@types').JurisContextBase} context
 * @returns {import('@types').JurisVDOMElement}
 */
const ComponentName = (props, context) => {
	const { getState, setState } = context;

	return {
		div: {
			className: 'container',
			children: [

			]
		}, //div.container
	};
};

juris.render('#app');