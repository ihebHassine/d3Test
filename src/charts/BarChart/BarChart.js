import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import {
  convertDateDdMmYyyy,
  getDateOfXDaysAgo,
  getIndexFromArrayById,
  randomDataGenerator,
} from "../../data/DataGenerator";
import "./barChart.css";
import { DrawChart } from "./DrawChart";
import Button from "../../components/button/Button";
import TextInput from "../../components/input/TextInput";
import NumberInput from "../../components/input/NumberInput";
import DateInput from "../../components/input/DateInput";

function BarChart() {
  const [sampleData, setSampleData] = useState(
    randomDataGenerator(3, getDateOfXDaysAgo(3), new Date())
  );
  const [xUnit, setXUnit] = useState("");
  const [yUnit, setYUnit] = useState("");
  const [tempXUnit, setTempXUnit] = useState("");
  const [tempYUnit, setTempYUnit] = useState("");
  const [amountOfData, setAmountOfData] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [value, setValue] = useState(0);
  const [date, setDate] = useState(new Date());
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const update = useRef(false);
  const svgRef = useRef();
  const margin = { top: 50, right: 30, bottom: 30, left: 60 };

  useEffect(() => {
    window.addEventListener("resize", () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      if (update.current) {
        d3.selectAll("g").remove();
      } else {
        update.current = true;
      }
    });
    DrawChart(
      svgRef,
      sampleData,
      dimensions,
      margin,
      xUnit,
      yUnit,
      setSelectedId,
      setValue,
      setDate
    );
  }, [sampleData, xUnit, yUnit, dimensions]);

  const handelAdd = () => {
    d3.selectAll("g").remove();
    const checkExist = sampleData.find(
      (element) =>
        convertDateDdMmYyyy(element.date) === convertDateDdMmYyyy(date)
    );
    if (checkExist) {
      const index = getIndexFromArrayById(sampleData, checkExist.id);
      const temp = sampleData.slice();
      temp[index].date = new Date(date);
      temp[index].value += value;
      setSampleData(temp);
      setSelectedId(null);
    } else {
      setSampleData((sampleData) => [
        ...sampleData,
        {
          value: value,
          date: new Date(date),
          id: sampleData.length,
        },
      ]);
    }
  };

  const handelDelete = () => {
    d3.selectAll("g").remove();

    setSampleData(sampleData.filter((element) => element.id !== selectedId));
    setSelectedId(null);
  };

  const handelUpdate = () => {
    d3.selectAll("g").remove();
    const index = getIndexFromArrayById(sampleData, selectedId);
    const temp = sampleData.slice();
    temp[index].date = new Date(date);
    temp[index].value = value;
    setSampleData(temp);
    setSelectedId(null);
  };

  const handelGenerate = () => {
    d3.selectAll("g").remove();
    setSampleData(
      randomDataGenerator(
        amountOfData ? amountOfData : 3,
        getDateOfXDaysAgo(amountOfData ? amountOfData : 3),
        new Date()
      )
    );
    setXUnit(tempXUnit);
    setYUnit(tempYUnit);
  };

  return (
    <div className="container">
      <div className="inputsContainer">
        <NumberInput
          label={"Value:"}
          value={value}
          min={0}
          action={setValue}
        ></NumberInput>
        <DateInput
          label={"Date:"}
          value={date}
          min="2022-01-01"
          max="2022-06-15"
          action={setDate}
        ></DateInput>
      </div>
      <div className="buttonContainer">
        <Button text={"ADD"} action={handelAdd}></Button>
        <Button text={"UPDATE"} action={handelUpdate}></Button>
        <Button text={"DELETE"} action={handelDelete}></Button>
      </div>
      <div
        className="inputsContainer"
        style={{ width: "85%", marginTop: "2%", marginBottom: "2%" }}
      >
        <TextInput
          label={"X unit :"}
          value={tempXUnit}
          action={setTempXUnit}
        ></TextInput>
        <TextInput
          label={"Y unit :"}
          value={tempYUnit}
          action={setTempYUnit}
        ></TextInput>

        <NumberInput
          label={"amount of data:"}
          value={amountOfData}
          min={0}
          action={setAmountOfData}
        ></NumberInput>
      </div>
      <Button text={"Gnerate new Data"} action={handelGenerate}></Button>

      <div id="d3demo">
        <svg ref={svgRef}></svg>
      </div>
    </div>
  );
}

export default BarChart;
