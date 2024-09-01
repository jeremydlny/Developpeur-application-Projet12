// mock-service.js

import {
  getUserMainData,
  getUserActivity,
  getUserAverageSessions,
  getUserPerformance
} from './api-service';
import UserDataFormatter from './UserDataFormatter';

export const getUserDataMock = async (userId) => {
  console.log("Fetching data from mock service (via API)");

  try {
    const [userData, activityData, sessionsData, performanceData] = await Promise.all([
      getUserMainData(userId),
      getUserActivity(userId),
      getUserAverageSessions(userId),
      getUserPerformance(userId)
    ]);

    const formatter = new UserDataFormatter({
      userData: userData.data,
      activityData: activityData.data,
      sessionsData: sessionsData.data,
      performanceData: performanceData.data
    });

    return formatter.formatData();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getUserMainDataMock = getUserMainData;
export const getUserActivityMock = getUserActivity;
export const getUserAverageSessionsMock = getUserAverageSessions;
export const getUserPerformanceMock = getUserPerformance;