import { useEffect, useState } from "react";
import { useAuth, upload, logout } from "./Firebase";
import './UploadFile.css';
import Popup from "./Popup";

function UploadFile() {
  const currentUser = useAuth();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState("https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showProgress, setShowProgress] = useState(true);
  const [showUploadSuccess, setShowUploadSuccess] = useState(false);
  const [resetProgress, setResetProgress] = useState(false); // State to reset progress bar

  function handleChange(e) {
    if (e.target.files[0]) {
      const selectedPhoto = e.target.files[0];
      setPhoto(selectedPhoto);
  
      // Create a URL for the selected photo to display preview
      const imageURL = URL.createObjectURL(selectedPhoto);
      setPhotoURL(imageURL);
    }
  }

  async function handleClick() {
    const fileInput = document.querySelector('.file'); // Get the file input element
  
    if (!photo && !fileInput.files.length) {
      // If no file is selected and file input is empty (after page refresh)
      alert("Please choose a file to upload.");
      return; // Exit early without proceeding with the upload
    }
  
    setLoading(true);
  
    try {
      // Use the file from the file input if it's not already set
      const selectedFile = photo || fileInput.files[0];
      await upload(selectedFile, currentUser, setLoading, setUploadProgress, setShowUploadSuccess);
    } catch (error) {
      console.error('Error uploading file:', error);
      setLoading(false);
      setErrorMessage("Error uploading file. Please try again.");
      setShowErrorPopup(true);
    }
  }

  async function handleLogout() {
    setLoading(true);
    try {
      await logout();
    } catch (error) {
      setErrorMessage("Error logging out. Please try again.");
      setShowErrorPopup(true);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);

  // Reset progress bar logic when showUploadSuccess changes
  useEffect(() => {
    if (showUploadSuccess) {
      // Reset progress after a delay to allow time for the user to see the success message
      const timeout = setTimeout(() => {
        setResetProgress(true); // Trigger progress bar reset
        setTimeout(() => {
          setResetProgress(false); // Reset the resetProgress state
          setUploadProgress(0); // Reset upload progress
        }, 500); // Reset after a short delay
      }, 2000); // Wait for 2 seconds before resetting progress bar
      return () => clearTimeout(timeout); // Cleanup timeout on unmount or state change
    }
  }, [showUploadSuccess]);

  // Function to handle closing the success popup and resetting progress bar
  function handleCloseSuccessPopup() {
    setShowUploadSuccess(false); // Close the success popup
    setResetProgress(true); // Trigger progress bar reset
    setTimeout(() => {
      setResetProgress(false); // Reset the resetProgress state
      setUploadProgress(0); // Reset upload progress
    }, 500); // Reset after a short delay
  }

  return (
    <div className="fields">
      <header>
        <div className="content-box">
          {currentUser ? (
            <div className="welcome-message">
              Welcome! {currentUser.email}
            </div>
          ) : (
            <h1 className="welcome-heading">
              Welcome to My Website
            </h1>
          )}
        </div>
        <nav>
          <button
            disabled={loading || !currentUser}
            onClick={handleLogout}
            className="logOutButton"
          >
            Log Out
          </button>
        </nav>
      </header>

      <img src={photoURL} alt="Avatar" className="avatar" />
      
      <div className="btn_file">
        <input type="file" className="file" onChange={handleChange} />
        <button disabled={loading || !photo} className="logOutButton1" onClick={handleClick}>
          Upload
        </button>
      </div>

      {showProgress && (
        <div className="upload-progress">
          <div className="progress-text">Uploading: {uploadProgress}%</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${uploadProgress}%` }} />
          </div>
        </div>
      )}

      {showUploadSuccess && (
        <Popup
          message="File uploaded successfully!"
          onClose={handleCloseSuccessPopup} // Use custom function to handle close
        />
      )}

      {showErrorPopup && (
        <Popup
          message={errorMessage}
          onClose={() => setShowErrorPopup(false)}
        />
      )}

      {/* Reset progress bar element */}
      {resetProgress && <div className="reset-progress-element" />}
    </div>
  );
}

export default UploadFile;
