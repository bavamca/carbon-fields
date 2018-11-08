/**
 * External dependencies.
 */
import cx from 'classnames';
import {
	cloneDeep,
	without
} from 'lodash';

/**
 * WordPress dependencies.
 */
import { Component } from '@wordpress/element';
import { BaseControl, Icon, IconButton, TextControl } from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';

/**
 * Internal dependencies.
 */
import './style.scss';

class AssociationField extends Component {
	/**
	 * Handles the change of the field.
	 *
	 * @param  {Array} value
	 * @return {void}
	 */
	handleChange = ( value ) => {
		const { field } = this.props;

		this.props.onChange(
			field.base_name,
			value
		);
	}

	/**
	 * Handles addition of a new item.
	 *
	 * @param  {Array} option
	 * @return {void}
	 */
	handleAddItem = ( option ) => {
		const { field, value } = this.props;

		// Don't do anything if the duplicates aren't allowed and
		// the item is already selected.
		if ( ! field.duplicates_allowed && option.disabled ) {
			return;
		}

		// Don't do anything, because the maximum is reached.
		if ( field.max > 0 && value.length >= field.max ) {
			// alert( carbonFieldsL10n.field.maxNumItemsReached.replace( '%s', field.max ) );
			return;
		}

		this.handleChange( [
			...value,
			cloneDeep( option )
		] );
	}

	/**
	 * Handles addition of a new item.
	 *
	 * @param  {Array} option
	 * @return {void}
	 */
	handleRemoveItem = ( option ) => {
		const { value } = this.props;

		this.handleChange( without( value, option ) );
	}

	/**
	 * Renders the component.
	 *
	 * @return {Object}
	 */
	render() {
		const {
			field,
			options,
			totalOptionsCount,
			value,
			onQueryTermChange
		} = this.props;

		return (
			<BaseControl
				className="cf-field-association-wrapper"
				label={ field.label }
			>
				<strong className="cf-field-association__counter">
					showing { options.length } of { totalOptionsCount } results
				</strong>

				<div className="cf-field-association">
					<div className="cf-field-association__body">
						<div className="cf-field-association__search-bar">
							<TextControl
								value={ field.queryTerm }
								onChange={ onQueryTermChange }
								placeholder={ carbonFieldsL10n.field.searchPlaceholder }
							/>
						</div>

						<div className="cf-field-association__col cf-field-association__col--source">
							{
								options.map( ( option, index ) => {
									return (
										<div className={ cx( 'cf-field-association__option', { 'cf-field-association__option--selected': option.disabled } ) } key={ index }>
											<img className="cf-field-association__option-thumbnail" src={ option.thumbnail ? option.thumbnail : '' } />

											<div className="cf-field-association__option-content">
												<span className="cf-field-association__option-title">
													{ option.title }
												</span>

												<span className="cf-field-association__option-type">
													{ option.type }
												</span>
											</div>

											<div className="cf-field-association__option-actions">
												<IconButton
													icon="edit"
													label="Edit"
													href={ option.edit_link }
													target="_blank"
												/>

												<IconButton
													icon="plus-alt"
													label="Add"
													onClick={ () => this.handleAddItem( option ) }
												/>
											</div>
										</div>
									);
								} )
							}
						</div>

						<div className="cf-field-association__col cf-field-association__col--selected">
							{
								value.map( ( option, index ) => {
									return (
										<div className="cf-field-association__option" key={ index }>
											<div className="cf-field-association__option-sort">
												<Icon
													icon="menu"
												/>
											</div>

											<img className="cf-field-association__option-thumbnail" src={ option.thumbnail ? option.thumbnail : '' } />

											<div className="cf-field-association__option-content">
												<span className="cf-field-association__option-title">
													{ option.title }
												</span>

												<span className="cf-field-association__option-type">
													{ option.type }
												</span>
											</div>

											<div className="cf-field-association__option-actions">
												<IconButton
													icon="editor-removeformatting"
													label="Remove"
													onClick={ () => this.handleRemoveItem( option ) }
												/>
											</div>
										</div>
									);
								} )
							}
						</div>
					</div>
				</div>
			</BaseControl>
		);
	}
}

addFilter( 'carbon-fields.association-field.block', 'carbon-fields/blocks', ( OriginalAssociationField ) => ( props ) => {
	return (
		<OriginalAssociationField { ...props }>
			{ ( {
				field,
				value,
				options,
				totalOptionsCount,
				handleChange,
				handleQueryTermChange
			} ) => (
				<AssociationField
					field={ field }
					value={ value }
					options={ options }
					totalOptionsCount={ totalOptionsCount }
					onChange={ handleChange }
					onQueryTermChange={ handleQueryTermChange }
				/>
			) }
		</OriginalAssociationField>
	);
} );
