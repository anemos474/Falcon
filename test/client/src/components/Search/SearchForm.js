import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Redirect, useLocation } from 'react-router-dom';
import { debounce } from 'lodash-es';
import { FlexLayout, Label, Icon } from '@deity/falcon-ui';
import { useSearchContext } from '@deity/falcon-front-kit';
import { useI18n } from '@deity/falcon-i18n';
import { SearchInput } from './SearchInput';

export const SearchForm = ({ placeholder, searchUrl, debounceTime, ...rest }) => {
  const { setTerm, state: searchState } = useSearchContext();
  const debouncedSetTerm = useMemo(() => debounce(term => setTerm(term), debounceTime), [setTerm, debounceTime]);

  const [localValue, setLocalValue] = useState(searchState.term || '');
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const location = useLocation();
  const { t } = useI18n();

  // Search on type is enabled only on the search page
  const searchOnType = location.pathname.startsWith(searchUrl);

  useEffect(() => {
    setLocalValue(searchState.term || '');
  }, [searchState.term]);

  if (shouldRedirect) {
    // Spread location to preserve URL query string (i.e. search term)
    return <Redirect to={{ ...location, pathname: searchUrl }} />;
  }

  return (
    <FlexLayout
      as="form"
      onSubmit={event => {
        // Note that submit only happens explicitly by the user, not on change
        event.preventDefault();
        setTerm(localValue);
        if (!searchOnType) {
          setShouldRedirect(true);
        }
      }}
      alignItems="center"
      position="relative"
      {...rest}
    >
      <Label
        htmlFor="searchForm"
        position="absolute"
        left="9px"
        top="9px"
        zIndex="2"
        aria-label={t('search.placeholder')}
      >
        <Icon src="search" size="md" stroke="primaryLight" />
      </Label>
      <SearchInput
        id="searchForm"
        value={localValue}
        placeholder={placeholder || t('search.placeholder')}
        onChange={event => {
          // Store value in variable so it can be accessed in debounce callback
          const { value } = event.currentTarget;
          setLocalValue(value);
          if (searchOnType) {
            debouncedSetTerm(value);
          }
        }}
      />
    </FlexLayout>
  );
};

SearchForm.propTypes = {
  placeholder: PropTypes.string,
  // URL of search page
  searchUrl: PropTypes.string,
  // debounce time when searching while typing
  debounceTime: PropTypes.number
};
SearchForm.defaultProps = {
  searchUrl: '/search',
  debounceTime: 200
};
