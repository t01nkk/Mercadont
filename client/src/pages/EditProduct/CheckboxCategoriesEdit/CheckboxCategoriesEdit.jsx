import React, { useEffect, useState } from "react";

export default function CheckboxCategories({ name, id, getName, filter }) {
  const handleCheckBox = (e) => {
    getName(e.target.value);
  };
  let flag = filter.find((e) => e.name === name);

  return (
    <div>
      <input
        type="checkbox"
        id={id}
        value={name}
        name={name}
        onChange={handleCheckBox}
        defaultChecked={flag}
      />
      <label htmlFor={id}>{name}</label>
    </div>
  );
}
