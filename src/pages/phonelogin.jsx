import React, { useState } from "react";
import { sendOTP } from "../firebase";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function phonelogin() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const navigate = useNavigate(); // Initialize navigation

  const handleSendOTP = async () => {
    if (!phone) {
      alert("Please enter your phone number first.");
      return;
    }

    try {
      const confirmationResult = await sendOTP(phone);
      setConfirmation(confirmationResult);
      setShowOtpInput(true);
      alert("OTP Sent!");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      if (confirmation) {
        await confirmation.confirm(otp);
        alert("Phone Verified!");
        navigate("/student-options"); // Redirect to selection page
      } else {
        alert("Please request an OTP first.");
      }
    } catch (error) {
      alert("Invalid OTP. Try again.");
    }
  };

  return (
    <div>
      <h2>Phone Login</h2>
      <div id="recaptcha-container"></div>

      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={handleSendOTP}>Send OTP</button>

      {showOtpInput && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleVerifyOTP}>Verify OTP</button>
        </>
      )}
    </div>
  );
}

export default PhoneLogin;
