import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const useSaveRoadmap = () => {
  return useMutation(saveRoadmap);
};
export const useUpdateRoadmap = () => {
  return useMutation(updateRoadmap);
};
export const useDeleteRoadmap = () => {
  return useMutation(deleteRoadmap, { onSuccess: (d) => {} });
};
export const useGuestRoadmap = () => {
  return useMutation(saveGusetRoadmap);
};

export const useRoadMap = () => {
  let { roadmapId } = useParams();
  return useQuery(roadMapKey.roadMap(roadmapId), fetchRoadmap);
};

const saveRoadmap = ({ nodes, name, rootIdx }) =>
  axios.post(`/api/v1/roadmap`, { nodes, name, rootIdx });
const updateRoadmap = ({ roadMap, idx }) =>
  axios.put(`/api/v1/roadmap/${idx}`, roadMap);
const deleteRoadmap = ({ idx }) => axios.post(`/api/v1/roadmap/${idx}`, {});
const saveGusetRoadmap = ({ roadMap }) =>
  axios.post(`/api/v1/roadmap/guest`, roadMap);

const roadMapKey = {
  roadMap: (idx) => [{ scope: 'roadMap', idx }],
};

const fetchRoadmap = async ({ queryKey: [{ idx }] }) => {
  const response = await axios.get(`/api/v1/roadmap/query/${idx}`);
  return response.data;
};
