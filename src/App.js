import "./App.css";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import Card from "./SummaryCard";
// Imports end

function App() {
// App component starts here
    //The values were taken from API doc.
    const locationList = [
        { value: "AB", label: "Alberta" },
        { value: "BC", label: "British Columbia" },
        { value: "MB", label: "Manitoba" },
        { value: "NB", label: "New Brunswick" },
        { value: "NL", label: "Newfoundland and Labrador" },
        { value: "NT", label: "Northwest Territories" },
        { value: "NS", label: "Nova Scotia" },
        { value: "NU", label: "Nunavut" },
        { value: "ON", label: "Ontario" },
        { value: "PE", label: "Prince Edward Island" },
        { value: "QC", label: "Quebec" },
        { value: "SK", label: "Saskatchewan" },
        { value: "YT", label: "Yukon" },
    ];

    const [activeLocation, setActiveLocation] = useState("AB");
    const [lastUpdated, setLastUpdated] = useState("");
    const [summaryData, setSummaryData] = useState({});

    //after a re-render from a change in activeLocation, these components are also re-rendered.
    useEffect(() => {
        getSummaryData();
        getVersion();

    }, [activeLocation]);

    const baseUrl = "https://api.opencovid.ca";
    const getVersion = async () => {
        const res = await fetch(`${baseUrl}/version`);
        const data = await res.json();
        setLastUpdated(data.timeseries);
    };

    const getSummaryData = async () => {
        if (activeLocation === "canada"){
            return;
        }

        let res = await fetch(`${baseUrl}/summary?loc=${activeLocation}`);
        let resData = await res.json();
        let summaryData = resData.data[0];
        let formattedData = {};

        Object.keys(summaryData).map((key) => {
            formattedData[key] = summaryData[key].toLocaleString();
        });

        console.log(formattedData);
        setSummaryData(formattedData);
    };

//return statement goes below this
  return (
      <div className="App">
        <h1>COVID 19 Dashboard </h1>
        <div className="dashboard-container">
          <div className="dashboard-menu">
              <Select
                  options={locationList}
                  onChange={(selectedOption) =>
                      setActiveLocation(selectedOption.value)
                  }
                  defaultValue={locationList.filter((options) =>
                    options.value === activeLocation)}
                  className="dashboard-select" />
              <p className="update-date"> Last Updated : {lastUpdated} </p>
          </div>
          <div className="dashboard-summary">
              <Card title="Total Cases" value={summaryData.cases}></Card>
              <Card title="Total Tests" value={summaryData.tests_completed}></Card>
              <Card title="Total Deaths" value={summaryData.deaths}></Card>
              <Card title="Total Vaccinated" value={summaryData.vaccine_administration_total_doses}></Card>
          </div>
        </div>
      </div>
  );
}

export default App;