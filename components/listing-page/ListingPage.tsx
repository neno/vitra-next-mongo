import React from 'react';
import useSWR from 'swr';

export const ListingPage = () => {
  const { data } = useSWR('/api/objects');
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};
