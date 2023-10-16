import React, { useState, useEffect } from "react";
import axios from "axios";
function GetRequest() {
  const [data, setData] = useState([]);
  //   const [store, setStore] = useState([]);

  useEffect(() => {
    axios
      .get("http://13.231.17.170:8080/getTableFields?tablename=tbuser")
      .then((res) => {
        // console.log(res.data.data, "get");
        setData(res.data.data);
      });
  }, []);

  //   console.log(store, "finally");
  const handleChange = (e, index) => {
    console.log(e, index, "test");
    // setData([e.target.value]);
    setData((prev) => {
      return [
        ...prev.slice(0, index),
        {
          ...prev[index],
          Value: e.target.value,
        },
        ...prev.slice(index + 1),
      ];
    });
  };

  console.log(data, " check");

  return (
    <div>
      {data.map((post, index) => {
        const { Field, Type } = post;
        return (
          <div>
            <label>{Field}=</label>
            <input
              type="text"
              placeholder=""
              value={post?.Value || ""}
              onChange={(e) => handleChange(e, index)}
            />
            <br></br>
            {/* <input type="checkbox" /> */}
          </div>
        );
      })}
      <button type="submit">Submit</button>
    </div>
  );
}

export default GetRequest;
