import React, { useMemo } from 'react';
import { GridLayout, Box, Label, Radio, Text, FlexLayout, Checkbox, Input, Textarea, themed } from '@deity/falcon-ui';
import { FormFieldError, ProductOptionRadio, ColorTile, SelectInput, RadioInput, Image } from '@deity/falcon-ui-kit';
import {
  Field,
  requiredValidator,
  lengthValidator,
  numLinesValidator,
  dateRangeValidator,
  useLocale,
  rangeValidator,
  numberValidator,
  integerValidator,
  isCheckedValidator
} from '@deity/falcon-front-kit';
import { useI18n } from '@deity/falcon-i18n';
import { NumberStepInput } from './NumberStepInput';

export const ProductOptionFieldLayout = themed({
  tag: FlexLayout,
  defaultTheme: {
    productOptionLayout: {
      mb: 'sm',
      position: 'relative',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      alignItems: 'flex-start'
    }
  }
});

export const ProductOptionFieldLabel = themed({
  tag: 'legend',
  defaultTheme: {
    productOptionFieldLabel: {
      mb: 'xs',
      color: 'secondaryText',
      letterSpacing: 'caps',
      css: {
        fontSize: 10,
        textTransform: 'uppercase',
        fontFeatureSettings: "'cpsp' on, 'case' on",
        cursor: 'text'
      }
    }
  }
});

export const ProductOptionLayout = ({ fieldId, label, error, children }) => (
  <ProductOptionFieldLayout>
    {label && (
      <ProductOptionFieldLabel as={Label} htmlFor={fieldId}>
        {label}
      </ProductOptionFieldLabel>
    )}
    {children}
    <FormFieldError>{error || null}</FormFieldError>
  </ProductOptionFieldLayout>
);

export const ProductOptionList = ({ items, name, disabled, gridArea, ...restProps }) => {
  return (
    <GridLayout gridGap="sm" gridArea={gridArea} {...restProps}>
      {items.map(({ __typename, id, defaultValue, ...itemRest }) => {
        if (__typename === 'ProductCheckboxOption') {
          return <ProductCheckboxOptionField key={id} name={`${name}.${id}`} {...itemRest} />;
        }
        if (__typename === 'ProductRadioOption') {
          return <ProductRadioOptionField key={id} name={`${name}.${id}`} {...itemRest} />;
        }
        if (__typename === 'ProductRectangleOption') {
          return <ProductRectangleOptionField key={id} name={`${name}.${id}`} {...itemRest} />;
        }
        if (__typename === 'ProductDropdownOption') {
          return <ProductDropdownOptionField key={id} name={`${name}.${id}`} {...itemRest} />;
        }
        if (__typename === 'ProductSwatchOption') {
          return <ProductSwatchOptionField key={id} name={`${name}.${id}`} {...itemRest} />;
        }
        if (__typename === 'ProductTextOption') {
          return <ProductTextOptionField key={id} name={`${name}.${id}`} {...itemRest} />;
        }
        if (__typename === 'ProductTextAreaOption') {
          return <ProductTextAreaOptionField key={id} name={`${name}.${id}`} {...itemRest} />;
        }
        if (__typename === 'ProductNumberOption') {
          const { minValue, maxValue, isRange, ...rest } = itemRest;
          return <ProductNumberOptionField key={id} name={`${name}.${id}`} min={minValue} max={maxValue} {...rest} />;
        }
        if (__typename === 'ProductPickListOption') {
          return <ProductPickListOptionField key={id} name={`${name}.${id}`} {...itemRest} />;
        }
        if (__typename === 'ProductDateOption') {
          return <ProductDateOptionField key={id} name={`${name}.${id}`} {...itemRest} />;
        }

        return <Box key={id}>{`${__typename} is not supported yet!`}</Box>;
      })}
    </GridLayout>
  );
};
ProductOptionList.defaultProps = {
  items: []
};

export const ProductTextOptionField = ({ label, name, required, minLength, maxLength, disabled }) => {
  const validators = useMemo(
    () =>
      [
        required && requiredValidator,
        (minLength !== undefined || maxLength !== undefined) && lengthValidator(minLength || 0, maxLength)
      ].filter(x => x),
    [required, minLength, maxLength]
  );

  return (
    <Field fast name={name} label={label} validate={validators}>
      {({ field, error, form: { isSubmitting } }) => (
        <ProductOptionLayout fieldId={field.id} label={label} error={field.invalid ? error : null}>
          <Input {...field} disabled={disabled || isSubmitting} />
        </ProductOptionLayout>
      )}
    </Field>
  );
};

export const ProductTextAreaOptionField = ({ label, name, required, minLength, maxLength, maxLines, disabled }) => {
  const validators = useMemo(() => {
    const conditionalValidators = [
      { condition: required, validator: requiredValidator },
      {
        condition: (minLength !== null && minLength !== undefined) || (maxLength !== null && maxLength !== undefined),
        validator: lengthValidator(minLength || 0, maxLength)
      },
      {
        condition: maxLines !== null && maxLines !== undefined,
        validator: numLinesValidator(0, maxLines)
      }
    ];

    return conditionalValidators.filter(pair => pair.condition).map(pair => pair.validator);
  }, [required, minLength, maxLength, maxLines]);

  return (
    <Field fast name={name} label={label} validate={validators}>
      {({ field, error, form: { isSubmitting } }) => (
        <ProductOptionLayout fieldId={field.id} label={label} error={field.invalid ? error : null}>
          <Textarea {...field} rows={maxLines || 2} disabled={disabled || isSubmitting} css={{ minHeight: 38 }} />
        </ProductOptionLayout>
      )}
    </Field>
  );
};

export const ProductNumberOptionField = props => {
  const {
    label,
    name,
    required,
    disabled,
    integersOnly,
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    ...rest
  } = props;

  const validators = useMemo(
    () =>
      [
        required && requiredValidator,
        numberValidator,
        integersOnly && integerValidator,
        rangeValidator(min, max)
      ].filter(x => x),
    [required, min, max, integersOnly]
  );

  return (
    <Field fast name={name} label={label} validate={validators} min={min} max={max} {...rest}>
      {({ field, error, form: { isSubmitting, setFieldValue } }) => (
        <ProductOptionLayout fieldId={field.id} label={label} error={field.invalid ? error : null}>
          {integersOnly ? (
            <NumberStepInput
              {...field}
              disabled={disabled || isSubmitting}
              aria-label={label}
              onChange={value => setFieldValue(field.name, value)}
            />
          ) : (
            <Input {...field} type="number" step="any" disabled={disabled || isSubmitting} />
          )}
        </ProductOptionLayout>
      )}
    </Field>
  );
};

export const ProductCheckboxOptionField = ({ label, checkboxLabel, name, values, disabled, required }) => {
  const booleanToValueId = (options, checked) => {
    const selectedOption = options.find(x => (checked ? x.checkboxValue : !x.checkboxValue));
    if (selectedOption) {
      return selectedOption.id;
    }
    const defaultOption = options.find(x => x.isDefault);
    return defaultOption.id;
  };

  const valueIdToBoolean = (options, valueId) => {
    const selectedOption = options.find(x => `${x.id}` === `${valueId}`);
    if (selectedOption) {
      return selectedOption.checkboxValue;
    }
    const defaultOption = options.find(x => x.isDefault);

    return defaultOption?.checkboxValue;
  };

  const validators = useMemo(() => [required && isCheckedValidator(booleanToValueId(values, true))].filter(x => x), [
    required,
    values
  ]);

  return (
    <Field fast name={name} label={label} validate={validators}>
      {({ field, error, form: { setFieldValue, isSubmitting } }) => (
        <ProductOptionLayout fieldId={field.id} label={label} error={field.invalid ? error : null}>
          <FlexLayout alignItems="center" justifyContent={{ xs: 'center', sm: 'flex-start' }}>
            <Checkbox
              {...field}
              disabled={disabled || isSubmitting}
              checked={valueIdToBoolean(values, field.value)}
              size="lg"
              onChange={e => setFieldValue(field.name, booleanToValueId(values, e.target.checked))}
            />
            <Label htmlFor={field.id} ml="xs">
              {checkboxLabel}
            </Label>
          </FlexLayout>
        </ProductOptionLayout>
      )}
    </Field>
  );
};

export const ProductRadioOptionField = ({ label, name, values, required, disabled }) => {
  const validators = useMemo(() => [required && requiredValidator].filter(x => x), [required]);

  return (
    <Field fast name={name} label={label} validate={validators}>
      {({ field, error, form: { isSubmitting } }) => (
        <ProductOptionLayout fieldId={field.id} label={label} error={field.invalid ? error : null}>
          <GridLayout gridAutoRows="auto" gridAutoColumns="auto" gridAutoFlow="column" gridGap="sm">
            {values.map(value => (
              <RadioInput
                key={value.id}
                {...field}
                label={value.label}
                id={`${field.id}-${value.id}`}
                value={value.id}
                checked={`${value.id}` === `${field.value}`}
                disabled={disabled || isSubmitting}
                size="lg"
              />
            ))}
          </GridLayout>
        </ProductOptionLayout>
      )}
    </Field>
  );
};

export const ProductRectangleOptionField = ({ label, name, values, required, disabled }) => {
  const validators = useMemo(() => [required && requiredValidator].filter(x => x), [required]);

  return (
    <Field fast name={name} label={label} validate={validators}>
      {({ field, error, form: { isSubmitting } }) => (
        <ProductOptionLayout fieldId={field.id} label={label} error={field.invalid ? error : null}>
          <Box>
            {values.map(value => {
              const inputId = `${field.id}-${value.id}`;

              return (
                <Label key={value.id} htmlFor={inputId} mr="xxs" mb="xxs" css={{ display: 'inline-flex' }}>
                  <ProductOptionRadio
                    {...field}
                    id={inputId}
                    value={value.id}
                    checked={`${value.id}` === `${field.value}`}
                    disabled={disabled || isSubmitting}
                    icon={<div>{value.label}</div>}
                  />
                </Label>
              );
            })}
          </Box>
        </ProductOptionLayout>
      )}
    </Field>
  );
};

export const ProductDropdownOptionField = ({ label, name, values, required, disabled }) => {
  const validators = useMemo(() => [required && requiredValidator].filter(x => x), [required]);
  const { t } = useI18n();

  const pickerOptions = useMemo(() => {
    const options = values.map(value => ({
      value: value.id,
      label: value.label
    }));

    const placeholderOption = {
      value: 'placeholder',
      label: t('ui.selectDefault')
    };

    return [placeholderOption, ...options];
  }, [t, values]);

  return (
    <Field fast name={name} label={label} validate={validators}>
      {({ field, error, form: { isSubmitting } }) => (
        <ProductOptionLayout fieldId={field.id} label={label} error={field.invalid ? error : null}>
          <SelectInput {...field} options={pickerOptions} disabled={disabled || isSubmitting} />
          <FormFieldError>{field.invalid ? error : null}</FormFieldError>
        </ProductOptionLayout>
      )}
    </Field>
  );
};

export const ProductSwatchOptionField = ({ label, name, values, required, disabled }) => {
  const validators = useMemo(() => [required && requiredValidator].filter(x => x), [required]);

  return (
    <Field fast name={name} label={label} validate={validators}>
      {({ field, error, form: { isSubmitting } }) => (
        <ProductOptionLayout fieldId={field.id} label={label} error={field.invalid ? error : null}>
          <FlexLayout>
            {values.map(value => {
              const inputId = `${field.id}-${value.id}`;
              return (
                <Label key={value.id} htmlFor={inputId} mr="xxs" mb="xxs" style={{ display: 'inline-flex' }}>
                  <ProductOptionRadio
                    {...field}
                    id={inputId}
                    value={value.id}
                    checked={`${value.id}` === `${field.value}`}
                    disabled={disabled || isSubmitting}
                    icon={
                      value.type === 'hex' ? (
                        <>
                          {value.swatchValues.map(x => (
                            <ColorTile key={x} color={x} />
                          ))}
                        </>
                      ) : (
                        <Box as="span" size="md">
                          {value.swatchValues.map(x => (
                            <Image key={value.label} src={x} alt={value.label} loading="lazy" borderRadius="small" />
                          ))}
                        </Box>
                      )
                    }
                    title={value.label}
                    variant="swatch"
                  />
                </Label>
              );
            })}
          </FlexLayout>
        </ProductOptionLayout>
      )}
    </Field>
  );
};

export const ProductPickListOptionField = ({ label, name, values, required, disabled }) => {
  const validators = useMemo(() => [required && requiredValidator].filter(x => x), [required]);
  const { t } = useI18n();

  // Don't show out of stock products
  values = values.filter(x => x.product && x.product.stock.isInStock);

  if (!values.length) {
    if (required) {
      return (
        <ProductOptionFieldLayout>
          {label && <ProductOptionFieldLabel>{label}</ProductOptionFieldLabel>}
          <FormFieldError>{t('product.pickList.noProducts')}</FormFieldError>
        </ProductOptionFieldLayout>
      );
    }
    return null;
  }

  return (
    <Field fast name={name} label={label} validate={validators}>
      {({ field, error }) => (
        <ProductOptionLayout fieldId={field.id} label={label} error={field.invalid ? error : null}>
          {values.map(value => {
            const inputId = `${field.id}-${value.id}`;
            const { product } = value;

            return (
              <Label
                htmlFor={inputId}
                key={product.id}
                mr="sm"
                mb="sm"
                style={{ display: 'inline-flex', alignItems: 'center' }}
              >
                <Radio
                  {...field}
                  id={inputId}
                  value={value.id}
                  checked={`${value.id}` === `${field.value}`}
                  disabled={disabled}
                  size="lg"
                />
                <Box ml="sm" css={{ width: 80, height: 80 }}>
                  <Image
                    src={product.thumbnail}
                    alt={product.name}
                    borderRadius="lg"
                    loading="lazy"
                    css={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </Box>
                <Box ml="sm">
                  <Text as="span" color="primaryText" fontWeight="bold">
                    {product.name}
                  </Text>
                  <Text as="span" variant="caps" color="secondaryText" fontSize="xxs" fontWeight="bold">
                    {`SKU: ${product.sku}`}
                  </Text>
                </Box>
              </Label>
            );
          })}
        </ProductOptionLayout>
      )}
    </Field>
  );
};

export const ProductDateOptionField = ({ name, label, required, disabled, minDate, maxDate }) => {
  const { dateTimeFormat } = useLocale();

  const validators = useMemo(
    () =>
      [
        required && requiredValidator,
        (minDate !== undefined || maxDate !== undefined) && dateRangeValidator(minDate, maxDate, dateTimeFormat)
      ].filter(x => x),
    [required, minDate, maxDate, dateTimeFormat]
  );

  const getISODate = date => date?.split('T')[0];

  return (
    <Field fast name={name} label={label} validate={validators}>
      {({ field, error, form: { isSubmitting } }) => (
        <ProductOptionLayout fieldId={field.id} label={label} error={field.invalid ? error : null}>
          <Input
            {...field}
            type="date"
            min={getISODate(minDate)}
            max={getISODate(maxDate)}
            disabled={disabled || isSubmitting}
            value={getISODate(field.value)}
            css={{
              cursor: 'text',
              resize: 'none'
            }}
          />
        </ProductOptionLayout>
      )}
    </Field>
  );
};
