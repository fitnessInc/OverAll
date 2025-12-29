
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, Modal, FlatList, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { setSelectedProfile } from '../../../redux/slices/selectedSlice';
import { useDispatch } from 'react-redux';
import * as VideoThumbnails from 'expo-video-thumbnails';
import * as FileSystem from 'expo-file-system';



const ScreenWidth = Dimensions.get('window').width;
const Width = Math.round(ScreenWidth * 1);
const ScreenHeight = Dimensions.get("window").height;
const Height = Math.round(ScreenHeight * 0.35);




const Pro = (prop) => {
  const { navigation, route } = prop;
  // PARAMS SECTION
  const routy = useRoute();
  console.log('routeObject', routy)
  const { profileId } = route.params;

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
  // const [combinedProfiles, setCombinedProfiles] = useState([])
  // const [selectedItem, setSelectedItem] = useState(null)

  // USESELECTOR SECTION

  const infoSelected = useSelector(state => state.info.infoPro[profileId] || {});
  console.log("Received item in Pro:", infoSelected);
  const profilePicture = useSelector(state => state.image.profiles[profileId] || {});
  console.log('profilePictures', profilePicture);
  const metadata = useSelector(state => state.meta.metaPro[profileId] || []);
  console.log('meta fro profile', metadata);
  const ProfileSelected = useSelector(state => state.proSelected.selectedProfile || {});
  console.log("the profile selected:", ProfileSelected)
  // VIDEO CONTROLLER INSTENCE SECTION


  const videoSet = useMemo(() => {
    const isVideo = metadata.map(mediaUri => {
      if (typeof mediaUri !== 'string') return null;
      const lowerUri = mediaUri.toLowerCase();
      return (lowerUri.endsWith('.mp4') ||
        lowerUri.endsWith('.mov') ||
        lowerUri.endsWith('.mkv') ||
        lowerUri.endsWith('.webm')) ? mediaUri : null;
    });
    return new Set(isVideo.filter(uri => uri));
  }, [metadata]);





  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowpicker(false);
    console.log(selectedDate)
  };

  // thumbnail generator 

  
  useEffect(() => {
    let isMounted = true;
    const abort = new AbortController();
    const generated = new Set();

    const generateThumbnails = async () => {
      const videosToProcess = metadata
        .filter(uri => videoSet.has(uri) && !videoThumbnails[uri])
        .slice(0, 3);

      if (videosToProcess.length === 0) return;

      for (const videoUri of videosToProcess) {
        if (!isMounted || abort.signal.aborted) break;

        try {
          const { uri: thumbUri } =
            await VideoThumbnails.getThumbnailAsync(videoUri, {
              time: 26000,
              quality: 0.7,
            });

          if (!isMounted || abort.signal.aborted) return;

          generated.add(thumbUri);

          setVideoThumbnails(prev => ({
            ...prev,
            [videoUri]: thumbUri,
          }));
        } catch (e) {
          console.log('Thumbnail failed:', videoUri, e);
        }
      }
    };

    generateThumbnails();

    return () => {
      isMounted = false;
      abort.abort();

      generated.forEach(uri => {
        if (uri?.startsWith('file://')) {
          FileSystem.deleteAsync(uri, { idempotent: true });
        }
      });
    };
  }, [metadata, videoSet, videoThumbnails]);

  const mediaItems = metadata.map(uri => ({
    id: uri,
    uri,
    isVideo: videoSet.has(uri),
    isImage: videoSet.has(uri)?null:uri,
    video:videoSet.has(uri)?uri:null,
    thumbnail: videoThumbnails[uri] || null,
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

// useEffect hydrate redux with the future unmounte profile  or selected profile 

  useEffect(() => {

    // to check 
    if (!profileId) return;

    const hasInfo = state => state.info.infoPro?.[profileId];
    // (we'll use selector instead of state here)

    if (
      !infoSelected?.Full_Name &&
      (infoSelected || profilePicture || metadata?.length)
    ) {
      // INFO
      dispatch(updateInfoPro({
        id: profileId,
        newData: {
          Full_Name: infoSelected.Full_Name,
          Address: infoSelected.Address,
          Certification: infoSelected.Certification,
          Function: infoSelected.Function,
        }
      }));

      // IMAGE
      if (profilePicture) {
        dispatch(setProfileImage({
          id: profileId,
          uri: profilePicture
        }));
      }

      // MEDIA
      if (metadata?.length) {
        dispatch(metaProfile({
          id: profileId,
          media: metadata
        }));
      }
    }

  }, [profileId, infoSelected, profilePicture, metadata])


// VideoPlayer Section 
 const player = useVideoPlayer(selectedMedia?.video, player => {
    player.loop = true;
    player.play();
  })

  // RETURN SECTION
 const  item=mediaItems
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
                  profileId
                  // profileData: item
                }
              });
            }}
          >
            <Text style={styles.Edit}> EDITE PROFILE</Text>
          </TouchableOpacity>
          <Text style={styles.text}>{infoSelected.Full_Name}</Text>
          <Text style={styles.text}>{infoSelected.Address}</Text>
          <Text style={styles.text}>{infoSelected.Certification}</Text>
          <Text style={styles.text}>{infoSelected.Function}</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.box}>
            <TouchableOpacity activeOpacity={0.7} onPress={openModal}>
              <LinearGradient
                colors={['white', 'silver', 'white']}
                start={{ x: 3, y:-2 }}
                end={{ x: 1, y: 1}}
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

  info: {
    alignContent: 'left',
    alignItems: 'left',
    marginTop: "auto"

  },
  text: {
    color:'black',
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
    fontWeight: 'condensed',
     autoCapitalize:"characters"


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
    marginTop:-4,
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
    marginTop:5,
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