import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { SwiperSlide } from 'swiper/react';
import { titleState } from '../../atoms/createAtoms';
import {
  currentSelectViewState,
  depthState,
  emptyNodeCheckState,
  nodeListState,
} from '../../atoms/makeListAtoms';
import EmptyList from '../../components/make/EmptyList';
import NodeOption from '../../components/make/NodeOption';
import SelectList from '../../components/make/SelectList';
import SwiperSection from '../../components/SwiperSection';
import { useSaveRoadmap } from '../../hooks/useRoadmap';
import {
  Container,
  DefaultText,
  Header,
  InputTitle,
  MakeSection,
  Title,
  TitleWrap,
} from './index.styles';

const data = [
  // {
  //   id: 1,
  //   url: '',
  //   desc: '',
  //   type: 'main',
  //   title: 'Frontend',
  //   children: [2, 3],
  //   parent: 'root',
  // },
  // {
  //   id: 2,
  //   url: '',
  //   desc: '',
  //   type: 'main',
  //   title: 'SPA',
  //   children: [6],
  //   parent: 1,
  // },
  // {
  //   id: 3,
  //   url: '',
  //   desc: '',
  //   type: 'main',
  //   title: 'Skill',
  //   children: [4, 5],
  //   parent: 1,
  // },
  // {
  //   id: 4,
  //   url: '',
  //   desc: '',
  //   type: 'sub',
  //   title: 'CSS',
  //   children: [],
  //   parent: 3,
  // },
  // {
  //   id: 5,
  //   url: '',
  //   desc: '',
  //   type: 'main',
  //   title: 'HTML',
  //   children: [],
  //   parent: 3,
  // },
  // {
  //   id: 6,
  //   url: '',
  //   desc: '',
  //   type: 'main',
  //   title: 'Javascript',
  //   children: [],
  //   parent: 2,
  // },
];

const Make = () => {
  const [nodeList, setNodeList] = useRecoilState(nodeListState);
  const [depthList, setDepthList] = useRecoilState(depthState);

  const [currentSelect, setCurrentSelect] = useRecoilState(
    currentSelectViewState,
  );

  const [title, setTitle] = useRecoilState(titleState);
  const [width, setWidth] = useState(0);

  const emptyNode = useRecoilValue(emptyNodeCheckState);
  const spanRef = useRef();
  const saveRoadmap = useSaveRoadmap();

  const handleChangeTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  useEffect(() => {
    setDepthList([data.filter((item) => item.parent === 'root')]);
    setNodeList([...data]);
  }, []);

  useEffect(() => {
    setWidth(spanRef.current.offsetWidth);
  }, [title]);

  // const handleSubmit = () => {
  //   const context = {
  //     name: title,
  //     nodes: nodeList,
  //     rootIdx: nodeList[0].idx,
  //   };
  //   console.log(context);
  //   saveRoadmap.mutate(context, {
  //     onSuccess: (d) => {
  //       console.log(d);
  //     },
  //   });
  // };

  console.log(nodeList);

  return (
    <Container>
      <Header>
        <TitleWrap>
          <Title ref={spanRef}>{title}</Title>
          <InputTitle
            onChange={handleChangeTitle}
            autoFocus
            type={'text'}
            style={{ width }}
            value={title}
          ></InputTitle>
          <DefaultText>로드맵</DefaultText>
        </TitleWrap>
      </Header>

      <MakeSection>
        <SwiperSection between={30}>
          {depthList &&
            depthList.length > 0 &&
            depthList.map((item, index) => {
              if (item.length > 0) {
                return (
                  <SwiperSlide key={index}>
                    <SelectList data={item} depth={index}></SelectList>
                  </SwiperSlide>
                );
              }
            })}
          {emptyNode && (
            <SwiperSlide>
              <EmptyList></EmptyList>
            </SwiperSlide>
          )}
        </SwiperSection>
      </MakeSection>
      <NodeOption />
      {/* <button onClick={handleSubmit}>저장하기</button> */}
    </Container>
  );
};

export default Make;
