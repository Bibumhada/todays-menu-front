import styled from 'styled-components';
import background from 'assets/images/background-error.png';

export const Background = styled.div`
  background: url(${background}) no-repeat;
  max-width: 393px;
  min-height: 100vh;
  margin: 0 auto;
`;

export const Wrapper = styled.div`
  padding: 54px 20px 20px;

  .description {
    display: block;
    font-size: 20px;
    font-weight: var(--font-bold);
    margin: 450px 0 0;
    text-align: center;
    color: #828282;
  }

  .errorRetry {
    display: block;
    width: 80%;
    margin: 40px auto;
    cursor: pointer;
  }
`;
