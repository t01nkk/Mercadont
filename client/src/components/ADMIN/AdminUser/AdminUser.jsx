import React from "react";
import axios from "axios";




export default function AdminUser({ name, email}) {    
    const handleAdmin = async (e) => {
        e.preventDefault();       
        try {
          await axios.put(
            `${process.env.REACT_APP_DOMAIN}/admin/setAdmin`,
            {
              email
            }
          );       
        } catch (err) {
          console.log(err);
        }
      };

  return (
    <div>
      <article>
        <div >
          <span>{name}</span>  
          <button onClick={handleAdmin} className="button">
              admin
              </button>
              <button onClick={handleAdmin} className="button">
             x
              </button>         
        </div>
      </article>
    </div>
  );
}