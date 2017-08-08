import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-scroll';
import HomeShowContainer from './home_show_container';
import HomeDetail from './home_detail';
import BookIt from '../trip/book_it';
import Footer from '../footer';

// shows a single listing
class HomeShow extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchHome(this.props.homeid);
    this.props.fetchReviews(this.props.homeid);
  }

  componentWillReceiveProps(nextProps) {
  if (this.props.match.params.homeid !== nextProps.match.params.homeid) {
    this.props.fetchHome(nextProps.match.params.homeid);
    }
  }

  handleSetActive(to) {
    console.log(to);
  }

  render() {
    const {
      listing,
      reviews,
      homeid,
      fetchHome,
      currentUser,
      receiveInput,
      clearErrors,
      openModal,
      createReview
    } = this.props;

    if (listing === undefined) {
      return (
        <div className="loading">Fetching listing</div>
      );
    } else {
      return (
        <section className="listing-show-page">
          <div className="single-listing-photocontainer">
            <img className="show-photo" src={listing.image_url}/>
          </div>

          <div className="main-detail">
            <div className="container-detail">
              <div className="sub-container-detail">
                <div className="navigation-detail">
                  <Link activeClass="active" to="scroll-to-overview" spy={true} smooth={true} offset={50} duration={500} onSetActive={this.handleSetActive} className="navigation-selection">
                    Overview
                  </Link>
                  <Link activeClass="active" to="scroll-to-review" spy={true} smooth={true} offset={-40} duration={500} onSetActive={this.handleSetActive} className="navigation-selection">
                    Review
                  </Link>
                </div>
                <HomeDetail listing={listing} reviews={reviews} createReview={createReview}/>
              </div>

              <div className="to-book-it-divider">
                <BookIt
                  listing={listing}
                  currentUser={currentUser}
                  receiveInput={receiveInput}
                  openModal={openModal}
                  clearErrors={clearErrors}/>
              </div>

            </div>
          </div>
          <div className='footer-container'>
            <Footer/>
          </div>
        </section>
      )
    }
  }
}

export default withRouter(HomeShow);
