// mock-service.js

import USER_MAIN_DATA from '@/data/USER_MAIN_DATA.json';
import USER_ACTIVITY from '@/data/USER_ACTIVITY.json';
import USER_AVERAGE_SESSIONS from '@/data/USER_AVERAGE_SESSIONS.json';
import USER_PERFORMANCE from '@/data/USER_PERFORMANCE.json';

export const getUserMainDataMock = async (userId) => {
  console.log("Fetching user main data from mock");
  const user = USER_MAIN_DATA.find(user => user.id === userId);
  return { data: user };
};

export const getUserActivityMock = async (userId) => {
  console.log("Fetching user activity from mock");
  const activity = USER_ACTIVITY.find(activity => activity.userId === userId);
  return { data: activity };
};

export const getUserAverageSessionsMock = async (userId) => {
  console.log("Fetching user average sessions from mock");
  const sessions = USER_AVERAGE_SESSIONS.find(sessions => sessions.userId === userId);
  return { data: sessions };
};

export const getUserPerformanceMock = async (userId) => {
  console.log("Fetching user performance from mock");
  const performance = USER_PERFORMANCE.find(performance => performance.userId === userId);
  return { data: performance };
};