import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    ownerName: "",
    ownerPhone: "",
    propertyAddress: "",
    city: "",
    rent: "",
    advanceAmount: "",
    visitAllowed: false,
    description: ""
  });

  const [result, setResult] = useState(null);

const API_URL = "https://rental-fraud-backend-8.onrender.com/api/rentals/analyze";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      ...form,
      rent: Number(form.rent),
      advanceAmount: Number(form.advanceAmount)
    };

    try {
      const response = await axios.post(API_URL, requestData);
      setResult(response.data);
    } catch (error) {
      alert("Error while checking rental fraud");
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1>Rental Fraud Detection</h1>
      <p>Check whether a rental property looks suspicious or safe.</p>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="ownerName"
          placeholder="Owner Name"
          value={form.ownerName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="ownerPhone"
          placeholder="Owner Phone"
          value={form.ownerPhone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="propertyAddress"
          placeholder="Property Address"
          value={form.propertyAddress}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="rent"
          placeholder="Monthly Rent"
          value={form.rent}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="advanceAmount"
          placeholder="Advance Amount"
          value={form.advanceAmount}
          onChange={handleChange}
          required
        />

        <label className="checkbox">
          <input
            type="checkbox"
            name="visitAllowed"
            checked={form.visitAllowed}
            onChange={handleChange}
          />
          Visit Allowed
        </label>

        <textarea
          name="description"
          placeholder="Property Description"
          value={form.description}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Check Fraud Risk</button>
      </form>

      {result && (
        <div className="result">
          <h2>Analysis Result</h2>

          <p>
            <strong>Risk Level:</strong> {result.riskLevel}
          </p>

          <p>
            <strong>Fraud Score:</strong> {result.fraudScore}
          </p>

          <p>
            <strong>Message:</strong> {result.message}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;