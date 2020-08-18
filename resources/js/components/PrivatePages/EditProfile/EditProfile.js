import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { fetchService } from "../../../services/fetch/fetchService";
import { ROOT_API_URL, GET_IMAGE, ACCESS_TOKEN, ROUTE } from "../../../constants";
import {
    selectUserInfo
} from "modules/auth/selectors";
import { HeaderNavigation } from "components/Atoms";
import "./EditProfile.scss";
import { StarFilled } from "@ant-design/icons";
import TextField from "@material-ui/core/TextField";
import UserAvatar from "react-user-avatar";
import { openNotification } from "helpers";
import { NOTIFICATION_TYPE } from "constants";
import { FormattedMessage } from "react-intl";
import { NavigatorContext } from "../../../context/BottomNavigatorContextAPI";
import { verifyToken } from "modules/auth/actions";


const EditProfile = (props) => {
    const { userInfo } = props;
    const [name, setName] = useState(userInfo.first_name);
    const [foudation, setFoudation] = useState(userInfo.foudation);
    const [description, setDescription] = useState(userInfo.description);
    const [image, setImage] = useState(userInfo.personal_photo);
    const [fullPhoto, setFullPhoto] = useState(userInfo.full_photo);
    const  { setShowNavigator } = useContext(NavigatorContext);


    useEffect(() => {
        setShowNavigator(false);
        return () => setShowNavigator(true);
    }, []);

    useEffect(() => {
        setImage(userInfo.personal_photo);
        setFullPhoto(userInfo.full_photo);
    }, [userInfo])

    const submit = async (event) => {
        event.preventDefault();
        let data = {
            first_name: name,
            username: userInfo.username,
            personal_photo: image,
            full_photo: fullPhoto,
            foudation: foudation,
            description: description
        }
        const [res, status] = await fetchService.fetch(`${ROOT_API_URL}/api/profile/me`, {
            method: "PUT",
            body: JSON.stringify(data)
        });
        if (status == 200) {
            props.verifyTokenFnc();
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
    };
    let avatar = (
        <>
            <label htmlFor="upload">
                <img
                    src={GET_IMAGE(image)}
                    alt="Girl in a jacket"
                    width="60"
                    height="60"
                    className="avatar-image"
                />
            </label>
            <input id="upload" type="file" name="photo" style={{ visibility: 'hidden' }} onChange={uploadAvatar} />
        </>
    )

    if (!(userInfo.personal_photo && image)) {
        avatar =
            <>
                <label htmlFor="upload">
                    {
                        image==null?<UserAvatar size="100" name={`${userInfo.first_name}`} />:
                        <img className="UserAvatar--inner"
                            style={{ height: "100px", width: "100px", borderRadius: "100%" }}
                            src={GET_IMAGE(image)}
                        />
                    }
                </label>
                <input id="upload" type="file" name="photo" style={{ visibility: 'hidden' }} onChange={uploadAvatar} />
            </>
    }
    return (
        <div className="private-fullheight">
            <div className="container">
                <HeaderNavigation headerName="Edit Profile" />

                <div className="bgImg">
                    <img className='bg-avatar-left' src='/images/Left.png' />
                    <img className='bg-avatar-right' src='/images/Right.png' />
                    <div className="info-bg">
                        {userInfo.code_id || image ?
                            <div className="image">
                                {
                                    userInfo && userInfo.code_id?<StarFilled className="icon-star" /> : <></>
                                }
                                {avatar}
                            </div> :
                            <div className="image">{avatar} </div>
                        }
                        <label htmlFor="upload" style={{ marginTop: -25 }}>
                            <span className="text">
                                <FormattedMessage defaultMessage="Change Your Avatar" id="editProfile.changeYourAvatar" />
                            </span>
                        </label>
                        <input id="upload" type="file" name="photo" style={{ visibility: 'hidden' }} onChange={uploadAvatar} />
                    </div>
                </div>
                <div className="body-wrapper wrapper-profile">
                    <form >
                        <div className="form-submit">
                            <label className='username-label'><FormattedMessage defaultMessage="Name" id="common.name" />*</label>
                            <TextField
                                className="form-text"
                                type="text"
                                name="name"
                                value={name}
                                onChange={inputName}
                            />
                        </div>
                        <div className="form-submit">
                            <label className='username-label'><FormattedMessage defaultMessage="Username" id="common.username" /></label>
                            <TextField
                                disabled
                                className="form-text"
                                placeholder={userInfo.username}
                                type="text"
                                name="username"
                            />
                        </div>
                        <div className="form-submit">
                            <label className='username-label'><FormattedMessage defaultMessage="Foundation" id="common.foundation" /></label>
                            <TextField
                                className="form-text foudation-text"
                                type="text"
                                name="foundation"
                                value={foudation}
                                onChange={changeFoudation}
                            />
                        </div>
                        <div className="form-submit">
                            <label className='username-label'><FormattedMessage defaultMessage="Description" id="common.description" /></label>
                            <TextField
                                className="form-text foudation-text"
                                type="text"
                                name="description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}

                            />
                        </div>
                        {userInfo.full_photo || fullPhoto ?
                            <>
                                <label htmlFor="fullPhoto">
                                    <img
                                        src={GET_IMAGE(fullPhoto)}
                                        className='full-photo-image'
                                        alt="Girl in a jacket"
                                        width="100%"
                                        height="100%"
                                    />
                                </label>
                                <input id="fullPhoto" type="file" name="fullPhoto" style={{ visibility: 'hidden' }} onChange={uploadFullphoto} />
                            </>
                            :
                            <div className="form-submit form-upload form-upload-fullPhoto">
                                <label htmlFor="fullPhoto"><PhotoCameraIcon style={{ fontSize: '37px' }} /></label>
                                <input id="fullPhoto" type="file" name="fullPhoto" style={{ visibility: 'hidden' }} onChange={uploadFullphoto} />
                            </div>
                        }

                        <button
                            type="submit"
                            className="button edit-profile-button"
                            onClick={submit}
                        >
                            <FormattedMessage defaultMessage="Complete" id="common.complete" />
                        </button>
                    </form>
                </div>
            </div>
        </div>

    );
}


const mapDispatchToProps = {
    verifyTokenFnc: verifyToken,
};

const mapStateToProps = createStructuredSelector({
    userInfo: selectUserInfo()
});

EditProfile.defaultProps = {
    login: () => null,
    errors: {},
    userInfo: {}
};


export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
