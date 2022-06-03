import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useStore } from "../../../context/store.js";
import { fetchCategories } from "../../../redux/actions/actions.js";


export default function EditProduct() {
  const [state, dispatch] = useStore();
  const [errors, setErrors] = useState({});
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    categories: [],
    status: "",
  });
  const expression = {	
		nameExpression: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    priceExpression: /^\d{1,14}$/,
    descriptionExpression: /^[a-zA-ZÀ-ÿ\s]{1,200}$/,
    stockExpression: /^\d{1,14}$/,
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
    setErrors(validator({ ...product, [e.target.name]: e.target.value }));
    
        setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleChangePrice = (e) => {
    setErrors("")  
    setErrors(validator({ ...product, [e.target.name]: e.target.value }));
    
        setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const handleChangeDescription = (e) => {
    setErrors("")  
    setErrors(validator({ ...product, [e.target.name]: e.target.value }));
    
        setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const handleChangeStock = (e) => {
    setErrors("")  
    (validator({ ...product, [e.target.name]: e.target.value }));
    
        setProduct({ ...product, [e.target.name]: e.target.value });
  };
  
  const handleDeleteCat = (name, event) => {
    event.preventDefault();
    const filterCat = product.categories.filter((cat) => cat !== name);
    setProduct({ ...product, categories: filterCat });
  };
  const handleChangeCat = (e) => {
    const { value } = e.target;
    if (!product.categories.includes(value)) {
      setProduct({
        ...product,
        categories: [...product.categories, value],
      });
    }
  };
  let { id } = useParams();

  const fetchProductById = async () => {
    let fetchedProduct = await axios.get(`${process.env.REACT_APP_DOMAIN}/product/${id}`);
    const destructuringCats = [];
    const { categories } = fetchedProduct.data;
    for (const cats of categories) {
      const { name } = cats;
      destructuringCats.push(name);
    }
    console.log(destructuringCats, "soy el array");
    fetchedProduct.data.categories = destructuringCats;
    setProduct(fetchedProduct.data);
    console.log(fetchedProduct.data.categories, "soy el fetch");
  };

  useEffect(() => {
    fetchProductById();
    fetchCategories(dispatch);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, price, stock, image, categories, status } =
      product;
    try {
      const res = await axios.put(`${process.env.REACT_APP_DOMAIN}/product/update/${id}`, {
        name,
        description,
        price,
        stock,
        image,
        status,
        categories,
      });
      console.log(product);
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_DOMAIN}/product/delete/${id}`);
      alert("product deleted successfully");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {console.log(product.categories.length)}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChangeName}
        />
          {errors.name && ( <p className='error-input'>{errors.name}</p> )}
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChangePrice}
        />
         {errors.price && ( <p className='error-input'>{errors.price}</p> )}
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChangeStock}
        />
         {errors.stock && ( <p className='error-input'>{errors.stock}</p> )}
        <select name="status" onChange={handleChange}>
          Status:
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <select onChange={handleChangeCat}>
          <option value="" hidden>
            Categories
          </option>
          {state.categories?.length &&
            state.categories.sort((a, b) => a.name.localeCompare(b.name)) &&
            state.categories.map((category) => (
              <option key={category.id} value={category.name || category}>
                {category.name}
              </option>
            ))}
        </select>
        {product.categories.length &&
          product.categories?.map((category, i) => (
            <div key={i}>
              <p>{category.name || category}</p>
              <button onClick={(event) => handleDeleteCat(category, event)}>
                x
              </button>
            </div>
          ))}
        <textarea
          name="description"
          cols="30"
          rows="10"
          value={product.description}
          onChange={handleChangeDescription}
        >
          {product.description}
        </textarea>
        {errors.description && ( <p className='error-input'>{errors.description}</p> )}
        <input type="submit" name="Update info" />
      </form>
      <img src={`${product.image}`} alt="" />
      <button onClick={handleDelete}>Delete product</button>
    </div>
  );
}
