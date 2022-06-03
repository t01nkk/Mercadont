import React, { useEffect, useState } from "react";
import "./SellProductForm.css";
import axios from "axios";
import { fetchCategories } from "../../../redux/actions/actions";
import { useStore } from "../../../context/store";


export default function SellProductForm() {
  const [state, dispatch] = useStore();
  const [errors, setErrors] = useState({});
  const [selected, setSelected] = useState([]);

  const [data, setData] = useState({
    name: "",
    price: "",
    description: "",
    image:
      "https://t2.uc.ltmcdn.com/es/posts/7/7/5/como_hacer_choripan_42577_orig.jpg",
    status: "inactive",
    stock: "",
    categories: [],
  });
  const expression = {	
		nameExpression: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    priceExpression: /^\d{1,14}$/,
    descriptionExpression: /^[a-zA-ZÀ-ÿ\s]{1,200}$/,
    stockExpression: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  }
  
  function validator(input) {
    let errors = {};    
    
    if (!expression.nameExpression.test(input.name)) {
        errors.name = 'Name is necessary';
    }
    if (!expression.priceExpression.test(input.price)) {
      errors.price = 'Price is necessary';
  }
  if (!expression.descriptionExpression.test(input.description)) {
    errors.description = 'Description is necessary';
}
if (!expression.stockExpression.test(input.stock)) {
  errors.stock = 'Stock is necessary';
}
    return errors
  }

  const handleChangeName = (e) => {
    setErrors("")  
    setErrors(validator({ ...data, [e.target.name]: e.target.value }));
    
        setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleChangePrice = (e) => {
    setErrors("")  
    setErrors(validator({ ...data, [e.target.name]: e.target.value }));
    
        setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleChangeDescription = (e) => {
    setErrors("")  
    setErrors(validator({ ...data, [e.target.name]: e.target.value }));
    
        setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleChangeStock = (e) => {
    setErrors("")  
    setErrors(validator({ ...data, [e.target.name]: e.target.value }));
    
        setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleDeleteCat = (name, event) => {
    event.preventDefault();
    const filterCat = data.categories.filter((cat) => cat !== name);
    setData({ ...data, categories: filterCat });
  };
  const handleChangeCat = (e) => {
    const { value } = e.target;
    setData({ ...data, categories: [...data.categories, value] });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, price, description, image, status, stock, categories } = data;
    try {
      await axios.post(`${process.env.REACT_APP_DOMAIN}/product/create`, {
        name: name,
        price: parseInt(price),
        description: description,
        image: image,
        status: status,
        stock: parseInt(stock),
        categories: categories,
      });

      alert("se envio la peticion");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchCategories(dispatch);
  }, []);
  return (
    <div className="container-login">
      <div className="sellProductCard">
        {console.log(data.categories)}
        <h2>Post Product</h2>

        <form onSubmit={handleSubmit} className="sellProductForm">
          <div className="divInputUser">
            <input
              type="text"
              name="name"
              placeholder="Product Name ..."
              onChange={handleChangeName}
              required
              value={data.name}
            />
          </div>
           {errors.name && ( <p className='error-input'>{errors.name}</p> )}

          <div className="divInputUser">
            <input
              type="number"
              name="price"
              placeholder="Price ..."
              onChange={handleChangePrice}
              required
              value={data.price}
            />
          </div>
          {errors.price && ( <p className='error-input'>{errors.price}</p> )}
          <div className="divInputUser">
            <textarea
              cols="30"
              rows="15"
              type="textarea"
              name="description"
              placeholder="Product Description ..."
              onChange={handleChangeDescription}
              required
              value={data.description}
            ></textarea>  
          </div>
          {errors.description && ( <p className='error-input'>{errors.description}</p> )}
          <select onChange={handleChangeCat} className="divInputUser">
            <option value="" hidden className="divInputUser">
              Categories
            </option>
            {state.categories?.length &&
              state.categories.sort((a, b) => a.name.localeCompare(b.name)) &&
              state.categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
          </select>
          {data.categories?.map((category, i) => (
            <div key={i} className="button-x-container">
              <p>{category}</p>
              <button
                onClick={(event) => handleDeleteCat(category, event)}
                className="button-delete-category"
              >
                x
              </button>
            </div>
          ))}
          <div className="divInputUser">
            <input
              type="text"
              name="image"
              placeholder="Image..."
              onChange={handleChange}
              value={data.image}
            />
          </div>
          <div className="divInputUser">
            <label>Product status:</label>
            <select name="status" value={data.status} onChange={handleChange}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="divInputUser">
            <input
              type="number"
              name="stock"
              placeholder="Stock..."
              onChange={handleChangeStock}
              value={data.stock}
            />
          </div>
          {errors.stock && ( <p className='error-input'>{errors.stock}</p> )}
          <div className="btn-login">
            <input type="submit" value="Send" disabled={errors} className="input-submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
