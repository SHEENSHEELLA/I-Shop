import axios from 'axios'
import { useEffect, useState } from 'react'
import type { ProductType } from '../BestSellers/BestSellers.tsx'
import rating from '../../assets/img/rating.svg'
import cartWhite from '../../assets/img/cartWhite.svg'
import cart from '../../assets/img/cart.svg'
import arrowBack from '../../assets/img/arrowBack.svg'
import { useParams, Link } from 'react-router'
import Reviews from '../Reviews/Reviews.tsx'

const Product = () => {
  const [product, setProduct] = useState<ProductType | null>(null)

  const [isProductInCart, setIsProductInCart] = useState<boolean>(false)

  const { id } = useParams()

  useEffect(() => {
    axios
      .get(`https://masterclass.kimitsu.it-incubator.io/api/products/${id}`)
      .then((res) => setProduct(res.data))
  }, [id])

  const addProductToCartHandler = () => {
    alert('Товар успешно добавлен в корзину')
    setIsProductInCart(true)
  }

  if (product === null) {
    return <h2>Продукт еще грузится ...</h2>
  }

  return (
    <div>
      <div className="arrowBack">
        <Link to={'/'}>
          <img src={arrowBack} alt="arrowBack" />
          Back to Best Seller
        </Link>
      </div>

      <div className="product">
        <img src={product.image} alt="" />
        <div className="info">
          <p className="title">{product.title}</p>
          <p className="price">$ {product.price}</p>
          <div className="rating">
            <p>Rating: {product.rating.rate}</p>
            <img src={rating} alt="" />
          </div>
          <div className="category">
            <span>Category:</span>
            <p>{product.category}</p>
          </div>
          <p className="description">{product.description}</p>

          <button
            onClick={addProductToCartHandler}
            className={`button ${isProductInCart ? 'active' : ''}`}
          >
            <img src={isProductInCart ? cart : cartWhite} alt="cart icon" />
            {isProductInCart ? 'Go to cart' : 'Add to cart'}
          </button>
        </div>
      </div>
      <Reviews />
    </div>
  )
}

export default Product
