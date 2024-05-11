import axios from 'axios'
import  { useEffect } from 'react'
import { useState } from 'react'
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addItem, plusLike } from '../../redux/mainSlice'

const AutoMotive = () => {
    const dispatch = useDispatch();
    const addToCart = (product) => {
        product.count = 1
        dispatch(addItem(product))
      }
    
      const handleLikeProduct = (product) => {
        dispatch(plusLike(product))
      }
    const [products, setProducts] = useState<string[]>([])
    useEffect(() => {
        axios('https://dummyjson.com/products/category/automotive')
        .then(res => setProducts(res.data.products))
    })
  return (
    <div className='main_wrapper'>
    <h1 className='featured_event'>Featured event</h1>
    <div className='automotive_image_wrapper'>
    </div>
    <h2  className='discount'> Get discount up to 60% </h2>
    <div className='line'></div>
      <div className='laptops_container'>
      {products.map(product => (
        <div key={product.id} className='product_cart_wrapper'>
            <Link to={`/product/${product.id}`}><img src={product.thumbnail} alt="" /></Link>
            <h2 className='pr_title'>{product.title}</h2>
            <p className='description'>{product.description}</p>
            <p className='price'>${product.price} <span> 30% off</span></p>
            <button className='add_to_wishlist' onClick={() => handleLikeProduct(product)}> <span>add to watchlist</span> <FaRegHeart/></button>
            <button className='add_to_wishlist' onClick={() => addToCart(product)}> <span>add to cart</span> <MdOutlineLocalGroceryStore/></button>
        </div>
       ))}
      </div>
    </div>
  )
}

export default AutoMotive