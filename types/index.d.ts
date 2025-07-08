// types/types.d.ts - Complete Juris Framework Type Definitions v0.8.1
// Preserves all original functionality while adding missing types from framework analysis

// Smart utility types that handle both sync and async variants
type SafeDotNotation<T> = T extends Record<string, any> 
  ? {
      [K in keyof T]: K extends string 
        ? T[K] extends Record<string, any>
          ? K | `${K}.${string}`
          : K
        : never
    }[keyof T]
  : string;

type SafePathValue<T, P extends string> = P extends keyof T
  ? T[P]
  : P extends `${infer K}.${string}`
  ? K extends keyof T
    ? any // Simplified to avoid deep recursion
    : never
  : never;

// Smart async support - makes any type work with Promise variants
type MaybeAsync<T> = T | Promise<T>;
type AsyncCapable<T> = T extends (...args: any[]) => any 
  ? (...args: Parameters<T>) => MaybeAsync<ReturnType<T>>
  : MaybeAsync<T>;

// Smart function types that handle both sync and async
type SmartFunction<T> = (() => AsyncCapable<T>) | AsyncCapable<T>;
type SmartEventHandler<E = Event> = ((event: E) => void | Promise<void>);

// Helper type for reactive values that can be sync, async, or functions returning either
type ReactiveValue<T> = T | (() => AsyncCapable<T>) | Promise<T>;

type ComponentRegistrationError<T extends string> = 
  `❌ Component '${T}' not registered. Add to app.d.ts RegisteredComponents interface.`;

// Custom event types for better type safety
export interface JurisInputEvent extends Event {
  target: HTMLInputElement;
  currentTarget: HTMLInputElement;
}

export interface JurisTextAreaEvent extends Event {
  target: HTMLTextAreaElement;
  currentTarget: HTMLTextAreaElement;
}

export interface JurisSelectEvent extends Event {
  target: HTMLSelectElement;
  currentTarget: HTMLSelectElement;
}

export interface JurisFormEvent extends Event {
  target: HTMLFormElement;
  currentTarget: HTMLFormElement;
}

export interface JurisMouseEventWithTarget<T extends HTMLElement = HTMLElement> extends MouseEvent {
  target: T;
  currentTarget: T;
}

export interface JurisKeyboardEventWithTarget<T extends HTMLElement = HTMLElement> extends KeyboardEvent {
  target: T;
  currentTarget: T;
}

export interface JurisFocusEventWithTarget<T extends HTMLElement = HTMLElement> extends FocusEvent {
  target: T;
  currentTarget: T;
}
export interface DynamicElement extends BaseElementProps {
    [componentName: string]: any;
}
// Framework configuration interfaces
export interface JurisConfig {
  logLevel?: 'debug' | 'info' | 'warn' | 'error';
  services?: Record<string, any>;
  layout?: any;
  states?: Record<string, any>;
  middleware?: Array<(context: MiddlewareContext) => any>;
  components?: Record<string, JurisComponentFunction>;
  headlessComponents?: Record<string, HeadlessComponentConfig | JurisComponentFunction>;
  renderMode?: 'fine-grained' | 'batch' | 'auto';
  autoCompileTemplates?: boolean;
  templateObserver?: TemplateObserverConfig;
}

export interface TemplateObserverConfig {
  enabled?: boolean;
}

export interface MiddlewareContext {
  path: string;
  oldValue: any;
  newValue: any;
  context: any;
  state: any;
}

export interface HeadlessComponentConfig {
  fn: JurisComponentFunction;
  options?: HeadlessComponentOptions;
}

export interface HeadlessComponentOptions {
  autoInit?: boolean;
  [key: string]: any;
}

// Statistics and status interfaces
export interface ComponentAsyncStats {
  activePlaceholders: number;
  registeredComponents: number;
  cachedAsyncProps: number;
}

export interface DOMAsyncStats {
  cachedAsyncProps: number;
  activePlaceholders: number;
}

export interface HeadlessStatus {
  registered: string[];
  initialized: string[];
  queued: string[];
  apis: string[];
}

export interface EnhancementStats {
  enhancementRules: number;
  activeObservers: number;
  pendingEnhancements: number;
  enhancedElements: number;
  enhancedContainers: number;
  enhancedSelectors: number;
  totalEnhanced: number;
}

// Logger interface
export interface JurisLogger {
  log: any;
  warn: any;
  error: any;
  info: any;
  debug: any;
  subscribe: any;
  unsubscribe: any;
}

// Template compiler interfaces
export interface TemplateCompiler {
  parseTemplate(template: HTMLTemplateElement): ParsedTemplate;
  htmlToObject(html: string): any;
  convertElement(element: Element): any;
  convertNode(node: Node): any;
  generateContextDestructuring(contextConfig?: string): string;
  generateComponent(parsed: ParsedTemplate): string;
  objectToString(obj: any, indent?: number): string;
}

export interface ParsedTemplate {
  name: string;
  script: string;
  html: string;
  contextConfig?: string;
}

export interface TemplateElement extends HTMLTemplateElement {
  'data-component'?: string;
  'data-context'?: string;
}

// Enhancement system interfaces
export interface EnhancementOptions {
  debounceMs?: number;
  batchUpdates?: boolean;
  observeSubtree?: boolean;
  observeChildList?: boolean;
  observeNewElements?: boolean;
  onEnhanced?: (element: HTMLElement, context: JurisContext) => void;
}

export interface EnhancementDefinition {
  selectors?: Record<string, EnhancementDefinition | ((context: JurisContext) => EnhancementDefinition)>;
  [key: string]: any;
}

export type EnhancementFunction = (context: JurisContext) => EnhancementDefinition;
export type Enhancement = EnhancementDefinition | EnhancementFunction;

// Juris Object VDOM namespace to handle circular references properly
export namespace JurisVDOM {
  // Base element properties that all elements can have - with smart async support
  export interface BaseElementProps {
    // Standard HTML attributes - can be reactive (sync/async functions) or static values
    id?: ReactiveValue<string>;
    className?: ReactiveValue<string>;
    role?: ReactiveValue<string>;
    tabIndex?: ReactiveValue<number>;
    hidden?: ReactiveValue<boolean>;
    title?: ReactiveValue<string>;
    lang?: ReactiveValue<string>;
    dir?: ReactiveValue<'ltr' | 'rtl' | 'auto'>;
    draggable?: ReactiveValue<boolean>;
    contentEditable?: ReactiveValue<boolean | 'true' | 'false' | 'inherit'>;
    spellcheck?: ReactiveValue<boolean>;
    translate?: ReactiveValue<boolean | 'yes' | 'no'>;
    
    // ARIA attributes - can be reactive
    'aria-label'?: ReactiveValue<string>;
    'aria-labelledby'?: ReactiveValue<string>;
    'aria-describedby'?: ReactiveValue<string>;
    'aria-controls'?: ReactiveValue<string>;
    'aria-selected'?: ReactiveValue<string | boolean>;
    'aria-expanded'?: ReactiveValue<string | boolean>;
    'aria-pressed'?: ReactiveValue<string | boolean>;
    'aria-checked'?: ReactiveValue<string | boolean>;
    'aria-disabled'?: ReactiveValue<string | boolean>;
    'aria-hidden'?: ReactiveValue<string | boolean>;
    'aria-live'?: ReactiveValue<'off' | 'polite' | 'assertive'>;
    'aria-orientation'?: ReactiveValue<'horizontal' | 'vertical'>;
    'aria-current'?: ReactiveValue<string | boolean>;
    'aria-haspopup'?: ReactiveValue<boolean | 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'>;
    'aria-level'?: ReactiveValue<number>;
    'aria-owns'?: ReactiveValue<string>;
    'aria-posinset'?: ReactiveValue<number>;
    'aria-setsize'?: ReactiveValue<number>;
    'aria-sort'?: ReactiveValue<'none' | 'ascending' | 'descending' | 'other'>;
    'aria-valuemax'?: ReactiveValue<number>;
    'aria-valuemin'?: ReactiveValue<number>;
    'aria-valuenow'?: ReactiveValue<number>;
    'aria-valuetext'?: ReactiveValue<string>;
    
    // Data attributes - can be reactive
    'data-testid'?: ReactiveValue<string>;
    'data-id'?: ReactiveValue<string>;
    'data-name'?: ReactiveValue<string>;
    'data-value'?: ReactiveValue<string>;
    
    // Style - can be reactive object or function returning styles
    style?: ReactiveValue<Record<string, string | number>>;
    
    // Global event handlers - automatically support async
    onClick?: SmartEventHandler<JurisMouseEventWithTarget>;
    onDoubleClick?: SmartEventHandler<JurisMouseEventWithTarget>;
    onMouseDown?: SmartEventHandler<JurisMouseEventWithTarget>;
    onMouseUp?: SmartEventHandler<JurisMouseEventWithTarget>;
    onMouseOver?: SmartEventHandler<JurisMouseEventWithTarget>;
    onMouseOut?: SmartEventHandler<JurisMouseEventWithTarget>;
    onMouseMove?: SmartEventHandler<JurisMouseEventWithTarget>;
    onMouseEnter?: SmartEventHandler<JurisMouseEventWithTarget>;
    onMouseLeave?: SmartEventHandler<JurisMouseEventWithTarget>;
    onContextMenu?: SmartEventHandler<JurisMouseEventWithTarget>;
    
    onKeyDown?: SmartEventHandler<JurisKeyboardEventWithTarget>;
    onKeyUp?: SmartEventHandler<JurisKeyboardEventWithTarget>;
    onKeyPress?: SmartEventHandler<JurisKeyboardEventWithTarget>;
    
    onFocus?: SmartEventHandler<JurisFocusEventWithTarget>;
    onBlur?: SmartEventHandler<JurisFocusEventWithTarget>;
    onFocusIn?: SmartEventHandler<JurisFocusEventWithTarget>;
    onFocusOut?: SmartEventHandler<JurisFocusEventWithTarget>;
    
    onLoad?: SmartEventHandler<Event>;
    onError?: SmartEventHandler<ErrorEvent>;
    onResize?: SmartEventHandler<Event>;
    onScroll?: SmartEventHandler<Event>;
    
    onDragStart?: SmartEventHandler<DragEvent>;
    onDrag?: SmartEventHandler<DragEvent>;
    onDragEnd?: SmartEventHandler<DragEvent>;
    onDragEnter?: SmartEventHandler<DragEvent>;
    onDragLeave?: SmartEventHandler<DragEvent>;
    onDragOver?: SmartEventHandler<DragEvent>;
    onDrop?: SmartEventHandler<DragEvent>;
    
    onTouchStart?: SmartEventHandler<TouchEvent>;
    onTouchMove?: SmartEventHandler<TouchEvent>;
    onTouchEnd?: SmartEventHandler<TouchEvent>;
    onTouchCancel?: SmartEventHandler<TouchEvent>;
  }

  // Void elements (self-closing)
  export interface VoidElement extends BaseElementProps {
    // These elements cannot have children or text
  }

  // Text-only elements - text can be async
  export interface TextElement extends BaseElementProps {
    text: ReactiveValue<string>;
  }

  // Container elements - children and innerHTML can be async
  export interface ContainerElement extends BaseElementProps {
    innerHTML?: ReactiveValue<string>;
    children?: ReactiveValue<Element[]>;
  }

  // Elements that can have EITHER text OR children OR innerHTML - all async-capable
  export interface ContainerWithTextElement extends BaseElementProps {
    text?: ReactiveValue<string>;
    children?: ReactiveValue<Element[]>;
    innerHTML?: ReactiveValue<string>;
  }

  // Button - async-capable properties
  export interface ButtonElement extends BaseElementProps {
    type?: ReactiveValue<'button' | 'submit' | 'reset'>;
    disabled?: ReactiveValue<boolean>;
    name?: ReactiveValue<string>;
    value?: ReactiveValue<string>;
    form?: ReactiveValue<string>;
    formAction?: ReactiveValue<string>;
    formEncType?: ReactiveValue<string>;
    formMethod?: ReactiveValue<'get' | 'post'>;
    formNoValidate?: ReactiveValue<boolean>;
    formTarget?: ReactiveValue<string>;
    autofocus?: ReactiveValue<boolean>;
    text?: ReactiveValue<string>;
    children?: ReactiveValue<Element[]>;
    innerHTML?: ReactiveValue<string>;
    
    // Button-specific events with async support
    onClick?: SmartEventHandler<JurisMouseEventWithTarget<HTMLButtonElement>>;
  }

  // Label can have either text, children, or innerHTML
  export interface LabelElement extends BaseElementProps {
    htmlFor?: string;
    form?: string;
    text?: string | (() => string);
    children?: Element[] | (() => Element[]);
    innerHTML?: string | (() => string);
  }

  // Form elements with smart async support
  export interface InputElement extends BaseElementProps {
    type?: ReactiveValue<'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'month' | 'week' | 'color' | 'file' | 'range' | 'checkbox' | 'radio' | 'submit' | 'reset' | 'button' | 'hidden'>;
    value?: ReactiveValue<string | number | boolean>;
    defaultValue?: ReactiveValue<string | number>;
    placeholder?: ReactiveValue<string>;
    required?: ReactiveValue<boolean>;
    disabled?: ReactiveValue<boolean>;
    readonly?: ReactiveValue<boolean>;
    name?: ReactiveValue<string>;
    min?: ReactiveValue<string | number>;
    max?: ReactiveValue<string | number>;
    step?: ReactiveValue<string | number>;
    pattern?: ReactiveValue<string>;
    size?: ReactiveValue<number>;
    maxLength?: ReactiveValue<number>;
    minLength?: ReactiveValue<number>;
    multiple?: ReactiveValue<boolean>;
    accept?: ReactiveValue<string>;
    autocomplete?: ReactiveValue<string>;
    autofocus?: ReactiveValue<boolean>;
    checked?: ReactiveValue<boolean>;
    form?: ReactiveValue<string>;
    formAction?: ReactiveValue<string>;
    formEncType?: ReactiveValue<string>;
    formMethod?: ReactiveValue<'get' | 'post'>;
    formNoValidate?: ReactiveValue<boolean>;
    formTarget?: ReactiveValue<string>;
    list?: ReactiveValue<string>;
    
    // Input-specific events with async support
    onChange?: SmartEventHandler<JurisInputEvent>;
    onInput?: SmartEventHandler<JurisInputEvent>;
    onSelect?: SmartEventHandler<JurisInputEvent>;
    onInvalid?: SmartEventHandler<JurisInputEvent>;
    onClick?: SmartEventHandler<JurisMouseEventWithTarget<HTMLInputElement>>;
    onFocus?: SmartEventHandler<JurisFocusEventWithTarget<HTMLInputElement>>;
    onBlur?: SmartEventHandler<JurisFocusEventWithTarget<HTMLInputElement>>;
  }

  export interface TextAreaElement extends BaseElementProps {
    value?: string | (() => string);
    defaultValue?: string;
    placeholder?: string | (() => string);
    required?: boolean | (() => boolean);
    disabled?: boolean | (() => boolean);
    readonly?: boolean | (() => boolean);
    name?: string;
    rows?: number;
    cols?: number;
    maxLength?: number;
    minLength?: number;
    wrap?: 'hard' | 'soft' | 'off';
    autofocus?: boolean;
    form?: string;
    
    // TextArea-specific events with proper typing
    onChange?: (e: JurisTextAreaEvent) => void;
    onInput?: (e: JurisTextAreaEvent) => void;
    onSelect?: (e: JurisTextAreaEvent) => void;
    onClick?: (e: JurisMouseEventWithTarget<HTMLTextAreaElement>) => void;
    onFocus?: (e: JurisFocusEventWithTarget<HTMLTextAreaElement>) => void;
    onBlur?: (e: JurisFocusEventWithTarget<HTMLTextAreaElement>) => void;
  }

  export interface SelectElement extends BaseElementProps {
    value?: string | string[] | (() => string | string[]);
    defaultValue?: string | string[];
    required?: boolean | (() => boolean);
    disabled?: boolean | (() => boolean);
    name?: string;
    multiple?: boolean | (() => boolean);
    size?: number;
    autofocus?: boolean;
    form?: string;
    children?: Element[] | (() => Element[]);
    
    // Select-specific events with proper typing
    onChange?: (e: JurisSelectEvent) => void;
    onClick?: (e: JurisMouseEventWithTarget<HTMLSelectElement>) => void;
    onFocus?: (e: JurisFocusEventWithTarget<HTMLSelectElement>) => void;
    onBlur?: (e: JurisFocusEventWithTarget<HTMLSelectElement>) => void;
  }

  export interface OptionElement extends BaseElementProps {
    value?: string | number;
    text?: string | (() => string);
    selected?: boolean | (() => boolean);
    disabled?: boolean | (() => boolean);
    label?: string;
  }

  export interface FormElement extends BaseElementProps {
    children?: Element[] | (() => Element[]);
    action?: string | (() => string);
    method?: 'get' | 'post';
    encType?: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';
    target?: '_blank' | '_self' | '_parent' | '_top' | string;
    noValidate?: boolean;
    acceptCharset?: string;
    autocomplete?: 'on' | 'off';
    name?: string;
    
    // Form-specific events with proper typing
    onSubmit?: (e: JurisFormEvent) => void;
    onReset?: (e: JurisFormEvent) => void;
  }

  export interface FieldSetElement extends BaseElementProps {
    children?: Element[] | (() => Element[]);
    disabled?: boolean | (() => boolean);
    form?: string;
    name?: string;
  }

  // Media elements
  export interface ImageElement extends BaseElementProps {
    src: string | (() => string);
    alt?: string | (() => string);
    width?: number | string;
    height?: number | string;
    loading?: 'lazy' | 'eager';
    decoding?: 'sync' | 'async' | 'auto';
    crossOrigin?: 'anonymous' | 'use-credentials';
    isMap?: boolean;
    useMap?: string;
    sizes?: string;
    srcSet?: string;
    referrerPolicy?: string;
    
    // Image-specific events
    onLoad?: (e: Event & { target: HTMLImageElement }) => void;
    onError?: (e: ErrorEvent & { target: HTMLImageElement }) => void;
  }

  export interface VideoElement extends BaseElementProps {
    src?: string | (() => string);
    controls?: boolean | (() => boolean);
    autoplay?: boolean | (() => boolean);
    loop?: boolean | (() => boolean);
    muted?: boolean | (() => boolean);
    width?: number | string;
    height?: number | string;
    poster?: string | (() => string);
    preload?: 'none' | 'metadata' | 'auto';
    crossOrigin?: 'anonymous' | 'use-credentials';
    children?: Element[] | (() => Element[]);
    
    // Video-specific events with proper typing
    onPlay?: (e: Event & { target: HTMLVideoElement }) => void;
    onPause?: (e: Event & { target: HTMLVideoElement }) => void;
    onEnded?: (e: Event & { target: HTMLVideoElement }) => void;
    onTimeUpdate?: (e: Event & { target: HTMLVideoElement }) => void;
    onVolumeChange?: (e: Event & { target: HTMLVideoElement }) => void;
    onLoadedData?: (e: Event & { target: HTMLVideoElement }) => void;
    onLoadedMetadata?: (e: Event & { target: HTMLVideoElement }) => void;
    onCanPlay?: (e: Event & { target: HTMLVideoElement }) => void;
    onCanPlayThrough?: (e: Event & { target: HTMLVideoElement }) => void;
  }

  export interface AudioElement extends BaseElementProps {
    src?: string | (() => string);
    controls?: boolean | (() => boolean);
    autoplay?: boolean | (() => boolean);
    loop?: boolean | (() => boolean);
    muted?: boolean | (() => boolean);
    preload?: 'none' | 'metadata' | 'auto';
    crossOrigin?: 'anonymous' | 'use-credentials';
    children?: Element[] | (() => Element[]);
    
    // Audio-specific events with proper typing
    onPlay?: (e: Event & { target: HTMLAudioElement }) => void;
    onPause?: (e: Event & { target: HTMLAudioElement }) => void;
    onEnded?: (e: Event & { target: HTMLAudioElement }) => void;
    onTimeUpdate?: (e: Event & { target: HTMLAudioElement }) => void;
    onVolumeChange?: (e: Event & { target: HTMLAudioElement }) => void;
    onLoadedData?: (e: Event & { target: HTMLAudioElement }) => void;
    onLoadedMetadata?: (e: Event & { target: HTMLAudioElement }) => void;
    onCanPlay?: (e: Event & { target: HTMLAudioElement }) => void;
    onCanPlayThrough?: (e: Event & { target: HTMLAudioElement }) => void;
  }

  export interface CanvasElement extends BaseElementProps {
    width?: number;
    height?: number;
  }

  export interface IframeElement extends BaseElementProps {
    src?: string | (() => string);
    width?: number | string;
    height?: number | string;
    name?: string;
    sandbox?: string;
    allow?: string;
    allowFullscreen?: boolean;
    loading?: 'lazy' | 'eager';
    referrerPolicy?: string;
    srcdoc?: string;
  }

  // Link and navigation
  export interface LinkElement extends BaseElementProps {
    href: string | (() => string);
    text?: string | (() => string);
    children?: Element[] | (() => Element[]);
    target?: '_blank' | '_self' | '_parent' | '_top' | string;
    rel?: string;
    download?: string | boolean;
    hreflang?: string;
    type?: string;
    referrerPolicy?: string;
    
    // Link-specific events
    onClick?: (e: JurisMouseEventWithTarget<HTMLAnchorElement>) => void;
  }

  // List elements
  export interface ListElement extends BaseElementProps {
    children?: Element[] | (() => Element[]);
    type?: '1' | 'a' | 'A' | 'i' | 'I'; // For ol
    start?: number; // For ol
    reversed?: boolean; // For ol
  }

  export interface ListItemElement extends BaseElementProps {
    text?: string | (() => string);
    children?: Element[] | (() => Element[]);
    value?: number; // For li in ol
  }

  // Table elements
  export interface TableElement extends BaseElementProps {
    children?: Element[] | (() => Element[]);
  }

  export interface TableRowElement extends BaseElementProps {
    children?: Element[] | (() => Element[]);
  }

  export interface TableCellElement extends BaseElementProps {
    text?: string | (() => string);
    children?: Element[] | (() => Element[]);
    colspan?: number;
    rowspan?: number;
    headers?: string;
    scope?: 'row' | 'col' | 'rowgroup' | 'colgroup';
    abbr?: string;
  }

  export interface TableHeaderElement extends TableCellElement {
    scope?: 'row' | 'col' | 'rowgroup' | 'colgroup';
    abbr?: string;
    sorted?: 'ascending' | 'descending' | 'none' | 'other';
  }

  // Interactive elements
  export interface DetailsElement extends BaseElementProps {
    children?: Element[] | (() => Element[]);
    open?: boolean | (() => boolean);
    
    onToggle?: (e: Event & { target: HTMLDetailsElement }) => void;
  }

  export interface DialogElement extends BaseElementProps {
    children?: Element[] | (() => Element[]);
    open?: boolean | (() => boolean);
    
    onClose?: (e: Event & { target: HTMLDialogElement }) => void;
    onCancel?: (e: Event & { target: HTMLDialogElement }) => void;
  }

  // Progress and meter
  export interface ProgressElement extends BaseElementProps {
    value?: number | (() => number);
    max?: number;
  }

  export interface MeterElement extends BaseElementProps {
    value: number | (() => number);
    min?: number;
    max?: number;
    low?: number;
    high?: number;
    optimum?: number;
    form?: string;
  }

  // Time element
  export interface TimeElement extends BaseElementProps {
    text?: string | (() => string);
    children?: Element[] | (() => Element[]);
    dateTime?: string | (() => string);
  }

  // Script and style
  export interface ScriptElement extends BaseElementProps {
    src?: string;
    type?: string;
    async?: boolean;
    defer?: boolean;
    crossOrigin?: 'anonymous' | 'use-credentials';
    integrity?: string;
    noModule?: boolean;
    referrerPolicy?: string;
    text?: string;
  }

  export interface StyleElement extends BaseElementProps {
    type?: string;
    media?: string;
    scoped?: boolean;
    text?: string;
  }

  // Meta and head elements
  export interface MetaElement extends BaseElementProps {
    name?: string;
    content?: string;
    httpEquiv?: string;
    charset?: string;
  }

  export interface LinkHeadElement extends BaseElementProps {
    href?: string;
    rel?: string;
    type?: string;
    media?: string;
    sizes?: string;
    as?: string;
    crossOrigin?: 'anonymous' | 'use-credentials';
    integrity?: string;
    referrerPolicy?: string;
    hreflang?: string;
  }

  export interface ComponentElement {
    props?: Record<string, any>;
    children?: ReactiveValue<ValidatedChildren<JurisVDOMElement[]>>;
    key?: string | number;
  }
  // Element options for auto-complete
  export interface ElementOptions {
    // Document structure
    html?: ContainerElement;
    head?: ContainerElement;
    body?: ContainerElement;
    
    // Document metadata
    title?: TextElement;
    meta?: MetaElement;
    link?: LinkHeadElement;
    style?: StyleElement;
    script?: ScriptElement;
    
    // Sectioning elements
    main?: ContainerElement;
    header?: ContainerElement;
    footer?: ContainerElement;
    section?: ContainerElement;
    article?: ContainerElement;
    aside?: ContainerElement;
    nav?: ContainerElement;
    h1?: TextElement;
    h2?: TextElement;
    h3?: TextElement;
    h4?: TextElement;
    h5?: TextElement;
    h6?: TextElement;
    hgroup?: ContainerElement;
    address?: ContainerElement;
    
    // Text content
    div?: ContainerWithTextElement;
    p?: TextElement;
    blockquote?: TextElement;
    pre?: TextElement;
    hr?: VoidElement;
    
    // Inline text elements
    span?: ContainerWithTextElement;
    a?: LinkElement;
    strong?: ContainerWithTextElement;
    em?: ContainerWithTextElement;
    b?: ContainerWithTextElement;
    i?: ContainerWithTextElement;
    u?: ContainerWithTextElement;
    s?: ContainerWithTextElement;
    small?: ContainerWithTextElement;
    mark?: ContainerWithTextElement;
    del?: ContainerWithTextElement;
    ins?: ContainerWithTextElement;
    sub?: ContainerWithTextElement;
    sup?: ContainerWithTextElement;
    code?: ContainerWithTextElement;
    kbd?: ContainerWithTextElement;
    samp?: ContainerWithTextElement;
    var?: ContainerWithTextElement;
    cite?: ContainerWithTextElement;
    q?: ContainerWithTextElement;
    abbr?: ContainerWithTextElement;
    dfn?: ContainerWithTextElement;
    time?: TimeElement;
    data?: ContainerWithTextElement;
    
    // Line breaks
    br?: VoidElement;
    wbr?: VoidElement;
    
    // Lists
    ul?: ListElement;
    ol?: ListElement;
    li?: ListItemElement;
    dl?: ContainerElement;
    dt?: TextElement;
    dd?: ContainerElement;
    
    // Tables
    table?: TableElement;
    caption?: TextElement;
    colgroup?: ContainerElement;
    col?: VoidElement;
    thead?: ContainerElement;
    tbody?: ContainerElement;
    tfoot?: ContainerElement;
    tr?: TableRowElement;
    th?: TableHeaderElement;
    td?: TableCellElement;
    
    // Forms
    form?: FormElement;
    fieldset?: FieldSetElement;
    legend?: TextElement;
    label?: LabelElement;
    input?: InputElement;
    textarea?: TextAreaElement;
    select?: SelectElement;
    optgroup?: ContainerElement;
    option?: OptionElement;
    button?: ButtonElement;
    datalist?: ContainerElement;
    output?: TextElement;
    progress?: ProgressElement;
    meter?: MeterElement;
    
    // Media
    img?: ImageElement;
    picture?: ContainerElement;
    source?: VoidElement;
    video?: VideoElement;
    audio?: AudioElement;
    track?: VoidElement;
    
    // Embedded content
    iframe?: IframeElement;
    embed?: VoidElement;
    object?: ContainerElement;
    param?: VoidElement;
    canvas?: CanvasElement;
    map?: ContainerElement;
    area?: VoidElement;
    
    // Interactive elements
    details?: DetailsElement;
    summary?: TextElement;
    dialog?: DialogElement;
    
    // Ruby annotation
    ruby?: ContainerElement;
    rt?: TextElement;
    rp?: TextElement;
    
    // Figure
    figure?: ContainerElement;
    figcaption?: TextElement;
    
    // Template and slot
    template?: ContainerElement;
    slot?: ContainerElement;
    
    // Custom and unknown elements
    [key: string]: any;
  }

  type HTMLElementNames = 
    | 'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    | 'button' | 'input' | 'form' | 'select' | 'textarea' | 'label'
    | 'img' | 'video' | 'audio' | 'canvas'
    | 'table' | 'tr' | 'td' | 'th' | 'thead' | 'tbody'
    | 'ul' | 'ol' | 'li' | 'dl' | 'dt' | 'dd'
    | 'a' | 'nav' | 'header' | 'footer' | 'main' | 'section' | 'article' | 'aside'
    | 'br' | 'hr' | 'meta' | 'link' | 'style' | 'script';

  type ValidateComponentElement<T> = T extends { [K in infer U]: any } 
    ? U extends string 
      ? U extends HTMLElementNames 
        ? T  // HTML elements are valid
        : U extends keyof Juris.RegisteredComponents
          ? T  // Registered components are valid
          : ComponentRegistrationError<U>  // Show custom error for unregistered
      : never
    : never;

  type ValidatedChildren<T> = T extends (infer U)[]
    ? ValidateComponentElement<U> extends string
      ? ValidateComponentElement<U>  // Return error message
      : T  // Valid children array
    : T;
  // Element union type - defined after all interfaces to avoid circular references
  export type Element = 
    | { html: ContainerElement }
    | { head: ContainerElement }
    | { body: ContainerElement }
    | { title: TextElement }
    | { meta: MetaElement }
    | { link: LinkHeadElement }
    | { style: StyleElement }
    | { script: ScriptElement }
    | { main: ContainerElement }
    | { header: ContainerElement }
    | { footer: ContainerElement }
    | { section: ContainerElement }
    | { article: ContainerElement }
    | { aside: ContainerElement }
    | { nav: ContainerElement }
    | { h1: TextElement }
    | { h2: TextElement }
    | { h3: TextElement }
    | { h4: TextElement }
    | { h5: TextElement }
    | { h6: TextElement }
    | { hgroup: ContainerElement }
    | { address: ContainerElement }
    | { div: ContainerWithTextElement }
    | { p: TextElement }
    | { blockquote: TextElement }
    | { pre: TextElement }
    | { hr: VoidElement }
    | { span: ContainerWithTextElement }
    | { a: LinkElement }
    | { strong: ContainerWithTextElement }
    | { em: ContainerWithTextElement }
    | { b: ContainerWithTextElement }
    | { i: ContainerWithTextElement }
    | { u: ContainerWithTextElement }
    | { s: ContainerWithTextElement }
    | { small: ContainerWithTextElement }
    | { mark: ContainerWithTextElement }
    | { del: ContainerWithTextElement }
    | { ins: ContainerWithTextElement }
    | { sub: ContainerWithTextElement }
    | { sup: ContainerWithTextElement }
    | { code: ContainerWithTextElement }
    | { kbd: ContainerWithTextElement }
    | { samp: ContainerWithTextElement }
    | { var: ContainerWithTextElement }
    | { cite: ContainerWithTextElement }
    | { q: ContainerWithTextElement }
    | { abbr: ContainerWithTextElement }
    | { dfn: ContainerWithTextElement }
    | { time: TimeElement }
    | { data: ContainerWithTextElement }
    | { br: VoidElement }
    | { wbr: VoidElement }
    | { ul: ListElement }
    | { ol: ListElement }
    | { li: ListItemElement }
    | { dl: ContainerElement }
    | { dt: TextElement }
    | { dd: ContainerElement }
    | { table: TableElement }
    | { caption: TextElement }
    | { colgroup: ContainerElement }
    | { col: VoidElement }
    | { thead: ContainerElement }
    | { tbody: ContainerElement }
    | { tfoot: ContainerElement }
    | { tr: TableRowElement }
    | { th: TableHeaderElement }
    | { td: TableCellElement }
    | { form: FormElement }
    | { fieldset: FieldSetElement }
    | { legend: TextElement }
    | { label: LabelElement }
    | { input: InputElement }
    | { textarea: TextAreaElement }
    | { select: SelectElement }
    | { optgroup: ContainerElement }
    | { option: OptionElement }
    | { button: ButtonElement }
    | { datalist: ContainerElement }
    | { output: TextElement }
    | { progress: ProgressElement }
    | { meter: MeterElement }
    | { img: ImageElement }
    | { picture: ContainerElement }
    | { source: VoidElement }
    | { video: VideoElement }
    | { audio: AudioElement }
    | { track: VoidElement }
    | { iframe: IframeElement }
    | { embed: VoidElement }
    | { object: ContainerElement }
    | { param: VoidElement }
    | { canvas: CanvasElement }
    | { map: ContainerElement }
    | { area: VoidElement }
    | { details: DetailsElement }
    | { summary: TextElement }
    | { dialog: DialogElement }
    | { ruby: ContainerElement }
    | { rt: TextElement }
    | { rp: TextElement }
    | { figure: ContainerElement }
    | { figcaption: TextElement }
    | { template: ContainerElement }
    | { slot: ContainerElement }
    | RegisteredComponentElements;  // Allow any component name
}

// Extensible component definition - EXCLUDING HTML element names
type RegisteredComponentElements = keyof Juris.RegisteredComponents extends never
  ? never  // No components registered = no component elements allowed
  : {
      [K in keyof Juris.RegisteredComponents]: {
        [P in K]: ComponentElement & Juris.RegisteredComponents[K]
      }
    }[keyof Juris.RegisteredComponents];
    
export type ValidateComponent<T> = ValidateComponentElement<T>;
export type ComponentValidationError<T extends string> = ComponentRegistrationError<T>;

// Export the main types from the namespace with proper typing
export type JurisVDOMElement = JurisVDOM.Element;
export type JurisElementOptions = JurisVDOM.ElementOptions;

// Also export individual element types for advanced usage
export type JurisContainerElement = JurisVDOM.ContainerElement;
export type JurisTextElement = JurisVDOM.TextElement;
export type JurisInputElement = JurisVDOM.InputElement;
export type JurisButtonElement = JurisVDOM.ButtonElement;
export type JurisImageElement = JurisVDOM.ImageElement;
export type JurisVideoElement = JurisVDOM.VideoElement;
export type JurisAudioElement = JurisVDOM.AudioElement;
export type JurisTableElement = JurisVDOM.TableElement;
export type JurisFormElement = JurisVDOM.FormElement;

// Simplified but powerful state management - supports both typed and untyped usage
export interface ComponentState<TState = any> {
  getState: TState extends Record<string, any>
    ? {
        // Overload for typed usage with dot notation
        <TPath extends SafeDotNotation<TState>>(
          path: TPath,
          defaultValue?: SafePathValue<TState, TPath>,
          track?: boolean
        ): SafePathValue<TState, TPath>;
        // Overload for generic string paths
        <T>(path: string, defaultValue?: T, track?: boolean): T;
      }
    : <T>(path: string, defaultValue?: T, track?: boolean) => T;
  
  setState: TState extends Record<string, any>
    ? {
        // Overload for typed usage with dot notation
        <TPath extends SafeDotNotation<TState>>(
          path: TPath,
          value: SafePathValue<TState, TPath>
        ): void;
        // Overload for generic string paths
        <T>(path: string, value: T): void;
      }
    : <T>(path: string, value: T) => void;
}

// Base context interface (shared properties)
interface JurisContextCore extends ComponentState<any> {
  services?: Record<string, any>;
  headless?: Record<string, any>;
  isSSR?: boolean;
  element?: HTMLElement;
  executeBatch?: (callback: () => any) => any;
  newState?: <T>(key: string, initialValue: T) => [() => T, (value: T) => void];
  components?: {
    register: (name: string, component: JurisComponentFunction<any>) => void;
    registerHeadless: (name: string, component: any, options?: any) => void;
    get: (name: string) => JurisComponentFunction<any> | undefined;
    getHeadless: (name: string) => any;
    initHeadless: (name: string, props?: any) => any;
    reinitHeadless: (name: string, props?: any) => any;
    getHeadlessAPI: (name: string) => any;
    getAllHeadlessAPIs: () => Record<string, any>;
  };
  utils?: {
    render: (container?: string | HTMLElement) => void;
    cleanup: () => void;
    forceRender: () => void;
    setRenderMode: (mode: 'fine-grained' | 'batch') => void;
    getRenderMode: () => string;
    isFineGrained: () => boolean;
    isBatchMode: () => boolean;
    getHeadlessStatus: () => HeadlessStatus;
  };
  juris?: any;
  logger?: JurisLogger;
}

// Generic JurisContext interface for TypeScript usage
export interface JurisContext<TState = any> extends JurisContextCore, ComponentState<TState> {
  subscribe?: TState extends Record<string, any>
    ? {
        <TPath extends SafeDotNotation<TState>>(
          path: TPath,
          callback: (newValue: SafePathValue<TState, TPath>, oldValue: SafePathValue<TState, TPath>, path: string) => void
        ): () => void;
        (path: string, callback: (newValue: any, oldValue: any, path: string) => void): () => void;
      }
    : (path: string, callback: (newValue: any, oldValue: any, path: string) => void) => () => void;
  components?: {
    register: (name: string, component: JurisComponentFunction<TState>) => void;
    registerHeadless: (name: string, component: any, options?: any) => void;
    get: (name: string) => JurisComponentFunction<TState> | undefined;
    getHeadless: (name: string) => any;
    initHeadless: (name: string, props?: any) => any;
    reinitHeadless: (name: string, props?: any) => any;
    getHeadlessAPI: (name: string) => any;
    getAllHeadlessAPIs: () => Record<string, any>;
  };
}

// Non-generic JurisContext interface for JSDoc usage
export interface JurisContextBase extends JurisContextCore {
  subscribe?: (path: string, callback: (newValue: any, oldValue: any, path: string) => void) => () => void;
}

// Component function signature - can return async render functions
export type JurisComponentFunction<TState = any> = (
  props: Record<string, any>,
  context: JurisContext<TState>
) => JurisVDOMElement | { render: () => AsyncCapable<JurisVDOMElement> };

// Lifecycle hooks with smart async support
export interface ComponentHooks {
  onMount?: SmartEventHandler<void>;
  onUpdate?: (oldProps: any, newProps: any) => void | Promise<void>;
  onUnmount?: SmartEventHandler<void>;
}

// Component with lifecycle - render can be async
export interface JurisLifecycleComponent {
  render: () => AsyncCapable<JurisVDOMElement>;
  hooks?: ComponentHooks;
  api?: Record<string, any>;
}

// Headless component
export interface HeadlessComponent {
  api?: Record<string, any>;
  hooks?: {
    onRegister?: () => void;
    onUnregister?: () => void;
  };
}

// Juris framework instance with better state management typing and all missing methods
export interface JurisInstance<TState = any> {
  // State management with better type support
  getState: TState extends Record<string, any>
    ? {
        <TPath extends SafeDotNotation<TState>>(
          path: TPath,
          defaultValue?: SafePathValue<TState, TPath>,
          track?: boolean
        ): SafePathValue<TState, TPath>;
        <T>(path: string, defaultValue?: T, track?: boolean): T;
      }
    : <T>(path: string, defaultValue?: T, track?: boolean) => T;
  
  setState: TState extends Record<string, any>
    ? {
        <TPath extends SafeDotNotation<TState>>(
          path: TPath,
          value: SafePathValue<TState, TPath>,
          context?: any
        ): void;
        <T>(path: string, value: T, context?: any): void;
      }
    : <T>(path: string, value: T, context?: any) => void;
  
  subscribe: TState extends Record<string, any>
    ? {
        <TPath extends SafeDotNotation<TState>>(
          path: TPath,
          callback: (newValue: SafePathValue<TState, TPath>, oldValue: SafePathValue<TState, TPath>, path: string) => void,
          hierarchical?: boolean
        ): () => void;
        (path: string, callback: (newValue: any, oldValue: any, path: string) => void, hierarchical?: boolean): () => void;
      }
    : (path: string, callback: (newValue: any, oldValue: any, path: string) => void, hierarchical?: boolean) => () => void;
  
  subscribeExact: TState extends Record<string, any>
    ? {
        <TPath extends SafeDotNotation<TState>>(
          path: TPath,
          callback: (newValue: SafePathValue<TState, TPath>, oldValue: SafePathValue<TState, TPath>, path: string) => void
        ): () => void;
        (path: string, callback: (newValue: any, oldValue: any, path: string) => void): () => void;
      }
    : (path: string, callback: (newValue: any, oldValue: any, path: string) => void) => () => void;

  // NEW: Batch processing methods
  reset(): void;
  beginBatch(): void;
  endBatch(): void;
  executeBatch(callback: () => any): any;
  isBatchingActive(): boolean;
  getBatchQueueSize(): number;
  clearBatch(): void;
  
  // Component management
  registerComponent: (name: string, component: JurisComponentFunction<TState>) => void;
  registerHeadlessComponent: (name: string, component: (props: any, context: any) => HeadlessComponent, options?: any) => void;
  getComponent: (name: string) => JurisComponentFunction<TState> | undefined;
  getHeadlessComponent: (name: string) => any;
  initializeHeadlessComponent: (name: string, props?: any) => any;

  // NEW: Extended component methods
  registerAndInitHeadless: (name: string, componentFn: any, options?: any) => any;
  clearAsyncPropsCache: () => void;
  getAsyncStats: () => ComponentAsyncStats;
  
  // Rendering
  render: (container?: string | HTMLElement) => void;
  setRenderMode: (mode: 'fine-grained' | 'batch') => void;
  getRenderMode: () => string;
  isFineGrained: () => boolean;
  isBatchMode: () => boolean;

  // NEW: DOM renderer extensions
  clearAsyncCache: () => void;
  getAsyncStats: () => DOMAsyncStats;
  
  // Enhancement
  enhance: (selector: string, definition: Enhancement, options?: EnhancementOptions) => () => void;
  configureEnhancement: (options: EnhancementOptions) => void;
  getEnhancementStats: () => EnhancementStats;
  
  // Utilities
  cleanup: () => void;
  destroy: () => void;
  createContext: (element?: HTMLElement) => JurisContext<TState>;
  createHeadlessContext: (element?: HTMLElement) => JurisContext<TState>;
  objectToHtml: (vnode: JurisVDOMElement) => HTMLElement | null;
  getHeadlessStatus: () => HeadlessStatus;

  // NEW: Template compilation
  compileTemplates: () => void;
  templateCompiler: TemplateCompiler;

  // NEW: Framework setup
  setupLogging: (level: 'debug' | 'info' | 'warn' | 'error') => void;
}

// Constructor interface
export interface JurisConstructor {
  new <TState = any>(config?: JurisConfig): JurisInstance<TState>;
}

// Main Juris class export
export declare const Juris: JurisConstructor;

// Global utility functions
export declare function deepEquals(a: any, b: any): boolean;
export declare const jurisVersion: string;
export declare const jurisLinesOfCode: number;
export declare const jurisMinifiedSize: string;
export declare const log: any;
export declare const logSub: any;
export declare const logUnsub: any;
export declare const promisify: any;
export declare const startTracking: any;
export declare const stopTracking: any;
export declare const onAllComplete: any;

// Window extensions for browser environment
declare global {
  interface Window {
    Juris: JurisConstructor;
    JurisTypes: {
      info: {
        Context: string;
        VDOMElement: string;
        ComponentFunction: string;
        Instance: string;
        Config: string;
      };
    };
    JurisTypeHelpers: {
      isVDOMElement(value: any): value is JurisVDOMElement;
      isComponentFunction(value: any): value is JurisComponentFunction;
      isReactive(value: any): boolean;
      isPromise(value: any): value is Promise<any>;
      isAsyncCapable(value: any): boolean;
    };
    deepEquals: (a: any, b: any) => boolean;
    jurisVersion: string;
    jurisLinesOfCode: number;
    jurisMinifiedSize: string;
    log: any;
    logSub: any;
    logUnsub: any;
    promisify: any;
    startTracking: any;
    stopTracking: any;
    onAllComplete: any;
  }
}

declare global {
  namespace Juris {
    // Apps can extend this interface
    interface RegisteredComponents {}
    
    // If components are registered, use them, otherwise fall back to generic
    type ComponentDefinition = keyof RegisteredComponents extends never 
      ? { [K in string]: ComponentElement }
      : { [K in keyof RegisteredComponents]: ComponentElement & RegisteredComponents[K] };
  }
}

export type JurisComponentDefinition = Juris.ComponentDefinition;
// Export everything for Juris Object VDOM IntelliSense
export {
  // VDOM Namespace - IMPORTANT: Export the namespace itself
  JurisVDOM,
  
  // Custom event types for better type safety
  JurisInputEvent,
  JurisTextAreaEvent,
  JurisSelectEvent,
  JurisFormEvent,
  JurisMouseEventWithTarget,
  JurisKeyboardEventWithTarget,
  JurisFocusEventWithTarget,
  
  // Smart async support types
  MaybeAsync,
  AsyncCapable,
  ReactiveValue,
  SmartFunction,
  SmartEventHandler,
  
  // Core types with improved state management
  JurisComponentFunction,
  JurisVDOMElement,
  JurisElementOptions,
  JurisContext,           // Generic version for TypeScript
  JurisContextBase,       // Non-generic version for JSDoc
  JurisInstance,
  ComponentHooks,
  JurisLifecycleComponent,
  HeadlessComponent,

  // Configuration and setup interfaces
  JurisConfig,
  TemplateObserverConfig,
  MiddlewareContext,
  HeadlessComponentConfig,
  HeadlessComponentOptions,

  // Statistics and status interfaces
  ComponentAsyncStats,
  DOMAsyncStats,
  HeadlessStatus,
  EnhancementStats,

  // Template compiler interfaces
  TemplateCompiler,
  ParsedTemplate,
  TemplateElement,

  // Enhancement system interfaces
  EnhancementOptions,
  EnhancementDefinition,
  EnhancementFunction,
  Enhancement,

  // Logger interface
  JurisLogger,
  
  // Utility types for advanced usage - safer versions
  SafeDotNotation,
  SafePathValue,
  
  // Individual element types
  JurisContainerElement,
  JurisTextElement,
  JurisInputElement,
  JurisButtonElement,
  JurisImageElement,
  JurisVideoElement,
  JurisAudioElement,
  JurisTableElement,
  JurisFormElement
};