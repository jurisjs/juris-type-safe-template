/**
 * @param {{
 *   initialValue?: number,
 *   step?: number,
 *   min?: number,
 *   max?: number,
 *   label?: string,
 *   showReset?: boolean,
 *   statePath?: string,
 *   onChange?: (value: number) => void,
 *   onReset?: () => void,
 *   disabled?: boolean,
 *   className?: string
 * }} props
 * @param {import('@types').JurisContextBase} context
 * @returns {import('@types').JurisVDOMElement}
 */
const Counter = (props, context) => {
	const { getState, setState } = context;

	const {
		initialValue = 0,
		step = 1,
		min,
		max,
		label = 'Count',
		showReset = true,
		statePath = 'count'
	} = props;

	const increment = () => {
		const current = getState(statePath, initialValue);
		const newValue = current + step;
		if (max === undefined || newValue <= max) {
			setState(statePath, newValue);
		}
	};

	const decrement = () => {
		const current = getState(statePath, initialValue);
		const newValue = current - step;
		if (min === undefined || newValue >= min) {
			setState(statePath, newValue);
		}
	};

	const reset = () => setState(statePath, initialValue);

	return {
		div: {
			className: 'counter-component',
			children: [
				...(label ? [{ label: { text: `label: ` } }] : []), //label
				{
					button: {
						text: '-',
						disabled: () => {
							const current = getState(statePath, initialValue);
							return min !== undefined && current <= min;
						},
						onClick: decrement
					}
				}, //button
				{
					span: {
						className: 'count-value',
						text: () => getState(statePath, initialValue).toString()
					}
				}, //span.count-value
				{
					button: {
						text: '+',
						disabled: () => {
							const current = getState(statePath, initialValue);
							return max !== undefined && current >= max;
						},
						onClick: increment
					}
				}, //button
				...(showReset ? [{ button: { text: 'Reset', onClick: reset } }] : []), //button
			]
		}, //div.counter-component
	};
};