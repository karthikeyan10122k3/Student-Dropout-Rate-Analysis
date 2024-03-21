import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import {} from "module";

const ReasonChart = ({ setActiveComponent }) => {
  const [reasonData, setReasonData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/studentSurveySubmit"
      );
      const surveyData = response.data;
      console.log(surveyData);

      // Check if surveyData is an array
      if (Array.isArray(surveyData)) {
        // Initialize an object to store reasons and their counts
        const reasonsCount = {};

        // Iterate through the survey data and count each reason
        surveyData.forEach((survey) => {
          const reason = survey.dropoutReason;
          if (reason && reason !== "") {
            if (reasonsCount.hasOwnProperty(reason)) {
              reasonsCount[reason]++;
            } else {
              reasonsCount[reason] = 1;
            }
          }
        });

        // Set the state with the reasons count data
        setReasonData(reasonsCount);
      } else {
        console.error("Invalid survey data format:", surveyData);
      }
    } catch (error) {
      console.error("Error fetching survey data:", error);
    }
  };

  const renderPieChart = () => {
    if (!reasonData) return null;

    const labels = Object.keys(reasonData);
    const data = Object.values(reasonData);

    const chartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#8A2BE2",
            "#20B2AA",
            "#FF8C00",
            "#4169E1",
            "#FF1493",
            "#228B22",
            "#FF4500",
            "#ADFF2F",
            "#808080",
            "#800000",
            "#9932CC",
          ],
        },
      ],
    };

    return <Pie data={chartData} />;
  };

  const handleBackButton = () => {
    setActiveComponent("dashBoard");
  };

  return (
    <div className="container mb-5">
      <button onClick={handleBackButton} className="btn btn-primary my-3 px-4">
        Back
      </button>
      <h2 className="text-center mb-4">Dropout Reasons Distribution</h2>
      <div className="row justify-content-center">
        <div className="col-sm-6">
          <div className="chart-container">{renderPieChart()}</div>
        </div>
      </div>
    </div>
  );
};

export default ReasonChart;
