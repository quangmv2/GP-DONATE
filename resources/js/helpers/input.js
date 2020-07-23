export const isValid = (field) => (!(field === '' || field === null || field === undefined));

export const removeSpecialCharacter = (string) => string.replace(/[^A-Za-z0-9@_.-\s]/g, '');

export const removeHtmlTag = (string) => string.replace(/<\/?((?!(t)\b)\w*)\/?>/g, '');

export const checkNumberFieldLength = (e) => {
  if (e.target.value.length > 4) {
    e.target.value = e.target.value.slice(0, 4);
  }
};

export const isEmptyString = (str) => !str || str.length === 0;
