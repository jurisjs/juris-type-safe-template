/**
 * @param {Object} props
 * @param {import('@types').JurisContextBase} context
 * @returns {import('@types').JurisVDOMElement}
 */
const CounterCoponent = (props, context) => {
	const { getState, setState } = context;

	return {
		div: {
			className: 'container',
			children: [
				{
					div: {
						className: 'container',
						children: [

						]
					}
				}, //div.container
			]
		}, //div.container
	};
};