import { atom } from 'recoil';

export const nodeListState = atom({
  key: 'nodeListState',
  default: [],
});

export const depthState = atom({
  key: 'depthState',
  default: [],
});

export const emptyNodeCheckState = atom({
  key: 'emptyNodeCheckState',
  default: true,
});

export const lastSelectIdState = atom({
  key: 'lastSelectIdState',
  default: -1,
});

export const currentSelectViewState = atom({
  key: 'currentSelectViewState',
  default: 0,
});

export const currentSelectedIdState = atom({
  key: 'currentSelectedIdState',
  default: -1,
});
