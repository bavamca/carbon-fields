/**
 * External dependencies.
 */
import { Component } from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';
import { RadioControl } from '@wordpress/components';

class RadioImageField extends Component {
	/**
	 * Handles the change of the radios.
	 *
	 * @param  {string} value
	 * @return {void}
	 */
	handleChange = ( value ) => {
		const { field, onChange } = this.props;

		onChange( field.base_name, value );
	}

	/**
	 * Renders the component.
	 *
	 * @return {Object}
	 */
	render() {
		const { field, value } = this.props;

		return (
			<RadioControl
				label={ field.label }
				selected={ value }
				options={ field.options.map( ( option ) => ( {
					value: option.value,
					label: ( <img src={ option.label } /> )
				} ) ) }
				onChange={ this.handleChange }
			/>
		);
	}
}

addFilter( 'carbon-fields.radio_image-field.block', 'carbon-fields/blocks', ( OriginalRadioImageField ) => ( props ) => {
	return (
		<OriginalRadioImageField { ...props }>
			{ ( {
				field,
				value,
				handleChange
			} ) => (
				<RadioImageField
					field={ field }
					value={ value }
					onChange={ handleChange }
				/>
			) }
		</OriginalRadioImageField>
	);
} );
