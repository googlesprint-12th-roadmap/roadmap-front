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