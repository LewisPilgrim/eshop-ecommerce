import React, { useEffect, useState } from "react"
import styles from "./ReviewProduct.module.scss"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUserID, selectUserName } from "../../redux/features/authSlice"
import Card from "../card/Card"
import StarsRating from "react-star-rate"
import { Timestamp, addDoc, collection } from "firebase/firestore"
import { toast } from "react-toastify"
import { db } from "../../firebase/config"
import useFetchDocument from "../../customHooks/useFetchDocument"
import spinnerImg from "../../assets/spinner.jpg"

const ReviewProduct = () => {
  const [rate, setRate] = useState(0)
  const [review, setReview] = useState("")
  const [product, setProduct] = useState(null)

  const { id } = useParams()
  const { document } = useFetchDocument("products", id)
  const userID = useSelector(selectUserID)
  const userName = useSelector(selectUserName)

  useEffect(() => {
    setProduct(document)
  }, [document])

  const submitReview = (e) => {
    e.preventDefault()

    const today = new Date()
    const date = today.toDateString()
    const reviewConfig = {
      userID,
      userName,
      productID: id,
      rate,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate(),
    }
    try {
      addDoc(collection(db, "reviews"), reviewConfig)
      toast.success("Review submitted successfully")
      setRate(0)
      setReview("")
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <section>
      <div className={`container ${styles.review}`}>
        <h2>Review Products</h2>
        {product === null ? (
          <img src={spinnerImg} alt='Loading...' style={{ width: "50px" }} />
        ) : (
          <>
            <p>
              <b>Product Name: </b>
              {product.name}
            </p>
            <img
              src={product.imageURL}
              alt={product.name}
              style={{ width: "100px" }}
            />
          </>
        )}
        <Card cardClass={styles.card}>
          <form onSubmit={(e) => submitReview(e)}>
            <label>Rating:</label>
            <StarsRating
              value={rate}
              onChange={(rate) => {
                setRate(rate)
              }}
            />
            <label>Review:</label>
            <textarea
              value={review}
              required
              onChange={(e) => setReview(e.target.value)}
              cols='30'
              rows='10'
            ></textarea>
            <button type='submit' className='--btn --btn-primary'>
              Submit Review
            </button>
          </form>
        </Card>
      </div>
    </section>
  )
}

export default ReviewProduct
