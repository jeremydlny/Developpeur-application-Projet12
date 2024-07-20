import React, { useState, useEffect } from 'react';
import DailyActivityChart from '@/components/charts/DailyActivityChart';
import AverageSessionChart from '@/components/charts/AverageSessionChart';
import IntensityChart from '@/components/charts/IntensityChart';
import ScoreChart from '@/components/charts/ScoreChart';
import '@/styles/UserProfile.css';
import { getUserMainData, getUserActivity, getUserAverageSessions, getUserPerformance } from '@/api/api';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [userActivity, setUserActivity] = useState([]);
  const [userSessions, setUserSessions] = useState([]);
  const [userPerformance, setUserPerformance] = useState([]);
  const [kind, setKind] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = 12; // Replace with the appropriate user ID
        const userResponse = await getUserMainData(userId);
        const activityResponse = await getUserActivity(userId);
        const sessionsResponse = await getUserAverageSessions(userId);
        const performanceResponse = await getUserPerformance(userId);

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
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const { calorieCount, proteinCount, carbohydrateCount, lipidCount } = userData.keyData;

  return (
    <div className="user-profile">
      <div className="user-info">
        <h1>Bonjour <span>{userData.userInfos.firstName}</span></h1>
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
            <h3>{calorieCount}kCal</h3>
            <p>Calories</p>
          </div>
          <div className="key-data-item">
            <h3>{proteinCount}g</h3>
            <p>Protéines</p>
          </div>
          <div className="key-data-item">
            <h3>{carbohydrateCount}g</h3>
            <p>Glucides</p>
          </div>
          <div className="key-data-item">
            <h3>{lipidCount}g</h3>
            <p>Lipides</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;