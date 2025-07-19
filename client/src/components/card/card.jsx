import { useState } from "react";
import "./card.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";

function Card({ item }) {
  const [saved, setSaved] = useState(item.isSaved);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await apiRequest.get(`/posts/${item._id}`);
        setSaved(res.data.isSaved);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, []);

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
    }
    setSaved(!saved);
    try {
      await apiRequest.post("/users/save", { postId: item._id });
    } catch (error) {
      console.error("Error saving post:", error);
      setSaved(!saved); // Revert the saved state if the request fails
    }
  };
  return (
    <div className="card">
      <Link to={`/${item._id}`} className="imageContainer">
        <img src={item.images[0]} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item._id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className="price">$ {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="icons">
            <div
              onClick={handleSave}
              className="icon"
              style={{
                cursor: "pointer",
                backgroundColor: saved ? "#fece51" : "transparent",
              }}
            >
              <img src="/save.png" alt="" />
            </div>
            <div className="icon">
              <img src="/chat.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
