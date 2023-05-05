import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../App';
import { Avatar, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import '../style/profile.css';

function UserProfile() {
  const { state, dispatch } = useContext(UserContext);
  const [userProfile, setUserProfile] = useState(null);
  const { userid } = useParams();
  const [showFollower, setShowFollower] = useState({ following: false, loading: true });
  // console.log(userProfile)
  // console.log(state)

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await fetch(`/user/${userid}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
          },
        });
        const result = await response.json();
        setUserProfile(result);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUserProfile();
  }, [userid]);

  useEffect(() => {
    if (state && userProfile) {
      const isFollowing = userProfile.User.followers.includes(state._id);
      setShowFollower({ following: isFollowing, loading: false });
    }
  }, [state, userProfile]);

  async function followUser() {
    try {
      const response = await fetch('/follow', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify({
          followId: userid,
        }),
      });
      const data = await response.json();
      dispatch({ type: 'UPDATE', payload: { following: data.following, followers: data.followers } });
      localStorage.setItem('user', JSON.stringify(data));
      setUserProfile(prevState => ({
        ...prevState,
        User: {
          ...prevState.User,
          followers: [...prevState.User.followers, data.resulte._id],
        },
      }));
      setShowFollower(prevState => ({ ...prevState, following: true }));
    } catch (error) {
      console.error(error);
    }
  }

  async function unFollowUser() {
    try {
      const response = await fetch('/unfollow', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: JSON.stringify({
          unfollowId: userid,
        }),
      });
      const data = await response.json();
      dispatch({ type: 'UPDATE', payload: { following: data.following, followers: data.followers } });
      localStorage.setItem('user', JSON.stringify(data));
      setUserProfile(prevState => ({
        ...prevState,
        User: {
          ...prevState.User,
          followers: prevState.User.followers.filter(item => item !== data.resulte._id),
        },
      }));
      setShowFollower(prevState => ({ ...prevState, following: false }));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="user_profile">
      <div className="user_details">
        <div className="profile_img">
          <Avatar
            style={{ width: '150px', height: '150px' }}
            alt={userProfile?.User?.name}
            src={userProfile?.User?.profileImage}
          />
        </div>
        <div className="profile_info">
          <div className="user_profilename">
            <h4>{userProfile?.User?.name}</h4>
            {showFollower.loading ? (
              <CircularProgress size={20} />
            ) : showFollower.following ? (
              <span onClick={() => unFollowUser()} className="following">Following</span>
            ) : (
              <span onClick={() => followUser()} className="follow">Follow</span>
            )}
          </div>
          <div className="user_followers">
            <h6>{userProfile?.posts.length} Posts</h6>
            <h6>{userProfile?.User?.followers.length} Followers</h6>
            <h6>{userProfile?.User?.following.length} Following</h6>
          </div>
        </div>
      </div>
      <div className="profile_grid">
        {
          userProfile?.posts?.map(item=>{
            return(
     
          <img className="profile_item" key={item._id} src={item.photo} alt="" />
   
            )
          })
        }
      </div>
    </div>
  );
}

export default UserProfile;