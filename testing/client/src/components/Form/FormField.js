import React from 'react';
import { Field, getDefaultInputValidators } from '@deity/falcon-front-kit';
import { extractThemableProps, Input, Icon } from '@deity/falcon-ui';
import { FormFieldError, FormFieldLayout, FormFieldLabel } from '@deity/falcon-ui-kit';
import { FormFieldHelp } from './FormFieldHelp';

export const FormField = props => {
  const { name, validate, icon, iconSide, help, required, children, ...restProps } = props;
  const { themableProps, rest } = extractThemableProps(restProps);

  return (
    <Field name={name} validate={getDefaultInputValidators(props)} {...rest}>
      {({ form, field, label, error }) => {
        return (
          <FormFieldLayout {...themableProps}>
            {label && (
              <FormFieldLabel htmlFor={field.id}>
                {label}
                {field.invalid && <Icon src="errorCircle" fill="error" size="sm" />}
              </FormFieldLabel>
            )}
            {children ? (
              children({
                form,
                field: { ...field }
              })
            ) : (
              <Input icon={icon} iconSide={iconSide} {...field} />
            )}
            {help && !field.invalid ? <FormFieldHelp>{help}</FormFieldHelp> : null}
            {field.invalid ? <FormFieldError justifySelf="start">{error}</FormFieldError> : null}
          </FormFieldLayout>
        );
      }}
    </Field>
  );
};
