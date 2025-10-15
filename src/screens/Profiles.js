
import React from "react";
import { FlatList, StyleSheet, SafeAreaView } from "react-native";
import { ListItem, Avatar, } from 'react-native-elements';
import { useSelector } from "react-redux";
// import { selectPro } from "../../redux/reselect"


// const data = [
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

  const profilePicture = useSelector(state => state.image.profiles);
  const profileInfo= useSelector(state=>state.info.infoPro);
  console.log('info',profileInfo);
  console.log('profile content ', profilePicture)
  // const itemId = route?.params?.itemId ?? null;
  // console.log('routePArams', route?.params);

  // const profileList = useSelector(selectPro);

  const combinedProfiles = Object.entries(profileInfo).map(([id, info]) => {
    return {
      id: id,
      Full_Name: info.Full_Name,
      Address: info.Address,
      Function: info.Function,
      // Certification: info.Certification,
      // Add the corresponding image - adjust based on your data structure
      profileImage: profilePicture?.[id] ||profilePicture?.uri ||profilePicture||null
                   
                    
                   
    };
  });

    console.log('Combined Profiles Array:', combinedProfiles);
  // console.log('liste of profile', profileList)
  // const item = useSelector((state) => state.info.infoPro[itemId] || {});
  //  const item = useSelector((state) => state.info.infoPro);


  // const infoData = useSelector(state => state.info.infoPro);

  // const profilesList = selectPro.map(([id, value]) => ({
  //   id,
  //   ...value,
  // }));


  // const renderItem = ({ item:infoData }) => (
  //   <ListItem bottomDivider onPress={() => navigation.navigate('Pro',
  //     {
  //       item:
  //       {
  //         Full_Name: item.Full_Name,
  //         Address: item.Address,
  //         Function: item.Function,
  //         Certification: item.Certification,

  //       }
  //     }
  //   )}>
  //     <Avatar
  //       // source={{ uri: profilePicture?.meta }}
  //       source={{ uri: profilePicture }}
  //       size="medium"
  //       icon={{ name: 'person', type: 'material', color: 'white' }}
  //       overlayContainerStyle={{ backgroundColor: 'black' }}
  //       rounded
  //     />
  //     <ListItem.Content>
  //       <ListItem.Title>{item.Full_Name}</ListItem.Title>
  //       <ListItem.Title>{item.Function}</ListItem.Title>
  //       <ListItem.Title>{item.Certification}</ListItem.Title>
  //     </ListItem.Content>
  //   </ListItem>

  // )
    const renderItem = ({ item }) => (
    <ListItem 
      bottomDivider 
      onPress={() => navigation.navigate('Pro', {
        profileId: item.id,
        profileData: item
      })}
    >
      {/* Avatar with image from combined data */}
      <Avatar
        source={{ uri: item.profileImage }}
        size="medium"
        icon={{ name: 'person', type: 'material', color: 'white' }}
        overlayContainerStyle={{ backgroundColor: 'black' }}
        rounded
      />
      
      {/* Profile information from combined data */}
      <ListItem.Content>
        <ListItem.Title>{item.Full_Name}</ListItem.Title>
        <ListItem.Subtitle>{item.Function}</ListItem.Subtitle>
        <ListItem.Subtitle>{item.Certification}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );





  return (
    <SafeAreaView
      style={{ flex: 1, marginTop: 70 }}
    >
       {/* <FlatList
        data={selectPro}
        keyExtractor={(item, index) => (item?.id ? item.id.toString() : index.toString())}
        renderItem={renderItem}


      />
      <FlatList
        data={profileList} // ✅ Now you are passing a valid array
        keyExtractor={(item, index) => item?.id?.toString() ?? index.toString()}
        renderItem={renderItem}
      /> */}
       <FlatList
        data={combinedProfiles}  // Single combined array
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView > 

  )


  // const renderItem = ({ item }) => (
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











