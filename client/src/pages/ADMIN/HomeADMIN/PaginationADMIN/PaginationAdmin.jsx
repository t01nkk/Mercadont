import React from "react";

const PaginationAdmin = ({ productNum, page, productsInPage }) => {
  const division = productNum / productsInPage;
  const pages = Math.ceil(division);

  const numPages = [];
  for (let i = 0; i < pages; i++) {
    numPages.push(i + 1);
  }
  return (
    <nav className="page-btns">
      {numPages?.map((number) => (
        <button key={number} onClick={() => page(number)}>
          {number}
        </button>
      ))}
    </nav>
  );
};

export default PaginationAdmin;
