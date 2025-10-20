
import React from "react";
import { FlatList, StyleSheet, SafeAreaView } from "react-native";
import { ListItem, Avatar, } from 'react-native-elements';
import { useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";
// import { selectPro } from "../../redux/reselect"
//     {
//         id: '1',
//         Full_Name: 'nanito Nanitosse',

//         Address: 'inconito',
//         Function: 'Calisthenics',
//         Certification: ' Certification: Nasam',
//         meta: null,
//         url: require('../../assets/images/Hannibal.jpg')



//     },
//     {
//         id: '2',
//         Full_Name: 'Aicha Ahmat',

//         Address: ' Address: 646 berge ave NJ',
//         Function: ' body weight trainer ',
//         Certification: 'Nasam',
//         meta: null,
//         url: require('../../assets/images/Hannibal.jpg')


//     },
//     {
//         id: '3',
//         Full_Name: 'Alato Sow',
//         Address: ' Address: 646 berge ave NJ',
//         Function: ' weight trainer ',
//         Certification: 'Certification: Nasam',
//         meta: null,
//         url: require('../../assets/images/Hannibal.jpg')


//     },

// ];




const Profiles = ({ navigation }) => {
   const route = useRoute();
   console.log("objectRoute",route)

  const profilePicture = useSelector(state => state.image.profiles);
  const profileInfo= useSelector(state=>state.info.infoPro);
  console.log('info',profileInfo);
  console.log('profile content ', profilePicture)
  
  const combinedProfiles = Object.entries(profileInfo).map(([id, info]) => {
    return {
      id: id,
      Full_Name: info.Full_Name,
      Address: info.Address,
      Function: info.Function,
      profileImage: profilePicture?.[id] ||profilePicture?.uri ||profilePicture||null
                                             
    };
  });

    console.log('Combined Profiles Array:', combinedProfiles);
  
    const renderItem = ({ item }) => (
    <ListItem 
      bottomDivider 
      onPress={() => navigation.navigate('Pro', {
        profileId: item.id,
        profileData: item
      })}
    >
  
      <Avatar
        source={item.profileImage?{ uri: item.profileImage }: require('../assets/images/meal.png')}
        size="medium"
        icon={{ name: 'person', type: 'material', color: 'white' }}
        overlayContainerStyle={{ backgroundColor: 'black' }}
        rounded
      />
      
      {/* Profile information from combined data */}
      <ListItem.Content>
        <ListItem.Title>{item.Full_Name}</ListItem.Title>
        <ListItem.Subtitle>{item.Address}</ListItem.Subtitle>
        <ListItem.Subtitle>{item.Function}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );





  return (
    <SafeAreaView
      style={{ flex: 1, marginTop: 70 }}
    > 
       <FlatList
        data={combinedProfiles}  // Single combined array
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView > 

  )


 
  //   <ListItem
  //     bottomDivider
  //     onPress={() =>
  //       navigation.navigate("Pro", {
  //         item: {
  //           Full_Name: item.Full_Name,
  //           Address: item.Address,
  //           Function: item.Function,
  //           Certification: item.Certification,
  //           meta:item.meta
  //         },
  //       })
  //     }
  //   >
  //     <Avatar
  //       source={{ uri: profilePicture?.[item.id]?.meta || undefined }}
  //       size="medium"
  //       icon={{ name: "person", type: "material", color: "white" }}
  //       overlayContainerStyle={{ backgroundColor: "black" }}
  //       rounded
  //     />
  //     <ListItem.Content>
  //       <ListItem.Title>{item.Full_Name}</ListItem.Title>
  //       <ListItem.Title>{item.Function}</ListItem.Title>
  //       <ListItem.Title>{item.Certification}</ListItem.Title>
  //     </ListItem.Content>
  //   </ListItem>
  // );

  // return (
  //   <SafeAreaView style={{ flex: 1, marginTop: 70 }}>
  //     <FlatList
  //       data={profileList}
  //       keyExtractor={(item, index) =>
  //         item?.id ? item.id.toString() : index.toString()
  //       }
  //       renderItem={renderItem}
  //     />
  //   </SafeAreaView>
  // );
};

 

const styles = StyleSheet.create({
  avatar: {
    width: 30,
    height: 30,
  },
});

export default Profiles;











