/**
 * Complete Juris Framework JSDoc Type Definitions
 * Imports all types from the TypeScript definitions for JavaScript IntelliSense
 */

// =============================================================================
// CORE FRAMEWORK TYPES
// =============================================================================

/**
 * @typedef {import('./types').JurisConfig} JurisConfig
 * @typedef {import('./types').JurisInstance} JurisInstance
 * @typedef {import('./types').JurisConstructor} JurisConstructor
 * @typedef {import('./types').Juris} Juris
 */

// =============================================================================
// STATE MANAGEMENT TYPES
// =============================================================================

/**
 * @typedef {import('./types').ComponentState} ComponentState
 * @typedef {import('./types').SmartEventHandler} SmartEventHandler
 */

//* @typedef {import('./types').SafeDotNotation} SafeDotNotation
/* @typedef {import('./types').SafePathValue} SafePathValue
* @typedef {import('./types').MaybeAsync} MaybeAsync
* @typedef {import('./types').AsyncCapable} AsyncCapable
* @typedef {import('./types').ReactiveValue} ReactiveValue
* @typedef {import('./types').SmartFunction} SmartFunction*/
// =============================================================================
// CONTEXT TYPES
// =============================================================================

/**
 * @typedef {import('./types').JurisContextBase} JurisContextBase
 * @typedef {import('./types').JurisContext} JurisContext
 */
//* @typedef {import('./types').JurisContextCore} JurisContextCore

// =============================================================================
// VDOM AND ELEMENT TYPES
// =============================================================================

/**
 * @typedef {import('./types').JurisVDOMElement} JurisVDOMElement
 * @typedef {import('./types').JurisElementOptions} JurisElementOptions
 * @typedef {import('./types').JurisContainerElement} JurisContainerElement
 * @typedef {import('./types').JurisTextElement} JurisTextElement
 * @typedef {import('./types').JurisInputElement} JurisInputElement
 * @typedef {import('./types').JurisButtonElement} JurisButtonElement
 * @typedef {import('./types').JurisImageElement} JurisImageElement
 * @typedef {import('./types').JurisVideoElement} JurisVideoElement
 * @typedef {import('./types').JurisAudioElement} JurisAudioElement
 * @typedef {import('./types').JurisTableElement} JurisTableElement
 * @typedef {import('./types').JurisFormElement} JurisFormElement
 */

// =============================================================================
// VDOM NAMESPACE ELEMENT TYPES
// =============================================================================


// Individual VDOM element types (these are the actual interfaces you'll use)
/**
 * @typedef {import('./types').JurisVDOM.BaseElementProps} BaseElementProps
 * @typedef {import('./types').JurisVDOM.VoidElement} VoidElement
 * @typedef {import('./types').JurisVDOM.TextElement} TextElement
 * @typedef {import('./types').JurisVDOM.ContainerElement} ContainerElement
 * @typedef {import('./types').JurisVDOM.ContainerWithTextElement} ContainerWithTextElement
 * @typedef {import('./types').JurisVDOM.ButtonElement} ButtonElement
 * @typedef {import('./types').JurisVDOM.LabelElement} LabelElement
 * @typedef {import('./types').JurisVDOM.InputElement} InputElement
 * @typedef {import('./types').JurisVDOM.TextAreaElement} TextAreaElement
 * @typedef {import('./types').JurisVDOM.SelectElement} SelectElement
 * @typedef {import('./types').JurisVDOM.OptionElement} OptionElement
 * @typedef {import('./types').JurisVDOM.FormElement} FormElement
 * @typedef {import('./types').JurisVDOM.FieldSetElement} FieldSetElement
 * @typedef {import('./types').JurisVDOM.ImageElement} ImageElement
 * @typedef {import('./types').JurisVDOM.VideoElement} VideoElement
 * @typedef {import('./types').JurisVDOM.AudioElement} AudioElement
 * @typedef {import('./types').JurisVDOM.CanvasElement} CanvasElement
 * @typedef {import('./types').JurisVDOM.IframeElement} IframeElement
 * @typedef {import('./types').JurisVDOM.LinkElement} LinkElement
 * @typedef {import('./types').JurisVDOM.ListElement} ListElement
 * @typedef {import('./types').JurisVDOM.ListItemElement} ListItemElement
 * @typedef {import('./types').JurisVDOM.TableElement} TableElement
 * @typedef {import('./types').JurisVDOM.TableRowElement} TableRowElement
 * @typedef {import('./types').JurisVDOM.TableCellElement} TableCellElement
 * @typedef {import('./types').JurisVDOM.TableHeaderElement} TableHeaderElement
 * @typedef {import('./types').JurisVDOM.DetailsElement} DetailsElement
 * @typedef {import('./types').JurisVDOM.DialogElement} DialogElement
 * @typedef {import('./types').JurisVDOM.ProgressElement} ProgressElement
 * @typedef {import('./types').JurisVDOM.MeterElement} MeterElement
 * @typedef {import('./types').JurisVDOM.TimeElement} TimeElement
 * @typedef {import('./types').JurisVDOM.ScriptElement} ScriptElement
 * @typedef {import('./types').JurisVDOM.StyleElement} StyleElement
 * @typedef {import('./types').JurisVDOM.MetaElement} MetaElement
 * @typedef {import('./types').JurisVDOM.LinkHeadElement} LinkHeadElement
 * @typedef {import('./types').JurisVDOM.ElementOptions} ElementOptions
 * @typedef {import('./types').JurisVDOM.Element} Element
 */

// =============================================================================
// EVENT TYPES
// =============================================================================

/**
 * @typedef {import('./types').JurisInputEvent} JurisInputEvent
 * @typedef {import('./types').JurisTextAreaEvent} JurisTextAreaEvent
 * @typedef {import('./types').JurisSelectEvent} JurisSelectEvent
 * @typedef {import('./types').JurisFormEvent} JurisFormEvent
 * @typedef {import('./types').JurisMouseEventWithTarget} JurisMouseEventWithTarget
 * @typedef {import('./types').JurisKeyboardEventWithTarget} JurisKeyboardEventWithTarget
 * @typedef {import('./types').JurisFocusEventWithTarget} JurisFocusEventWithTarget
 */

// =============================================================================
// COMPONENT TYPES
// =============================================================================

/**
 * @typedef {import('./types').JurisComponentFunction} JurisComponentFunction
 * @typedef {import('./types').ComponentHooks} ComponentHooks
 * @typedef {import('./types').JurisLifecycleComponent} JurisLifecycleComponent
 * @typedef {import('./types').HeadlessComponent} HeadlessComponent
 * @typedef {import('./types').HeadlessComponentConfig} HeadlessComponentConfig
 * @typedef {import('./types').HeadlessComponentOptions} HeadlessComponentOptions
 * @typedef {import('./types').HeadlessComponentFunction} HeadlessComponentFunction
 */

// =============================================================================
// CONFIGURATION TYPES
// =============================================================================

/**
 * @typedef {import('./types').TemplateObserverConfig} TemplateObserverConfig
 * @typedef {import('./types').MiddlewareContext} MiddlewareContext
 * @typedef {import('./types').EnhancementOptions} EnhancementOptions
 * @typedef {import('./types').EnhancementDefinition} EnhancementDefinition
 * @typedef {import('./types').EnhancementFunction} EnhancementFunction
 * @typedef {import('./types').Enhancement} Enhancement
 */

// =============================================================================
// STATISTICS AND STATUS TYPES
// =============================================================================

/**
 * @typedef {import('./types').ComponentAsyncStats} ComponentAsyncStats
 * @typedef {import('./types').DOMAsyncStats} DOMAsyncStats
 * @typedef {import('./types').HeadlessStatus} HeadlessStatus
 * @typedef {import('./types').EnhancementStats} EnhancementStats
 */

// =============================================================================
// TEMPLATE SYSTEM TYPES
// =============================================================================

/**
 * @typedef {import('./types').TemplateCompiler} TemplateCompiler
 * @typedef {import('./types').ParsedTemplate} ParsedTemplate
 * @typedef {import('./types').TemplateElement} TemplateElement
 */

// =============================================================================
// LOGGER TYPES
// =============================================================================

/**
 * @typedef {import('./types').JurisLogger} JurisLogger
 */

// =============================================================================
// GLOBAL UTILITY TYPES
// =============================================================================

/**
 * @typedef {import('./types').deepEquals} deepEquals
 * @typedef {import('./types').jurisVersion} jurisVersion
 * @typedef {import('./types').jurisLinesOfCode} jurisLinesOfCode
 * @typedef {import('./types').jurisMinifiedSize} jurisMinifiedSize
 * @typedef {import('./types').log} log
 * @typedef {import('./types').logSub} logSub
 * @typedef {import('./types').logUnsub} logUnsub
 * @typedef {import('./types').promisify} promisify
 * @typedef {import('./types').startTracking} startTracking
 * @typedef {import('./types').stopTracking} stopTracking
 * @typedef {import('./types').onAllComplete} onAllComplete
 */

// =============================================================================
// EXPORT SECTION FOR INTELLISENSE
// =============================================================================

/**
 * Export all types for better IntelliSense in JavaScript files
 * @namespace JurisTypes
 */
export const JurisTypes = {};

// For better JSDoc IntelliSense, you can also destructure specific types:
/**
 * @type {JurisInstance}
 */
export let jurisInstance;

/**
 * @type {JurisVDOMElement}
 */
export let vdomElement;

/**
 * @type {JurisContext}
 */
export let context;

/**
 * @type {JurisComponentFunction}
 */
export let componentFunction;

/**
 * @type {JurisConfig}
 */
export let config;
