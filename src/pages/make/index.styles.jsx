import styled from 'styled-components';

export const Container = styled.main`
  margin-left: 5rem;
`;

export const Header = styled.header`
  display: flex;
  margin-top: 5rem;
`;

export const Title = styled.span`
  font-size: 6.4rem;
  line-height: 7.7rem;
  font-weight: 700;

  position: absolute;
  opacity: 0;
`;

export const InputTitle = styled.input`
  font-size: 6.4rem;
  line-height: 7.7rem;
  font-weight: 700;
  z-index: 1;
  border: none;
  min-width: 20rem;

  :focus {
    outline: none;
  }
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
  position: relative;
`;

export const MakeSection = styled.section`
  min-height: 45rem;
  margin-top: 2.4rem;
  margin-bottom: 2.4rem;
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
