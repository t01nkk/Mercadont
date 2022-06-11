import React from "react";
import axios from "axios";

export default function AdminUser({ name, email }) {
  const handleAdmin = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_DOMAIN}/admin/setAdmin`, {
        email,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <article>
        <div>
          <span>{`Name: ${name} Email: ${email}`}</span>

          <button onClick={handleAdmin} className="button">
            SWITCH ADMIN STATUS
          </button>
          {/* <button onClick={handleAdmin} className="button">
            BAN USER
          </button> */}
        </div>
      </article>
    </div>
  );
}
