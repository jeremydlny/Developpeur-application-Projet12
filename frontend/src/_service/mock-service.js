import {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} from './data';
  
  export const getUserMainDataMock = async (userId) => {
    console.log("Je suis dans le mock service");
    const user = USER_MAIN_DATA.find(user => user.id === userId);
    return { data: user };
  };
  
  export const getUserActivityMock = async (userId) => {
    const activity = USER_ACTIVITY.find(activity => activity.userId === userId);
    return { data: activity };
  };
  
  export const getUserAverageSessionsMock = async (userId) => {
    const sessions = USER_AVERAGE_SESSIONS.find(sessions => sessions.userId === userId);
    return { data: sessions };
  };
  
  export const getUserPerformanceMock = async (userId) => {
    const performance = USER_PERFORMANCE.find(performance => performance.userId === userId);
    return { data: performance };
  };