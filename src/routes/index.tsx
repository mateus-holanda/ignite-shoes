import { useEffect, useState } from 'react';
import { useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import OneSignal, { NotificationReceivedEvent, OSNotification } from 'react-native-onesignal';

import { AppRoutes } from './app.routes';

import { Notification } from '../components/Notification';

export function Routes() {
  const [notification, setNotification] = useState<OSNotification>();

  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationReceived: NotificationReceivedEvent) => {
        const response = notificationReceived.getNotification();

        setNotification(response);
    });

    return () => unsubscribe;
  }, []);

  return (
    <NavigationContainer theme={theme}>
      <AppRoutes />

      {
        notification?.title &&
        <Notification
          data={notification}
          onClose={() => setNotification(undefined)}
        />
      }
    </NavigationContainer>
  );
}