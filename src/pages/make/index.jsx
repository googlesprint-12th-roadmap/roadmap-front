import React from 'react';
import { SwiperSlide } from 'swiper/react';
import SelectList from '../../components/Make/SelectList';
import SwiperSection from '../../components/SwiperSection';
import {
  Container,
  DefaultText,
  Header,
  MakeSection,
  Title,
  TitleWrap,
} from './index.styles';

const data = [
  {
    id: 1,
    url: '',
    desc: '',
    type: 'main',
    label: 'Frontend',
    children: [2, 3],
    parent: 0,
  },
  {
    id: 2,
    url: '',
    desc: '',
    type: 'main',
    label: 'SPA',
    children: [],
    parent: 1,
  },
  {
    id: 3,
    url: '',
    desc: '',
    type: 'main',
    label: 'Skill',
    children: [4, 5],
    parent: 1,
  },
  {
    id: 4,
    url: '',
    desc: '',
    type: 'sub',
    label: 'CSS',
    children: [],
    parent: 3,
  },
  {
    id: 5,
    url: '',
    desc: '',
    type: 'main',
    label: 'HTML',
    children: [],
    parent: 3,
  },
];

const Make = () => {
  return (
    <Container>
      <Header>
        <TitleWrap>
          <Title>이름 입력하는 곳</Title>
          <DefaultText>로드맵</DefaultText>
        </TitleWrap>
        {/* TODO
          이름 입력 후 타이틀
          수정 버튼이면 input창
        */}
      </Header>

      {/* TODO
          첫번째
          1. Select 리스트 컴포넌트 한개 생성
          2. 새로운 노드 추가 버튼
          3. 추가 버튼 클릭시 옆에 새로운 컴포넌트 추가
          4. 셀렉 리스트 컴포넌트가 3개나 4개 이상 넘어갈 시 거기서 추가하면
             현재 보이는 가장 왼쪽 컴포넌트를 가릴 정도의 자동 스크롤

          두번째
          1. 아이템 하나 클릭하면 그에 맞게 parent 컴포넌트 그려주기
          2. children 컴포넌트도 그에 맞게 그려주기
        */}
      <MakeSection>
        <SwiperSection between={30}>
          <SwiperSlide>
            <SelectList></SelectList>
          </SwiperSlide>
          <SwiperSlide>
            <SelectList></SelectList>
          </SwiperSlide>
          <SwiperSlide>
            <SelectList></SelectList>
          </SwiperSlide>
          <SwiperSlide>
            <SelectList></SelectList>
          </SwiperSlide>
          <SwiperSlide>
            <SelectList></SelectList>
          </SwiperSlide>
          <SwiperSlide>
            <SelectList></SelectList>
          </SwiperSlide>
        </SwiperSection>
      </MakeSection>
    </Container>
  );
};

export default Make;
