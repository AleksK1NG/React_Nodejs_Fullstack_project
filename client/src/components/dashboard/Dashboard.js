import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';

class Dashboard extends Component {

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick = (e) => {
    this.props.deleteAccount(e);
    console.log(this.props.deleteAccount(e));
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;
    
    if (profile === null || loading) {
      dashboardContent = <Spinner/>
    } else {
      // Check if User have Profile
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`}> {user.name} </Link></p>
            <ProfileActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education}/>
            <div style={{marginBottom: '60px'}} />
            <button
              onClick={(e) => this.onDeleteClick(e)}
              className="btn btn-danger">
              Delete My Account
            </button>
          </div>
        );
      } else {
        // User is logged in but has no Profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not Profile, please setup it</p>
            <Link to='/create-profile' className="btn btn-lg btn-info">Create Profile</Link>
          </div>
        )
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    auth: state.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentProfile: () => dispatch(getCurrentProfile()),
    deleteAccount: (e) => dispatch(deleteAccount(e))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);


