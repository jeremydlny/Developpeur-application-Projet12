import React, { useState, useEffect } from 'react';
import DailyActivityChart from '@/components/charts/DailyActivityChart';
import AverageSessionChart from '@/components/charts/AverageSessionChart';
import IntensityChart from '@/components/charts/IntensityChart';
import ScoreChart from '@/components/charts/ScoreChart';
import arrow from '@/assets/arrow.png';
import '@/styles/UserProfile.css';
import { getUserMainData, getUserActivity, getUserAverageSessions, getUserPerformance } from '@/api/api';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [userActivity, setUserActivity] = useState([]);
  const [userSessions, setUserSessions] = useState([]);
  const [userPerformance, setUserPerformance] = useState([]);
  const [kind, setKind] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(12); // Default to user ID 12
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await getUserMainData(selectedUserId);
        const activityResponse = await getUserActivity(selectedUserId);
        const sessionsResponse = await getUserAverageSessions(selectedUserId);
        const performanceResponse = await getUserPerformance(selectedUserId);

        // Transform activity dates to numbered days
        const transformedActivity = activityResponse.data.sessions.map((session, index) => ({
          ...session,
          day: index + 1,
        }));

        // Ensure sessions have the correct format for the AverageSessionChart
        const transformedSessions = sessionsResponse.data.sessions.map((session, index) => ({
          day: index + 1, // Ensure it is correctly numbered
          sessionLength: session.sessionLength,
        }));

        setUserData(userResponse.data);
        setUserActivity(transformedActivity);
        setUserSessions(transformedSessions);
        setUserPerformance(performanceResponse.data.data);
        setKind(performanceResponse.data.kind);
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
      }
    };

    fetchData();
  }, [selectedUserId]); // Fetch data whenever selectedUserId changes

  const handleUserChange = (userId) => {
    setSelectedUserId(userId);
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  const { calorieCount, proteinCount, carbohydrateCount, lipidCount } = userData.keyData;

  return (
    <div className="user-profile">
      <div className="user-info">
        <h1>Bonjour <span>{userData.userInfos.firstName}</span> <img src={arrow} alt="Dropdown" onClick={() => setIsDropdownOpen(!isDropdownOpen)} /></h1>
        {isDropdownOpen && (
          <div className="dropdown">
            <p onClick={() => handleUserChange(12)}>Karl</p>
            <p onClick={() => handleUserChange(18)}>Cecilia</p>
          </div>
        )}
        <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      </div>
      <div className="charts-and-data">
        <div className="charts-container">
          <div className="main-chart">
            <DailyActivityChart data={userActivity} />
          </div>
          <div className="sub-charts">
            <AverageSessionChart data={userSessions} />
            <IntensityChart data={userPerformance} kind={kind} />
            <ScoreChart score={userData.todayScore || userData.score} /> {/* Ensure compatibility with different data structures */}
          </div>
        </div>
        <div className="key-data">
          <div className="key-data-item">
            <img src={require('@/assets/calories.png')} alt="Calories" />
            <div>
              <h3>{calorieCount}kCal</h3>
              <p>Calories</p>
            </div>
          </div>
          <div className="key-data-item">
            <img src={require('@/assets/proteines.png')} alt="Proteins" />
            <div>
              <h3>{proteinCount}g</h3>
              <p>Protéines</p>
            </div>
          </div>
          <div className="key-data-item">
            <img src={require('@/assets/glucides.png')} alt="Carbohydrates" />
            <div>
              <h3>{carbohydrateCount}g</h3>
              <p>Glucides</p>
            </div>
          </div>
          <div className="key-data-item">
            <img src={require('@/assets/lipides.png')} alt="Lipids" />
            <div>
              <h3>{lipidCount}g</h3>
              <p>Lipides</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;