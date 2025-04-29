import { useState, ChangeEvent, useEffect } from 'react'
import avatarIcon from '../../assets/img/avatarIcon.svg'
import reviewsData from '../../api/reviews.json'

export type ReviewType = {
  id: string
  author: string
  title: string
  text: string
  date: string
  rating: number
}

// const reviewsData = [
//   {
//     author: 'Jane Cooper',
//     title: 'Amazing Product',
//     text: 'Lorem Ipsum is simply dummy text',
//     date: '01/01/2021',
//     rating: 4,
//   },
//   {
//     author: 'Max Doodle',
//     title: 'Best choice',
//     text: 'Various versions have evolved over the years',
//     date: '05/23/2021',
//     rating: 5,
//   },
// ]

const Reviews = () => {
  const [reviews, setReviews] = useState<ReviewType[]>(() => {
    const saved = localStorage.getItem('reviews')
    return saved ? JSON.parse(saved) : reviewsData
  })
  const [reviewInput, setReviewInput] = useState({
    text: '',
    author: '',
    title: '',
    rating: 5, // default value
  })

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setReviewInput((prev) => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value,
    }))
  }

  // Сохраняем отзывы в localStorage при их изменении
  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews))
  }, [reviews])

  const addReviewHandler = () => {
    if (!reviewInput.text.trim()) return

    const newReview: ReviewType = {
      id: Date.now().toString(),
      author: reviewInput.author || 'Аноним',
      title: reviewInput.title || 'Без названия',
      text: reviewInput.text,
      date: new Date().toLocaleDateString(),
      rating: reviewInput.rating,
    }

    setReviews([newReview, ...reviews])
    setReviewInput({
      text: '',
      author: '',
      title: '',
      rating: 5,
    })
  }

  return (
    <div>
      <div className="review">
        <h3>Reviews ({reviews.length})</h3>
        <input
          type="text"
          name="author"
          value={reviewInput.author}
          onChange={handleInputChange}
          placeholder="Your name"
          className="review-input"
        />

        <input
          type="text"
          name="title"
          value={reviewInput.title}
          onChange={handleInputChange}
          placeholder="Review title"
          className="review-input"
        />

        <select
          name="rating"
          value={reviewInput.rating}
          onChange={handleInputChange}
          className="review-select"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} Star{num !== 1 ? 's' : ''}
            </option>
          ))}
        </select>
        <textarea
          name="text"
          value={reviewInput.text}
          placeholder="Provide your text..."
          onChange={handleInputChange}
          className="review-textarea"
        ></textarea>
        <button onClick={addReviewHandler} disabled={!reviewInput.text.trim()}>
          Send review
        </button>
      </div>
      <div>
        {reviews.map((r) => {
          return (
            <div className="reviewField" key={r.id}>
              <div className="info">
                <div className="user">
                  <img src={avatarIcon} alt="" />
                  <div className="infoBox">
                    <p className="author">{r.author}</p>
                    <p className="rating">{r.rating} Rating</p>
                  </div>
                </div>
                <div>
                  <p className="date">{r.date}</p>
                </div>
              </div>

              <div className="content">
                <p className="title">{r.title}</p>
                <p>{r.text}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Reviews
