import styled from 'styled-components';

type StyledButtonProps = {
  variant: 'orange' | 'white';
};

export const StyledButton = styled.button<StyledButtonProps>`
  padding: 22px 0px 20px;
  border: 2px var(--color-main-orange) solid;
  background-color: ${(props) => (props.variant === 'orange' ? 'var(--color-main-orange)' : '#fff')};
  color: ${(props) => (props.variant === 'orange' ? '#fff' : 'var(--color-main-orange)')};
  border-radius: 20px;
  font-size: 20px;
  font-weight: var(--font-bold);
  width: 100%;
`;