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
import { ROOT_API_URL, GET_IMAGE, ACCESS_TOKEN } from "../../../constants";
import { AutoComplete } from 'antd';
const dateFormat = 'DD MMM YYYY';
const { Option } = Select;
const { RangePicker } = TimePicker;

class PostOffer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hastag: [],
      file: null,
      typeOffer: '',
      timeSlotArray: [{}],
      image: null,
      content: '',
      dueDate: '',
      materials: '',
      weekdays: []
     };
    this.uploadSingleFile = this.uploadSingleFile.bind(this);
  }
  async componentDidMount() {
    this.fetchHastag();
  }

  componentDidUpdate() {
    console.log(this.state.typeOffer, this.state.timeSlotArray);
  }
  onChangeWeekdays = (e) => {
    this.setState({
      weekdays: e.target.value
    });
    console.log(this.state.weekdays);
 }

  Complete = () => (
    <Select
      mode="tags" style={{ width: '100%' }} placeholder="Hastags" onChange={(value) => {console.log(value)}}
      options={this.state.hastag}
    >
    </Select>
  );
  fetchHastag = async (search="") => {
    const [options] =  await fetchService.fetch(`${ROOT_API_URL}/api/hastag?q=${search}`, {
      method: 'GET'
    });
    this.setState({
      hastag: options
    })
  }
  
  inputMaterials = (e) => {
    this.setState({
      materials: e.target.value
    });
    console.log(this.state.materials)
  }
  inputContent = (e) => {
    this.setState({
      content: e.target.value
    });
    console.log(this.state.content)
  };
  onDueDate = (value, dateString) => {
   this.setState({
     dueDate: dateString
   });
  }
  uploadSingleFile = async (e) => {
    this.setState({
      file: URL.createObjectURL(e.target.files[0])
    })
    console.log(e.target.files[0])
    var formData = new FormData();
    formData.append("photo", e.target.files[0]);
    const res = await fetchService.upload(`${ROOT_API_URL}/api/posts/photo`, false, {
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
        this.setState({
          image: image_directory
        });
      }
    });
  }
onRangeTime = (value, dateString) => {
  console.log(dateString);
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
  onOk(value) {
    console.log('onOk: ', value);
  }
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
                    onChange={this.onRangeTime}
                    onOk={this.onOk}
                  />
                  <span className='icon-arrow-next range-picker-icon'></span>
                </div>
                <div className='weekdays-container'>
                  <ButtonComponent onChangeWeekdays={this.onChangeWeekdays} inputId='sunday' key={1} forId='sunday' label='S' name='sunday'/>
                  <ButtonComponent  onChangeWeekdays={this.onChangeWeekdays} inputId='monday' key={2} forId='monday' label='M' name='monday'/>
                  <ButtonComponent  onChangeWeekdays={this.onChangeWeekdays} inputId='tuesday' key={3} forId='tuesday' label='T' name='tuesday'/>
                  <ButtonComponent  onChangeWeekdays={this.onChangeWeekdays} inputId='wednesday' key={4} forId='wednesday' label='W' name='wednesday'/>
                  <ButtonComponent  onChangeWeekdays={this.onChangeWeekdays} inputId='thursday' key={5} forId='thursday' label='T' name='thursday'/>
                  <ButtonComponent  onChangeWeekdays={this.onChangeWeekdays} inputId='friday' key={6} forId='friday' label='F' name='friday'/>
                  <ButtonComponent  onChangeWeekdays={this.onChangeWeekdays}  inputId='saturday' key={7} forId='saturday' label='S' name='saturday'/>
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
            <TextField 
            onChange={this.inputMaterials}
            value={this.state.materials}
            label='Construction Materials' name='goods' />
          </Grid>
        </Grid>
      );
    }

    return typeOfOffer; 
  };


  render() {
    let imgPreview = <div className='imgPrew-container'><img src={GET_IMAGE(this.state.image)} alt='' className='imgPreview' /></div>;
    console.log('image', this.state.image);
    return (
      <div className='private-fullheight'>
        <div className='container'>
          <HeaderNavigation headerName='Post a Propositions' />
          <Grid container className='post-image-container'>
            <Grid item xs={5} style={{ paddingRight: '25px' }}>
              {this.state.image ? imgPreview : (<div className='prev-image-container'>
                <label htmlFor="upload"><PhotoCameraIcon style={{ fontSize: '37px' }} /></label>
                <input id="upload" type="file" name="photo" style={{ visibility: 'hidden' }} onChange={this.uploadSingleFile} />
              </div>)}

            </Grid>
            <Grid item xs={7}>
              <textarea 
              onChange={this.inputContent}
              value={this.state.content}
              placeholder='This is content...' />
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
                        onChange={this.onDueDate}
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
