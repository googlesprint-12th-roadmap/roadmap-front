const { faker } = require('@faker-js/faker');

/**
 * @type {(type?:import('../types.d').NodeType,id?:number)=>import('../types.d').Node}
 * */
const fakeRoadmapData = (type, id) => {
  const data = {
    id: id ?? Date.now(),
    url: faker.internet.url(),
    desc: faker.lorem.sentence(),
    type:
      type ??
      /**@type {import('../types.d').NodeType} */ (
        faker.helpers.arrayElement(['main', 'sub'])
      ),
    label: faker.name.jobTitle(),
    children: [],
    parent: 0,
  };
  return data;
};

/**
 * @type {(parent?:import('../types.d').Node,...children:import('../types.d').Node[])=>void}
 * */
const setNodeChildren = (parent, ...children) => {
  parent.children = children.map((d) => d.id);
};

/**
 * @type {()=>import('../types.d').Data}
 * */
export const testRoadmapData = () => {
  const rootNode = fakeRoadmapData('main');
  const rootNode_sub1 = fakeRoadmapData('sub');
  const rootNode_sub2 = fakeRoadmapData('sub');
  const main1_1 = fakeRoadmapData('main');
  const main1_2 = fakeRoadmapData('main');
  const main1_3 = fakeRoadmapData('main');
  setNodeChildren(
    rootNode,
    ...[rootNode_sub1, rootNode_sub2, main1_1, main1_1, main1_1],
  );
  const main1_1_sub1 = fakeRoadmapData('sub');
  const main1_1_sub2 = fakeRoadmapData('sub');
  const main1_1_sub3 = fakeRoadmapData('sub');
  setNodeChildren(main1_1, ...[main1_1_sub1, main1_1_sub2, main1_1_sub3]);
  const main1_2_2 = fakeRoadmapData('main');
  setNodeChildren(main1_2, main1_2_2);
  const main1_2_2_sub1 = fakeRoadmapData('sub');
  const main1_2_2_sub2 = fakeRoadmapData('sub');
  const main1_2_2_sub3 = fakeRoadmapData('sub');
  setNodeChildren(main1_2_2, main1_2_2_sub1, main1_2_2_sub2, main1_2_2_sub3);
  const list = /**@type {import('../types.d').Node[]} */ ([rootNode]);
  return {
    rootId: 1,
    list,
  };
};
