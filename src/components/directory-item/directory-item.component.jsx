import "./directory-item.styles.scss";
import { Link } from "react-router-dom";

//we use this comp in the home page to display all the shopping categories
const DirectoryItem = ({ category }) => {
  const { imageUrl, title } = category;
  return (
    <div className="directory-item-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <Link
        to={`/shop/${title.toLowerCase()}`}
        className="directory-item-body-container"
      >
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Link>
    </div>
  );
};

export default DirectoryItem;
