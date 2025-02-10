
import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity, Modal, FlatList, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native-elements';
import { Video } from 'expo-av';




const ScreenWidth = Dimensions.get('window').width;
const Width = Math.round(ScreenWidth * 1);
const ScreenHeight = Dimensions.get("window").height;
const Height = Math.round(ScreenHeight * 0.3);


const Pro = ({ route ,navigation}) => {
  const { item } = route.params;
  const [modal, setModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState("default");
  const [date, setDate] = useState(new Date());
  const [trainees, Setrainees] = useState(1)
  const [location, Setlocation] = useState('')
  const [showPicker, setShowpicker] = useState(false);
  // const [isExpanded, setIsExpanded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [status,SetStatus]= useState({});

  const VideoRef = useRef(null);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShowpicker(false);
    console.log(selectedDate)
  };

  const handlePlaybackStatus=(status)=>{
    SetStatus(status)
  };

  const handlePlayPause=()=>{
    if(VideoRef.current){
      if(status.isPlaying){
         VideoRef.current.pauseAsync();
      }else{
        VideoRef.current.playAsync();


      }
    }
  }



  const data = [
    {
      id: 1,
      title: "hanibal",
      url: require('../../../assets/images/Hannibal.jpg'),
      type: 'image'
    },
    {
      id: 2,
      title: 'Pushup',
      url: require('../../../assets/images/pushup.jpg'),
      type: 'image'
    },
    {
      id: 3,
      title: "hanibal",
      url: require('../../../assets/videos/nutrution.mp4'),
      type: 'video'
    },
    {
      id: 4,
      title: "hanibal",
      url: require('../../../assets/images/Hannibal.jpg'),
      type: 'image'
    },
    {
      id: 5,
      title: "hanibal",
      url: require('../../../assets/videos/nutrution.mp4'),
      type: 'video'
    },
    {
      id: 6,
      title: "hanibal",
      url: require('../../../assets/images/Hannibal.jpg'),
      type: 'image'
    },

  ]

  const renderItem = ({ item }) => (


    <View style={{ width: ScreenWidth / 3, height: ScreenWidth / 3, }}>
      <TouchableOpacity onPress={() => OpenModal(item)} >
        {item.type === 'video' ? (
          <Video
            ref={VideoRef}
            source={item.url}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay={false}
            useNativeControls
            style={{ width: '100%', height: '100%', borderRadius: 15 }}

          />
        ) : (
          <Image
            source={item.url}
            style={{
              width: '100%',  // Take full width of parent container
              height: '100%', // Take full height of parent container
              backgroundColor: 'transparent',
              borderRadius: 15,
            }}
          />
        )}


      </TouchableOpacity>
    </View>


  )

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

  return (
    <SafeAreaView>
      <View >
        
        <View style={styles.image}>
          <TouchableOpacity onPress={()=>navigation.navigate('editPro',{item})}>
          <Image
            source={item.url}
            style={styles.image}
          />
          </TouchableOpacity>
        </View>
        <View style={styles.info}>
          <Text style={styles.text}>{item.Full_Name}</Text>
          <Text style={styles.text}>{item.Address}</Text>
          <Text style={styles.text}>{item.Function}</Text>
          <Text style={styles.text}>{item.Certification}</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.box}>
            <TouchableOpacity activeOpacity={0.7} onPress={openModal}>
              <LinearGradient
                colors={['white', 'silver', 'white']}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 3 }}
                style={styles.button}
              >
                <Text style={styles.text}>Book Now</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <LinearGradient
                colors={['white', 'silver', 'white']}
                start={{ x: 1, y: 0 }}
                end={{ x: 1, y: 3 }}
                style={styles.button}
              >
                <Text style={styles.text}>Contact</Text>
              </LinearGradient>
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
          data={data}
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
              {selectedMedia.type === 'video' ? (
                <Video
                  source={ selectedMedia.url }
                  style={styles.VideoModal}
                  resizeMode="contain"
                  controls={true} 
                  ref={VideoRef}
                  rate={1.0}
                  volume={1.0}
                  isMuted={false}
                  shouldPlay={false}
                  useNativeControls
                  
                />
              ) : (
                <Image
                  source={selectedMedia.url}
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
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({


  image: {
    resizeMode: 'cover',
    width: Width,
    height: Height,
    borderRadius: 25,


  },

  info: {
    alignContent: 'left',
    alignItems: 'left',
    marginTop: "auto"

  },
  text: {
    lineHeight: 24,
    fontVariant: ['small-caps', 'lining-nums'],
    fontWeight: 'bold',
    fontSize: "italic",

  },
  container: {
    flex: 4,
    backgroundColor: '#f0f0f0',
    flexDirection: "row",
    alignItems: 'center'


  },
  box: {

    width: 215,
    height: 120,
    backgroundColor: 'white',
    position: 'absolute',
    right: 0,
    top: -115,
    borderRadius: 20,
    opacity: 0.45

  },
  button: {
    alignItems: 'center',
    margin: 5,
    fontSize: '50',
    fontWeight: '900',
    padding: '40',
    borderRadius: 20,
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
  VideoModal:{
    width: ScreenWidth,
    height: ScreenHeight,
  }

});





export default Pro;