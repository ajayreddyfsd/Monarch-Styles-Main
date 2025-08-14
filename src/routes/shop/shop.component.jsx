import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import CategoriesPreview from "../../components/categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { setCategories } from "../../store/categories/category.action";
import { fetchCategoriesStartAsync } from "../../store/categories/category.action";
import { fetchCategoriesStart } from "../../store/categories/category.action";

const Shop = () => {
  const dispatch = useDispatch();

  //? old listener code block when we did not use redux-thunk
  //? old listener code block when we did not use redux-thunk
  //? old listener code block when we did not use redux-thunk
  //! below code gets the categories object from the firestoreDB
  //! and then passes it to the redux's single point of store using dispatch and categories-action-creator
  // useEffect(() => {
  //   const getCategoriesMap = async () => {
  //     const categoriesArray = await getCategoriesAndDocuments("categories");
  //     dispatch(setCategories(categoriesArray));
  //   };

  //   getCategoriesMap();
  // }, []);

  //? new listener code block using redux thunk function
  //? new listener code block using redux thunk function
  //? new listener code block using redux thunk function
  //! as soon as the component gets mounted, this runs
  // useEffect(() => {
  //   dispatch(fetchCategoriesStartAsync());
  // }, []);

  //? new listener code block using redux saga
  //? new listener code block using redux saga
  //? new listener code block using redux saga
  useEffect(() => {
    dispatch(fetchCategoriesStart());
  }, []);

  return (
    <Routes>
      {/* route for default component */}
      <Route index element={<CategoriesPreview />} />

      {/* route for custom component */}
      {/* we gonna use category key while extracting from the URL using useParams */}
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
