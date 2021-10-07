import React, { useEffect } from 'react';
import { View } from 'react-native';
import JitsiMeet, { JitsiMeetView } from 'react-native-jitsi-meet';

const AgryMeetScreen = () => {
  useEffect(() => {
      const url = 'https://meet.jit.si/exemple';
      const userInfo = {
        displayName: 'User',
        email: 'user@example.com',
        avatar: 'https:/gravatar.com/avatar/abc123',
      };
     JitsiMeet.call( url, userInfo, );
  }, [])

  useEffect(() => {
    return () => {
      JitsiMeet.endCall();
    };
  });

  function onConferenceTerminated(nativeEvent) {
    /* Conference terminated event */
    console.log(nativeEvent)
  }

  function onConferenceJoined(nativeEvent) {
    /* Conference joined event */
    console.log(nativeEvent)
  }

  function onConferenceWillJoin(nativeEvent) {
    /* Conference will join event */
    console.log(nativeEvent)
  }
  return (
    <View style={{ backgroundColor: 'black', flex: 1 }}>
    <JitsiMeetView
      onConferenceTerminated={e => onConferenceTerminated(e)}
      onConferenceJoined={e => onConferenceJoined(e)}
      onConferenceWillJoin={e => onConferenceWillJoin(e)}
      style={{
        flex: 1,
        height: '100%',
        width: '100%',
      }}
    />
     </View>
  )
};
export default AgryMeetScreen;