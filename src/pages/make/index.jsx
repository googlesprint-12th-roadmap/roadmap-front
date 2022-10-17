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
import {
  Container,
  DefaultText,
  Header,
  InputTitle,
  MakeSection,
  Title,
  TitleWrap,
} from './index.styles';

const Make = () => {
  const [nodeList, setNodeList] = useRecoilState(nodeListState);
  const [depthList, setDepthList] = useRecoilState(depthState);

  const [currentSelect, setCurrentSelect] = useRecoilState(
    currentSelectViewState,
  );

  const [title, setTitle] = useRecoilState(titleState);
  const [width, setWidth] = useState(0);

  const emptyNode = useRecoilValue(emptyNodeCheckState);
  const spanRef = useRef(null);

  const handleChangeTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  useEffect(() => {
    setWidth(spanRef.current.offsetWidth);
  }, [title]);

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
