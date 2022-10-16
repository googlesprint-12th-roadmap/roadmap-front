import styled from 'styled-components';

export const Container = styled.main`
  margin-left: 5rem;
`;

export const Header = styled.header`
  display: flex;
  margin-top: 5rem;
`;

export const Title = styled.h2`
  font-size: 6.4rem;
  line-height: 7.7rem;
  font-weight: 700;
`;

export const DefaultText = styled.h3`
  font-weight: 700;
  font-size: 48px;
  line-height: 58px;

  color: rgba(255, 99, 155, 0.42);
  text-shadow: 0px 4px 12px rgba(255, 99, 155, 0.42);
  align-self: flex-end;
  margin-left: 1.5rem;
`;

export const TitleWrap = styled.div`
  display: flex;
  padding-bottom: 1rem;
  border-bottom: 1px solid #000;
`;

export const MakeSection = styled.section`
  margin-top: 2.4rem;
  overflow: hidden;
  box-sizing: content-box;
  .swiper-button-disabled {
    opacity: 0;
    cursor: default;
  }

  .swiper-slide {
    width: 500px;

    cursor: grab;
  }

  .swiper {
    box-sizing: content-box;
    padding-right: 10px;
    overflow: hidden;
  }
`;
