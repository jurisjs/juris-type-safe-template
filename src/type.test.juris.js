// Comprehensive Component Usage Examples
// Demonstrates how to use all the registered component types

/**
 * @param {Object} props
 * @param {import('@types').JurisContext} context
 * @returns {import('@types').JurisVDOMElement}
 */
export const ComprehensiveApp = (props, context) => {
	const { getState, setState } = context;

	return {
		div: {
			className: 'comprehensive-app',
			children: [
				// 1. LAYOUT EXAMPLES
				{
					LayoutManager: {
						props: {
							layouts: {
								dashboard: {
									DashboardLayout: {
										props: {
											sidebar: true,
											theme: getState('app.theme', 'light')
										},
										children: [
											{ RouterOutlet: {} }
										]
									}
								},
								mobile: {
									div: {
										className: 'mobile-layout',
										children: [
											{ RouterOutlet: { props: { transition: 'slide' } } }
										]
									}
								}
							}
						}
					}
				},

				// 2. USER MANAGEMENT EXAMPLES
				{
					UserList: {
						props: {
							users: getState('users.list', []),
							loading: getState('users.loading', false),
							error: getState('users.error'),
							showSearch: true,
							showFilters: true,
							filters: getState('users.filters', { role: 'all', status: 'all' }),
							onUserSelect: (user) => {
								setState('selectedUser', user);
								setState('userModalOpen', true);
							},
							onBulkAction: (action, userIds) => {
								if (action === 'delete') {
									setState('confirmDeleteUsers', userIds);
									setState('confirmModalOpen', true);
								}
							}
						}
					}
				},

				// 3. MODAL WITH USER FORM
				{
					Modal: {
						props: {
							isOpen: getState('userModalOpen', false),
							title: getState('selectedUser') ? 'Edit User' : 'Add User',
							size: 'medium',
							onClose: () => setState('userModalOpen', false),
							onOk: async () => {
								const formData = getState('userForm');
								await saveUser(formData);
								setState('userModalOpen', false);
							},
							okText: 'Save User',
							confirmLoading: getState('users.saving', false)
						},
						slots: {
							body: [
								{
									UserForm: {
										props: {
											isEdit: !!getState('selectedUser'),
											userId: getState('selectedUser.id'),
											initialData: getState('selectedUser'),
											onSubmit: async (data) => {
												setState('users.saving', true);
												try {
													await context.services.userService.save(data);
													setState('userModalOpen', false);
													setState('users.needsRefresh', true);
												} finally {
													setState('users.saving', false);
												}
											},
											onCancel: () => setState('userModalOpen', false),
											validation: {
												required: ['name', 'email', 'role'],
												minLength: { name: 2, email: 5 },
												pattern: { email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }
											}
										}
									}
								}
							]
						}
					}
				},

				// 4. DATA TABLE EXAMPLE
				{
					DataTable: {
						props: {
							data: getState('reports.data', []),
							loading: getState('reports.loading', false),
							columns: [
								{
									key: 'id',
									title: 'ID',
									width: 80,
									sortable: true
								},
								{
									key: 'name',
									title: 'Name',
									sortable: true,
									filterable: true,
									render: (value, row) => ({
										RouterLink: {
											props: {
												to: `/users/${row.id}`,
												text: value
											}
										}
									})
								},
								{
									key: 'status',
									title: 'Status',
									render: (value) => ({
										span: {
											className: `status-badge status-${value.toLowerCase()}`,
											text: value
										}
									})
								},
								{
									key: 'actions',
									title: 'Actions',
									align: 'right',
									render: (_, row) => ({
										div: {
											className: 'action-buttons',
											children: [
												{
													button: {
														text: 'Edit',
														onClick: () => editUser(row)
													}
												},
												{
													button: {
														text: 'Delete',
														className: 'danger',
														onClick: () => deleteUser(row.id)
													}
												}
											]
										}
									})
								}
							],
							pagination: {
								page: getState('reports.page', 1),
								size: getState('reports.pageSize', 10),
								total: getState('reports.total', 0),
								onPageChange: (page, size) => {
									setState('reports.page', page);
									setState('reports.pageSize', size);
									loadReports();
								}
							},
							onSort: (column, direction) => {
								setState('reports.sort', { column, direction });
								loadReports();
							}
						}
					}
				},

				// 5. FORM COMPONENTS EXAMPLES
				{
					div: {
						className: 'form-examples',
						children: [
							{
								FormField: {
									props: {
										label: 'Search Users',
										name: 'search',
										type: 'text',
										placeholder: 'Type to search...',
										value: getState('search.query', ''),
										onChange: (value) => {
											setState('search.query', value);
											searchUsers(value);
										}
									}
								}
							},
							{
								FormSelect: {
									props: {
										label: 'Filter by Role',
										name: 'roleFilter',
										value: getState('filters.role', 'all'),
										options: [
											{ value: 'all', label: 'All Roles' },
											{ value: 'Admin', label: 'Admin' },
											{ value: 'Moderator', label: 'Moderator' },
											{ value: 'User', label: 'User' }
										],
										onChange: (value) => {
											setState('filters.role', value);
											applyFilters();
										}
									}
								}
							},
							{
								FormDatePicker: {
									props: {
										label: 'Created After',
										name: 'createdAfter',
										value: getState('filters.createdAfter'),
										showTime: false,
										onChange: (date) => {
											setState('filters.createdAfter', date);
											applyFilters();
										}
									}
								}
							}
						]
					}
				},

				// 6. TABS EXAMPLE
				{
					Tabs: {
						props: {
							activeKey: getState('activeTab', 'users'),
							onChange: (key) => setState('activeTab', key),
							items: [
								{
									key: 'users',
									label: 'Users',
									content: {
										UserList: {
											props: {
												users: getState('users.list', [])
											}
										}
									}
								},
								{
									key: 'settings',
									label: 'Settings',
									content: {
										SettingsPage: {
											props: {
												sections: [
													{
														key: 'general',
														title: 'General Settings',
														component: { div: { text: 'General settings content' } }
													},
													{
														key: 'security',
														title: 'Security',
														component: { div: { text: 'Security settings content' } }
													}
												]
											}
										}
									}
								},
								{
									key: 'logs',
									label: 'Audit Logs',
									content: {
										AuditLog: {
											props: {
												logs: getState('auditLogs', []),
												loading: getState('auditLogs.loading', false),
												filters: getState('auditLogs.filters', {}),
												onFilterChange: (filters) => {
													setState('auditLogs.filters', filters);
													loadAuditLogs();
												}
											}
										}
									}
								}
							]
						}
					}
				},

				// 7. FEEDBACK COMPONENTS
				{
					div: {
						className: 'feedback-section',
						children: [
							// Loading spinner
							{
								LoadingSpinner: {
									props: {
										spinning: getState('app.loading', false),
										tip: 'Loading data...',
										size: 'large'
									}
								}
							},

							// Alert message
							getState('alert.visible') ? {
								Alert: {
									props: {
										type: getState('alert.type', 'info'),
										title: getState('alert.title'),
										message: getState('alert.message'),
										closable: true,
										onClose: () => setState('alert.visible', false)
									}
								}
							} : null,

							// Progress bar
							{
								ProgressBar: {
									props: {
										percent: getState('upload.progress', 0),
										status: getState('upload.status', 'normal'),
										showInfo: true,
										strokeColor: { from: '#108ee9', to: '#87d068' }
									}
								}
							}
						].filter(Boolean) // Remove null values
					}
				},

				// 8. UTILITY COMPONENTS
				{
					ErrorBoundary: {
						props: {
							fallback: {
								div: {
									className: 'error-fallback',
									children: [
										{ h2: { text: 'Something went wrong' } },
										{ p: { text: 'Please try refreshing the page.' } },
										{
											button: {
												text: 'Refresh',
												onClick: () => window.location.reload()
											}
										}
									]
								}
							},
							onError: (error) => {
								console.error('Component error:', error);
								context.services.errorReporting.log(error);
							}
						}
					}
				},

				// 9. CONDITIONAL RENDERING
				{
					Conditional: {
						props: {
							when: getState('user.role') === 'Admin',
							fallback: {
								div: {
									className: 'access-denied',
									text: 'Access denied. Admin privileges required.'
								}
							}
						},
						children: [
							{
								div: {
									className: 'admin-panel',
									children: [
										{ h3: { text: 'Admin Panel' } },
										{
											button: {
												text: 'Manage Users',
												onClick: () => setState('currentView', 'userManagement')
											}
										}
									]
								}
							}
						]
					}
				},

				// 10. FILE UPLOAD
				{
					FileUpload: {
						props: {
							accept: 'image/*,.pdf,.doc,.docx',
							multiple: true,
							maxSize: 10 * 1024 * 1024, // 10MB
							maxFiles: 5,
							dragDrop: true,
							showFileList: true,
							onUpload: (files) => {
								setState('uploadedFiles', files);
								setState('upload.progress', 0);
							},
							onProgress: (percent) => {
								setState('upload.progress', percent);
							},
							onSuccess: (response, file) => {
								const files = getState('completedUploads', []);
								setState('completedUploads', [...files, { file, response }]);
							},
							onError: (error, file) => {
								setState('alert', {
									visible: true,
									type: 'error',
									title: 'Upload Failed',
									message: `Failed to upload ${file.name}: ${error.message}`
								});
							}
						}
					}
				}
			]
		}
	};
};

// Helper functions for the examples
function editUser(user) {
	return { type: 'EDIT_USER', payload: user };
}

function deleteUser(userId) {
	return { type: 'DELETE_USER', payload: userId };
}

function saveUser(formData) {
	return Promise.resolve({ id: Date.now(), ...formData });
}

function searchUsers(query) {
	// Debounced search implementation
	return Promise.resolve([]);
}

function applyFilters() {
	// Filter application logic
	return Promise.resolve();
}

function loadReports() {
	// Load reports with current filters/pagination
	return Promise.resolve();
}

function loadAuditLogs() {
	// Load audit logs
	return Promise.resolve();
}

/**
 * Example of a dashboard layout using multiple components
 */
export const DashboardExample = (props, context) => {
	const { getState, setState } = context;

	return {
		DashboardLayout: {
			props: {
				sidebar: getState('ui.sidebarOpen', true),
				theme: getState('ui.theme', 'light')
			},
			children: [
				{
					div: {
						className: 'dashboard-content',
						children: [
							// Header with breadcrumbs
							{
								Breadcrumb: {
									props: {
										items: [
											{ title: 'Home', href: '/' },
											{ title: 'Dashboard', href: '/dashboard' },
											{ title: 'Users' }
										]
									}
								}
							},

							// Main content area
							{
								div: {
									className: 'dashboard-main',
									children: [
										// Statistics cards
										{
											div: {
												className: 'stats-grid',
												children: [
													{
														UserCard: {
															props: {
																user: {
																	id: 1,
																	name: 'Total Users',
																	email: getState('stats.totalUsers', 0).toString()
																},
																size: 'large',
																showActions: false
															}
														}
													},
													{
														UserCard: {
															props: {
																user: {
																	id: 2,
																	name: 'Active Users',
																	email: getState('stats.activeUsers', 0).toString()
																},
																size: 'large',
																showActions: false
															}
														}
													}
												]
											}
										},

										// Router outlet for dynamic content
										{
											RouterOutlet: {
												props: {
													fallback: {
														LoadingSpinner: {
															props: {
																size: 'large',
																message: 'Loading page...'
															}
														}
													}
												}
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
 * @param {Object} props
 * @param {import('@types').JurisContext} context
 * @returns {import('@types').JurisVDOMElement}
 */
export const App = (props, context) => {
	const { getState, setState } = context;

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
								{ key: 'name', title: 'Name', sortable: true },
								{ key: 'email', title: 'Email' }
							],
							onRowClick: row => console.log('Selected:', row)
						}
					}
				}
			]
		}
	};
};