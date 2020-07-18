/* eslint-disable import/prefer-default-export */
import Cookies from 'js-cookie';
import { notification } from 'antd';
import languageObject from 'modules/translates/index';

/**
 * Open notification client
 * @param {String} type
 * @param {String} title
 * @param {String} description
 */
export const openNotification = (type, title, description) => {
    const languageCode = Cookies.get('languageCode');
    notification[type]({
        message: languageObject[languageCode][title]
            ? languageObject[languageCode][title]
            : title,
        description: languageObject[languageCode][description]
            ? languageObject[languageCode][description]
            : description,
    });
};