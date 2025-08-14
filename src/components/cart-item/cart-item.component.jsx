import "./cart-item.styles.scss";

//there are three components
//cart-icon, cart-dropdown, cart-item
//cart-icon is what is displayed on the webpage once user signs in
//cart-dropdown is shown is when user clicks the cart icon, in a toggling way
//cart-item is the item that does into cart dropdown
const CartItem = ({ cartItem }) => {
  const { imageUrl, price, name, quantity } = cartItem;

  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={`${name}`} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x ${price}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
