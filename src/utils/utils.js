export const isJsonString = (data) => {
  try {
    JSON.parse(data);
  } catch (error) {
    return error;
  }
  return true;
};

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(console.log(error));
  });
};
export const getItem = (label, key, icon, children, type) => {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
};
export const renderOptions = (arr) => {
  let results = [];
  if (arr) {
    results = arr?.map((opt) => {
      return {
        value: opt,
        label: opt,
      };
    });
  }
  results.push({
    label: " + add type",
    value: "add_type",
  });
  return results;
};
export const convertPrice = (price) => {
  try {
    const result = price?.toLocaleString().replaceAll(",", ".");
    return `${result} VND`;
  } catch (error) {
    console.log(error);
  }
};
export const price = (price) => {
  try {
    const result = price?.toLocaleString().replaceAll(",", ".");
    return result;
  } catch (error) {
    console.log(error);
  }
};
