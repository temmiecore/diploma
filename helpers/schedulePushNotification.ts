import * as Notifications from "expo-notifications";

export const scheduleDailyNotification = async () => {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "🌞 Daily Reminder",
            body: "Time to take care of your pet!",
        },
        trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DAILY,
            hour: 15,
            minute: 55,
        },
    });
};
