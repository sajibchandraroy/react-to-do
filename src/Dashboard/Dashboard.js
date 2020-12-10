import { faListAlt, faPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../App';
import { handleSignOut } from '../Login/LoginManager';
import Add from './Add';
import AllWork from './AllWork';
import logo from '../images/logo.png';


const Dashboard = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  let history = useHistory();
  const [selectedMenu, setSelectedMenu] = useState('ADD-WORK');
  console.log(loggedInUser)

  const signOut = () => {
    handleSignOut()
      .then(res => {
        setLoggedInUser(res);
        sessionStorage.clear();
        history.push('/home')
      })
  }

  return (
    <div className="dashboard container-fluid">
      <div className="row mt-2">
        <div className="col-12 col-md-3">
          <Link to="/">
            <img src={logo} style={{ height: '50px', width: '50px', borderRadius: '50%' }}alt="img" />
          </Link>
        </div>
        <div className="col-6 col-md-6">
          {selectedMenu === 'FULL-LIST' && <h3 className="p-3">All Activity</h3>}
          {selectedMenu === 'ADD-WORK' && <h3 className="p-3">Add Activity</h3>}          
        </div>
        <div className="col-6 col-md-1">
          <img
            src={loggedInUser.photo}
            style={{ height: '50px', width: '50px', borderRadius: '50%' }}
            alt=""
          />
        </div>
        <div className="col-6 col-md-2 font-weight-bold">{loggedInUser.name}</div>
      </div>
      <main>
        <div className="row">
          <div className="sidebar col-12 col-sm-12 col-md-2">
            <ul className="list-unstyled">
              <li className={selectedMenu === 'FULL-LIST' ? 'm-3 active' : 'm-3'} onClick={() => setSelectedMenu('FULL-LIST')}>
                <FontAwesomeIcon icon={faListAlt} /><span> All Activity</span>
              </li>
              <li className={selectedMenu === 'ADD-SERVICE' ? 'm-3 active' : 'm-3'} onClick={() => setSelectedMenu('ADD-WORK')} >
                <FontAwesomeIcon icon={faPlus} /> <span> Add Activity</span>
              </li>
              <li>
                <Link to="/" className="text-dark"><FontAwesomeIcon icon={faSignOutAlt} /> <span onClick={signOut}>Logout</span></Link>
              </li>
            </ul>

          </div>
          <div className="col-12 col-sm-12 col-md-10 dashboard-content">
            {selectedMenu === 'FULL-LIST' && <AllWork/>}
            {selectedMenu === 'ADD-WORK' && <Add />}
            
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;