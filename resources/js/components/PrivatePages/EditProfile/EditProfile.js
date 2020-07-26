import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { postLogin } from "modules/auth/actions";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { fetchService } from "../../../services/fetch/fetchService";
import { ROOT_API_URL, GET_IMAGE, ACCESS_TOKEN, POST_POST, ROUTE } from "../../../constants";
import {

    selectUserInfo
} from "modules/auth/selectors";
import { HeaderNavigation } from "components/Atoms";
import "./EditProfile.scss";
import { StarFilled } from "@ant-design/icons";
import { Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import { Upload, message } from "antd";
import {
    LoadingOutlined,
    PlusOutlined
} from "@ant-design/icons";
import { openNotification } from "helpers";
import { NOTIFICATION_TYPE } from "constants";


const EditProfile = (props) => {
    const { userInfo } = props;
    const [name, setName] = useState('');
    const [foudation, setFoudation] = useState('');
    const [image, setImage] = useState(userInfo.personal_photo);
    const [fullPhoto, setFullPhoto] = useState(userInfo.full_photo);
    const submit = async () => {
        event.preventDefault();
        let data = {
            first_name: name,
            username: userInfo.username,
            personal_photo: image,
            full_photo: fullPhoto,
            foudation: foudation,
        }
        const [res, status] = await fetchService.fetch(`${ROOT_API_URL}/api/profile/me`, {
            method: "PUT",
            body: JSON.stringify(data)
        });
        if (status == 200) {
            openNotification(NOTIFICATION_TYPE.SUCCESS, 'Success');
            const { history } = props;
            history.push(ROUTE.MYPROFILE)
           
        } else if (status == 422) {
            const keys = Object.keys(res.errors);
            keys.forEach(key => openNotification(NOTIFICATION_TYPE.ERROR, res.errors[key]));

        } else {
            openNotification(NOTIFICATION_TYPE.ERROR, 'Error', '')
           
        }
    }




    const uploadFullphoto = async (e) => {
        var formData = new FormData();
        formData.append("photo", e.target.files[0]);
        const res = await fetchService.upload(`${ROOT_API_URL}/api/photo/up`, false, {
            method: 'POST',
            body: formData,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
                "Accept": "application/json",
                'Access-Control-Expose-Headers': 'Access-Control-Allow-Origin',
                'Access-Control-Allow-Origin': '*',
            }
        }).then(data => {
            const { image_directory } = JSON.parse(data);
            if (image_directory) {
                setFullPhoto(image_directory);
                console.log(fullPhoto);
            }
        });
    }
    const uploadAvatar = async (e) => {
        var formData = new FormData();
        formData.append("photo", e.target.files[0]);
        const res = await fetchService.upload(`${ROOT_API_URL}/api/photo/up`, false, {
            method: 'POST',
            body: formData,
            headers: {
                "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
                "Accept": "application/json",
                'Access-Control-Expose-Headers': 'Access-Control-Allow-Origin',
                'Access-Control-Allow-Origin': '*',
            }
        }).then(data => {
            const { image_directory } = JSON.parse(data);
            if (image_directory) {
                setImage(image_directory)
            }
        });
    }
    const inputName = (e) => {
        setName(e.target.value);
    };
    const changeFoudation = (e) => {
        setFoudation(e.target.value);
        console.log(e.target.value)
    };



    return (
        <div className="private-fullheight">
            <div className="container">
                <HeaderNavigation headerName="Edit Profile" />

                <div className="bgImg">
                    <div className="info-bg">

                        {userInfo.code_id !== null ? <div className="image">
                            <StarFilled className="icon-star" />
                            <img
                                src={GET_IMAGE(image)}
                                alt="Girl in a jacket"
                                width="60"
                                height="60"
                            ></img>
                        </div> : <div className="image"><img
                            src={GET_IMAGE(image)}
                            //  src={GET_IMAGE(userInfo.personal_photo)}
                            alt="Girl in a jacket"
                            width="60"
                            height="60"
                        ></img> </div>}
                        <label htmlFor="upload"> <span className="text">Change your avatar</span></label>
                        <input id="upload" type="file" name="photo" style={{ visibility: 'hidden' }} onChange={uploadAvatar} />

                    </div>
                </div>
                <div className="body-wrapper wrapper-profile">
                    <form >
                        <div className="form-submit">
                        <label className='username-label'>Name*</label>
                            <TextField
                                className="form-text"
                                id="standard-password-input"
                                placeholder={userInfo.first_name}
                                type="text"
                                name="username"
                                value={name}
                                onChange={inputName}
                            />
                        </div>
                        <div className="form-submit">
                            <label className='username-label'>User name</label>
                            <TextField
                                disabled
                                className="form-text"
                                id="standard-password-input"
                                placeholder={userInfo.username}
                                type="text"
                                name="username"
                            />
                        </div>
                        <div className="form-submit">
                        <label className='username-label'>Foudation</label>
                            <TextField
                                className="form-text"
                                id="standard-password-input"
                           
                                type="text"
                                name="name"
                                placeholder={userInfo.foudation}
                                value={foudation}
                                onChange={changeFoudation}

                            />
                        </div>

                       { userInfo.full_photo !== null ? <><label htmlFor="fullPhoto"> <img
                                src={GET_IMAGE(fullPhoto)}
                                className='full-photo-image'
                                alt="Girl in a jacket"
                                width="100%"
                                height="100%"
                            ></img></label>
                            <input id="fullPhoto" type="file" name="fullPhoto" style={{ visibility: 'hidden' }} onChange={uploadFullphoto} /> </>
                            : <div className="form-submit form-upload form-upload-fullPhoto">
                            <label htmlFor="fullPhoto"><PhotoCameraIcon style={{ fontSize: '37px' }} /></label>
                            <input id="fullPhoto" type="file" name="fullPhoto" style={{ visibility: 'hidden' }} onChange={uploadFullphoto} />
                        </div>}

                        <button
                            type="submit"
                            className="button edit-profile-button"
                            onClick={submit}
                        >
                            Submit
                    </button>
                    </form>

                </div>
            </div>
        </div>
    );
}


const mapDispatchToProps = {
};

const mapStateToProps = createStructuredSelector({
    userInfo: selectUserInfo()
});

EditProfile.defaultProps = {
    login: () => null,
    errors: {}
};


export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
