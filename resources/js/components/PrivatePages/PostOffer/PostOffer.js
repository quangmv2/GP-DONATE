import React, { Component } from 'react';
import { ButtonAnt, HeaderNavigation } from 'components/Atoms';
import { FormattedMessage } from 'react-intl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import './PostOffer.scss';
import { DatePicker, TimePicker } from 'antd';
import moment from 'moment';
import ButtonComponent from './Button';
import { fetchService } from "../../../services/fetch/fetchService";
import { Select } from 'antd';
import { ROOT_API_URL, GET_IMAGE } from "../../../constants";
import { AutoComplete } from 'antd';
const dateFormat = 'DD MMM YYYY';
const { Option } = Select;
const { RangePicker } = TimePicker;

class PostOffer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hashtag: [],
      file: null,
      typeOffer: '',
      timeSlotArray: [{}],
      image: null
    };
    this.uploadSingleFile = this.uploadSingleFile.bind(this);

  }
  Complete = () => (
    <AutoComplete
      onChange={this.fetchHashtag}
      options={this.state.options}
      filterOption={(inputValue, option) =>
        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
    />
  );
  fetchHashtag = async () => {
    const [options] = await fetchService.fetch(`${ROOT_API_URL}/api/hastag`, {
      method: 'GET'
    });
    this.setState({
      hashtag: options
    })
    console.log(this.state.hashtag);
  }

  uploadSingleFile = async (e) => {
    this.setState({
      file: URL.createObjectURL(e.target.files[0])
    })
    console.log( e.target.files  )
    const formData = new FormData();
    formData.append('photo',  e.target.files[0]) 
    const res = await fetchService.fetch(`${ROOT_API_URL}/api/posts/photo`, {
      method: 'POST',
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        "Content-Length": e.target.files[0].length
      }
    }).then(([resp, status]) => {
      console.log(resp)
      if (status === 200) {
        this.setState({
          image: resp.image_directory
        })
      }

    });
    console.log(status);
  }


  onChangeValue = (value) => {
    this.setState({ typeOffer: value });
  };

  onClickAddTimeSlot = (e) => {
    e.preventDefault();
    const { timeSlotArray } = this.state;
    this.setState({ timeSlotArray: [...timeSlotArray, {}] });
  };

  onClickRemoveTimeSlot = (index) => {
    const { timeSlotArray } = this.state;
    timeSlotArray.splice(index, 1);
    this.setState({ timeSlotArray });
  };

  renderInputDate = () => {
    const { typeOffer, timeSlotArray } = this.state;
    let typeOfOffer = <div></div>;

    if (typeOffer == 'time') {
      typeOfOffer = (
        <div>
          <div className='availble-time-container'>
            <p className='post-offer-label'>Available Time Slots</p>
            <button className='button-trans' onClick={this.onClickAddTimeSlot}>
              <img src={'./images/icon/plus.svg'} className='plus-icon' />
            </button>
          </div>
          {timeSlotArray.map((index) => {
            return (
              <div className='availble-time-table' key={index}>
                <div className='time-range-picker'>
                  <RangePicker
                    defaultValue={[
                      moment('00:00', 'HH:mm'),
                      moment('1:00', 'HH:mm:ss'),
                    ]}
                    format='HH:mm'
                    showTime={{ format: 'HH:mm' }}
                  />
                  <span className='icon-arrow-next range-picker-icon'></span>
                </div>
                <div className='weekdays-container'>
                  <ButtonComponent key={1} name='S' />
                  <ButtonComponent key={2} name='M' />
                  <ButtonComponent key={3} name='T' />
                  <ButtonComponent key={4} name='W' />
                  <ButtonComponent key={5} name='T' />
                  <ButtonComponent key={6} name='F' />
                  <ButtonComponent key={7} name='S' />
                </div>
                <div
                  className='minus-icon-container'
                  onClick={() => this.onClickRemoveTimeSlot(index)}
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
            <TextField label='Construction Materials' name='goods' />
          </Grid>
        </Grid>
      );
    }

    return typeOfOffer;
  };

  render() {
    let imgPreview = <div className='imgPrew-container'><img src={GET_IMAGE(this.state.image)} alt='' className='imgPreview' /></div>
    return (
      <div className='private-fullheight'>
        <div className='container'>
          <HeaderNavigation headerName='Post a Propositions' />
          <Grid container className='post-image-container'>
            <Grid item xs={5} style={{ paddingRight: '25px' }}>
              {this.state.image ? imgPreview : (<div className='prev-image-container'>
                <label for="upload"><PhotoCameraIcon style={{ fontSize: '37px' }} /></label>
                <input id="upload" type="file" style={{ visibility: 'hidden' }} onChange={this.uploadSingleFile} />
              </div>)}

            </Grid>
            <Grid item xs={7}>
              <textarea placeholder='This is content...' />
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
                    <this.Complete />
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
                      <p className='post-offer-label'>Type of Offer</p>
                      <Select
                        name='post-type'
                        id='post_type'
                        form='post_form'
                        placeholder='- Choose Type -'
                        onChange={this.onChangeValue}
                      >
                        <Option value='time'>TIME</Option>
                        <Option value='goods'>GOODS</Option>
                      </Select>
                    </div>
                  </Grid>
                </Grid>
                {this.renderInputDate()}
                <Grid
                  container
                  spacing={1}
                  alignItems='flex-end'
                  className='form-control'
                >
                  <Grid item className='item-flex input-post-offer'>
                    <p className='post-offer-label'>Due Date</p>
                    <div className='due-date-container'>
                      <DatePicker
                        defaultValue={moment('19/01/2020', dateFormat)}
                        format={dateFormat}
                      />
                    </div>
                  </Grid>
                </Grid>

                <Link to=''>
                  <div className='form-control publish-button'>
                    <ButtonAnt className='custom-button-login btn-block btn-round btn-red post-offer-button-container'>
                      <FormattedMessage
                        defaultMessage={'postOffer.publish'}
                        id={'postOffer.publish'}
                      />
                    </ButtonAnt>
                  </div>
                </Link>
              </>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default PostOffer;
