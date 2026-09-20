
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, Modal, FlatList, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { setSelectedProfile } from '../../../redux/slices/selectedSlice';
import { updateInfoPro } from '../../../redux/slices/infoSlice';
import { setProfileMeta } from '../../../redux/slices/imageSlice';
import { useDispatch } from 'react-redux';
import * as VideoThumbnails from 'expo-video-thumbnails';
import * as FileSystem from 'expo-file-system';



const ScreenWidth = Dimensions.get('window').width;
const Width = Math.round(ScreenWidth * 1);
const ScreenHeight = Dimensions.get("window").height;
const Height = Math.round(ScreenHeight * 0.35);



const EmptyObject = {};
const EmptyArray = [];



const Pro = (prop) => {
  const { navigation, route } = prop;
  // PARAMS SECTION
  const routy = useRoute();
  console.log('routeObject', routy)
  const { profileId, profileData } = route.params;
  // Dispatch;
  const dispatch = useDispatch();
  // USE STATE HOOK SECTION
  const [modal, setModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState("default");
  const [date, setDate] = useState(new Date());
  const [trainees, Setrainees] = useState(1)
  const [location, Setlocation] = useState('')
  const [showPicker, setShowpicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [status, SetStatus] = useState({});
  const [image, setImage] = useState(null);
  const [videoThumbnails, setVideoThumbnails] = useState({});
  const [thumbnailObject, setThumbnailsObject] = useState({})
  const [media, setMedia] = useState([])

  // USESELECTOR SECTION

  const infoSelected = useSelector(state => state.info.infoPro[profileId] || EmptyObject);
  console.log("Received item in Pro:", infoSelected);
  const profilePicture = useSelector(state => state.image.profiles[profileId] || EmptyObject);
  console.log('profilePictures', profilePicture);
  const ProfileSelected = useSelector(state => state.proSelected.selectedProfile || EmptyObject);
  console.log("the profile selected:", ProfileSelected)
  // VIDEO CONTROLLER INSTENCE SECTION


  // const videoSet = useMemo(() => {
  //   const isVideo = media.map(mediaUri => {
  //     if (typeof mediaUri !== 'string') return null;
  //     const lowerUri = mediaUri.toLowerCase();
  //     return (lowerUri.endsWith('.mp4') ||
  //       lowerUri.endsWith('.mov') ||
  //       lowerUri.endsWith('.mkv') ||
  //       lowerUri.endsWith('.webm')) ? mediaUri : null;
  //   });
  //   return new Set(isVideo.filter(uri => uri));
  // }, [media]);

  // useMemo let's you catch  a result of expensive calculation between rerender   in other term it memoizes  function  result
  //  and newSet() method return an array  whit  unique element  it discards deplucation 
  const videoSet = useMemo(() => {
    const videoUris = media
      .filter(item => item === 'video')
      .map(item => item.url)
    return new Set(videoUris)

  }, [media])





  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowpicker(false);
    console.log(selectedDate)
  };


  const deleteMedia = async (mediaId) => {
    console.log('Attempting to delete mediaId:', mediaId); 
    try {
      const res = await fetch(`http://192.168.1.173:3000/profiles/${profileId}/gallery/${mediaId}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (data.success) {
        console.log('Deleted:', data.message);
        // the filter prev take previous state  and filter to return a state without item deleted 
        setMedia(prev => prev.filter(item => item.id !== mediaId)); // instant UI update
        CloseModal();
      } else {
        console.log('Delete failed:', data.message);
      }
    } catch (e) {
      console.log('Delete error:', e);
    }
  };

  const handleDelete = (mediaId) => {
    Alert.alert(
      'Delete this item?',
      'This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteMedia(mediaId) }
      ]
    );
  };



  useFocusEffect(


    useCallback(() => {

      var active = true
      const FetchGallery = async () => {

        const Ipaddress = 'http://192.168.1.173:3000';

        try {
          const request = await fetch(`${Ipaddress}/profiles/${profileId}/gallery`)
          const data = await request.json();

          if (data.success) {
            setMedia(data.gallery);

          };


        } catch (e) {
          console.log('data failed:', e)

        }




      }
      FetchGallery()
      return () => {
        active = false
      }
    }, [profileId])




  );

  const mediaItems = media.map(item => ({
    id: item.id,
    uri: item.url,
    isVideo: item.type === 'video',
    isImage: item.type == 'video' ? null : item.url,
    video: item.type == 'video' ? item.url : null,
    thumbnail: item.thumbnail || null,
  }));


  const renderItem = ({ item }) => {
    // Determine the URI to display
    // const displayUri = item.video ? item.videoThumbnail : item.profileMeta;
    const isVideo = item.isVideo;
    const displayUri = isVideo
      ? item.thumbnail ?? null
      : item.uri;

    return (
      <View style={{ width: ScreenWidth / 3, height: ScreenWidth / 3 }}>
        <TouchableOpacity onPress={() => OpenModal(item)}>
          {displayUri && (
            <Image
              source={{ uri: displayUri }}
              style={{ width: '100%', height: '100%', borderRadius: 15 }}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  };



  // Modal section

  const OpenModal = (item) => {
    setModalVisible(true);
    setSelectedMedia(item);

  };

  const CloseModal = () => {
    setModalVisible(false);
    setSelectedMedia(null);
  };


  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const trainer = (itemValue) => {
    Setrainees(itemValue);
    console.log(itemValue)
  }

  const Spot = (itemValue) => {
    Setlocation(itemValue)
    console.log(itemValue)
  }

  const Separator = () => {
    return (
      <View style={styles.separator} />
    )

  };


  // VideoPlayer Section 
  const player = useVideoPlayer(selectedMedia?.video, player => {
    player.loop = true;
    player.play();
  })

  // RETURN SECTION
  const item = mediaItems
  return (
    <SafeAreaView>
      <View >

        <View style={styles.image}>
          <Image
            source={{ uri: profilePicture }}
            style={styles.image}
            defaultSource={require('../../../assets/images/salad.jpg')}
          />
        </View>
        <View style={styles.info}>
          <TouchableOpacity
            onPress={() => {



              navigation.navigate("ProfilesTab", {
                screen: "EditPro",
                params: {
                  profileId,
                  profileData: item
                }
              });
            }}
          >
            <Text style={styles.Edit}> EDITE PROFILE</Text>
          </TouchableOpacity>
          <Text style={styles.text}>{infoSelected.full_Name}</Text>
          <Text style={styles.text}>{infoSelected.certification}</Text>
          <Text style={styles.text}>{infoSelected.function}</Text>
          <Text style={styles.text}>{infoSelected.email}</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.box}>
            <TouchableOpacity activeOpacity={0.7} onPress={openModal}>
              <LinearGradient
                colors={['white', 'silver', 'white']}
                start={{ x: 3, y: -2 }}
                end={{ x: 1, y: 1 }}
                style={styles.button}
              >
                <Text style={styles.text}>Book Now</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity>
              <Modal
                animationType="fade"
                transparent={false}
                visible={modal}
                onRequestClose={closeModal}

              >

                <View style={styles.modalOverlay}>
                  <Text style={styles.text}>Choose Number of trainees</Text>
                  <Picker
                    style={styles.Picker}
                    selectedValue={trainees}
                    onValueChange={trainer}
                    itemStyle={styles.itemStyle}

                  >
                    <Picker.Item label='1' value={1} />
                    <Picker.Item label='2' value={2} />
                    <Picker.Item label='3' value={3} />
                    <Picker.Item label='4' value={4} />
                    <Picker.Item label='5' value={5} />
                    <Picker.Item label='6' value={6} />
                  </Picker>
                  <Separator />
                  <Text style={styles.text}>Choose location</Text>
                  <Picker
                    style={styles.Picker}
                    selectedValue={location}
                    onValueChange={Spot}
                    itemStyle={styles.itemStyle}
                  >
                    <Picker.Item label='24Fit' value='24Fit' />
                    <Picker.Item label='jerseyFit' value='jerseyFit' />
                    <Picker.Item label='bayonFit' value='bayonFit' />
                    <Picker.Item label='FourFit' value='FourFit' />
                  </Picker>
                  <Separator />
                  <Picker
                    style={styles.Picker}
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex) => {
                      setSelectedValue(itemValue);
                      itemValue === 'datetime' ? setShowpicker(true) : undefined

                    }}

                  >
                    <Picker.Item label="Choose Date and Time" value="datetime" />
                    <Picker.Item label="Select an option" value="default" />
                  </Picker>
                  {showPicker && (
                    <DateTimePicker
                      value={date}
                      mode="datetime"
                      is24Hour={true}
                      display="default"
                      onChange={onChange}
                    />
                  )}
                  <Button
                    title="CLOSE"
                    onPress={closeModal}
                    buttonStyle={{ backgroundColor: 'rgba(0,10,0,0.2)', borderRadius: 10, padding: 10 }}
                    containerStyle={{ marginTop: 200 }}
                    titleStyle={{ color: 'black', fontWeight: 'bold' }}
                  />

                </View>
              </Modal>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={mediaItems}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ justifyContent: 'flex-start', alignContent: "center", }}
        />
        {selectedMedia && (
          <Modal
            visible={modalVisible}
            transparent={true}
            onRequestClose={CloseModal}
            animationType="fade"
          >
            <View style={styles.modalContainer}>
              {selectedMedia.video ? (
                <VideoView
                  player={player}
                  allowsFullscreen={true}
                  style={styles.expandedMedia}


                />
              ) : (
                <Image
                  source={{ uri: selectedMedia.isImage }}
                  style={styles.modalMedia}
                />
              )}
              <TouchableOpacity onPress={() => handleDelete(selectedMedia.id)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>DELETE</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={CloseModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>CLOSE</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )}
      </View>
    </SafeAreaView >
  );
};







const styles = StyleSheet.create({


  image: {
    resizeMode: 'cover',
    width: Width,
    height: Height,
    borderRadius: 27,


  },

  deleteButton: {
    backgroundColor: 'rgba(220,0,0,0.85)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    marginBottom:100
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  info: {
    alignContent: 'left',
    alignItems: 'left',
    marginTop: "auto"

  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    fontWeight: 'condensed',
    autoCapitalize: "characters"


  },
  container: {
    flex: 4,
    backgroundColor: '#f0f0f0',
    flexDirection: "row",
    alignItems: 'center'


  },
  box: {

    width: 215,
    height: 130,
    marginTop: -4,
    backgroundColor: 'white',
    position: 'absolute',
    right: -10,
    top: -115,
    borderRadius: 25,
    opacity: 0.40

  },
  button: {
    alignItems: 'center',
    margin: 5,
    marginTop: 5,
    fontSize: '60',
    fontWeight: '1000',
    padding: '40',
    borderRadius: 25,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10

  },
  itemStyle: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    // height: 44,
    // Customize height of each item
  },
  Picker: {
    width: 200,
    height: 10,
    marginTop: -10

  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white", // Semi-transparent overlay
  },
  separator: {
    height: 10,
    backgroundColor: '#cccccc',
    marginVertical: 100,
  },
  boxContainer: {
    flex: 1,
    margin: 1,
    width: 150,
    height: 150
  },

  media: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  row: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 10,
  },
  video: {
    width: 100,
    height: 100,
  },
  expanded: {
    width: ScreenWidth / 3,
    height: ScreenWidth / 3,

  },
  collapsed: {
    width: 200,  // Example width
    height: 200, // Example height
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  modalMedia: {
    width: ScreenWidth,
    height: ScreenHeight,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  VideoModal: {
    width: ScreenWidth,
    height: ScreenHeight,
  },
  Edit: {
    color: "black",
    fontSize: 25,
    fontWeight: "bold",
    fontStyle: "italic",
    fontWeight: 'condensed'




  },
  expandedMedia: {
    width: ScreenWidth,
    height: ScreenHeight,
    borderRadius: 0,
  },

});





export default Pro;