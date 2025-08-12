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

export type AsyncPlaceholderType = 
  | 'async-loading'
  | 'async-props-loading' 
  | 'async-lifecycle'
  | 'async-children'
  | 'async-text'
  | 'async-style'
  | 'async-error';

export interface AsyncPlaceholderMetadata {
  type: AsyncPlaceholderType;
  elementId?: string;
  componentName?: string;
  timestamp: number;
}
type ComponentRegistrationError<T extends string> = 
  `❌ Component '${T}' not registered. Add to app.component.d.ts RegisteredComponents interface.`;

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

export interface PlaceholderStats {
  configuredElements: number;
  activeAsyncOperations: number;
  cachedConfigurations: number;
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
  defaultPlaceholder?: PlaceholderConfig;
  placeholders?: Record<string, PlaceholderConfig>;
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
export type HeadlessComponentFunction<TState = any> = (
  props: Record<string, any>,
  context: JurisContext<TState>
) => HeadlessComponent;

export interface HeadlessComponentConfig {
  fn: HeadlessComponentFunction;  // ← Change from: fn: JurisComponentFunction;
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
  placeholderStats?: PlaceholderStats;
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

// Transform sub-properties (Complete)
interface TransformProperties {
  transform?: ReactiveValue<string>;
  transformOrigin?: ReactiveValue<string>;
  transformStyle?: ReactiveValue<'flat' | 'preserve-3d'>;
  transformBox?: ReactiveValue<'content-box' | 'border-box' | 'fill-box' | 'stroke-box' | 'view-box'>;
  
  // Individual transform functions
  translateX?: ReactiveValue<string | number>;
  translateY?: ReactiveValue<string | number>;
  translateZ?: ReactiveValue<string | number>;
  translate3d?: ReactiveValue<string>;
  scaleX?: ReactiveValue<number>;
  scaleY?: ReactiveValue<number>;
  scaleZ?: ReactiveValue<number>;
  scale?: ReactiveValue<number | string>;
  scale3d?: ReactiveValue<string>;
  rotateX?: ReactiveValue<string | number>;
  rotateY?: ReactiveValue<string | number>;
  rotateZ?: ReactiveValue<string | number>;
  rotate?: ReactiveValue<string | number>;
  rotate3d?: ReactiveValue<string>;
  skewX?: ReactiveValue<string | number>;
  skewY?: ReactiveValue<string | number>;
  skew?: ReactiveValue<string>;
  perspective?: ReactiveValue<string | number>;
  perspectiveOrigin?: ReactiveValue<string>;
  matrix?: ReactiveValue<string>;
  matrix3d?: ReactiveValue<string>;
  backfaceVisibility?: ReactiveValue<'visible' | 'hidden'>;
}

// Background sub-properties (Complete)
interface BackgroundProperties {
  background?: ReactiveValue<string>;
  backgroundImage?: ReactiveValue<string>;
  backgroundPosition?: ReactiveValue<string>;
  backgroundPositionX?: ReactiveValue<string>;
  backgroundPositionY?: ReactiveValue<string>;
  backgroundSize?: ReactiveValue<'auto' | 'cover' | 'contain' | string>;
  backgroundRepeat?: ReactiveValue<'repeat' | 'no-repeat' | 'repeat-x' | 'repeat-y' | 'space' | 'round'>;
  backgroundAttachment?: ReactiveValue<'scroll' | 'fixed' | 'local'>;
  backgroundClip?: ReactiveValue<'border-box' | 'padding-box' | 'content-box' | 'text'>;
  backgroundOrigin?: ReactiveValue<'border-box' | 'padding-box' | 'content-box'>;
  backgroundBlendMode?: ReactiveValue<'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' | 'exclusion' | 'hue' | 'saturation' | 'color' | 'luminosity'>;
  backgroundColor?: ReactiveValue<string>;
}

// Border sub-properties (Complete)
interface BorderProperties {
  border?: ReactiveValue<string>;
  borderWidth?: ReactiveValue<string | number>;
  borderStyle?: ReactiveValue<'none' | 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset'>;
  borderColor?: ReactiveValue<string>;
  
  // Individual sides
  borderTop?: ReactiveValue<string>;
  borderRight?: ReactiveValue<string>;
  borderBottom?: ReactiveValue<string>;
  borderLeft?: ReactiveValue<string>;
  
  borderTopWidth?: ReactiveValue<string | number>;
  borderRightWidth?: ReactiveValue<string | number>;
  borderBottomWidth?: ReactiveValue<string | number>;
  borderLeftWidth?: ReactiveValue<string | number>;
  
  borderTopStyle?: ReactiveValue<'none' | 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset'>;
  borderRightStyle?: ReactiveValue<'none' | 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset'>;
  borderBottomStyle?: ReactiveValue<'none' | 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset'>;
  borderLeftStyle?: ReactiveValue<'none' | 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset'>;
  
  borderTopColor?: ReactiveValue<string>;
  borderRightColor?: ReactiveValue<string>;
  borderBottomColor?: ReactiveValue<string>;
  borderLeftColor?: ReactiveValue<string>;
  
  // Border radius
  borderRadius?: ReactiveValue<string | number>;
  borderTopLeftRadius?: ReactiveValue<string | number>;
  borderTopRightRadius?: ReactiveValue<string | number>;
  borderBottomLeftRadius?: ReactiveValue<string | number>;
  borderBottomRightRadius?: ReactiveValue<string | number>;
  
  // Border image
  borderImage?: ReactiveValue<string>;
  borderImageSource?: ReactiveValue<string>;
  borderImageSlice?: ReactiveValue<string | number>;
  borderImageWidth?: ReactiveValue<string | number>;
  borderImageOutset?: ReactiveValue<string | number>;
  borderImageRepeat?: ReactiveValue<'stretch' | 'repeat' | 'round' | 'space'>;
  
  // Border collapse and spacing
  borderCollapse?: ReactiveValue<'separate' | 'collapse'>;
  borderSpacing?: ReactiveValue<string | number>;
}

// Spacing properties (Complete with logical properties)
interface SpacingProperties {
  // Margin
  margin?: ReactiveValue<string | number>;
  marginTop?: ReactiveValue<string | number>;
  marginRight?: ReactiveValue<string | number>;
  marginBottom?: ReactiveValue<string | number>;
  marginLeft?: ReactiveValue<string | number>;
  
  // Logical margin properties
  marginBlock?: ReactiveValue<string | number>;
  marginInline?: ReactiveValue<string | number>;
  marginBlockStart?: ReactiveValue<string | number>;
  marginBlockEnd?: ReactiveValue<string | number>;
  marginInlineStart?: ReactiveValue<string | number>;
  marginInlineEnd?: ReactiveValue<string | number>;
  
  // Padding
  padding?: ReactiveValue<string | number>;
  paddingTop?: ReactiveValue<string | number>;
  paddingRight?: ReactiveValue<string | number>;
  paddingBottom?: ReactiveValue<string | number>;
  paddingLeft?: ReactiveValue<string | number>;
  
  // Logical padding properties
  paddingBlock?: ReactiveValue<string | number>;
  paddingInline?: ReactiveValue<string | number>;
  paddingBlockStart?: ReactiveValue<string | number>;
  paddingBlockEnd?: ReactiveValue<string | number>;
  paddingInlineStart?: ReactiveValue<string | number>;
  paddingInlineEnd?: ReactiveValue<string | number>;
}

// Font properties (Complete)
interface FontProperties {
  font?: ReactiveValue<string>;
  fontFamily?: ReactiveValue<string>;
  fontSize?: ReactiveValue<string | number>;
  fontWeight?: ReactiveValue<'normal' | 'bold' | 'lighter' | 'bolder' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | number>;
  fontStyle?: ReactiveValue<'normal' | 'italic' | 'oblique'>;
  fontVariant?: ReactiveValue<'normal' | 'small-caps'>;
  fontVariantCaps?: ReactiveValue<'normal' | 'small-caps' | 'all-small-caps' | 'petite-caps' | 'all-petite-caps' | 'unicase' | 'titling-caps'>;
  fontVariantNumeric?: ReactiveValue<string>;
  fontVariantAlternates?: ReactiveValue<string>;
  fontVariantLigatures?: ReactiveValue<'normal' | 'none' | 'common-ligatures' | 'no-common-ligatures' | 'discretionary-ligatures' | 'no-discretionary-ligatures' | 'historical-ligatures' | 'no-historical-ligatures' | 'contextual' | 'no-contextual'>;
  fontVariantEastAsian?: ReactiveValue<string>;
  fontStretch?: ReactiveValue<'normal' | 'condensed' | 'expanded' | 'extra-condensed' | 'extra-expanded' | 'semi-condensed' | 'semi-expanded' | 'ultra-condensed' | 'ultra-expanded' | string>;
  fontSizeAdjust?: ReactiveValue<number | 'none'>;
  fontKerning?: ReactiveValue<'auto' | 'normal' | 'none'>;
  fontOpticalSizing?: ReactiveValue<'auto' | 'none'>;
  fontDisplay?: ReactiveValue<'auto' | 'block' | 'swap' | 'fallback' | 'optional'>;
  fontFeatureSettings?: ReactiveValue<string>;
  fontVariationSettings?: ReactiveValue<string>;
  lineHeight?: ReactiveValue<string | number>;
}

// Text properties (Complete)
interface TextProperties {
  // Text alignment and direction
  textAlign?: ReactiveValue<'left' | 'right' | 'center' | 'justify' | 'start' | 'end' | 'match-parent'>;
  textAlignLast?: ReactiveValue<'auto' | 'left' | 'right' | 'center' | 'justify' | 'start' | 'end'>;
  textJustify?: ReactiveValue<'auto' | 'inter-word' | 'inter-character' | 'none'>;
  direction?: ReactiveValue<'ltr' | 'rtl'>;
  unicodeBidi?: ReactiveValue<'normal' | 'embed' | 'bidi-override' | 'isolate' | 'isolate-override' | 'plaintext'>;
  
  // Text decoration
  textDecoration?: ReactiveValue<string>;
  textDecorationLine?: ReactiveValue<'none' | 'underline' | 'overline' | 'line-through'>;
  textDecorationColor?: ReactiveValue<string>;
  textDecorationStyle?: ReactiveValue<'solid' | 'double' | 'dotted' | 'dashed' | 'wavy'>;
  textDecorationThickness?: ReactiveValue<string | number>;
  textUnderlineOffset?: ReactiveValue<string | number>;
  textUnderlinePosition?: ReactiveValue<'auto' | 'under' | 'left' | 'right'>;
  textDecorationSkipInk?: ReactiveValue<'auto' | 'all' | 'none'>;
  
  // Text transformation and spacing
  textTransform?: ReactiveValue<'none' | 'capitalize' | 'uppercase' | 'lowercase'>;
  textIndent?: ReactiveValue<string | number>;
  textShadow?: ReactiveValue<string>;
  letterSpacing?: ReactiveValue<string | number>;
  wordSpacing?: ReactiveValue<string | number>;
  
  // Text overflow and wrapping
  textOverflow?: ReactiveValue<'clip' | 'ellipsis'>;
  whiteSpace?: ReactiveValue<'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line' | 'break-spaces'>;
  whiteSpaceCollapse?: ReactiveValue<'collapse' | 'preserve' | 'preserve-breaks' | 'preserve-spaces' | 'break-spaces'>;
  wordBreak?: ReactiveValue<'normal' | 'break-all' | 'keep-all' | 'break-word'>;
  wordWrap?: ReactiveValue<'normal' | 'break-word' | 'anywhere'>;
  overflowWrap?: ReactiveValue<'normal' | 'break-word' | 'anywhere'>;
  lineBreak?: ReactiveValue<'auto' | 'loose' | 'normal' | 'strict' | 'anywhere'>;
  hyphens?: ReactiveValue<'none' | 'manual' | 'auto'>;
  
  // Writing modes and orientation
  writingMode?: ReactiveValue<'horizontal-tb' | 'vertical-rl' | 'vertical-lr' | 'sideways-rl' | 'sideways-lr'>;
  textOrientation?: ReactiveValue<'mixed' | 'upright' | 'sideways'>;
  textCombineUpright?: ReactiveValue<'none' | 'all'>;
  
  // Text emphasis
  textEmphasis?: ReactiveValue<string>;
  textEmphasisStyle?: ReactiveValue<string>;
  textEmphasisColor?: ReactiveValue<string>;
  textEmphasisPosition?: ReactiveValue<string>;
  
  // Text rendering
  textRendering?: ReactiveValue<'auto' | 'optimizeSpeed' | 'optimizeLegibility' | 'geometricPrecision'>;
  
  // Tab size
  tabSize?: ReactiveValue<number | string>;
  
  // Hanging punctuation
  hangingPunctuation?: ReactiveValue<'none' | 'first' | 'last' | 'allow-end' | 'force-end'>;
}

// Flexbox properties (Complete)
interface FlexboxProperties {
  // Container properties
  display?: ReactiveValue<string>; // Will be overridden in main interface
  flexDirection?: ReactiveValue<'row' | 'row-reverse' | 'column' | 'column-reverse'>;
  flexWrap?: ReactiveValue<'nowrap' | 'wrap' | 'wrap-reverse'>;
  flexFlow?: ReactiveValue<string>;
  justifyContent?: ReactiveValue<'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'start' | 'end' | 'left' | 'right' | 'safe center' | 'unsafe center'>;
  alignItems?: ReactiveValue<'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'start' | 'end' | 'self-start' | 'self-end' | 'safe center' | 'unsafe center'>;
  alignContent?: ReactiveValue<'stretch' | 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'start' | 'end' | 'safe center' | 'unsafe center'>;
  
  // Item properties
  alignSelf?: ReactiveValue<'auto' | 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'start' | 'end' | 'self-start' | 'self-end' | 'safe center' | 'unsafe center'>;
  flex?: ReactiveValue<string | number>;
  flexGrow?: ReactiveValue<number>;
  flexShrink?: ReactiveValue<number>;
  flexBasis?: ReactiveValue<string | number>;
  order?: ReactiveValue<number>;
  
  // Gap properties
  gap?: ReactiveValue<string | number>;
  rowGap?: ReactiveValue<string | number>;
  columnGap?: ReactiveValue<string | number>;
}

// Grid properties (Complete)
interface GridProperties {
  // Container properties
  display?: ReactiveValue<string>; // Will be overridden in main interface
  gridTemplate?: ReactiveValue<string>;
  gridTemplateColumns?: ReactiveValue<string>;
  gridTemplateRows?: ReactiveValue<string>;
  gridTemplateAreas?: ReactiveValue<string>;
  gridAutoColumns?: ReactiveValue<string>;
  gridAutoRows?: ReactiveValue<string>;
  gridAutoFlow?: ReactiveValue<'row' | 'column' | 'row dense' | 'column dense'>;
  
  // Item properties
  gridColumn?: ReactiveValue<string>;
  gridColumnStart?: ReactiveValue<string | number>;
  gridColumnEnd?: ReactiveValue<string | number>;
  gridRow?: ReactiveValue<string>;
  gridRowStart?: ReactiveValue<string | number>;
  gridRowEnd?: ReactiveValue<string | number>;
  gridArea?: ReactiveValue<string>;
  
  // Gap properties (shared with flexbox)
  gap?: ReactiveValue<string | number>;
  rowGap?: ReactiveValue<string | number>;
  columnGap?: ReactiveValue<string | number>;
  
  // Alignment properties
  justifyItems?: ReactiveValue<'stretch' | 'start' | 'end' | 'center' | 'baseline' | 'safe center' | 'unsafe center'>;
  alignItems?: ReactiveValue<'stretch' | 'start' | 'end' | 'center' | 'baseline' | 'safe center' | 'unsafe center'>;
  placeItems?: ReactiveValue<string>;
  justifyContent?: ReactiveValue<'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly' | 'safe center' | 'unsafe center'>;
  alignContent?: ReactiveValue<'start' | 'end' | 'center' | 'stretch' | 'space-around' | 'space-between' | 'space-evenly' | 'safe center' | 'unsafe center'>;
  placeContent?: ReactiveValue<string>;
  justifySelf?: ReactiveValue<'stretch' | 'start' | 'end' | 'center' | 'baseline' | 'safe center' | 'unsafe center'>;
  alignSelf?: ReactiveValue<'stretch' | 'start' | 'end' | 'center' | 'baseline' | 'safe center' | 'unsafe center'>;
  placeSelf?: ReactiveValue<string>;
}

// Animation properties (Complete)
interface AnimationProperties {
  animation?: ReactiveValue<string>;
  animationName?: ReactiveValue<string>;
  animationDuration?: ReactiveValue<string>;
  animationTimingFunction?: ReactiveValue<'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'step-start' | 'step-end' | string>;
  animationDelay?: ReactiveValue<string>;
  animationIterationCount?: ReactiveValue<number | 'infinite'>;
  animationDirection?: ReactiveValue<'normal' | 'reverse' | 'alternate' | 'alternate-reverse'>;
  animationFillMode?: ReactiveValue<'none' | 'forwards' | 'backwards' | 'both'>;
  animationPlayState?: ReactiveValue<'running' | 'paused'>;
  animationTimeline?: ReactiveValue<string>;
  animationRangeStart?: ReactiveValue<string>;
  animationRangeEnd?: ReactiveValue<string>;
}

// Transition properties (Complete)
interface TransitionProperties {
  transition?: ReactiveValue<string>;
  transitionProperty?: ReactiveValue<string>;
  transitionDuration?: ReactiveValue<string>;
  transitionTimingFunction?: ReactiveValue<'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'step-start' | 'step-end' | string>;
  transitionDelay?: ReactiveValue<string>;
  transitionBehavior?: ReactiveValue<'normal' | 'allow-discrete'>;
}

// Position properties (Complete with logical properties)
interface PositionProperties {
  position?: ReactiveValue<'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'>;
  
  // Physical properties
  top?: ReactiveValue<string | number>;
  right?: ReactiveValue<string | number>;
  bottom?: ReactiveValue<string | number>;
  left?: ReactiveValue<string | number>;
  
  // Logical properties
  inset?: ReactiveValue<string | number>;
  insetBlock?: ReactiveValue<string | number>;
  insetInline?: ReactiveValue<string | number>;
  insetBlockStart?: ReactiveValue<string | number>;
  insetBlockEnd?: ReactiveValue<string | number>;
  insetInlineStart?: ReactiveValue<string | number>;
  insetInlineEnd?: ReactiveValue<string | number>;
  
  zIndex?: ReactiveValue<number | 'auto'>;
}

// Filter properties (Complete)
interface FilterProperties {
  filter?: ReactiveValue<string>;
  backdropFilter?: ReactiveValue<string>;
  
  // Individual filter functions (for convenience)
  blur?: ReactiveValue<string | number>;
  brightness?: ReactiveValue<string | number>;
  contrast?: ReactiveValue<string | number>;
  dropShadow?: ReactiveValue<string>;
  grayscale?: ReactiveValue<string | number>;
  hueRotate?: ReactiveValue<string | number>;
  invert?: ReactiveValue<string | number>;
  opacity?: ReactiveValue<number>;
  saturate?: ReactiveValue<string | number>;
  sepia?: ReactiveValue<string | number>;
}

// Scroll properties (Complete)
interface ScrollProperties {
  scrollBehavior?: ReactiveValue<'auto' | 'smooth'>;
  scrollSnapType?: ReactiveValue<string>;
  scrollSnapAlign?: ReactiveValue<'none' | 'start' | 'end' | 'center'>;
  scrollSnapStop?: ReactiveValue<'normal' | 'always'>;
  
  // Scroll margins
  scrollMargin?: ReactiveValue<string | number>;
  scrollMarginTop?: ReactiveValue<string | number>;
  scrollMarginRight?: ReactiveValue<string | number>;
  scrollMarginBottom?: ReactiveValue<string | number>;
  scrollMarginLeft?: ReactiveValue<string | number>;
  scrollMarginBlock?: ReactiveValue<string | number>;
  scrollMarginBlockStart?: ReactiveValue<string | number>;
  scrollMarginBlockEnd?: ReactiveValue<string | number>;
  scrollMarginInline?: ReactiveValue<string | number>;
  scrollMarginInlineStart?: ReactiveValue<string | number>;
  scrollMarginInlineEnd?: ReactiveValue<string | number>;
  
  // Scroll padding
  scrollPadding?: ReactiveValue<string | number>;
  scrollPaddingTop?: ReactiveValue<string | number>;
  scrollPaddingRight?: ReactiveValue<string | number>;
  scrollPaddingBottom?: ReactiveValue<string | number>;
  scrollPaddingLeft?: ReactiveValue<string | number>;
  scrollPaddingBlock?: ReactiveValue<string | number>;
  scrollPaddingBlockStart?: ReactiveValue<string | number>;
  scrollPaddingBlockEnd?: ReactiveValue<string | number>;
  scrollPaddingInline?: ReactiveValue<string | number>;
  scrollPaddingInlineStart?: ReactiveValue<string | number>;
  scrollPaddingInlineEnd?: ReactiveValue<string | number>;
  
  // Overscroll behavior
  overscrollBehavior?: ReactiveValue<'auto' | 'contain' | 'none'>;
  overscrollBehaviorX?: ReactiveValue<'auto' | 'contain' | 'none'>;
  overscrollBehaviorY?: ReactiveValue<'auto' | 'contain' | 'none'>;
  overscrollBehaviorBlock?: ReactiveValue<'auto' | 'contain' | 'none'>;
  overscrollBehaviorInline?: ReactiveValue<'auto' | 'contain' | 'none'>;
}

// Modern CSS properties (Complete)
interface ModernCSSProperties {
  // CSS containment
  contain?: ReactiveValue<'none' | 'strict' | 'content' | 'size' | 'layout' | 'style' | 'paint' | 'inline-size' | 'block-size'>;
  containIntrinsicSize?: ReactiveValue<string>;
  containIntrinsicWidth?: ReactiveValue<string>;
  containIntrinsicHeight?: ReactiveValue<string>;
  containIntrinsicBlockSize?: ReactiveValue<string>;
  containIntrinsicInlineSize?: ReactiveValue<string>;
  
  // Container queries
  containerType?: ReactiveValue<'normal' | 'size' | 'inline-size'>;
  containerName?: ReactiveValue<string>;
  container?: ReactiveValue<string>;
  
  // Aspect ratio
  aspectRatio?: ReactiveValue<string | number>;
  
  // CSS layers
  '@layer'?: ReactiveValue<string>;
  
  // Cascade layers
  '@import'?: ReactiveValue<string>;
  
  // Color scheme
  colorScheme?: ReactiveValue<'normal' | 'light' | 'dark' | 'light dark' | 'dark light'>;
  
  // Accent color
  accentColor?: ReactiveValue<string>;
  
  // Forced colors
  forcedColorAdjust?: ReactiveValue<'auto' | 'none'>;
  
  // User preferences
  prefersReducedMotion?: ReactiveValue<'no-preference' | 'reduce'>;
  prefersColorScheme?: ReactiveValue<'light' | 'dark'>;
  prefersContrast?: ReactiveValue<'no-preference' | 'more' | 'less'>;
  prefersReducedData?: ReactiveValue<'no-preference' | 'reduce'>;
  
  // CSS nesting
  '&'?: ReactiveValue<any>;
  
  // Math functions
  calc?: ReactiveValue<string>;
  min?: ReactiveValue<string>;
  max?: ReactiveValue<string>;
  clamp?: ReactiveValue<string>;
  
  // Custom highlights
  '::highlight'?: ReactiveValue<any>;
  '::selection'?: ReactiveValue<any>;
  '::first-line'?: ReactiveValue<any>;
  '::first-letter'?: ReactiveValue<any>;
  '::before'?: ReactiveValue<any>;
  '::after'?: ReactiveValue<any>;
  
  // View transitions
  viewTransitionName?: ReactiveValue<string>;
  
  // Anchor positioning
  anchorName?: ReactiveValue<string>;
  positionAnchor?: ReactiveValue<string>;
  anchorDefault?: ReactiveValue<string>;
  
  // Popover API
  popoverHideDelay?: ReactiveValue<string>;
  popoverShowDelay?: ReactiveValue<string>;
}

// Interaction properties (Complete)
interface InteractionProperties {
  // Pointer events
  pointerEvents?: ReactiveValue<'auto' | 'none' | 'visiblePainted' | 'visibleFill' | 'visibleStroke' | 'visible' | 'painted' | 'fill' | 'stroke' | 'all'>;
  
  // Touch action
  touchAction?: ReactiveValue<'auto' | 'none' | 'pan-x' | 'pan-left' | 'pan-right' | 'pan-y' | 'pan-up' | 'pan-down' | 'pinch-zoom' | 'manipulation'>;
  
  // User select
  userSelect?: ReactiveValue<'auto' | 'none' | 'text' | 'contain' | 'all'>;
  
  // User modify
  userModify?: ReactiveValue<'read-only' | 'read-write' | 'write-only'>;
  
  // Cursor
  cursor?: ReactiveValue<'auto' | 'default' | 'none' | 'context-menu' | 'help' | 'pointer' | 'progress' | 'wait' | 'cell' | 'crosshair' | 'text' | 'vertical-text' | 'alias' | 'copy' | 'move' | 'no-drop' | 'not-allowed' | 'grab' | 'grabbing' | 'e-resize' | 'n-resize' | 'ne-resize' | 'nw-resize' | 's-resize' | 'se-resize' | 'sw-resize' | 'w-resize' | 'ew-resize' | 'ns-resize' | 'nesw-resize' | 'nwse-resize' | 'col-resize' | 'row-resize' | 'all-scroll' | 'zoom-in' | 'zoom-out' | string>;
  
  // Resize
  resize?: ReactiveValue<'none' | 'both' | 'horizontal' | 'vertical' | 'block' | 'inline'>;
  
  // Scroll behavior
  scrollBehavior?: ReactiveValue<'auto' | 'smooth'>;
  
  // Caret
  caretColor?: ReactiveValue<string>;
  
  // Tab size for editable content
  tabSize?: ReactiveValue<number | string>;
  
  // Will change (performance hint)
  willChange?: ReactiveValue<'auto' | 'scroll-position' | 'contents' | string>;
  
  // Appearance
  appearance?: ReactiveValue<'none' | 'auto' | 'textfield' | 'searchfield' | 'textarea' | 'push-button' | 'slider-horizontal' | 'checkbox' | 'radio' | 'square-button' | 'menulist' | 'listbox' | 'meter' | 'progress-bar'>;
}

// Color and visual properties (Complete)
interface ColorProperties {
  // Basic colors
  color?: ReactiveValue<string>;
  backgroundColor?: ReactiveValue<string>;
  
  // Color functions
  currentColor?: ReactiveValue<string>;
  
  // Opacity
  opacity?: ReactiveValue<number>;
  
  // Mix blend mode
  mixBlendMode?: ReactiveValue<'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' | 'exclusion' | 'hue' | 'saturation' | 'color' | 'luminosity'>;
  
  // Isolation
  isolation?: ReactiveValue<'auto' | 'isolate'>;
  
  // Print color adjust
  printColorAdjust?: ReactiveValue<'economy' | 'exact'>;
  colorAdjust?: ReactiveValue<'economy' | 'exact'>;
}

// Layout properties (Complete)
interface LayoutProperties {
  // Display
  display?: ReactiveValue<'none' | 'block' | 'inline' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid' | 'table' | 'inline-table' | 'table-row-group' | 'table-header-group' | 'table-footer-group' | 'table-row' | 'table-cell' | 'table-column-group' | 'table-column' | 'table-caption' | 'list-item' | 'run-in' | 'contents' | 'flow' | 'flow-root'>;
  
  // Visibility
  visibility?: ReactiveValue<'visible' | 'hidden' | 'collapse'>;
  
  // Box sizing
  boxSizing?: ReactiveValue<'content-box' | 'border-box'>;
  
  // Sizing
  width?: ReactiveValue<string | number>;
  height?: ReactiveValue<string | number>;
  minWidth?: ReactiveValue<string | number>;
  minHeight?: ReactiveValue<string | number>;
  maxWidth?: ReactiveValue<string | number>;
  maxHeight?: ReactiveValue<string | number>;
  
  // Logical sizing
  inlineSize?: ReactiveValue<string | number>;
  blockSize?: ReactiveValue<string | number>;
  minInlineSize?: ReactiveValue<string | number>;
  minBlockSize?: ReactiveValue<string | number>;
  maxInlineSize?: ReactiveValue<string | number>;
  maxBlockSize?: ReactiveValue<string | number>;
  
  // Float and clear
  float?: ReactiveValue<'none' | 'left' | 'right' | 'inline-start' | 'inline-end'>;
  clear?: ReactiveValue<'none' | 'left' | 'right' | 'both' | 'inline-start' | 'inline-end'>;
  
  // Overflow
  overflow?: ReactiveValue<'visible' | 'hidden' | 'clip' | 'scroll' | 'auto'>;
  overflowX?: ReactiveValue<'visible' | 'hidden' | 'clip' | 'scroll' | 'auto'>;
  overflowY?: ReactiveValue<'visible' | 'hidden' | 'clip' | 'scroll' | 'auto'>;
  overflowBlock?: ReactiveValue<'visible' | 'hidden' | 'clip' | 'scroll' | 'auto'>;
  overflowInline?: ReactiveValue<'visible' | 'hidden' | 'clip' | 'scroll' | 'auto'>;
  overflowWrap?: ReactiveValue<'normal' | 'break-word' | 'anywhere'>;
  overflowClipMargin?: ReactiveValue<string>;
  
  // Object fit and position
  objectFit?: ReactiveValue<'fill' | 'contain' | 'cover' | 'none' | 'scale-down'>;
  objectPosition?: ReactiveValue<string>;
  
  // Vertical align
  verticalAlign?: ReactiveValue<'baseline' | 'sub' | 'super' | 'text-top' | 'text-bottom' | 'middle' | 'top' | 'bottom' | string | number>;
}

// Shadow and effects properties (Complete)
interface ShadowProperties {
  // Box shadow
  boxShadow?: ReactiveValue<string>;
  
  // Text shadow (already in TextProperties, but included for completeness)
  textShadow?: ReactiveValue<string>;
  
  // Drop shadow filter (already in FilterProperties, but included for completeness)
  dropShadow?: ReactiveValue<string>;
}

// Table properties (Complete)
interface TableProperties {
  tableLayout?: ReactiveValue<'auto' | 'fixed'>;
  borderCollapse?: ReactiveValue<'separate' | 'collapse'>;
  borderSpacing?: ReactiveValue<string | number>;
  captionSide?: ReactiveValue<'top' | 'bottom' | 'block-start' | 'block-end' | 'inline-start' | 'inline-end'>;
  emptyCells?: ReactiveValue<'show' | 'hide'>;
}

// List properties (Complete)
interface ListProperties {
  listStyle?: ReactiveValue<string>;
  listStyleType?: ReactiveValue<'none' | 'disc' | 'circle' | 'square' | 'decimal' | 'decimal-leading-zero' | 'lower-roman' | 'upper-roman' | 'lower-greek' | 'lower-latin' | 'upper-latin' | 'armenian' | 'georgian' | 'lower-alpha' | 'upper-alpha' | 'arabic-indic' | 'bengali' | 'cambodian' | 'cjk-decimal' | 'devanagari' | 'gujarati' | 'gurmukhi' | 'hebrew' | 'hiragana' | 'hiragana-iroha' | 'japanese-formal' | 'japanese-informal' | 'kannada' | 'katakana' | 'katakana-iroha' | 'khmer' | 'korean-hangul-formal' | 'korean-hanja-formal' | 'korean-hanja-informal' | 'lao' | 'lower-armenian' | 'malayalam' | 'mongolian' | 'myanmar' | 'oriya' | 'persian' | 'simp-chinese-formal' | 'simp-chinese-informal' | 'tamil' | 'telugu' | 'thai' | 'tibetan' | 'trad-chinese-formal' | 'trad-chinese-informal' | 'upper-armenian' | string>;
  listStylePosition?: ReactiveValue<'inside' | 'outside'>;
  listStyleImage?: ReactiveValue<string>;
}

// Outline properties (Complete)
interface OutlineProperties {
  outline?: ReactiveValue<string>;
  outlineColor?: ReactiveValue<string>;
  outlineStyle?: ReactiveValue<'none' | 'auto' | 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset'>;
  outlineWidth?: ReactiveValue<string | number>;
  outlineOffset?: ReactiveValue<string | number>;
}

// Content properties (Complete)
interface ContentProperties {
  content?: ReactiveValue<string>;
  quotes?: ReactiveValue<string>;
  counterReset?: ReactiveValue<string>;
  counterIncrement?: ReactiveValue<string>;
  counterSet?: ReactiveValue<string>;
}

// Ruby properties (Complete)
interface RubyProperties {
  rubyAlign?: ReactiveValue<'start' | 'center' | 'space-between' | 'space-around'>;
  rubyMerge?: ReactiveValue<'separate' | 'collapse' | 'auto'>;
  rubyPosition?: ReactiveValue<'over' | 'under' | 'inter-character'>;
}

// Print properties (Complete)
interface PrintProperties {
  breakAfter?: ReactiveValue<'auto' | 'avoid' | 'always' | 'all' | 'avoid-page' | 'page' | 'left' | 'right' | 'recto' | 'verso' | 'avoid-column' | 'column' | 'avoid-region' | 'region'>;
  breakBefore?: ReactiveValue<'auto' | 'avoid' | 'always' | 'all' | 'avoid-page' | 'page' | 'left' | 'right' | 'recto' | 'verso' | 'avoid-column' | 'column' | 'avoid-region' | 'region'>;
  breakInside?: ReactiveValue<'auto' | 'avoid' | 'avoid-page' | 'avoid-column' | 'avoid-region'>;
  pageBreakAfter?: ReactiveValue<'auto' | 'always' | 'avoid' | 'left' | 'right' | 'recto' | 'verso'>;
  pageBreakBefore?: ReactiveValue<'auto' | 'always' | 'avoid' | 'left' | 'right' | 'recto' | 'verso'>;
  pageBreakInside?: ReactiveValue<'auto' | 'avoid'>;
  orphans?: ReactiveValue<number>;
  widows?: ReactiveValue<number>;
}

// SVG properties (Complete)
interface SVGProperties {
  // Fill and stroke
  fill?: ReactiveValue<string>;
  fillOpacity?: ReactiveValue<number>;
  fillRule?: ReactiveValue<'nonzero' | 'evenodd'>;
  stroke?: ReactiveValue<string>;
  strokeWidth?: ReactiveValue<string | number>;
  strokeOpacity?: ReactiveValue<number>;
  strokeLinecap?: ReactiveValue<'butt' | 'round' | 'square'>;
  strokeLinejoin?: ReactiveValue<'miter' | 'round' | 'bevel'>;
  strokeDasharray?: ReactiveValue<string>;
  strokeDashoffset?: ReactiveValue<string | number>;
  strokeMiterlimit?: ReactiveValue<number>;
  
  // Markers
  marker?: ReactiveValue<string>;
  markerStart?: ReactiveValue<string>;
  markerMid?: ReactiveValue<string>;
  markerEnd?: ReactiveValue<string>;
  
  // Text properties
  textAnchor?: ReactiveValue<'start' | 'middle' | 'end'>;
  dominantBaseline?: ReactiveValue<'auto' | 'text-bottom' | 'alphabetic' | 'ideographic' | 'middle' | 'central' | 'mathematical' | 'hanging' | 'text-top'>;
  alignmentBaseline?: ReactiveValue<'auto' | 'baseline' | 'before-edge' | 'text-before-edge' | 'middle' | 'central' | 'after-edge' | 'text-after-edge' | 'ideographic' | 'alphabetic' | 'hanging' | 'mathematical'>;
  
  // Clipping and masking
  clipPath?: ReactiveValue<string>;
  clipRule?: ReactiveValue<'nonzero' | 'evenodd'>;
  mask?: ReactiveValue<string>;
  
  // Other SVG properties
  vectorEffect?: ReactiveValue<'none' | 'non-scaling-stroke' | 'non-scaling-size' | 'non-rotation' | 'fixed-position'>;
  shapeRendering?: ReactiveValue<'auto' | 'optimizeSpeed' | 'crispEdges' | 'geometricPrecision'>;
  colorInterpolation?: ReactiveValue<'auto' | 'sRGB' | 'linearRGB'>;
  colorInterpolationFilters?: ReactiveValue<'auto' | 'sRGB' | 'linearRGB'>;
  paintOrder?: ReactiveValue<string>;
}

// Complete CSS Properties interface
interface CSSProperties extends 
  TransformProperties,
  BackgroundProperties,
  BorderProperties,
  SpacingProperties,
  FontProperties,
  TextProperties,
  FlexboxProperties,
  GridProperties,
  AnimationProperties,
  TransitionProperties,
  PositionProperties,
  FilterProperties,
  ScrollProperties,
  ModernCSSProperties,
  InteractionProperties,
  ColorProperties,
  LayoutProperties,
  ShadowProperties,
  TableProperties,
  ListProperties,
  OutlineProperties,
  ContentProperties,
  RubyProperties,
  PrintProperties,
  SVGProperties {
  
  // CSS Custom Properties (CSS Variables)
  [key: `--${string}`]: ReactiveValue<string | number>;
  
  // Vendor prefixes
  [key: `-webkit-${string}`]: ReactiveValue<string | number>;
  [key: `-moz-${string}`]: ReactiveValue<string | number>;
  [key: `-ms-${string}`]: ReactiveValue<string | number>;
  [key: `-o-${string}`]: ReactiveValue<string | number>;
  
  // Fallback for any CSS property not explicitly defined
  [key: string]: ReactiveValue<string | number> | undefined;
}

// Extended style interface with nested selectors, media queries, and at-rules
interface ExtendedStyleObject extends CSSProperties {
  // Pseudo-classes
  ':hover'?: CSSProperties;
  ':focus'?: CSSProperties;
  ':focus-visible'?: CSSProperties;
  ':focus-within'?: CSSProperties;
  ':active'?: CSSProperties;
  ':visited'?: CSSProperties;
  ':link'?: CSSProperties;
  ':target'?: CSSProperties;
  ':target-within'?: CSSProperties;
  ':scope'?: CSSProperties;
  ':current'?: CSSProperties;
  ':past'?: CSSProperties;
  ':future'?: CSSProperties;
  ':playing'?: CSSProperties;
  ':paused'?: CSSProperties;
  ':seeking'?: CSSProperties;
  ':buffering'?: CSSProperties;
  ':stalled'?: CSSProperties;
  ':muted'?: CSSProperties;
  ':volume-locked'?: CSSProperties;
  ':fullscreen'?: CSSProperties;
  ':picture-in-picture'?: CSSProperties;
  ':user-invalid'?: CSSProperties;
  ':user-valid'?: CSSProperties;
  ':enabled'?: CSSProperties;
  ':disabled'?: CSSProperties;
  ':read-only'?: CSSProperties;
  ':read-write'?: CSSProperties;
  ':placeholder-shown'?: CSSProperties;
  ':default'?: CSSProperties;
  ':checked'?: CSSProperties;
  ':indeterminate'?: CSSProperties;
  ':blank'?: CSSProperties;
  ':empty'?: CSSProperties;
  ':valid'?: CSSProperties;
  ':invalid'?: CSSProperties;
  ':in-range'?: CSSProperties;
  ':out-of-range'?: CSSProperties;
  ':required'?: CSSProperties;
  ':optional'?: CSSProperties;
  ':autofill'?: CSSProperties;
  ':root'?: CSSProperties;
  ':defined'?: CSSProperties;
  ':host'?: CSSProperties;
  ':host-context'?: CSSProperties;
  
  // Structural pseudo-classes
  ':first-child'?: CSSProperties;
  ':last-child'?: CSSProperties;
  ':only-child'?: CSSProperties;
  ':first-of-type'?: CSSProperties;
  ':last-of-type'?: CSSProperties;
  ':only-of-type'?: CSSProperties;
  ':nth-child(n)'?: CSSProperties;
  ':nth-last-child(n)'?: CSSProperties;
  ':nth-of-type(n)'?: CSSProperties;
  ':nth-last-of-type(n)'?: CSSProperties;
  
  // Pseudo-elements
  '::before'?: CSSProperties;
  '::after'?: CSSProperties;
  '::first-line'?: CSSProperties;
  '::first-letter'?: CSSProperties;
  '::selection'?: CSSProperties;
  '::backdrop'?: CSSProperties;
  '::placeholder'?: CSSProperties;
  '::marker'?: CSSProperties;
  '::spelling-error'?: CSSProperties;
  '::grammar-error'?: CSSProperties;
  '::file-selector-button'?: CSSProperties;
  '::cue'?: CSSProperties;
  '::cue-region'?: CSSProperties;
  '::part'?: CSSProperties;
  '::slotted'?: CSSProperties;
  '::highlight'?: CSSProperties;
  '::view-transition'?: CSSProperties;
  '::view-transition-group'?: CSSProperties;
  '::view-transition-image-pair'?: CSSProperties;
  '::view-transition-old'?: CSSProperties;
  '::view-transition-new'?: CSSProperties;
  
  // Media queries
  '@media screen'?: CSSProperties;
  '@media print'?: CSSProperties;
  '@media (max-width: 767px)'?: CSSProperties;
  '@media (min-width: 768px)'?: CSSProperties;
  '@media (max-width: 1023px)'?: CSSProperties;
  '@media (min-width: 1024px)'?: CSSProperties;
  '@media (max-width: 1199px)'?: CSSProperties;
  '@media (min-width: 1200px)'?: CSSProperties;
  '@media (max-width: 1399px)'?: CSSProperties;
  '@media (min-width: 1400px)'?: CSSProperties;
  '@media (orientation: portrait)'?: CSSProperties;
  '@media (orientation: landscape)'?: CSSProperties;
  '@media (prefers-color-scheme: light)'?: CSSProperties;
  '@media (prefers-color-scheme: dark)'?: CSSProperties;
  '@media (prefers-reduced-motion: no-preference)'?: CSSProperties;
  '@media (prefers-reduced-motion: reduce)'?: CSSProperties;
  '@media (prefers-contrast: no-preference)'?: CSSProperties;
  '@media (prefers-contrast: more)'?: CSSProperties;
  '@media (prefers-contrast: less)'?: CSSProperties;
  '@media (prefers-reduced-data: no-preference)'?: CSSProperties;
  '@media (prefers-reduced-data: reduce)'?: CSSProperties;
  '@media (prefers-reduced-transparency: no-preference)'?: CSSProperties;
  '@media (prefers-reduced-transparency: reduce)'?: CSSProperties;
  '@media (forced-colors: none)'?: CSSProperties;
  '@media (forced-colors: active)'?: CSSProperties;
  '@media (hover: hover)'?: CSSProperties;
  '@media (hover: none)'?: CSSProperties;
  '@media (any-hover: hover)'?: CSSProperties;
  '@media (any-hover: none)'?: CSSProperties;
  '@media (pointer: fine)'?: CSSProperties;
  '@media (pointer: coarse)'?: CSSProperties;
  '@media (pointer: none)'?: CSSProperties;
  '@media (any-pointer: fine)'?: CSSProperties;
  '@media (any-pointer: coarse)'?: CSSProperties;
  '@media (any-pointer: none)'?: CSSProperties;
  '@media (update: fast)'?: CSSProperties;
  '@media (update: slow)'?: CSSProperties;
  '@media (update: none)'?: CSSProperties;
  '@media (overflow-block: none)'?: CSSProperties;
  '@media (overflow-block: scroll)'?: CSSProperties;
  '@media (overflow-block: optional-paged)'?: CSSProperties;
  '@media (overflow-block: paged)'?: CSSProperties;
  '@media (overflow-inline: none)'?: CSSProperties;
  '@media (overflow-inline: scroll)'?: CSSProperties;
  
  // Container queries
  '@container (min-width: 0px)'?: CSSProperties;
  '@container (max-width: 767px)'?: CSSProperties;
  '@container (min-width: 768px)'?: CSSProperties;
  '@container (max-width: 1023px)'?: CSSProperties;
  '@container (min-width: 1024px)'?: CSSProperties;
  '@container (orientation: portrait)'?: CSSProperties;
  '@container (orientation: landscape)'?: CSSProperties;
  '@container style(--custom-property: value)'?: CSSProperties;
  
  // Support queries
  '@supports (display: flex)'?: CSSProperties;
  '@supports (display: grid)'?: CSSProperties;
  '@supports (display: subgrid)'?: CSSProperties;
  '@supports (backdrop-filter: blur(10px))'?: CSSProperties;
  '@supports (mask: url(mask.png))'?: CSSProperties;
  '@supports (clip-path: circle(50%))'?: CSSProperties;
  '@supports (container-type: inline-size)'?: CSSProperties;
  '@supports (view-transition-name: none)'?: CSSProperties;
  '@supports (anchor-name: --anchor)'?: CSSProperties;
  '@supports (position-anchor: --anchor)'?: CSSProperties;
  '@supports selector(:has(> img))'?: CSSProperties;
  '@supports font-tech(color-COLRv1)'?: CSSProperties;
  
  // Document and layer rules
  '@layer base'?: CSSProperties;
  '@layer components'?: CSSProperties;
  '@layer utilities'?: CSSProperties;
  '@scope'?: CSSProperties;
  '@starting-style'?: CSSProperties;
  '@page'?: CSSProperties;
  '@page :first'?: CSSProperties;
  '@page :left'?: CSSProperties;
  '@page :right'?: CSSProperties;
  '@page :blank'?: CSSProperties;
  
  // Keyframes
  '@keyframes'?: Record<string, CSSProperties>;
  
  // Child selectors and combinators
  '& > *'?: CSSProperties;
  '& + *'?: CSSProperties;
  '& ~ *'?: CSSProperties;
  '& *'?: CSSProperties;
  '&:not()'?: CSSProperties;
  '&:is()'?: CSSProperties;
  '&:where()'?: CSSProperties;
  '&:has()'?: CSSProperties;
  
  // Allow any selector pattern
  [key: `&${string}`]: CSSProperties; // Nested selectors
  [key: `@${string}`]: CSSProperties; // At-rules
  [key: `:${string}`]: CSSProperties; // Pseudo-selectors
  [key: `::${string}`]: CSSProperties; // Pseudo-elements
  [key: `[${string}]`]: CSSProperties; // Attribute selectors
}

// Main style value type
type StyleValue = CSSProperties | ExtendedStyleObject;

// Export all interfaces
export {
  // Core types
  ReactiveValue,
  StyleValue,
  
  // Main interfaces
  CSSProperties,
  ExtendedStyleObject,
  
  // Sub-property interfaces
  TransformProperties,
  BackgroundProperties,
  BorderProperties,
  SpacingProperties,
  FontProperties,
  TextProperties,
  FlexboxProperties,
  GridProperties,
  AnimationProperties,
  TransitionProperties,
  PositionProperties,
  FilterProperties,
  ScrollProperties,
  ModernCSSProperties,
  InteractionProperties,
  ColorProperties,
  LayoutProperties,
  ShadowProperties,
  TableProperties,
  ListProperties,
  OutlineProperties,
  ContentProperties,
  RubyProperties,
  PrintProperties,
  SVGProperties
};


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
    style?: ReactiveValue<StyleValue>;
    
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
export type JurisVDOMElement = 
  | JurisVDOM.Element
  | (keyof Juris.RegisteredComponents extends never 
      ? never 
      : {
          [K in keyof Juris.RegisteredComponents]: {
            [P in K]: Juris.RegisteredComponents[K] & {
              children?: ReactiveValue<JurisVDOMElement[]>;
              key?: string | number;
            }
          }
        }[keyof Juris.RegisteredComponents]);
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
  headlessAPIs: Record<string, any>;
  executeBatch: (callback: () => any) => any;
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
  setupIndicators?: (elementId: string, config: PlaceholderConfig) => void;
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
) => JurisVDOMElement | { 
  render: () => AsyncCapable<JurisVDOMElement>;
  // ADD: Optional placeholder indicator
  indicator?: JurisVDOMElement;
  hooks?: ComponentHooks;
  api?: Record<string, any>;
};

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
export interface JurisInstance<TState = {}> {
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
  
  // Component management
  registerComponent: (name: string, component: JurisComponentFunction<TState>) => void;
  registerHeadlessComponent: (name: string, component: (props: any, context: any) => HeadlessComponent, options?: any) => void;
  getComponent: (name: string) => JurisComponentFunction<TState> | undefined;
  getHeadlessComponent: (name: string) => any;
  initializeHeadlessComponent: (name: string, props?: any) => any;

  // NEW: Extended component methods
  registerAndInitHeadless: (name: string, componentFn: any, options?: any) => any;

  setupIndicators: (elementId: string, config: PlaceholderConfig) => void;
  
  // Rendering
  render: (container?: string | HTMLElement) => void;
  setRenderMode: (mode: 'fine-grained' | 'batch') => void;
  getRenderMode: () => string;
  isFineGrained: () => boolean;
  isBatchMode: () => boolean;
  
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
  new (config?: JurisConfig): JurisInstance<any>;
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
        PlaceholderConfig: string;
      };
    };
    JurisTypeHelpers: {
      isVDOMElement(value: any): value is JurisVDOMElement;
      isComponentFunction(value: any): value is JurisComponentFunction;
      isReactive(value: any): boolean;
      isPromise(value: any): value is Promise<any>;
      isAsyncCapable(value: any): boolean;
      isPlaceholderConfig(value: any): value is PlaceholderConfig;
      isAsyncPlaceholder(element: HTMLElement): boolean;
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
export interface PlaceholderConfig {
  className?: string;
  style?: string;
  text?: string;
  children?: ReactiveValue<JurisVDOMElement[]> | null;
}

export interface PlaceholderSystemOptions {
  defaultPlaceholder?: PlaceholderConfig;
  placeholders?: Record<string, PlaceholderConfig>;
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
  JurisFormElement,
  
  PlaceholderConfig,
  PlaceholderSystemOptions,
  PlaceholderStats,
  AsyncPlaceholderType,
  AsyncPlaceholderMetadata
};