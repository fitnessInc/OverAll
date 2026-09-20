
import React, { useCallback, useState, d } from "react";
import { FlatList, StyleSheet, SafeAreaView } from "react-native";
import { ListItem, Avatar, } from 'react-native-elements';
import { useSelector } from "react-redux";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { useDispatch } from 'react-redux';
import { updateInfoPro } from "../../redux/slices/infoSlice";
import { setProfileMeta } from "../../redux/slices/imageSlice";
// import { selectPro } from "../../redux/reselect"



const Profiles = ({ navigation }) => {
  const dispatch = useDispatch()
  const route = useRoute();
  console.log("objectRoute", route)

  //  const profilePicture = useSelector(state => state.image.profiles[profileId]);
  // const profileInfo = useSelector(state => state.info.infoPro);
  // console.log('info', profileInfo);
  // console.log('profile content ', profilePicture);
  const [profileList, setProfileList] = useState([]);
  //  useFocusEffect run  sideEffect when   the screen gain fucus and clean the effect when the screen lose focus meanwhile 
  // useCallback memoizes functions refference 

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchProfiles = async () => {
        try {
          const res = await fetch('http://192.168.1.173:3000/profiles');
          const data = await res.json();

          if (data.success && isActive) {
            setProfileList(data.profiles);

            data.profiles.forEach(profile => {
              dispatch(updateInfoPro({
                id: profile.user_id,
                newData: {
                  full_Name: profile.full_Name,
                  email: profile.email,
                  certification: profile.certification,
                  function: profile.function,
                }
              }));

              if (profile.avatar?.uri) {
                dispatch(setProfileMeta({
                  id: profile.user_id,
                  newImage: profile.avatar.uri   // ✅ fixed: correct key (newImage) and correct path (avatar.uri)
                }));
              }
            });
          }
        } catch (error) {
          console.log(`failed to fetch profiles: ${error}`);
        }
      };

      fetchProfiles();

      return () => {
        isActive = false;
      };
    }, [])
  );


  const renderItem = ({ item }) => (
    <ListItem
      bottomDivider
      onPress={() => navigation.navigate('ProfilesTab', {
        screen: 'Pro',
        params: {
          profileId: item.user_id,
          profileData: item
        }

      })}
    >

      <Avatar
        source={item.avatar?.uri ? { uri: item.avatar.uri } : require('../assets/images/meal.png')}
        size="medium"
        icon={{ name: 'person', type: 'material', color: 'white' }}
        overlayContainerStyle={{ backgroundColor: 'black' }}
        rounded
      />

      {/* Profile information from combined data */}
      <ListItem.Content>
        <ListItem.Title>{item.full_Name}</ListItem.Title>
        <ListItem.Subtitle>{item.function}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );


  return (
    <SafeAreaView
      style={{ flex: 1, marginTop: 70 }}
    >
      <FlatList
        data={profileList}  // Single combined array
        keyExtractor={(item) => item.user_id.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView >

  )

};



const styles = StyleSheet.create({
  avatar: {
    width: 30,
    height: 30,
  },
});

export default Profiles;











