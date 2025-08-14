import { useSelector } from "react-redux";
import {selectCategoriesMap} from "../../store/categories/category.selector";
import CategoryPreview from "../../components/category-preview/category-preview.component";

//what this comp does?
//displays the shop page with all the categories

const CategoriesPreview = () => {
  //getting the products data from the global products context
  //and not from the json file
  const categoriesMap = useSelector(selectCategoriesMap);
  const keys = Object.keys(categoriesMap);

  //! we are getting the categories from context, and the context got it from firestoreDB
  // so we are passing each category of products to the CategoryPreview and it is displaying the category of prodcuts
  return (
    <div className="shop-container">
      {keys.map((key) => {
        const products = categoriesMap[key];
        return <CategoryPreview key={key} title={key} products={products} />;
      })}
    </div>
  );
};

export default CategoriesPreview;

// Example structure of products (categoryMap) before flattening:
// const categoriesMap = {
//   hats: [
//     { id: 1, name: "Beanie", price: 20 },
//     { id: 2, name: "Fedora", price: 30 }
//   ],
//   sneakers: [
//     { id: 3, name: "Air Max", price: 120 },
//     { id: 4, name: "Converse", price: 80 }
//   ],
//   jackets: [
//     { id: 5, name: "Leather Jacket", price: 250 },
//     { id: 6, name: "Denim Jacket", price: 150 }
//   ]
// };
