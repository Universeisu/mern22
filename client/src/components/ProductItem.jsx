import React from 'react'

const ProductItem = ({ image, name, price, rateing }) => {
 return (
  <div className='bg-white px-3 py-2 rounded-2xl flex item-cente gap-3 shodow-sam w-64'>
   <img src={image} alt="" className='rounded-2xl w-20' />
   <div className='space-y-1'>
    <h5>{name}</h5>
    <div className="rating rating-sm">
     <input type="radio" name={name} className="mask mask-star-2 bg-orange-400" disabled defaultChecked={rateing == 1 ? true : false} />
     <input type="radio" name={name} className="mask mask-star-2 bg-orange-400" disabled defaultChecked={rateing == 2 ? true : false} />
     <input type="radio" name={name} className="mask mask-star-2 bg-orange-400" disabled defaultChecked={rateing == 3 ? true : false} />
     <input type="radio" name={name} className="mask mask-star-2 bg-orange-400" disabled defaultChecked={rateing == 4 ? true : false} />
     <input type="radio" name={name} className="mask mask-star-2 bg-orange-400" disabled defaultChecked={rateing == 5 ? true : false} />

    </div>
    <div className="text-red">{price}</div>
   </div>
  </div>
 )
}

export default ProductItem