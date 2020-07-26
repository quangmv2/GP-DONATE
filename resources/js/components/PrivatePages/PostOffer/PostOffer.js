import React, { Component, useEffect, useState } from 'react';
import { ButtonAnt, HeaderNavigation } from 'components/Atoms';
import { FormattedMessage } from 'react-intl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import './PostOffer.scss';
import { DatePicker, TimePicker, Spin  } from 'antd';
import moment from 'moment';
import ButtonComponent from './Button';
import { fetchService } from "services";
import { Select } from 'antd';
import { ROOT_API_URL, GET_IMAGE, ACCESS_TOKEN, POST_POST, ROUTE } from "../../../constants";
import Hastag from './Hastag';
import { openNotification } from "helpers";
import { NOTIFICATION_TYPE } from "constants";
import { getMessageTranslate } from "helpers";


const dateFormat = 'DD MMMM YYYY';
const { Option } = Select;
const { RangePicker } = TimePicker;

const startTimeOffer = "00:00";
const endTimeOffer = "01:00";

const PostOffer = props => {

  const [hastagsValue, setHastagsValue] = useState([]);
  const [hastags, setHastags] = useState([]);
  const [typeOffer, setTypeOffer] = useState('');
  const [timeSlotArray, setTimeSlotArray] = useState([{
    start: startTimeOffer,
    end: endTimeOffer,
    days: {}
  }]);
  const [image, setImage] = useState(null);
  const [content, setContent] = useState('');
  const [dueDate, setDueDate] = useState(moment().format("YYYY-MM-DD"));
  const [materials, setMaterials] = useState('');
  const [loadingUpload, setLoadingUpload] = useState(false);

  useEffect(() => {
    fetchHastag();
  }, []);

  const submit =async () => {
    let data = {
      title: content,
      photo_thumbnail: image,
      full_photo: image,
      due_day: dueDate,
      hastags,
    }
    if (typeOffer === 'time'){
      data["offer"] = {
          type: "time",
          content: JSON.stringify(timeSlotArray)
      }
    } else {
      data["offer"] = {
          type: "goods",
          content: materials
      }
    }
    const [res, status] = await fetchService.fetch(`${POST_POST()}`, {
      method: "POST",
      body: JSON.stringify(data)
    });
    if (status == 201) {
      openNotification(NOTIFICATION_TYPE.SUCCESS, 'Success');
      const { history } = props;
      history.push(ROUTE.HOME)
    } else if (status == 422){
      const keys = Object.keys(res.errors);
      keys.forEach(key => openNotification(NOTIFICATION_TYPE.ERROR, res.errors[key]));
      
    } else {
      openNotification(NOTIFICATION_TYPE.ERROR, 'Error', '')
    }
  }

  const onChangeWeekdays = (index, id, name) => {
    const timeSlotArrayTmp = timeSlotArray.slice();
    timeSlotArrayTmp.forEach(tmp => {
      if (tmp.days[id]){
        delete tmp.days[id];
      }
    })
    const timeOffer = timeSlotArray[index];
    if (timeOffer.days[id]) {
      delete timeOffer.days[id];
    } else {
      timeOffer.days[id] = name;
    }
    setTimeSlotArray(arr => {
      const temp = arr.slice();
      temp[index] = timeOffer;
      return temp;
    });
  }

  const fetchHastag = async (search = "") => {
    const [options] = await fetchService.fetch(`${ROOT_API_URL}/api/hastag?q=${search}`, {
      method: 'GET'
    });
    setHastagsValue(options)
  }

  const inputMaterials = (e) => {
    setMaterials(e.target.value)
  }
  const inputContent = (e) => {
    setContent(e.target.value)
  };
  const onDueDate = (value, dateString) => {
    setDueDate(value.format('YYYY-MM-DD'))
  }

  const uploadSingleFile = async (e) => {
    var formData = new FormData();
    formData.append("photo", e.target.files[0]);
    setLoadingUpload(true);
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
      setLoadingUpload(false);
      if (image_directory) {
          setImage(image_directory)
      }
    });
  }

  const onRangeTime = (index, time) => {
    const timeOffer = timeSlotArray[index];
    timeOffer.start = time[0];
    timeOffer.end = time[1];
    setTimeSlotArray(arr => {
      const temp = arr.slice();
      temp[index] = timeOffer;
      return temp;
    });
  }

  const onChangeValue = (value) => {
    setTypeOffer(value);
  };

  const onClickAddTimeSlot = (e) => {
    e.preventDefault();
    if(!timeSlotArray || (timeSlotArray && timeSlotArray.length < 3)){
      setTimeSlotArray(timeSlotArray => [...timeSlotArray, { start: startTimeOffer, end: endTimeOffer, days: {}}] );
    }
  };

  const onClickRemoveTimeSlot = (index) => {
    const arr  = timeSlotArray.slice();
    arr.splice(index, 1);
    setTimeSlotArray(arr);
  };
  const onOk = (value) => {
    console.log('onOk: ', value);
  }

  const renderInputDate = () => {
    let typeOfOffer = <div></div>;

    if (typeOffer == 'time') {
      typeOfOffer = (
        <div>
          <div className='availble-time-container'>
            <p className='post-offer-label'><FormattedMessage defaultMessage={'Available Time Slots'} id={'postOffer.availableTimeSlots'}/></p>
            <button className='button-trans' onClick={onClickAddTimeSlot}>
              <img src={'./images/icon/plus.svg'} className='plus-icon' />
            </button>
          </div>
          {timeSlotArray.map((_, index) => {
            return (
              <div className='availble-time-table' key={index}>
                <div className='time-range-picker'>
                  <RangePicker
                    defaultValue={[
                      moment(startTimeOffer, 'HH:mm'),
                      moment(endTimeOffer, 'HH:mm:ss'),
                    ]}
                    format='HH:mm'
                    showTime={{ format: 'HH:mm' }}
                    onChange={(value, time) => onRangeTime(index, time)}
                    onOk={onOk}
                  />
                  <span className='icon-arrow-next range-picker-icon'></span>
                </div>
                <div className='weekdays-container'>
                  <ButtonComponent onChangeWeekdays={onChangeWeekdays} 
                    index={index} inputId={'1sunday'} active={_.days["1sunday"]}
                    key={1} forId='sunday' label='S' name='Sun' />
                  <ButtonComponent onChangeWeekdays={onChangeWeekdays} 
                    index={index} inputId={'2monday'} active={_.days["2monday"]}
                    key={2} forId='monday' label='M' name='Mon' />
                  <ButtonComponent onChangeWeekdays={onChangeWeekdays} 
                    index={index} inputId={'3tuesday'} active={_.days["3tuesday"]}
                    key={3} forId='tuesday' label='T' name='Tue' />
                  <ButtonComponent onChangeWeekdays={onChangeWeekdays} 
                    index={index} inputId={'4wednesday'} active={_.days["4wednesday"]}
                    key={4} forId='wednesday' label='W' name='Wed' />
                  <ButtonComponent onChangeWeekdays={onChangeWeekdays} 
                    index={index} inputId={'5thursday'} active={_.days["5thursday"]}
                    key={5} forId='thursday' label='T' name='Thu' />
                  <ButtonComponent onChangeWeekdays={onChangeWeekdays} 
                    index={index} inputId={'6friday'} active={_.days["6friday"]}
                    key={6} forId='friday' label='F' name='Fir' />
                  <ButtonComponent onChangeWeekdays={onChangeWeekdays} 
                    index={index} inputId={'7saturday'} active={_.days["7saturday"]}
                    key={7} forId='saturday' label='S' name='Sat' />
                </div>
                <div
                  className='minus-icon-container'
                  onClick={() => onClickRemoveTimeSlot(index)}
                >
                  <img src={'./images/icon/minus.svg'} className='minus-icon' />
                </div>
              </div>
            );
          })}
        </div>
      );
    } else if (typeOffer == 'goods') {
      typeOfOffer = (
        <Grid
          container
          spacing={1}
          alignItems='flex-end'
          className='form-control'
        >
          <Grid item className='item-flex input-post-offer'>
            <TextField
              onChange={inputMaterials}
              value={materials}
              label={getMessageTranslate('postOffer', 'constructionMaterials')} name='goods' />
          </Grid>
        </Grid>
      );
    }

    return typeOfOffer;
  };

  let imgPreview = <div className='imgPrew-container'><img src={GET_IMAGE(image)} alt='' className='imgPreview' /></div>;
  return (
    <div className='private-fullheight'>
      <div className='container'>
        <HeaderNavigation headerName={getMessageTranslate('postOffer', 'title')} />
        <Grid container className='post-image-container'>
          <Grid item xs={5} style={{ paddingRight: '25px' }}>
            {image ? imgPreview : (<div className='prev-image-container'>
              <label htmlFor="upload">{!loadingUpload ? <PhotoCameraIcon style={{ fontSize: '37px' }} /> : <Spin />}</label>
              <input id="upload" type="file" name="photo" style={{ visibility: 'hidden' }} onChange={uploadSingleFile} />
            </div>)}
          </Grid>
          <Grid item xs={7}>
            <textarea
              onChange={inputContent}
              value={content}
              placeholder={getMessageTranslate('postOffer', 'postDescriptionPlaceHolder')} />
          </Grid>
        </Grid>

        <div className='form-post-offer-container '>
          <form layout='vertical' className='form-control-post-offer'>
            <>
              <Grid
                container
                spacing={1}
                alignItems='flex-end'
                className='form-control'
              >
                <Grid item className='item-flex input-post-offer'>
                  <Hastag className="hashtag-input" hastagsValue={hastagsValue} setHastags={setHastags} />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={1}
                alignItems='flex-end'
                className='form-control'
              >
                <Grid item className='item-flex input-post-offer'>
                  <div className='form-group'>
                    <p className='post-offer-label'>
                      <FormattedMessage
                        defaultMessage={'Type of Offer'}
                        id={'postOffer.typeOfOffer'}
                      />
                  </p>
                    <Select
                      className="text-uppercase select-type-offer"
                      name='post-type'
                      id='post_type'
                      form='post_form'
                      placeholder={`- ${getMessageTranslate('postOffer', 'chooseType')} -`}
                      onChange={onChangeValue}
                    >
                      <Option className="text-uppercase" value='time'><span class="icon-type icon-time"></span> <FormattedMessage defaultMessage={'Time'} id={'common.time'}/></Option>
                      <Option className="text-uppercase" value='goods'><span class="icon-type icon-goods"></span> <FormattedMessage defaultMessage={'Goods'} id={'common.goods'}/></Option>
                    </Select>
                  </div>
                </Grid>
              </Grid>
              {renderInputDate()}
              <Grid
                container
                spacing={1}
                alignItems='flex-end'
                className='form-control'
              >
                <Grid item className='item-flex input-post-offer'>
                  <p className='post-offer-label'>
                    <FormattedMessage
                      defaultMessage={'Due date'}
                      id={'postOffer.dueDate'}
                    />
                  </p>
                  <div className='due-date-container'>
                    <DatePicker
                      placeholder="- Add due date -"
                      defaultValue={moment().add('1', 'days')}
                      format={dateFormat}
                      onChange={onDueDate}
                    />
                  </div>
                </Grid>
              </Grid>

              <div className='form-control publish-button'>
                <ButtonAnt className='custom-button-login btn-block btn-round btn-red post-offer-button-container'
                   onClick={submit}
                >
                  <FormattedMessage
                    defaultMessage={'Publish'}
                    id={'postOffer.publish'}
                  />
                </ButtonAnt>
              </div>
            </>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostOffer;
