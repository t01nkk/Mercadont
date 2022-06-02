import React, { useState } from "react";

export default function CheckboxCategories({ name, id, setData, data }) {
  // const [checked, setChecked] = useState(false);
  // const handleClick = (e) => {
  //   if (checked) {
  //     setChecked(false);
  //   } else {
  //     setChecked(true);
  //   }
  //   getName(e.target.name, checked);
  // };
  // // const handleCheckBox = (e) => {};
  // const getName = (value, checked) => {
  //   if (checked) {
  //     setData({
  //       ...data,
  //       categories: data.categories.push(value),
  //     });
  //   } else {
  //     setData({
  //       ...data,
  //       categories: data.categories.filter(
  //         (category) => category.name !== value
  //       ),
  //     });
  //   }
  // };
  // return (
  //   // <div>
  //   //   <input
  //   //     type="checkbox"
  //   //     id={id}
  //   //     value={checked}
  //   //     name={name}
  //   //     onClick={handleClick}
  //   //     // onChange={handleCheckBox}
  //   //   />
  //   //   <label htmlFor={id}>{name}</label>
  //   // </div>
  // );
}
