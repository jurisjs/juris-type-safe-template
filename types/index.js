// types/index.js
// JavaScript implementation file to accompany the TypeScript definitions
// This allows imports to work properly in both TypeScript and JavaScript

/**
 * Re-export all type definitions for JavaScript IntelliSense
 * This file serves as a bridge between the .d.ts definitions and JavaScript usage
 */

/**
 * @typedef {import('./index.d.ts').JurisConfig} JurisConfig
 * @typedef {import('./index.d.ts').JurisInstance} JurisInstance
 * @typedef {import('./index.d.ts').JurisConstructor} JurisConstructor
 * @typedef {import('./index.d.ts').JurisContext} JurisContext
 * @typedef {import('./index.d.ts').JurisContextBase} JurisContextBase
 * @typedef {import('./index.d.ts').JurisVDOMElement} JurisVDOMElement
 * @typedef {import('./index.d.ts').JurisElementOptions} JurisElementOptions
 * @typedef {import('./index.d.ts').JurisComponentFunction} JurisComponentFunction
 * @typedef {import('./index.d.ts').ComponentHooks} ComponentHooks
 * @typedef {import('./index.d.ts').JurisLifecycleComponent} JurisLifecycleComponent
 * @typedef {import('./index.d.ts').HeadlessComponent} HeadlessComponent
 * @typedef {import('./index.d.ts').JurisLogger} JurisLogger
 * @typedef {import('./index.d.ts').TemplateCompiler} TemplateCompiler
 * @typedef {import('./index.d.ts').ParsedTemplate} ParsedTemplate
 * @typedef {import('./index.d.ts').EnhancementOptions} EnhancementOptions
 * @typedef {import('./index.d.ts').EnhancementDefinition} EnhancementDefinition
 * @typedef {import('./index.d.ts').Enhancement} Enhancement
 * @typedef {import('./index.d.ts').ComponentAsyncStats} ComponentAsyncStats
 * @typedef {import('./index.d.ts').DOMAsyncStats} DOMAsyncStats
 * @typedef {import('./index.d.ts').HeadlessStatus} HeadlessStatus
 * @typedef {import('./index.d.ts').EnhancementStats} EnhancementStats
 */

/**
 * Event types
 * @typedef {import('./index.d.ts').JurisInputEvent} JurisInputEvent
 * @typedef {import('./index.d.ts').JurisTextAreaEvent} JurisTextAreaEvent
 * @typedef {import('./index.d.ts').JurisSelectEvent} JurisSelectEvent
 * @typedef {import('./index.d.ts').JurisFormEvent} JurisFormEvent
 * @typedef {import('./index.d.ts').JurisMouseEventWithTarget} JurisMouseEventWithTarget
 * @typedef {import('./index.d.ts').JurisKeyboardEventWithTarget} JurisKeyboardEventWithTarget
 * @typedef {import('./index.d.ts').JurisFocusEventWithTarget} JurisFocusEventWithTarget
 */

/**
 * VDOM Element types
 * @typedef {import('./index.d.ts').JurisContainerElement} JurisContainerElement
 * @typedef {import('./index.d.ts').JurisTextElement} JurisTextElement
 * @typedef {import('./index.d.ts').JurisInputElement} JurisInputElement
 * @typedef {import('./index.d.ts').JurisButtonElement} JurisButtonElement
 * @typedef {import('./index.d.ts').JurisImageElement} JurisImageElement
 * @typedef {import('./index.d.ts').JurisVideoElement} JurisVideoElement
 * @typedef {import('./index.d.ts').JurisAudioElement} JurisAudioElement
 * @typedef {import('./index.d.ts').JurisTableElement} JurisTableElement
 * @typedef {import('./index.d.ts').JurisFormElement} JurisFormElement
 */

/**
 * Async support types
 * @typedef {import('./index.d.ts').MaybeAsync} MaybeAsync
 * @typedef {import('./index.d.ts').AsyncCapable} AsyncCapable
 * @typedef {import('./index.d.ts').ReactiveValue} ReactiveValue
 * @typedef {import('./index.d.ts').SmartFunction} SmartFunction
 * @typedef {import('./index.d.ts').SmartEventHandler} SmartEventHandler
 */

/**
 * Utility types
 * @typedef {import('./index.d.ts').SafeDotNotation} SafeDotNotation
 * @typedef {import('./index.d.ts').SafePathValue} SafePathValue
 */

// Export empty object to make this a valid ES module
// The types are available through JSDoc @typedef comments
export { };

// For better IntelliSense, also export some runtime helpers
export const JurisTypeHelpers = {
	/**
	 * Type guard to check if a value is a Juris VDOM element
	 * @param {any} value
	 * @returns {value is JurisVDOMElement}
	 */
	isVDOMElement(value) {
		return value && typeof value === 'object' && !Array.isArray(value) &&
			Object.keys(value).length === 1 && typeof Object.keys(value)[0] === 'string';
	},

	/**
	 * Type guard to check if a value is a component function
	 * @param {any} value
	 * @returns {value is JurisComponentFunction}
	 */
	isComponentFunction(value) {
		return typeof value === 'function' && value.length >= 2;
	},

	/**
	 * Type guard to check if a value is reactive (function)
	 * @param {any} value
	 * @returns {boolean}
	 */
	isReactive(value) {
		return typeof value === 'function';
	},

	/**
	 * Type guard to check if a value is a Promise
	 * @param {any} value
	 * @returns {value is Promise<any>}
	 */
	isPromise(value) {
		return value && typeof value.then === 'function';
	},

	/**
	 * Type guard to check if a value is async capable (Promise or function returning Promise)
	 * @param {any} value
	 * @returns {boolean}
	 */
	isAsyncCapable(value) {
		return this.isPromise(value) ||
			(typeof value === 'function' && value.constructor.name === 'AsyncFunction');
	}
};

// Make types available globally for HTML scripts
if (typeof window !== 'undefined') {
	// Add JurisTypeHelpers to window with proper typing
	window.JurisTypeHelpers = JurisTypeHelpers;

	// Add JurisTypes info object for documentation
	window.JurisTypes = {
		info: {
			Context: 'JurisContextBase - Main context object',
			VDOMElement: 'JurisVDOMElement - Virtual DOM element',
			ComponentFunction: 'JurisComponentFunction - Component function signature',
			Instance: 'JurisInstance - Main Juris framework instance',
			Config: 'JurisConfig - Framework configuration object'
		}
	};
}