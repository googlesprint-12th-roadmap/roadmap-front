export const createTree = (nodes, parentIdx) => {
  const _nodes = JSON.parse(JSON.stringify(nodes));
  console.log('_nodes:', _nodes);
  _nodes.forEach((node) => {
    node.idx !== parentIdx &&
      node.parent &&
      (node.parent = nodes.find((node) => node.idx === node.parent));
    node.children.length > 0 &&
      (node.children = node.children.map((childId) =>
        _nodes.find((node) => node.idx === childId),
      ));
  });
  console.log(
    'created tree:',
    _nodes,
    'parentidx: ',
    parentIdx,
    'found:',
    _nodes.find((node) => node.idx === parentIdx),
  );
  return _nodes.find((node) => node.idx === parentIdx);
};

export const initializeNodeRefs = (nodes) =>
  nodes.reduce(
    (prev, curr) => ({
      ...prev,
      [curr.idx]: {
        ref: null,
        offsetTop: 0,
        offsetLeft: 0,
      },
    }),
    {},
  );

export const getRenderedPositions = (tree, renderedNodes) =>
  tree &&
  renderedNodes &&
  Object.keys(renderedNodes).forEach((id) => {
    const node = renderedNodes[id];
    if (node.ref) {
      node.offsetTop = node.ref.offsetTop;
      node.offsetLeft = node.ref.offsetLeft;
      node.midpointTop = {
        x: node.ref.offsetLeft + node.ref.clientWidth / 2,
        y: node.ref.offsetTop,
      };
      node.midpointBottom = {
        x: node.ref.offsetLeft + node.ref.clientWidth / 2,
        y: node.ref.offsetTop + node.ref.clientHeight,
      };
      node.midpointLeft = {
        x: node.ref.offsetLeft,
        y: node.ref.offsetTop + node.ref.clientHeight / 2,
      };
      node.midpointRight = {
        x: node.ref.offsetLeft + node.ref.clientWidth,
        y: node.ref.offsetTop + node.ref.clientHeight / 2,
      };
    }
  });
