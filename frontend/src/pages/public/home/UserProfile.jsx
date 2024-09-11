// UserProfile.jsx

import React, { useState, useEffect } from 'react';
import DailyActivityChart from '@/components/charts/DailyActivityChart';
import AverageSessionChart from '@/components/charts/AverageSessionChart';
import IntensityChart from '@/components/charts/IntensityChart';
import ScoreChart from '@/components/charts/ScoreChart';
import arrow from '@/assets/arrow.png';
import '@/styles/UserProfile.css';
import {
  getUserMainData,
  getUserActivity,
  getUserAverageSessions,
  getUserPerformance
} from '@/_service/api-service';
import {
  getUserMainDataMock,
  getUserActivityMock,
  getUserAverageSessionsMock,
  getUserPerformanceMock
} from '@/_service/mock-service';
import UserDataFormatter from '@/_service/UserDataFormatter';

const UserProfile = () => {
  const [userData, setUserData] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(12);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [useMockData, setUseMockData] = useState("api");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [selectedUserId, useMockData]);

  const fetchData = async () => {
    setLoading(true);
    try {
      let userResponse, activityResponse, sessionsResponse, performanceResponse;

      if (useMockData === "mock") {
        console.log("Fetching data from mock service (via mock)");
        userResponse = await getUserMainDataMock(selectedUserId);
        activityResponse = await getUserActivityMock(selectedUserId);
        sessionsResponse = await getUserAverageSessionsMock(selectedUserId);
        performanceResponse = await getUserPerformanceMock(selectedUserId);
      } else {
        console.log("Fetching data from API service (via api)");
        userResponse = await getUserMainData(selectedUserId);
        activityResponse = await getUserActivity(selectedUserId);
        sessionsResponse = await getUserAverageSessions(selectedUserId);
        performanceResponse = await getUserPerformance(selectedUserId);
      }
      
      const formatter = new UserDataFormatter(
        userResponse.data,
        activityResponse.data,
        sessionsResponse.data,
        performanceResponse.data
      );
      
      setUserData(formatter.formatData());
      
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserChange = (userId) => {
    setSelectedUserId(userId);
    setIsDropdownOpen(false);
  };

  const handleDataModeChange = (event) => {
    event.preventDefault();
    setUseMockData(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile">
      <div className="user-info">
        <h1>
          Bonjour <span>{userData.userInfo.firstName}</span>
          <div className="dropdown-container">
            <img src={arrow} alt="Dropdown" onClick={() => setIsDropdownOpen(!isDropdownOpen)} />
            {isDropdownOpen && (
              <div className="dropdown">
                <p onClick={() => handleUserChange(12)}>Karl</p>
                <p onClick={() => handleUserChange(18)}>Cecilia</p>
              </div>
            )}
          </div>
        </h1>
        <div className="api-mock-select">
          <label htmlFor="dataModeSelect">Data Mode:</label>
          <select 
            id="dataModeSelect" 
            value={useMockData} 
            onChange={handleDataModeChange}
          >
            <option value="api">API</option>
            <option value="mock">Mock</option>
          </select>
        </div>
        <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      </div>
      <div className="charts-and-data">
        <div className="charts-container">
         <div className="main-chart">
            <DailyActivityChart data={userData.userActivity} />
          </div>
          <div className="sub-charts">
            <AverageSessionChart data={userData.userSessions} />
            <IntensityChart data={userData.userPerformance}  />
            <ScoreChart score={userData.userInfo.score} />
          </div>
        </div>
        <div className="key-data">
          <div className="key-data-item">
            <img src={require('@/assets/calories.png')} alt="Calories" />
            <div>
              <h3>{userData.userInfo.calorieCount}kCal</h3>
              <p>Calories</p>
            </div>
          </div>
          <div className="key-data-item">
            <img src={require('@/assets/proteines.png')} alt="Proteins" />
            <div>
              <h3>{userData.userInfo.proteinCount}g</h3>
              <p>Protéines</p>
            </div>
          </div>
          <div className="key-data-item">
            <img src={require('@/assets/glucides.png')} alt="Carbohydrates" />
            <div>
              <h3>{userData.userInfo.carbohydrateCount}g</h3>
              <p>Glucides</p>
            </div>
          </div>
          <div className="key-data-item">
            <img src={require('@/assets/lipides.png')} alt="Lipids" />
            <div>
              <h3>{userData.userInfo.lipidCount}g</h3>
              <p>Lipides</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;