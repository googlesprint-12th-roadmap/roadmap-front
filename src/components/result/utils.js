export const createTree = (nodes) => {
  nodes.map((node) => {
    node.parent &&
      (node.parent = nodes.find((node) => node.id === node.parent));
    node.children.length > 0 &&
      (node.children = node.children.map((childId) =>
        nodes.find((node) => node.id === childId),
      ));
  });
  return nodes.find((node) => node.parent === null);
};
