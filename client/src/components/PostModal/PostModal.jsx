import "./postmodal.css";

import axios from "axios";

export const PostModal = ({ open, close }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
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
            <form className="" onSubmit={handleSubmit}>
              <div className="modal-content">
                <input class="create-thought-text"></input>
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
