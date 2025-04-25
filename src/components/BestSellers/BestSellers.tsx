import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router'

export type ProductType = {
  _id: string
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
  createdAt: string
  updatedAt: string
  __v: number
}

const BestSellers = () => {
  const [products, setProducts] = useState<ProductType[]>([])

  useEffect(() => {
    const promise = axios.get(
      'https://masterclass.kimitsu.it-incubator.io/api/products'
    )
    promise.then((res) => {
      const products = res.data
      setProducts(products)
    })
  }, [])

  return (
    <div className="bestSeller">
      <h2>Bestsellers</h2>

      <div className="cards">
        {products.map((pr) => {
          return (
            <div className="card" key={pr.id}>
              <img src={pr.image} alt="img" />
              <h4>{pr.title}</h4>
              <p className="price">${pr.price}</p>
              {/* <button>Show more</button> */}
              <Link to={`/product/${pr.id}`}>Show more</Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BestSellers
