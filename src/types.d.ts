export type NodeType = 'main' | 'sub';
export interface Node {
  id: number;
  url: string;
  desc: string;
  type: NodeType;
  label: string;
  children: number[]; // Id[]
  parent: number; // Id[]
}

export interface Data {
  rootId: number;
  list: Node[];
}

interface renderedNodes {
  [id: number]: {
    ref: null;
    offsetTop: 0;
    offsetLeft: 0;
    offsetTop: number;
    middlePointTop: number;
    offsetLeft: number;
    middlePointLeft: number;
    midpointTop: { x: number; y: number };
    midpointBottom: { x: number; y: number };
    midpointLeft: { x: number; y: number };
    midpointRight: { x: number; y: number };
  };
}
