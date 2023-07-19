import styled from "styled-components";

const InputGroup = styled.div`
  position: relative;

  input {
    border: solid 1.5px #9e9e9e;
    border-radius: 0.375rem;
    background: none;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    color: #f5f5f5;
    transition: border 150ms cubic-bezier(0.4, 0, 0.2, 1);

    &:focus {
      outline: none;
      border: 1.5px solid #1a73e8;
    }

    &::placeholder {
      opacity: 0;
      visibility: hidden;
    }

    &:focus ~ label,
    &:not(:placeholder-shown) ~ label {
      transform: translateY(-50%) scale(0.8);
      background-color: #212121;
      padding: 0 0.2em;
      color: #2196f3;
    }
  }
  label {
    position: absolute;
    left: 15px;
    color: #e8e8e8;
    pointer-events: none;
    transform: translateY(0.375rem);
    transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

const FloatingInput = (props: any) => {
  return (
    <InputGroup>
      <input type="text" autoComplete="off" placeholder=" " {...props} />
      <label htmlFor={props?.id}>First Name</label>
    </InputGroup>
  );
};

export default FloatingInput;
