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
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    axios
      .get("http://13.231.17.170:8080/getTableFields?tablename=tbuser")
      .then((res) => {
        // console.log(res.data.data, "get");
        setData(res.data.data);
      });
  }, []);

  //   console.log(store, "finally");
  const handleChange = (e, index, fieldType) => {
    const newValue =
      fieldType === "checkbox" ? e.target.checked : e.target.value;

    console.log(newValue, "full");

    setData((prev) => {
      return [
        ...prev.slice(0, index),
        {
          ...prev[index],
          Value: newValue,

          //add new value attribute
        },
        ...prev.slice(index + 1),
      ];
    });
    setChecked(!checked);
  };

  const handleSubmit = () => {
    const newData = data.map((item) => {
      return {
        Field: item.Field,
        Value: item.Value,
      };
    });
    console.log(newData, " testing");

    axios
      .post("http://13.231.17.170:8080/test/submit", { data: newData })

      .then((res) => {
        console.log(res, "final");
      });
  };

  // console.log(data, " check");

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
              value={post?.Value}
              //{post?.Value || ""}
              onChange={(e) => handleChange(e, index, checkType[Type])}
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
