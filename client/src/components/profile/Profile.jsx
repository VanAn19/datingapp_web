import React, { useEffect, useState } from 'react'
import classes from './profile.module.css'
import { useSelector } from "react-redux";
import axios from 'axios';
import SideBar from "../sidebar/sidebar";
import TopicMenu from "../../topicmenu/topicmenu";

export const Profile = () => {

  const [users, setUsers] = useState({});
  const [bio, setBio] = useState('')
  const [image, setImage] = useState(null)
  const {user, token} = useSelector((state) => state.auth);

  const topics = ["Trang chủ", "Hồ sơ", "Tin nhắn", "Đăng xuất"];
  const [contentIndex, setContentIndex] = useState(0);
  const [selectedKey, setSelectedKey] = useState("0");
  const changeSelectedKey = (event) => {
    const key = event.key;
    setSelectedKey(key);
    setContentIndex(+key);
  };
  const Menu = (
    <TopicMenu
      topics={topics}
      selectedKey={selectedKey}
      changeSelectedKey={changeSelectedKey}
    />
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:4000/v1/user/find/${user._id}`);
        const data = await res.json();
        setUsers(data);
        setBio(data.bio);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUser();
  }, [user._id])


  const handleProfile = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('bio', bio);
      formData.append('image', image);
      const res = await axios.put(`http://localhost:4000/v1/user/${user._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'token': `Bearer ${token}`
        }
      });
      const updatedUser = { ...users, image: image ? res.data.image : users.image };
      setUsers(updatedUser);
      document.getElementById('fileInput').value = null;
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form className={classes.wrapper} onSubmit={handleProfile}>
      <SideBar menu={Menu} />
      <div className={classes.generalInfo}>
        <div className={classes.avatar}>
          <img 
            className={classes.imgAvatar} 
            src={`http://localhost:4000/${users.image}`}
            alt="" 
          />
          <input 
            id="fileInput" 
            type="file" 
            accept="image/*" 
            onChange={e => setImage(prev => e.target.files[0]) } 
            className={classes.fileInput}
          />
        </div>  
        <div>
          <div className={classes.personalInfo}><h2>{users.name}, {users.age}</h2></div>
          <div className={classes.personalInfo}><p>{users.gender}</p></div>
          <div className={classes.personalInfo}><p>{users.address}</p></div>
          <div className={classes.personalInfo}><p>{users.email}</p></div>
          <div className={classes.personalInfo}><p>{users.phone}</p></div>
        </div>
      </div>
      <div className={classes.info}>
        {/* <form onSubmit={handleProfile}> */}
          {/* <div className={classes.imgRow}>
            <div className={classes.imgDetails}>
              <img className={classes.img} src="" alt="" />
              <input className={classes.btnAdd} type="file" name="" id="" />
            </div>
            <div className={classes.imgDetails}>
              <img className={classes.img} src="" alt="" />
              <input className={classes.btnAdd} type="file" name="" id="" />
            </div>
            <div className={classes.imgDetails}>
              <img className={classes.img} src="" alt="" />
              <input className={classes.btnAdd} type="file" name="" id="" />
            </div>
          </div>
          <div className={classes.imgRow}>
            <div className={classes.imgDetails}>
              <img className={classes.img} src="" alt="" />
              <input className={classes.btnAdd} type="file" name="" id="" />
            </div>
            <div className={classes.imgDetails}>
              <img className={classes.img} src="" alt="" />
              <input className={classes.btnAdd} type="file" name="" id="" />
            </div>
            <div className={classes.imgDetails}>
              <img className={classes.img} src="" alt="" />
              <input className={classes.btnAdd} type="file" name="" id="" />
            </div>
          </div> */}
          <label htmlFor=''>
            <input onChange={e => setBio(prev => e.target.value)} className={classes.bio} type="text" placeholder="Bio" value={bio}/>
          </label>
          <button className={classes.submitBtn}>Lưu</button>
        {/* </form> */}
      </div>
    </form>
  )
}