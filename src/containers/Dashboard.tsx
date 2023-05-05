import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useSignOut } from "react-auth-kit";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement
);

const ScreenContainer = styled.div`
  width: 100%;
  height: 100%;
  background: white;
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 10%;
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

const GraphContainer = styled.div`
  width: 100%;
  height: 50%;
`;

const DataOverviewContainer = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
const CardContainer = styled.div`
  box-shadow: 0px 1.3px 17px -2px rgba(0, 0, 0, 0.4);
  width: 40%;
  height: 80%;
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

const Dashboard = () => {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState(0);
  const navigate = useNavigate();

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() => Math.random()),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: labels.map(() => Math.random()),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const chartOption = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },

    // Modify the axis by adding scales
    scales: {
      // to remove the labels
      x: {
        ticks: {
          display: true,
        },
        title: {
          display: true,
          text: "Hrs",
        },
        // to remove the x-axis grid
        grid: {
          drawBorder: false,
          display: false,
        },
      },
      // to remove the y-axis labels
      y: {
        ticks: {
          display: true,
        },
        title: {
          display: true,
          text: "value",
        },
        // to remove the y-axis grid
        grid: {
          drawBorder: false,
          display: false,
        },
      },
    },
  };

  useEffect(() => {
    RefreshToken();
  }, []);

  const RefreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded: any = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setExpire(decoded.exp);
    } catch (error: any) {
      if (error.response) {
        navigate("/");
      }
    }
  };

  const GetUser = async () => {
    const response = await axios.get("http://localhost:5000/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
  };

  return (
    <ScreenContainer>
      <TitleContainer>
        <h1>Dashboard</h1>
      </TitleContainer>
      <BodyContainer>
        <GraphContainer>
          <div style={{ width: "80%", height: "100%", margin: "auto" }}>
            <Line data={data} options={chartOption}></Line>
          </div>
        </GraphContainer>
        <DataOverviewContainer>
          <CardContainer>
            <h4>Sum</h4>
            <h1>10</h1>
          </CardContainer>
          <CardContainer>
            <h4>Average</h4>
            <h1>2</h1>
          </CardContainer>
        </DataOverviewContainer>
      </BodyContainer>
    </ScreenContainer>
  );
};

export default Dashboard;
