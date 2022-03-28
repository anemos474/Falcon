import { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { debounce } from 'lodash-es';
import { usePrevious } from '../../utils/hooks/usePrevious';

export const OnChangeFormSubmit = ({ debounceTime }) => {
  const { values, isSubmitting, submitForm } = useFormikContext();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSubmit = useCallback(debounce(submitForm, debounceTime), [debounceTime, submitForm]);

  const prevValues = usePrevious(values);
  const hasChanged = prevValues !== undefined && values !== prevValues;

  useEffect(() => {
    if (!isSubmitting && hasChanged) {
      debouncedSubmit();
    }
  }, [debouncedSubmit, isSubmitting, hasChanged]);

  return null;
};

OnChangeFormSubmit.propTypes = {
  // time to wait before submitting
  debounceTime: PropTypes.number
};
OnChangeFormSubmit.defaultProps = {
  debounceTime: 750
};
