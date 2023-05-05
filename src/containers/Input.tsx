import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
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
`;
const Input = () => {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState(0);

  const clientInputRef = useRef<HTMLInputElement | null>(null);
  const serialNumberInputRef = useRef<HTMLInputElement | null>(null);
  const amountInputRef = useRef<HTMLInputElement | null>(null);

  const addDeviceButtonHandler = async (event: any) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/addDevice", {
        client: clientInputRef.current?.value,
        serialNumber: serialNumberInputRef.current?.value,
        amount: amountInputRef.current?.value,
      });
      console.log(response);
      toast(response.statusText);
    } catch (error: any) {
      console.log(error.response.data.msg);
      toast(error.response.data.msg);
    }
  };

  return (
    <ScreenContainer>
      <ToastContainer />
      <TitleContainer>
        <h1>Input Device</h1>
      </TitleContainer>
      <BodyContainer>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            id="formInput"
            onSubmit={addDeviceButtonHandler}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Client Name
              </label>
              <div className="mt-2">
                <input
                  id="client"
                  name="client"
                  type="text"
                  ref={clientInputRef}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Serial Number
              </label>
              <div className="mt-2">
                <input
                  id="serialnumber"
                  name="serialnumber"
                  type="text"
                  ref={serialNumberInputRef}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Amount
              </label>
              <div className="mt-2">
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  ref={amountInputRef}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                form="formInput"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </BodyContainer>
    </ScreenContainer>
  );
};

export default Input;
