export const createTree = (nodes, parentIdx) => {
  const _nodes = [...nodes];
  _nodes.forEach((node) => {
    node.parent &&
      (node.parent = nodes.find((node) => node.idx === node.parent));
    node.children.length > 0 &&
      (node.children = node.children.map((childId) =>
        nodes.find((node) => node.idx === childId),
      ));
  });
  console.log(
    'created tree:',
    nodes,
    'parentidx: ',
    parentIdx,
    'found:',
    _nodes.find((node) => node.idx === parentIdx),
  );
  return nodes.find((node) => node.idx === parentIdx);
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
  });
