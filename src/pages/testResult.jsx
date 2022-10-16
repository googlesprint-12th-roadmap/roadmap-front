import React from 'react';
import { useRoadMap } from '../hooks/useRoadmap';

export const TestResult = () => {
  const data = useRoadMap();

  return <>{JSON.stringify(data?.data)}</>;
};
