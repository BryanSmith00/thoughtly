import "./postmodal.css";

import axios from "axios";
import { useState } from "react";

export const PostModal = ({ open, close }) => {
  const [inputValue, setInputValue] = useState({
    text: "",
  });
  const { text } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/createthought",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log(data);
      const { success, message } = data;
      if (success) {
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (open) {
    return (
      <>
        <div className="overlay">
          <div className="modal-container">
            <div className="modal-header">
              <p>this is there a profile pic will go</p>
              <button className="close-modal-btn" onClick={close}>
                Cancel
              </button>
            </div>
            <form className="form" onSubmit={handleSubmit}>
              <div className="modal-content">
                <input
                  type="text"
                  required
                  value={text}
                  name="text"
                  onChange={handleOnChange}
                ></input>
              </div>
              <div className="modal-footer">
                <p>footer</p>
                <button type="Submit">Post</button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
};
