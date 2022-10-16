import React from 'react';
import RoadmapContainer from './RoadmapContainer';
const RoadmapContainerContext = React.createContext(undefined);

export const useRoadmapContainerContext = () => {
  const context = React.useContext(RoadmapContainerContext);
  console.log(context);
  if (!context) {
    throw new Error('useRoadmap must be used within RoadMapContext');
  }
  return context;
};

const RoadMapContainerContextProvider = ({ children }) => {
  const value = { RoadmapContainer };
  return (
    <RoadmapContainerContext.Provider value={value}>
      {children}
    </RoadmapContainerContext.Provider>
  );
};

export default RoadMapContainerContextProvider;
