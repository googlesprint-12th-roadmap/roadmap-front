import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useSaveRoadmap = () => {
  return useMutation(saveRoadmap);
};
export const useUpdateRoadmap = () => {
  return useMutation(updateRoadmap);
};
export const useDeleteRoadmap = () => {
  return useMutation(deleteRoadmap);
};
export const useGuestRoadmap = () => {
  return useMutation(saveGusetRoadmap);
};

const saveRoadmap = (roadMap) => axios.post(`/api/v1/roadmap`, roadMap);
const updateRoadmap = (roadMap) => axios.put(`/api/v1/roadmap`, roadMap);
const deleteRoadmap = () => axios.post(`/api/v1/roadmap`, {});
const saveGusetRoadmap = (roadMap) =>
  axios.post(`/api/v1/roadmap/guest`, roadMap);
