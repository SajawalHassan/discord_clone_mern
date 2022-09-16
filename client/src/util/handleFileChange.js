export const handleFileChange = (e, setValue) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file); // Converting to base 64
    reader.onload = () => {
      setValue(reader.result);
    };
    reader.onerror = (err) => {
      console.log(err);
    };
  }
};
