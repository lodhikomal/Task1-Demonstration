import React, { useState, useEffect } from "react";
import axios from "axios";

let checkType = {
  int: "textbox",
  varchar: "textbox",
  decimal: "number",
  tinytext: "checkbox",
  datetime: "date",
  date: "date",
};
function GetRequest() {
  const [data, setData] = useState([]);
  const [values, setValues] = useState([]);

  useEffect(() => {
    axios
      .get("http://13.231.17.170:8080/getTableFields?tablename=tbuser")
      .then((res) => {
        // console.log(res.data.data, "get");
        setData(res.data.data);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    let updatedData = [...values];
    const itemIndex = updatedData.findIndex((item) => item.Field == name);
    if (type == "checkbox") {
      if (itemIndex !== -1) {
        updatedData[itemIndex].Value = checked;
      } else {
        updatedData.push({ Field: name, Value: checked });
      }
    } else {
      if (itemIndex !== -1) {
        updatedData[itemIndex].Value = value;
      } else {
        updatedData.push({ Field: name, Value: value });
      }
    }

    setValues([...updatedData]);
  };

  console.log(values, "intial values");
  const handleSubmit = () => {
    axios
      .post("http://13.231.17.170:8080/test/submit", { data: values })

      .then((res) => {
        console.log(res, "final");
      });
  };

  return (
    <div>
      {data.map((post, index) => {
        const { Field, Type } = post;
        return (
          <div>
            <label>{Field}=</label>
            <input
              type={checkType[Type]}
              placeholder=""
              // value={post?.Value}
              name={Field}
              onChange={(e) => handleChange(e, index, checkType[Type], Field)}
            />

            <br></br>
          </div>
        );
      })}
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default GetRequest;
