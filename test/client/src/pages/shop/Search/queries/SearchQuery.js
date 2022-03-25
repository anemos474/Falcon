import { gql } from '@apollo/client';
import { useQuery } from '@deity/falcon-data';

const fetchMore = (data, apolloFetchMore) =>
  apolloFetchMore({
    variables: {
      pagination: {
        page: data.search.pagination.nextPage
      }
    },
    updateQuery: (prev, { fetchMoreResult }) => {
      if (!fetchMoreResult) {
        return prev;
      }

      return {
        ...prev,
        search: {
          ...prev.search,
          items: [...prev.search.items, ...fetchMoreResult.search.items],
          aggregations: [...fetchMoreResult.search.aggregations],
          pagination: { ...fetchMoreResult.search.pagination }
        }
      };
    }
  });

export const SEARCH = gql`
  query Search($term: String!, $sort: SortOrderInput, $filters: [FilterInput!], $pagination: PaginationInput) {
    search(input: { term: $term, sort: $sort, filters: $filters, pagination: $pagination }) {
      items {
        __typename
        ... on Product {
          id
          name
          urlPath
          thumbnail
          price {
            regular
            special
            min
          }
        }
      }
      aggregations {
        field
        type
        buckets {
          title
          count
          value
        }
      }
      pagination {
        totalPages
        totalItems
        perPage
        currentPage
        nextPage
        prevPage
      }
    }
  }
`;

export const useSearchQuery = options =>
  useQuery(SEARCH, {
    fetchMore,
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    ...options
  });
