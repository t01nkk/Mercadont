import React from 'react'
import { useHistory } from 'react-router-dom'
import "./Favorite.css"
export const ArticleFavorites = ({id,name,price,rating,image}) => {
    const history = useHistory()

    const viewProduct = (id) => {
        history.push(`/home/${id}`);
      };
      const articleStyle = {
        height: "18rem"
      }
      const divPStyle = {
        height: "11rem"
      }
  return (
    // <div className='col-md-4'>
    //   <article onClick={()=> viewProduct(id)} className="card text-center" >
    //             <picture>
    //               <img src={image} alt={name} className="card-img-top" style={articleStyle}/>
    //             </picture>
    //      <div className='card-body' style={divPStyle}>
    //         {/* <div className='content-details-favorite' style={divPStyle}> */}
    //             <h4 className='card-title'>{name}</h4>
    //             <p className='card-text text-secondary'>{price}</p>
    //             <p className='card-text text-secondary'>{rating}</p>
    //         {/* </div> */}
    //      </div>
    //   </article>
    // </div>
  //   <div className='card float-right'>
  //     <div className='row'>
  //   {/* <article onClick={()=> viewProduct(id)} className="card text-center" > */}
  //      {/* <div className='card-body' style={divPStyle}> */}
  //             <picture className='col-sm-5'>
  //               <img src={image} alt={name} className="d-block w-100"/>
  //             </picture>

  //         <div className='col-sm-7e'>
  //           <div className='card-block'>
  //             {/* <h4 className='card-title'>{name}</h4> */}
  //             <p>{price}</p>
  //             <p>{rating}</p>
  //             <br />
  //      <button className='btn btn-primary btn-sm float-right'>volver</button>
  //         </div>
  //         </div>
  //      {/* </div> */}
  //   {/* </article> */}
  //     </div>
  // </div>

  
    <div className="row container-div-favorite">
      <div className="col-sm-7">
        <div className="card-block">
          <h4 className='card-title'>{name}</h4>
          <p>{price}.</p>
          <p>{rating}</p>
          <button className="btn btn-primary btn-sm" onClick={()=> viewProduct(id)}>
            View Product
          </button>
        </div>
      </div>

      <div className="col-sm-5 container-img-favorite">
        <img className="d-block w-100 img-favorite" src={image} alt=""/>
      </div>
    

  </div>

  )
}
