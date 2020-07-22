import languageObject from 'modules/translates';
import { LANGUAGE_CODE_DEFAULT } from 'constants';
import Cookies from 'js-cookie';

export const getMessageTranslate = (type, message, code) => {
  const langCode = Cookies.get('languageCode') || LANGUAGE_CODE_DEFAULT;
  const languageCode = code ?? langCode;
  return languageObject[languageCode][type][message];
};
