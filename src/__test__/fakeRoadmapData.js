import { faker } from '@faker-js/faker';
let id = Date.now();
/**
 * @type {(type?:import('../types.d').NodeType,id?:number)=>import('../types.d').Node}
 * */
export const fakeRoadmapData = (type) => {
  const data = {
    idx: ++id,
    url: faker.internet.url(),
    desc: faker.lorem.sentence(),
    title: faker.lorem.slug(),
    type:
      type ??
      /**@type {import('../types.d').NodeType} */ (
        faker.helpers.arrayElement(['MAIN', 'SUB'])
      ),
    children: [],
    parent: 0,
  };
  return data;
};

/**
 * @type {(parent?:import('../types.d').Node,...children:import('../types.d').Node[])=>void}
 * */
const setNodeChildren = (parent, ...children) => {
  parent.children = children.map((d) => d.idx);
  children.forEach((c) => (c.parent = parent.idx));
};

/**
 * @type {()=>import('../types.d').Data}
 * */
export const testRoadmapData = () => {
  const rootNode = fakeRoadmapData('MAIN');
  const rootNode_sub1 = fakeRoadmapData('SUB');
  const rootNode_sub2 = fakeRoadmapData('SUB');
  const main1_1 = fakeRoadmapData('MAIN');
  const main1_2 = fakeRoadmapData('MAIN');
  const main1_3 = fakeRoadmapData('MAIN');
  setNodeChildren(
    rootNode,
    ...[rootNode_sub1, rootNode_sub2, main1_1, main1_2, main1_3],
  );
  const main1_1_sub1 = fakeRoadmapData('SUB');
  const main1_1_sub2 = fakeRoadmapData('SUB');
  const main1_1_sub3 = fakeRoadmapData('SUB');
  setNodeChildren(main1_1, ...[main1_1_sub1, main1_1_sub2, main1_1_sub3]);
  const main1_2_2 = fakeRoadmapData('MAIN');
  setNodeChildren(main1_2, main1_2_2);
  const main1_2_2_sub1 = fakeRoadmapData('SUB');
  const main1_2_2_sub2 = fakeRoadmapData('SUB');
  const main1_2_2_sub3 = fakeRoadmapData('SUB');
  setNodeChildren(main1_2_2, main1_2_2_sub1, main1_2_2_sub2, main1_2_2_sub3);
  const list = [
    rootNode,
    rootNode_sub1,
    rootNode_sub2,
    main1_1,
    main1_1_sub1,
    main1_1_sub2,
    main1_1_sub3,
    main1_2,
    main1_2_2,
    main1_2_2_sub1,
    main1_2_2_sub2,
    main1_2_2_sub3,
    main1_3,
  ];
  return {
    rootIdx: 1,
    list,
  };
};
