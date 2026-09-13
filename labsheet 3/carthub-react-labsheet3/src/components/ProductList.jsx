import products from "../products";
import ProductCard from "./ProductCard";
function ProductList({ addToCart, onViewProduct }) {
  return (
    <div className="product-container">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          addToCart={addToCart}
          onViewProduct={onViewProduct}
        />
      ))}
    </div>
  );
}
export default ProductList;
