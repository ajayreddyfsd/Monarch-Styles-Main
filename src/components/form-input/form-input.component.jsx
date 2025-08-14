import "./form-input.styles.scss";

// this is what the props passed to this component look like
// other than label, all the other attrs could be used directly inside the input tag as well
// <FormInput
//   label="Email"
//   type="email"
//   name="email"
//   value="ajay@example.com"
//   onChange={handleChange}
//   required
// />
//
// Inside the component:
// label = "Email"
// otherProps = {
//   type: "email",
//   name: "email",
//   value: "ajay@example.com",
//   onChange: handleChange,
//   required: true
// }

//this component is same as input-tag in html but more customized, we use this comp in both sign-in and sign-out routes
const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="group">
      {/* passing all the other props to the input tag as attributes */}
      <input className="form-input" {...otherProps} />

      {/* simple label tag with conditional class name */}
      <label
        className={`${
          otherProps.value.length ? "shrink" : ""
        } form-input-label`}
      >
        {label}
      </label>
    </div>
  );
};

export default FormInput;
