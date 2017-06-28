import React from 'react';
import { withRouter } from 'react-router-dom';
import Modal from "react-modal";
import SessionFormContainer from "../session_form/session_form_container";
import { DateRangePicker } from 'react-dates';
import { START_DATE, END_DATE } from 'react-dates/constants;'


class BookIt extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: "", /// just for now... bookings not done yet
      endDate: "",
      guests: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.navigateToBookTrip = this.navigateToBookTrip.bind(this);
    this.clearErrorsAndOpenModal = this.clearErrorsAndOpenModal.bind(this);
  };

  clearErrorsAndOpenModal(component){
    this.props.clearErrors();
    this.props.openModal(component);
  }

  handleSelectChange(property) {
    return e => this.setState({ [property]: e.target.value });
  };

  navigateToBookTrip() {
    const url = `/homes/${this.props.match.params.homeid}/book`
    this.props.history.push(url);
  };

  handleSubmit(e) {
    e.preventDefault();
    const input = Object.assign({}, this.state);
		if (this.props.currentUser) {
      this.props.receiveInput(input); // after this, move to next screen
      this.navigateToBookTrip();
      this.setState({startDate: "", endDate: "", guests: ""});
    } else {
      this.clearErrorsAndOpenModal(<SessionFormContainer formType="signup"/>)
    }
  };

  pricePerNight(){
    return (
      <div className="offers-box">
        <div className="thunderbolt"/>
        <div className="book-it-price">${this.props.listing.price}</div>
        <div className="per-night">per night</div>
      </div>
    )
  };

  // renderErrors() {
  //   if (!this.props.currentUser) {
  //     return (<li><h2>Not Logged In</h2></li>);
  //   } else if (this.props.errors) {
  //     return (this.props.errors.map((err, idx) => {
  //       return (<li key={idx}>{ err }</li>);
  //     }));
  //   }
  // }

  bookingForm() {
    const options = [
      <option value="1" key={1}>1 guest</option>
    ];
    for (let i = 2; i <= this.props.listing.space.max_guests; i++) {

      options.push(
        <option value={i} key={i}>{i} guests</option>
      );
    }

    // <div className="checking-col">
    // <label className="guest-check">Check In</label>
    //
    // <input className="check-in date-select"
    // onChange={this.handleSelectChange('startDate')}
    // placeholder="mm/dd/yyyy"/>
    // </div>
    //
    // <div className="checking-col">
    // <label className="guest-check">Check Out</label>
    //
    // <input className="check-out date-select"
    // onChange={this.handleSelectChange('endDate')}
    // placeholder="mm/dd/yyyy"/>
    // </div>
    return (
      <div>
        <form className="row-condensed">
          <div>

          <div className="guest-check">
            <p>Check In</p>
            <p>Check Out</p>
          </div>

          <div className="checking-col">
            <div className="date-range-calendar">
              <DateRangePicker
                startDate={ this.state.startDate }
                endDate={ this.state.endDate }
                onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })}
                focusedInput={ this.state.focusedInput }
                onFocusChange={ focusedInput => this.setState({ focusedInput }) } />
            </div>
          </div>

          </div>
        <div className="guest-dd-container">
            <div className='select-container'>
              <label className="guest-check">Guests</label>
                <div className='select-dd-container'>
                  <select className='select-dropdown guests' value={this.state.guests}
                      onChange={this.handleSelectChange('guests')}>{options}
                  </select>
                    <span className="dropdown-arrow"></span>
                  </div>
                </div>

          </div>

          <button onClick={this.handleSubmit}
            className="pinkButton book-btn">
            <span className="btn-text">Book</span>
          </button>

          <div className='margin-top-8px'>
            <span className="disclaimer book-disc">You won't be charged yet, but you'll give me a paycheck soon.</span>
          </div>
        </form>

      </div>
    )
  };

  render() {
    return (
      <div className="book-body">
        <div className="book-it">
          <div className="bookItContainer">
            {this.pricePerNight()}
            {this.bookingForm()}
          </div>
        </div>
      </div>
    )
  };

}

export default withRouter(BookIt);
