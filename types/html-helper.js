// types/html-helper.js
// Helper file for easy type imports in HTML inline scripts

/**
 * Re-export all Juris types with shorter, cleaner names for HTML use
 * Import from the .js file instead of .d.ts to avoid TypeScript import errors
 */

/**
 * @typedef {import('./index.js').JurisContextBase} Context
 * @typedef {import('./index.js').JurisVDOMElement} VDOMElement  
 * @typedef {import('./index.js').JurisComponentFunction} ComponentFunction
 * @typedef {import('./index.js').JurisInstance} Instance
 * @typedef {import('./index.js').JurisConfig} Config
 * @typedef {import('./index.js').JurisElementOptions} ElementOptions
 */

/**
 * VDOM Element shortcuts for common elements
 * @typedef {import('./index.js').JurisButtonElement} ButtonElement
 * @typedef {import('./index.js').JurisInputElement} InputElement
 * @typedef {import('./index.js').JurisContainerElement} DivElement
 * @typedef {import('./index.js').JurisFormElement} FormElement
 * @typedef {import('./index.js').JurisImageElement} ImageElement
 * @typedef {import('./index.js').JurisTextElement} TextElement
 */

/**
 * Event shortcuts
 * @typedef {import('./index.js').JurisInputEvent} InputEvent
 * @typedef {import('./index.js').JurisMouseEventWithTarget} MouseEvent
 * @typedef {import('./index.js').JurisFormEvent} FormEvent
 */

/**
 * Async support shortcuts
 * @typedef {import('./index.js').SmartEventHandler} SmartEventHandler
 */
//TODO: Fix import
//* @typedef {import('./index.js').MaybeAsync} MaybeAsync
// * @typedef {import('./index.js').AsyncCapable} AsyncCapable
// * @typedef {import('./index.js').ReactiveValue} ReactiveValue
/**
 * Stats and status shortcuts  
 * @typedef {import('./index.js').HeadlessStatus} HeadlessStatus
 * @typedef {import('./index.js').ComponentAsyncStats} ComponentStats
 * @typedef {import('./index.js').EnhancementStats} EnhancementStats
 */

// Export for module systems
export { };

// Make available globally for easy access in HTML scripts
if (typeof window !== 'undefined') {
	window.JurisTypes = {
		// Expose the type definitions as comments for documentation
		info: {
			Context: 'JurisContextBase - Main context object',
			VDOMElement: 'JurisVDOMElement - Virtual DOM element',
			ComponentFunction: 'JurisComponentFunction - Component function signature',
			Instance: 'JurisInstance - Main Juris framework instance',
			Config: 'JurisConfig - Framework configuration object'
		}
	};
}