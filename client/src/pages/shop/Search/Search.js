import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { getFiltersData } from '@deity/falcon-front-kit';
import { useI18n } from '@deity/falcon-i18n';
import { Loader, OperationError } from '@deity/falcon-ui-kit';
import { Box, H1, FlexLayout } from '@deity/falcon-ui';
import { SearchContext } from '@deity/falcon-front-kit/dist/Search/SearchContext';
import { ProductListing } from '../components/ProductListing';
import { SearchForm } from '../../../components/Search/SearchForm';
import { useSearchAggregationsQuery } from './queries/AggregationsQuery';
import { useSearchQuery } from './queries/SearchQuery';

const filterDisabledAggregations = (rootAggregations, resultAggregations) => {
  return resultAggregations.map(aggregation => {
    return {
      ...aggregation,
      // reusing translated root aggregations
      title: rootAggregations.find(rootAggregation => rootAggregation.field === aggregation.field).title
    };
  });
};

const Search = ({ rootAggregations = [] }) => {
  const { state } = useContext(SearchContext);
  // if incorrect value of pagination is passed (e.g. NaN) then set it to undefined
  // so backend deals correctly with search query
  if (state.pagination && !state.pagination.perPage) {
    state.pagination.perPage = undefined;
  }
  const { loading, data, error, fetchMore, networkStatus } = useSearchQuery({
    passLoading: true,
    skip: !state.term,
    variables: {
      term: state.term,
      filters: state.filters,
      sort: state.sort,
      pagination: state.pagination
    }
  });

  if (error) {
    return <OperationError {...error} />;
  }

  if (loading && !data) {
    return <Loader />;
  }

  const { search: { aggregations = [], items = [], pagination } = {} } = data;

  return (
    <>
      <ProductListing
        items={items}
        pagination={pagination}
        loading={loading}
        filtersData={getFiltersData(
          state.filters,
          state.term ? filterDisabledAggregations(rootAggregations, aggregations) : rootAggregations
        )}
        networkStatus={networkStatus}
        fetchMore={fetchMore}
      />
    </>
  );
};

const SearchWrapper = () => {
  const { t } = useI18n();
  const { state } = useContext(SearchContext);

  const { data, error, loading } = useSearchAggregationsQuery();

  if (!state.term) {
    return null;
  }

  if (error) {
    return <OperationError {...error} />;
  }

  if (loading) {
    return <Loader />;
  }

  const { searchAggregations } = data;

  const translatedAggregations = searchAggregations.map(aggregation => ({
    ...aggregation,
    title: t([
      `filters.filterOptions.${aggregation.title.replace('filterOptions.', '').replace(/\./g, '_')}`,
      aggregation.title
    ])
  }));

  return <Search rootAggregations={translatedAggregations} />;
};

export default () => {
  const { t } = useI18n();
  const { state } = useContext(SearchContext);
  const { term = null } = state;
  const title = term ? t('search.titleWithTerm', { term }) : t('search.titleWithoutTerm');
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <FlexLayout as="header" alignItems="center" flexDirection="column" my="md">
        <H1 mb="sm" fontSize={{ xs: 'lg', sm: 'xxl' }}>
          {title}
        </H1>
        <SearchForm />
      </FlexLayout>
      <Box as="section" mb="xxl">
        <SearchWrapper />
      </Box>
    </>
  );
};
