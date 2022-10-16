import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const useSaveRoadmap = () => {
  return useMutation(saveRoadmap);
};
export const useUpdateRoadmap = () => {
  const qc = useQueryClient();
  return useMutation(updateRoadmap, {
    onSuccess: (d) => {
      qc.invalidateQueries(roadMapKey.roadMap(d.data.idx));
    },
  });
};
export const useDeleteRoadmap = () => {
  const qc = useQueryClient();
  return useMutation(deleteRoadmap, {
    onSuccess: (d) => {
      qc.invalidateQueries(roadMapKey.roadMap(d.data.idx));
    },
  });
};

export const useGuestRoadmap = () => {
  const qc = useQueryClient();
  return useMutation(saveGusetRoadmap, {
    onSuccess: (d) => {
      qc.invalidateQueries(roadMapKey.roadMap(d.data.idx));
    },
  });
};

export const useRoadMap = () => {
  let { roadmapId } = useParams();
  return useQuery(roadMapKey.roadMap(roadmapId), fetchRoadmap, {
    enabled: !!roadmapId,
    suspense: true,
  });
};

const saveRoadmap = ({ nodes, name, rootIdx }) =>
  axios.post(`/api/v1/roadmap`, { nodes, name, rootIdx });
const updateRoadmap = ({ roadMap, idx }) =>
  axios.put(`/api/v1/roadmap/${idx}`, roadMap);
const deleteRoadmap = ({ idx }) => axios.post(`/api/v1/roadmap/${idx}`, {});
const saveGusetRoadmap = ({ roadMap }) =>
  axios.delete(`/api/v1/roadmap/guest`, roadMap);

const roadMapKey = {
  roadMap: (idx) => [{ scope: 'roadMap', idx }],
};

const fetchRoadmap = async ({ queryKey: [{ idx }] }) => {
  const response = await axios.get(`/api/v1/roadmap/query/${idx}`);
  return response.data;
};
