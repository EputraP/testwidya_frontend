import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { CardContainerDevice } from "../components";

const ScreenContainer = styled.div`
  width: 100%;
  height: 90%;
  background: white;
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 60px;
  background: #2a48a3;
  display: flex;
  align-items: center;
  justify-content: center;
  h1 {
    color: white;
    font-weight: bold;
    font-size: 40px;
  }
`;
const BodyContainer = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
`;

const List = () => {
  const [dataDevice, setDataDevice] = useState([]);
  const [deleteFlag, setDeleteFlag] = useState(false);

  const GetUser = async () => {
    const response = await axios.get("http://localhost:5000/getDevice");
    console.log(response.data);
    setDataDevice(response.data);
  };
  useEffect(() => {
    GetUser();
  }, [deleteFlag]);

  const DeleteHandler = async (dataJSON: any) => {
    const response = await axios.post("http://localhost:5000/deleteDevice", {
      client: dataJSON.client,
      serialNumber: dataJSON.serial_number,
      amount: dataJSON.amount,
    });
    console.log(response);
    setDeleteFlag(!deleteFlag);
  };

  return (
    <ScreenContainer>
      <TitleContainer>
        <h1>List Device</h1>
      </TitleContainer>
      <BodyContainer>
        {dataDevice.map((data, index) => (
          <CardContainerDevice dataJSON={data} FunctionParam={DeleteHandler} />
        ))}
      </BodyContainer>
    </ScreenContainer>
  );
};

export default List;
