/**
 * This is where all your component definitions
 * Comprehensive Juris Component Type Registration Examples
 * Covers most common patterns and type definitions
 * 
 * Components registered here are part of Juris demo components, feel free to delete or study theme
 */

import { ComponentElement, JurisVDOMElement, ReactiveValue } from './index';

declare global {
  namespace Juris {
    interface RegisteredComponents {      
      // 1. LAYOUT & ROUTING COMPONENTS
      LayoutManager: { 
        props: {
          layouts: Record<string, any>; // Or be more specific with layout names
        }
      };
      
      DashboardLayout: { 
        props: {
          children?: ReactiveValue<Element[]>| ComponentElement;
          theme?: 'light' | 'dark';
        }
      };
      
      RouterOutlet: { 
        props?: {
          fallback?: JurisVDOMElement;
          loading?: boolean;
          transition?: 'fade' | 'slide' | 'none';
        }
      };
      
      RouterLink: {
        props: {
          to: string;
          exact?: boolean;
          activeClass?: string;
          text?: string;
        };
      };

      // 2. USER MANAGEMENT COMPONENTS
      UserForm: {
        props: {
          isEdit?: boolean;
          userId?: number;
          initialData?: Partial<User>;
          onSubmit?: (data: UserFormData) => void | Promise<void>;
          onCancel?: () => void;
          validation?: {
            required?: string[];
            minLength?: Record<string, number>;
            pattern?: Record<string, RegExp>;
          };
        };
      };

      UserCard: {
        props: {
          user: User;
          theme?: 'light' | 'dark' | 'compact';
          showActions?: boolean;
          showAvatar?: boolean;
          size?: 'small' | 'medium' | 'large';
          onEsdit?: (user: User) => void;
          onDelete?: (userId: number) => void;
          onClick?: (user: User) => void;
          customActions?: Array<{
            label: string;
            icon?: string;
            action: (user: User) => void;
            variant?: 'primary' | 'secondary' | 'danger';
          }>;
        };
      };

      UserList: {
        props: {
          users?: User[];
          loading?: boolean;
          error?: string | null;
          emptyMessage?: string;
          itemsPerPage?: number;
          showPagination?: boolean;
          showSearch?: boolean;
          showFilters?: boolean;
          filters?: UserFilters;
          onUserSelect?: (user: User) => void;
          onBulkAction?: (action: string, userIds: number[]) => void;
          renderCustomItem?: (user: User, index: number) => JurisVDOMElement;
        };
      };

      UserProfile: {
        props: {
          userId: number;
          editable?: boolean;
          sections?: Array<'basic' | 'permissions' | 'activity' | 'settings'>;
          onSave?: (data: Partial<User>) => Promise<void>;
          onPasswordChange?: (oldPassword: string, newPassword: string) => Promise<void>;
        };
      };

      // 3. DATA DISPLAY COMPONENTS
      DataTable: {
        props: {
          data: Array<Record<string, any>>;
          columns: Array<{
            key: string;
            title: string;
            width?: number | string;
            sortable?: boolean;
            filterable?: boolean;
            render?: (value: any, row: any, index: number) => string | JurisVDOMElement;
            align?: 'left' | 'center' | 'right';
            sticky?: boolean;
          }>;
          loading?: boolean;
          error?: string | null;
          emptyMessage?: string;
          rowKey?: string | ((row: any) => string);
          selectable?: boolean;
          selectedRows?: string[];
          onRowSelect?: (selectedRows: string[]) => void;
          onRowClick?: (row: any, index: number) => void;
          onSort?: (column: string, direction: 'asc' | 'desc') => void;
          onFilter?: (filters: Record<string, any>) => void;
          pagination?: {
            page: number;
            size: number;
            total: number;
            showSizeChanger?: boolean;
            showQuickJumper?: boolean;
            onPageChange?: (page: number, size: number) => void;
          };
          actions?: Array<{
            label: string;
            icon?: string;
            action: (row: any) => void;
            visible?: (row: any) => boolean;
            disabled?: (row: any) => boolean;
          }>;
        };
      };

      SearchableList: {
        props: {
          items: Array<{ id: string | number; [key: string]: any }>;
          searchFields: string[];
          placeholder?: string;
          renderItem: (item: any, index: number, searchTerm: string) => JurisVDOMElement;
          onSelect?: (item: any) => void;
          maxResults?: number;
          loading?: boolean;
          debounceMs?: number;
        };
      };

      VirtualList: {
        props: {
          items: any[];
          itemHeight: number | ((index: number) => number);
          height: number;
          renderItem: (item: any, index: number) => JurisVDOMElement;
          overscan?: number;
          onScroll?: (scrollTop: number) => void;
        };
      };

      // 4. FORM COMPONENTS
      FormField: {
        props: {
          label: string;
          name: string;
          type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
          value?: any;
          placeholder?: string;
          required?: boolean;
          disabled?: boolean;
          readonly?: boolean;
          error?: string;
          help?: string;
          validation?: {
            required?: boolean;
            minLength?: number;
            maxLength?: number;
            pattern?: RegExp;
            custom?: (value: any) => string | null;
          };
          onChange?: (value: any, name: string) => void;
          onBlur?: (value: any, name: string) => void;
          onFocus?: (value: any, name: string) => void;
        };
      };

      FormSelect: {
        props: {
          label: string;
          name: string;
          value?: any;
          options: Array<{
            value: any;
            label: string;
            disabled?: boolean;
            group?: string;
          }>;
          placeholder?: string;
          required?: boolean;
          disabled?: boolean;
          multiple?: boolean;
          searchable?: boolean;
          clearable?: boolean;
          error?: string;
          help?: string;
          onChange?: (value: any, name: string) => void;
          onSearch?: (searchTerm: string) => void;
          renderOption?: (option: any) => JurisVDOMElement;
        };
      };

      FormCheckbox: {
        props: {
          label: string;
          name: string;
          checked?: boolean;
          value?: any;
          disabled?: boolean;
          indeterminate?: boolean;
          error?: string;
          help?: string;
          onChange?: (checked: boolean, value: any, name: string) => void;
        };
      };

      FormDatePicker: {
        props: {
          label: string;
          name: string;
          value?: Date | string;
          format?: string;
          placeholder?: string;
          required?: boolean;
          disabled?: boolean;
          minDate?: Date | string;
          maxDate?: Date | string;
          showTime?: boolean;
          error?: string;
          help?: string;
          onChange?: (date: Date | null, name: string) => void;
        };
      };

      // 5. UI COMPONENTS
      Modal: {
        props: {
          isOpen: boolean;
          title?: string;
          size?: 'small' | 'medium' | 'large' | 'fullscreen';
          closable?: boolean;
          maskClosable?: boolean;
          keyboard?: boolean;
          centered?: boolean;
          zIndex?: number;
          className?: string;
          onClose?: () => void;
          onOk?: () => void | Promise<void>;
          onCancel?: () => void;
          okText?: string;
          cancelText?: string;
          okButtonProps?: Record<string, any>;
          cancelButtonProps?: Record<string, any>;
          confirmLoading?: boolean;
          destroyOnClose?: boolean;
        };
        slots?: {
          header?: JurisVDOMElement[];
          body?: JurisVDOMElement[];
          footer?: JurisVDOMElement[];
        };
      };

      Drawer: {
        props: {
          isOpen: boolean;
          title?: string;
          placement?: 'top' | 'right' | 'bottom' | 'left';
          width?: number | string;
          height?: number | string;
          closable?: boolean;
          maskClosable?: boolean;
          mask?: boolean;
          keyboard?: boolean;
          className?: string;
          onClose?: () => void;
          destroyOnClose?: boolean;
        };
        slots?: {
          header?: JurisVDOMElement[];
          body?: JurisVDOMElement[];
          footer?: JurisVDOMElement[];
        };
      };

      Tabs: {
        props: {
          activeKey?: string;
          defaultActiveKey?: string;
          type?: 'line' | 'card' | 'editable-card';
          size?: 'small' | 'medium' | 'large';
          position?: 'top' | 'right' | 'bottom' | 'left';
          animated?: boolean;
          destroyInactiveTabPane?: boolean;
          onChange?: (activeKey: string) => void;
          onEdit?: (targetKey: string, action: 'add' | 'remove') => void;
          items: Array<{
            key: string;
            label: string;
            disabled?: boolean;
            closable?: boolean;
            content: JurisVDOMElement;
          }>;
        };
      };

      Accordion: {
        props: {
          items: Array<{
            key: string;
            title: string;
            content: JurisVDOMElement;
            disabled?: boolean;
            showArrow?: boolean;
          }>;
          activeKeys?: string[];
          defaultActiveKeys?: string[];
          accordion?: boolean; // Only one panel open at a time
          bordered?: boolean;
          size?: 'small' | 'medium' | 'large';
          expandIcon?: JurisVDOMElement;
          onChange?: (activeKeys: string[]) => void;
        };
      };

      // 6. FEEDBACK COMPONENTS
      LoadingSpinner: {
        props: {
          size?: 'small' | 'medium' | 'large';
          color?: string;
          message?: string;
          overlay?: boolean;
          spinning?: boolean;
          delay?: number;
          tip?: string;
        };
      };

      Alert: {
        props: {
          type: 'success' | 'info' | 'warning' | 'error';
          title?: string;
          message: string;
          description?: string;
          closable?: boolean;
          showIcon?: boolean;
          banner?: boolean;
          onClose?: () => void;
          action?: JurisVDOMElement;
        };
      };

      Toast: {
        props: {
          type: 'success' | 'info' | 'warning' | 'error';
          title?: string;
          message: string;
          duration?: number;
          closable?: boolean;
          showIcon?: boolean;
          position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
          onClose?: () => void;
        };
      };

      ProgressBar: {
        props: {
          percent: number;
          type?: 'line' | 'circle' | 'dashboard';
          status?: 'normal' | 'exception' | 'active' | 'success';
          showInfo?: boolean;
          strokeColor?: string | { from: string; to: string };
          strokeWidth?: number;
          size?: 'small' | 'medium' | 'large' | number;
          format?: (percent: number) => string;
        };
      };

      // 7. NAVIGATION COMPONENTS
      Breadcrumb: {
        props: {
          items: Array<{
            title: string;
            href?: string;
            onClick?: () => void;
            disabled?: boolean;
          }>;
          separator?: string | JurisVDOMElement;
          maxItems?: number;
          itemRender?: (item: any, index: number) => JurisVDOMElement;
        };
      };

      Menu: {
        props: {
          mode?: 'horizontal' | 'vertical' | 'inline';
          theme?: 'light' | 'dark';
          selectedKeys?: string[];
          openKeys?: string[];
          collapsed?: boolean;
          collapsible?: boolean;
          items: Array<{
            key: string;
            label: string;
            icon?: string;
            disabled?: boolean;
            children?: Array<any>;
            href?: string;
            onClick?: () => void;
          }>;
          onSelect?: (selectedKeys: string[]) => void;
          onOpenChange?: (openKeys: string[]) => void;
        };
      };

      Pagination: {
        props: {
          current: number;
          total: number;
          pageSize?: number;
          pageSizeOptions?: string[];
          showSizeChanger?: boolean;
          showQuickJumper?: boolean;
          showTotal?: boolean | ((total: number, range: [number, number]) => string);
          size?: 'small' | 'medium' | 'large';
          simple?: boolean;
          onChange?: (page: number, pageSize: number) => void;
          onShowSizeChange?: (current: number, size: number) => void;
        };
      };

      // 8. UTILITY COMPONENTS
      ErrorBoundary: {
        props: {
          fallback?: JurisVDOMElement;
          onError?: (error: Error, errorInfo: any) => void;
          resetKeys?: any[];
          resetOnPropsChange?: boolean;
        };
      };

      LazyLoad: {
        props: {
          loader: () => Promise<JurisVDOMElement>;
          fallback?: JurisVDOMElement;
          error?: JurisVDOMElement;
          retry?: boolean;
          timeout?: number;
          onLoad?: () => void;
          onError?: (error: Error) => void;
        };
      };

      Portal: {
        props: {
          container?: HTMLElement | string;
          disabled?: boolean;
        };
      };

      Conditional: {
        props: {
          when: boolean | (() => boolean);
          fallback?: JurisVDOMElement;
        };
      };

      // 9. SETTINGS & ADMIN COMPONENTS
      SettingsPage: {
        props: {
          sections?: Array<{
            key: string;
            title: string;
            description?: string;
            component: JurisVDOMElement;
            badge?: string | number;
          }>;
          activeSection?: string;
          onSectionChange?: (section: string) => void;
          onSave?: (data: Record<string, any>) => Promise<void>;
          onReset?: () => void;
          saveButtonText?: string;
          resetButtonText?: string;
          showSaveButton?: boolean;
          showResetButton?: boolean;
        };
      };

      PermissionGuard: {
        props: {
          permissions: string | string[];
          userPermissions: string[];
          requireAll?: boolean;
          fallback?: JurisVDOMElement;
          onUnauthorized?: () => void;
        };
      };

      AuditLog: {
        props: {
          logs: Array<{
            id: string;
            timestamp: Date | string;
            user: string;
            action: string;
            resource: string;
            details?: Record<string, any>;
            ip?: string;
            userAgent?: string;
          }>;
          loading?: boolean;
          onLoadMore?: () => void;
          onExport?: (format: 'csv' | 'json' | 'pdf') => void;
          filters?: {
            dateRange?: [Date, Date];
            users?: string[];
            actions?: string[];
            resources?: string[];
          };
          onFilterChange?: (filters: any) => void;
        };
      };

      // 10. MEDIA & FILE COMPONENTS
      FileUpload: {
        props: {
          accept?: string;
          multiple?: boolean;
          maxSize?: number;
          maxFiles?: number;
          disabled?: boolean;
          dragDrop?: boolean;
          showFileList?: boolean;
          customRequest?: (file: File) => Promise<string>;
          onUpload?: (files: File[]) => void;
          onSuccess?: (response: any, file: File) => void;
          onError?: (error: Error, file: File) => void;
          onProgress?: (percent: number, file: File) => void;
          onRemove?: (file: File) => void;
          beforeUpload?: (file: File) => boolean | Promise<boolean>;
        };
      };

      ImageViewer: {
        props: {
          src: string;
          alt?: string;
          width?: number | string;
          height?: number | string;
          fallback?: string;
          placeholder?: JurisVDOMElement;
          preview?: boolean;
          lazy?: boolean;
          onLoad?: () => void;
          onError?: () => void;
          onClick?: () => void;
        };
      };

      VideoPlayer: {
        props: {
          src: string;
          poster?: string;
          width?: number | string;
          height?: number | string;
          autoplay?: boolean;
          controls?: boolean;
          loop?: boolean;
          muted?: boolean;
          preload?: 'none' | 'metadata' | 'auto';
          onPlay?: () => void;
          onPause?: () => void;
          onEnded?: () => void;
          onTimeUpdate?: (currentTime: number) => void;
        };
      };
    }
  }
}

export type ComponentMap = Juris.RegisteredComponents;

export type LayoutManagerProps = Juris.RegisteredComponents['LayoutManager']['props'];
export type DashboardLayoutProps = Juris.RegisteredComponents['DashboardLayout']['props']
export type RouterOutletProps = Juris.RegisteredComponents['RouterOutlet']['props']
export type UserFormProps = Juris.RegisteredComponents['UserForm']['props'];
export type DataTableProps = Juris.RegisteredComponents['DataTable']['props'];
export type ModalProps = Juris.RegisteredComponents['Modal']['props'];

export type ModalProps = Juris.RegisteredComponents['Modal']['props'];

export type ComponentUsage<T extends ComponentNames> = {
  [K in T]: Juris.RegisteredComponents[K]['props']
};