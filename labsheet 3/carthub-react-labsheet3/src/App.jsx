import { useState } from "react";
import products from "./products";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import CheckoutForm from "./components/CheckoutForm";
import "./App.css";
function App() {
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState("home");
  const [selected, setSelected] = useState(null);
  const addToCart = (product) =>
    setCart((c) => {
      const x = c.find((i) => i.product.id === product.id);
      return x
        ? c.map((i) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          )
        : [...c, { product, quantity: 1 }];
    });
  const count = cart.reduce((s, i) => s + i.quantity, 0);
  const go = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const header = (
    <header>
      <div className="logo">
        <span className="logo-icon">🛒</span>
        <span>CartHub</span>
      </div>
      <nav>
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            go("home");
          }}
        >
          Home
        </a>
        <a
          href="#products"
          onClick={(e) => {
            e.preventDefault();
            go("products");
          }}
        >
          Products
        </a>
        <a
          href="#cart"
          onClick={(e) => {
            e.preventDefault();
            go("cart");
          }}
        >
          Cart <span id="cart-count">{count}</span>
        </a>
      </nav>
    </header>
  );
  const footer = (
    <footer>
      <p>CartHub — Shop Smart. Live Better.</p>
      <p>Contact: support@carthub.com</p>
      <p>&copy; 2026 CartHub. All Rights Reserved.</p>
    </footer>
  );
  let content;
  if (page === "home")
    content = (
      <>
        <section className="hero">
          <h2>Everything You Want. One Cart Away.</h2>
          <p>
            Discover quality products, great prices and a smarter way to shop.
          </p>
          <a
            href="#products"
            onClick={(e) => {
              e.preventDefault();
              go("products");
            }}
          >
            Explore Products →
          </a>
        </section>
        <section className="featured-products">
          <h2>Why CartHub?</h2>
          <div className="product-container">
            <div className="product-card">
              <h3>🛍️ Wide Selection</h3>
              <p>Find everything you need in one place.</p>
            </div>
            <div className="product-card">
              <h3>💳 Easy Shopping</h3>
              <p>Simple and convenient shopping experience.</p>
            </div>
            <div className="product-card">
              <h3>🚚 Fast Delivery</h3>
              <p>Get your products delivered quickly.</p>
            </div>
            <div className="product-card">
              <h3>🔒 Secure Checkout</h3>
              <p>Your checkout experience stays simple and secure.</p>
            </div>
          </div>
        </section>
      </>
    );
  if (page === "products")
    content = (
      <section className="products-section">
        <h2>Explore Our Products</h2>
        <ProductList
          addToCart={addToCart}
          onViewProduct={(id) => {
            setSelected(id);
            go("detail");
          }}
        />
      </section>
    );
  if (page === "detail") {
    const p = products.find((x) => x.id === selected) || products[0];
    content = (
      <section className="product-detail">
        <div className="product-image">
          <img src={p.image} alt={p.name} />
        </div>
        <div className="product-info">
          <p className="product-category">CART HUB FEATURED PRODUCT</p>
          <h2>{p.name}</h2>
          <p className="price">₹{p.price.toLocaleString("en-IN")}</p>
          <p>
            Experience premium quality with the {p.name}. Designed for everyday
            use, comfort and reliability.
          </p>
          <label htmlFor="detail-quantity">Quantity:</label>
          <select id="detail-quantity">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
          <br />
          <br />
          <button onClick={() => addToCart(p)}>Add to Cart</button>
        </div>
      </section>
    );
  }
  if (page === "cart")
    content = (
      <Cart cart={cart} setCart={setCart} onCheckout={() => go("checkout")} />
    );
  if (page === "checkout") content = <CheckoutForm />;
  return (
    <>
      {header}
      <main>{content}</main>
      {footer}
    </>
  );
}
export default App;
