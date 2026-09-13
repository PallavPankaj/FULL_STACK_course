function Cart({ cart, setCart, onCheckout }) {
  const updateQuantity = (id, value) =>
    setCart(
      cart.map((item) =>
        item.product.id === id
          ? { ...item, quantity: Math.max(1, Number(value) || 1) }
          : item,
      ),
    );
  const remove = (id) => setCart(cart.filter((item) => item.product.id !== id));
  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  if (!cart.length)
    return (
      <section className="cart-section">
        <h2>Your Shopping Cart</h2>
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added anything yet.</p>
          <a href="#products">Start Shopping</a>
        </div>
      </section>
    );
  return (
    <section className="cart-section">
      <h2>Your Shopping Cart</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.product.id}>
              <td className="cart-product">
                <img src={item.product.image} alt={item.product.name} />
                <span>{item.product.name}</span>
              </td>
              <td>
                <input
                  className="quantity-input"
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.product.id, e.target.value)
                  }
                />
              </td>
              <td>₹{item.product.price.toLocaleString("en-IN")}</td>
              <td>
                ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
              </td>
              <td>
                <button
                  className="remove-btn"
                  onClick={() => remove(item.product.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cart-summary">
        <h3>
          Grand Total: <span>₹{total.toLocaleString("en-IN")}</span>
        </h3>
        <a
          href="#checkout"
          onClick={(e) => {
            e.preventDefault();
            onCheckout();
          }}
        >
          Proceed to Checkout →
        </a>
      </div>
    </section>
  );
}
export default Cart;
