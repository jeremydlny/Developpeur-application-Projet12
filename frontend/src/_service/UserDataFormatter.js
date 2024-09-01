class UserDataFormatter {
  constructor(userData, activityData, sessionsData, performanceData) {
    this.userData = userData;
    this.activityData = activityData;
    this.sessionsData = sessionsData;
    this.performanceData = performanceData;
  }

  formatData() {
    const { userData, activityData, sessionsData, performanceData } = this;
    
    const userInfo = {
      firstName: userData?.userInfos?.firstName || '',
      lastName: userData?.userInfos?.lastName || '',
      age: userData?.userInfos?.age || 0,
      calorieCount: userData?.keyData?.calorieCount || 0,
      proteinCount: userData?.keyData?.proteinCount || 0,
      carbohydrateCount: userData?.keyData?.carbohydrateCount || 0,
      lipidCount: userData?.keyData?.lipidCount || 0,
      score: userData?.todayScore || userData?.score || 0,      
    };

    const userActivity = activityData?.sessions?.map((session, index) => ({
      day: index + 1,
      kilogram: session.kilogram,
      calories: session.calories,
    }));

    const userSessions = sessionsData?.sessions?.map((session, index) => ({
      day: index + 1,
      sessionLength: session.sessionLength,
    }));

    const userPerformance = performanceData?.data?.map((item) => ({
      value: item.value,
      kind: performanceData.kind[item.kind],
    }));

    return {
      userInfo,
      userActivity,
      userSessions,
      userPerformance,
    };
  }
}

export default UserDataFormatter;
