import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import {
  selectCategoriesMap,
  selectIsLoading,
} from "../../store/categories/category.selector";
import "./category.styles.scss";
import Spinner from "../../components/spinner/spinner.component";

//comp to display shopping categories
//like daughters of shop or daughters of categories-preview comp
const Category = () => {
  //getting the category from the url
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectIsLoading);
  const [products, setProducts] = useState(categoriesMap[category]);

  // whenever there is a change in the category-URL or
  // whenever there is a change in the categoriesMap, products-to-display also updates accordingly
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <div className="category-page">
      <h2 className="category-title">{category.toUpperCase()}</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="category-container">
          {products &&
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Category;
