
export const FormInput = (props) => {
  const { name, register, placeholder, type, maxL } = props;

  return (
    <input
      type={type}
      placeholder={placeholder}
      {...register(name, { required: true, maxLength: maxL })}
    />
  );
};
