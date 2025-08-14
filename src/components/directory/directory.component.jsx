import DirectoryItem from "../directory-item/directory-item.component";

import "./directory.styles.scss";

//we use this comp in the home page to display all the shopping categories
const Directory = ({ categories }) => {
  return (
    <div className="directory-container">
      {categories.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Directory;
