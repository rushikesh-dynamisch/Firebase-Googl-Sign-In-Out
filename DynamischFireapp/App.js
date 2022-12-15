/**
 * Sample React Native App
 * https://github.com/facebook/react-native
//  *

// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import React from 'react';
// import { View,Text,StyleSheet,TouchableOpacity,Alert,Button} from 'react-native';
// import {  statusCodes } from '@react-native-google-signin/google-signin';

// /* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
//  * LTI update could not be added via codemod */

// const App= () => {



//   const signIn = async () => {
//     console.log('first')
//     try {
//       console.log('try')
//       await GoogleSignin.hasPlayServices();
//        await GoogleSignin.signOut();
//       const userInfo = await GoogleSignin.signIn();
//      console.log(userInfo);
//      console.log('userInfo');

//     } catch (error) {
//       console.log('catch block')
//       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//         // user cancelled the login flow
//       } else if (error.code === statusCodes.IN_PROGRESS) {
//         // operation (e.g. sign in) is in progress already
//       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
//         // play services not available or outdated
//       } else {
//         // some other error happened
//         console.log("else block")
//       }
//     }
//   };

//   const click=()=>
//   {
//     console.log("This button is clicked.");
//   }
//   return (
//   <View>
//     <TouchableOpacity  onPress={
//       ()=>

//         console.log("first button touched.")
//       }
//     style={
//       {
//         width:200,
//         height:50,
//         justifyContent:'center',
//         alignItems:'center',
//         borderWidth:0.5,
//         alignSelf :'center',
//         marginTop:50,
//        backgroundColor:'red'
//       }
//     }

//     >
//      <Text> Google Sign In </Text>
//     </TouchableOpacity>
//    <Button title='clickMeone' onPress={()=>signIn()}/>
//   </View>
//   );
// };

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//  button: {
//     width:200,
//     height:50,
//     justifyContent:'center',
//     alignItems:'center',
//     borderWidth:0.5,
//     alignSelf :'center',
//     marginTop:50,
//    backgroundColor:'red'
//   }
// });

// export default App;

// // import React from 'react';

// // import Providers from './navigation';

// // const App = () => {
// //   return <Providers />;
// // }

// // export default App;










import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


const App = () => {


  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  GoogleSignin.configure({
    webClientId: "715059804222-nfve9fhp1aancui6gulocboo58ujr6q7.apps.googleusercontent.com",
  });


  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }
  const SignOut = () => {

    auth()

      .signOut()

      .then(() => Alert.alert("Sign Out Successfully.!"))

      .catch(error => {
       console.log(error);
      })

  };

  // return (
  //   <View>
     
  //     <Button
  //       title="Google Sign-In"
  //       onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
  //      style={styles.button} />
     
     
  //     {/* <Text>Welcome {user.email}</Text> */}
  //     <Button
  //       title="Google Sign-Out"
  //       onPress={() => SignOut()}
  //     />
    
  //   </View>
  // );

  return (
    <View>
     
      <TouchableOpacity
      onPress={() => onGoogleButtonPress().then(() => Alert.alert("LogIn Succssfully!."))}
       style={styles.Loginbtn} >
        <Text style={styles.logintxt}>LOGIN</Text>
      </TouchableOpacity>
     
      {/* <Text>Welcome {user.email}</Text> */}
      <TouchableOpacity
        title="Google Sign-Out"
        onPress={() => SignOut()}
      style={styles.Logoutbtn}>
        <Text style={styles.logouttxt} >LOGOUT</Text>
      </TouchableOpacity>
    
    </View>
  );


}

const styles = StyleSheet.create({
    
   Loginbtn: {
      width:200,
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderWidth:0.5,
      alignSelf :'center',
      marginTop:50,
     backgroundColor:'#24a0ed',
     borderRadius:30
     
    },
    Logoutbtn: {
      width:200,
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderWidth:0.5,
      alignSelf :'center',
      marginTop:50,
     backgroundColor:'#24a0ed',
     borderRadius:30
    },
    logintxt:{
      color:'white',
      fontSize:20
    },
    logouttxt:{
      color:'white',
      fontSize:18
    }
  });

export default App;


