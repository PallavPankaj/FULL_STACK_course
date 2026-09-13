import { useState } from "react";
function CheckoutForm() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    pincode: "",
    phone: "",
    payment: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return (
    <section className="checkout-section" id="checkout">
      <h2>Complete Your Order</h2>
      <form onSubmit={submit}>
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={change}
          placeholder="Enter your full name"
          required
        />
        <label htmlFor="address">Address</label>
        <textarea
          id="address"
          name="address"
          rows="4"
          value={form.address}
          onChange={change}
          placeholder="Enter your complete address"
          required
        ></textarea>
        <label htmlFor="city">City</label>
        <input
          id="city"
          name="city"
          value={form.city}
          onChange={change}
          placeholder="Enter your city"
          required
        />
        <label htmlFor="pincode">Pincode</label>
        <input
          id="pincode"
          name="pincode"
          value={form.pincode}
          onChange={change}
          placeholder="Enter 6-digit pincode"
          maxLength="6"
          required
        />
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          name="phone"
          value={form.phone}
          onChange={change}
          placeholder="Enter 10-digit phone number"
          maxLength="10"
          required
        />
        <fieldset>
          <legend>Payment Method</legend>
          <label>
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={form.payment === "cod"}
              onChange={change}
              required
            />{" "}
            Cash on Delivery
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="upi"
              checked={form.payment === "upi"}
              onChange={change}
            />{" "}
            UPI
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="card"
              checked={form.payment === "card"}
              onChange={change}
            />{" "}
            Credit / Debit Card
          </label>
        </fieldset>
        <button type="submit">Place Order</button>
        {submitted && (
          <div id="confirmation" className="success-message">
            Order placed successfully!
          </div>
        )}
      </form>
    </section>
  );
}
export default CheckoutForm;
