import React from "react";
import styled from "styled-components";

interface ICardContainerDevice {
  dataJSON: any;
  FunctionParam?: (params: any) => any;
}

const CardContainer = styled.div`
  box-shadow: 0px 1.3px 17px -2px rgba(0, 0, 0, 0.4);
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    font-weight: bold;
    font-size: 32px;
  }
  h4 {
    font-size: 20px;
  }
`;

const CardContainerDevice = (props: ICardContainerDevice) => {
  const { dataJSON, FunctionParam } = props;

  const DeleteButtonHanlder = () => {
    if (FunctionParam) FunctionParam(dataJSON);
  };

  return (
    <CardContainer>
      <div>{dataJSON.client}</div>
      <div>{dataJSON.serial_number}</div>
      <div>{dataJSON.amount}</div>
      <button onClick={DeleteButtonHanlder} style={{ backgroundColor: "red" }}>
        Delete
      </button>
    </CardContainer>
  );
};

export default CardContainerDevice;
