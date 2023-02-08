import React from "react";
import "./Component.css";
const getClassGender = (gender) => {
  if (gender === "male") {
    return "person_man";
  } else if (gender === "female") {
    return "person_women";
  }
  return "";
};
const Component = ({ firstName, lastName, phone, gender = "" }) => {
  return (
    <li className="listAbonent">
      <div className="nameAb">
        name: <span>{`${lastName} ${firstName}`}</span>{" "}
      </div>
      <div className="phoneAb">
        phone:<span>{`${phone}`}</span>
      </div>
      <div
        className={`genderAb ${getClassGender(gender)} `}
      >{`gender: ${gender}`}</div>
    </li>
  );
};
export default Component;
