import OneSignal from 'react-native-onesignal';

export function tagUserInfoCreate() {
  OneSignal.sendTags({
    'user_name': 'Mateus Holanda',
    'user_email': 'mateus23ita@gmail.com'
  });
};