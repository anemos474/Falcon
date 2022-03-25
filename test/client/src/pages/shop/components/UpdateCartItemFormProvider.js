import React from 'react';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import { useGetUserError } from '@deity/falcon-data';
import { UPDATE_CART_ITEM } from '@deity/falcon-shop-data';
import { useMounted } from '@deity/falcon-front-kit';

export const useUpdateCartItemMutation = (options = {}) =>
  useMutation(UPDATE_CART_ITEM, {
    refetchQueries: ['MiniCart', 'Cart'],
    awaitRefetchQueries: true,
    ...options
  });

export const UpdateCartItemFormProvider = props => {
  const { onSuccess, item, initialValues, mutationOptions, ...formikProps } = props;
  const defaultInitialValues = {
    sku: item.sku,
    id: item.id,
    qty: item.qty
  };

  const [updateCartItem] = useUpdateCartItemMutation();
  const getUserError = useGetUserError();
  const isMounted = useMounted();

  return (
    <Formik
      initialStatus={{}}
      initialValues={initialValues || defaultInitialValues}
      onSubmit={(values, { setSubmitting, setStatus }) =>
        updateCartItem({ variables: { input: values }, ...(mutationOptions || {}) })
          .then(({ data }) => {
            if (isMounted.current) {
              setSubmitting(false);
              setStatus({ data });
              return onSuccess && onSuccess(data);
            }
          })
          .catch(e => {
            const error = getUserError(e);
            if (error.length && isMounted.current) {
              setStatus({ error });
              setSubmitting(false);
            }
          })
      }
      {...formikProps}
    />
  );
};
