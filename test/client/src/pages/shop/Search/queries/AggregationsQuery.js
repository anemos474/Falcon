import { gql } from '@apollo/client';
import { useQuery } from '@deity/falcon-data';

export const SEARCH_AGGREGATIONS = gql`
  query SearchAggregations {
    searchAggregations {
      title
      field
      type
      buckets {
        title
        count
        value
      }
    }
  }
`;

export const useSearchAggregationsQuery = () => useQuery(SEARCH_AGGREGATIONS);
