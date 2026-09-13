function ProductCard({ product, addToCart, onViewProduct }) {
  return (
    <div className="product-card">
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onViewProduct(product.id);
        }}
      >
        <img src={product.image} alt={product.name} />
      </a>
      <h3>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onViewProduct(product.id);
          }}
        >
          {product.name}
        </a>
      </h3>
      <p>₹{product.price.toLocaleString("en-IN")}</p>
      <button className="add-cart-btn" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}
export default ProductCard;
