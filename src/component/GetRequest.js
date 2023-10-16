import React, { useState, useEffect } from "react";
import axios from "axios";
function GetRequest() {
  const [data, setData] = useState([]);
  //   const [checked, setChecked] = useState("");
  useEffect(() => {
    axios
      .get("http://13.231.17.170:8080/getTableFields?tablename=tbuser")
      .then((res) => {
        console.log(res.data.data, "get");
        setData(res.data.data);
      });
  }, []);

  return (
    <div>
      {data.map((post) => {
        const { Field, Type } = post;
        return (
          <div>
            <label>{Field}=</label>
            <input type="text" placeholder={Type} />
            <br></br>
            <input type="checkbox" />
          </div>
        );
      })}
      <button type="submit">Submit</button>
    </div>
  );
}

export default GetRequest;
