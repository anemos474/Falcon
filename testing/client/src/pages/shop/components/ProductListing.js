import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NetworkStatus } from '@apollo/client';
import { T, useI18n } from '@deity/falcon-i18n';
import { H1, Text, Box, FlexLayout, Divider, Icon, Button } from '@deity/falcon-ui';
import { SortOrderPickerProvider } from '@deity/falcon-front-kit';
import {
  Loader,
  CategoryLayout,
  CategoryArea,
  Sidebar,
  SidebarLayout,
  SortOrderPicker,
  ProductList
} from '@deity/falcon-ui-kit';
import { Filters } from '../Category/Filters';
import { ShowingOutOf, ShowMore } from '../Category/components';

const getActiveFilters = filtersData => filtersData.filter(filterData => filterData.value.length > 0);

/**
 * @internal
 * This component abstracts the display of products, their filters and their sorting.
 * It can be used on category pages or on other pages where you want to
 * allow filtering of products in a list, such as a search results page.
 */
export const ProductListing = ({
  filtersData = [],
  items,
  pagination,
  loading,
  name,
  heading,
  fetchMore,
  networkStatus
}) => {
  const [areFiltersOpen, setFiltersOpen] = useState(false);
  const { t } = useI18n();

  const activeFilterCount = getActiveFilters(filtersData).length;

  return (
    <CategoryLayout variant={!filtersData.length && 'noFilters'}>
      {loading && <Loader variant="overlay" />}
      <Box gridArea={CategoryArea.heading}>
        {name && (
          <Text
            fontSize="xs"
            fontWeight="bold"
            color="secondaryText"
            letterSpacing="caps"
            css={{ textTransform: 'uppercase' }}
          >
            {name}
          </Text>
        )}
        {heading && (
          <>
            <H1 variant="title" mb="md">
              {heading}
            </H1>
          </>
        )}

        <Divider mb="sm" />

        <FlexLayout mb="md" flexWrap="wrap" justifyContent="space-between" alignItems="center">
          <ShowingOutOf
            color="secondaryText"
            fontSize="sm"
            itemsCount={items.length}
            totalItems={pagination.totalItems}
          />
          <FlexLayout>
            <SortOrderPickerProvider>
              {sortOrderPickerProps => (
                <SortOrderPicker mr="md" labelText={t('sorting.sorting')} variant="minimal" {...sortOrderPickerProps} />
              )}
            </SortOrderPickerProvider>
            {!!filtersData.length && (
              <Box gridArea={CategoryArea.filters} display="flex" alignItems="center">
                <Button
                  type="button"
                  onClick={() => setFiltersOpen(prev => !prev)}
                  variant="transparent"
                  height="lg"
                  px="xxs"
                  fontSize="sm"
                  fontWeight="normal"
                >
                  <T id="productListing.activeFilters" count={activeFilterCount} />
                  <Icon src="filter" size="md" ml="xs" />
                </Button>
                <Sidebar isOpen={areFiltersOpen} side="right" close={() => setFiltersOpen(false)}>
                  <SidebarLayout title="Filters" onClose={() => setFiltersOpen(false)}>
                    <Filters data={filtersData} activeFilterCount={activeFilterCount} />
                  </SidebarLayout>
                </Sidebar>
              </Box>
            )}
          </FlexLayout>
        </FlexLayout>
      </Box>
      <Box gridArea={CategoryArea.content}>
        <ProductList items={items} />
      </Box>
      <FlexLayout gridArea={CategoryArea.footer} flexDirection="column" alignItems="center">
        {pagination.nextPage && <Divider />}
        {pagination.nextPage && <ShowMore onClick={fetchMore} loading={networkStatus === NetworkStatus.fetchMore} />}
      </FlexLayout>
    </CategoryLayout>
  );
};

ProductListing.propTypes = {
  filtersData: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string,
      title: PropTypes.string,
      type: PropTypes.string,
      options: PropTypes.array,
      value: PropTypes.array
    })
  ),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.shape({
        regular: PropTypes.number.isRequired,
        special: PropTypes.number
      }),
      thumbnail: PropTypes.string,
      urlPath: PropTypes.string.isRequired
    })
  ),
  pagination: PropTypes.shape({
    currentPage: PropTypes.number.isRequired,
    totalItems: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    prevPage: PropTypes.number,
    nextPage: PropTypes.number
  }),
  loading: PropTypes.bool,
  name: PropTypes.string,
  heading: PropTypes.string,
  loadMore: PropTypes.func,
  networkStatus: PropTypes.number
};
