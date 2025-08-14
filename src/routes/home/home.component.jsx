import Directory from "../../components/directory/directory.component";

// what is this home component actually doing??????

// we have a created an array of objs. each obj has imageURL for the category, title for the category, and id for the category.
// so all of this as a bunch we are passing it to directory component through props
// in the directory component, all it does is to create an {image and title} box for each of those objs
// so it uses map and creates directory-item-comp for each by passing their respective imageURL and title as prop
// now finally, each of those directory-item-comps, go to their respective directory-item-comp code along with their respective
// imageURL and title and produces a block as output which we see on the screen

const Home = () => {
  const categories = [
    {
      id: 1,
      title: "hats",
      imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
    },
    {
      id: 2,
      title: "jackets",
      imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
    },
    {
      id: 3,
      title: "sneakers",
      imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
    },
    {
      id: 4,
      title: "womens",
      imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
    },
    {
      id: 5,
      title: "mens",
      imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
    },
  ];

  return (
    <div>
      <Directory categories={categories} />
    </div>
  );
};

export default Home;

// what is this home component actually doing??????

// we have a created an array of objs. each obj has imageURL for the category, title for the category, and id for the category.
// so all of this as a bunch we are passing it to directory component through props
// in the directory component, all it does is to create an {image and title} box for each of those objs
// so it uses map and creates category-comp for each by passing their respective imageURL and title as prop
// now finally, each of those category-comps, go to their respective category-comp code along with their respective
// imageURL and title and produces a block as output which we see on the screen
