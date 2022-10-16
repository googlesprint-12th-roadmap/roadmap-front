import { atom } from 'recoil';

export const nodeListState = atom({
  key: 'nodeListState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export const depthState = atom({
  key: 'depthState', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
