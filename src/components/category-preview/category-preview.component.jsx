import ProductCard from "../product-card/product-card.component";
import { Link } from "react-router-dom";
import "./category-preview.styles.scss";

// what is this component for?
// in the shop page, u know there are categories and also products in each category
// this comp displays a single category in the shop page by displaying only 4 products in each cateogry

//! in this comp, we are getting the category-title and a category-of-products
// we are just displaying the title and first 4 products in each category

const CategoryPreview = ({ title, products }) => (
  <div className="category-preview-container">
    {/* why title in span, coz this will be link */}
    <h2>
      <Link to={title} className="title">
        {title.toUpperCase()}
      </Link>
    </h2>

    {/* filtering to keep only first 4 products,  */}
    <div className="preview">
      {Array.isArray(products) &&
        products
          .filter((_, id) => id < 4)
          .map((product) => <ProductCard key={product.id} product={product} />)}
    </div>
  </div>
);

export default CategoryPreview;
