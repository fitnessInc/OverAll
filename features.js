{/* <View style={styles.container}>
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

        // card.js 
        import React, { useState, useEffect } from "react";
        import { View, Dimensions,TouchableHighlight , Image, Text, TouchableOpacity, StyleSheet } from "react-native";
        import { Rating, AirbnbRating } from 'react-native-ratings';
        
        
        
        
        export const Resto = [
        
            {    id:"1",
                title: "realOne",
                source: require('../../assets/images/MexicanChicken.jpg'),
        
                field: "vegetariant",
                delivery: "",
                rate: ""
        
            },
            {   id:"2",
                title: "realTwo",
                source:require("../../assets/images/salad.jpg"),
                field: " Salad",
                delivery: "",
                rate: ""
        
            },
            {   id:"3",
                title: "realThree",
                source:require('../../assets/images/healthy.jpeg'),
                delivery: "",
                rate: ""
        
            },
        ]
        
        
        
        
        const RestauCard = ({ item }) => {
            const [data, setData] = useState([]);
            const [rating, setRating] = useState(0);
        
          
            const handleRating = (rating) => {
              console.log(`rating is: ${rating}`);
              setRating(rating); // Update the rating state
            };
          
            const ScreenWidth = Dimensions.get('window').width;
            const Width = Math.round(ScreenWidth * 0.35);
            const ScreenHeight = Dimensions.get("window").height;
            const Height = Math.round(ScreenHeight * 0.1);
          
            return (
              <View>
                <TouchableOpacity>
                  <Image
                    source={item.source}
                    style={{ margin: 10, borderRadius: 25, width: Width, height: Height }}
                  />
                  <Text style={Styles.text}>{item.title}</Text>
                  <Text>{item.delivery}</Text>
                  <AirbnbRating
                    count={5}
                    defaultRating={rating}
                    size={20}
                    starContainerStyle={{ alignSelf: 'flex-start', marginTop: -25 }}
                    onFinishRating={handleRating}
                  />
                </TouchableOpacity>
              </View>
            );
          };
          
        
        
        const Styles = StyleSheet.create({
            text: {
                color: "black",
                textAlign: 'left',
                marginTop: -1
        
        
            }
        })
        
        
        
        
        
        
        
        
        
        
        
        export default RestauCard;
        
        //Carousel.js
        import React, { useState, useEffect, useRef, } from "react";
        import { View, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Text, Button, } from 'react-native';
        import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
        import Carousel, { Pagination } from "react-native-reanimated-carousel";
        import CarouselCardItem from "./CarouselItem";
        import { SliderWidth, ItemWidth } from "./CarouselItem";
        import Data from "../../assets/data";
        import Food from "../screens/food";
        import Order from "../screens/Order";
        import { NavigationContainer } from '@react-navigation/native';
        // import LinearGradient from 'react-native-linear-gradient';
        import { LinearGradient } from 'expo-linear-gradient';
        import { SafeAreaView } from "react-native-safe-area-context";
        
        
        
        
        export default function CarouselCard({ navigation }) {
        
          const [index, setIndex] = useState(0);
          const xCarousel = useRef(null)
        
          return (
            <SafeAreaView>
              <Carousel
                layout="tinder"
                layoutCardOffset={9}
                ref={xCarousel}
                data={Data}
                renderItem={CarouselCardItem}
                sliderWidth={SliderWidth}
                itemWidth={ItemWidth}
                onSnapToItem={(index) => setIndex(index)}
                useScrollView={true}
        
              />
              <Pagination
                dotsLength={Data.length}
                activeDotIndex={index}
                carouselRef={xCarousel}
                dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.92)",
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                tappableDots={true}
              />
              <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Food")}>
                <LinearGradient
                  colors={['white', 'green', 'white']}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.button}
                >
                  <Text style={styles.text}>Customize Your Meal</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.9} onPress={() => navigation.navigate('Order')}>
                <LinearGradient
                  colors={["white", 'green', 'white']}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.button}
                >
                  <Text style={styles.text}>Place Your Order</Text>
                </LinearGradient>
              </TouchableOpacity>
        
        
        
            </SafeAreaView>
          )
        
        };
        
        const styles = StyleSheet.create({
          container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          },
          button: {
            
            
            
        
          },
        
          text: {
            fontSize: '15',
            fontVariant: 'bold',
            fontWeight: '900',
            color: 'white',
            borderCurve: 4,
            borderRadius: 20
          }
        });

        //carouselItem.js
        mport React from "react";
        import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
        
        export const SliderWidth = Dimensions.get('window').width;
        export const ItemWidth = Math.round(SliderWidth * 0.95);
        
        export default function CarouselCardItem({ index, item }) {
            return (
                < View  style={Styles.container} key={{index}}>
                    <Image source={{ uri: item.imgUrl }} style={Styles.image} />
                    <Text style={Styles.header}>{item.title}</Text>
                    <Text style={Styles.body}>{item.body}</Text>
                </View>
            )
        
        }
        
        
        const Styles = StyleSheet.create({
            container: {
                backgroundColor:'white',
                marginTop:200,
                borderRadius: 10,
                width: ItemWidth,
                paddingBottom: 250,
                height:200,
                justifyContent:'center',
                alignItems:'center',
                textAlign:'center'
               
            
            },
            image: {
                width: ItemWidth,
                height: 300,
                
            },
            header: {
                color: "black",
                fontSize: 20,
                fontWeight: "bold",
                paddingLeft: 20,
                paddingTop: 20,
            },
            body: {
                color: "black",
                fontSize: 18,
                fontWeight:'bold',
                paddingLeft: 20,
                paddingLeft: 20,
                paddingRight: 20,
                textAlign:'center'
            },
        
        });

        // mealStackNAvigator
        import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CarouselCard from '../components/carousel';
import Food from '../screens/food';
import Order from '../screens/Order';

const Stack = createStackNavigator();

function MealStackNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="CarouselCard" component={CarouselCard} />
            <Stack.Screen name="Food" component={Food} />
            <Stack.Screen name="Order" component={Order} />
        </Stack.Navigator>
    );
}

export default MealStackNavigator;

server with socket 
//db connection//

(async ()=>{
    try{
        await db.connect();// data base connection 
    init(server)// second sock.Io connection 
 

    // then server boostrap 
     server.listen(port,hostname,()=>{
        console.log(`the middle man is running at http://${hostname}:${port}`);
     })
    }catch(err){
        console.log('faild to boostrap the middle man ', err );
        process.exit(1)
    }
})();

const shutdown = async()=>{
    console.log('middle man is shutting down');
    await db.disconnect();
    server.close(()=>process.exit(0))
};

process.on('SIGINT', shutdown);// will be fire in production mode
process.on('SIGTERM', shutdown);// will be fire in production mode
        
        
        
        
        
        
        
        
         */}
// server with socket
// console.log('CWD:', process.cwd());
// console.log('ENV URI:', process.env.MONGODB_URI);
// require('dotenv').config();

// if (!process.env.MONGODB_URI){
//     throw new Error('db uri is  undefined ')
// };
//  const express = require('express');
// const http = require('http');
// const messageRouter = require("./routes/message");
// const profileRouter =  require('./routes/userProfile');
// const userRouter = require('./routes/user');
// const uploadRouter = require('./routes/fileUpload');
// const galleryThumbUrl= require('./routes/thumbnailUrl')

// const cors = require('cors');

// const db= require('./conectiondb/dbConnect')
// const { init } = require('./socket');

      

// //  creation of express application //
// const app = express();
// const server = http.createServer(app);

// //middleware//
  
// app.use(express.json());
// app.use(cors());


// //routes// mounting the routes and defining prefixes for routes 
// app.use('/messages', messageRouter);
// app.use('/profiles' ,profileRouter);
// app.use('/users',userRouter);
// // app.use('/uploads', uploadRouter);
// app.use('/upload',uploadRouter);
// // gallery  thumbnail  route mounting 
// app.use('/gaThumbUrl',galleryThumbUrl)

// //port hostname//

// const port = process.env.PORT || 3000;
// const hostname = 'localhost';
// // console.log("environemt var:",process.env)

// //db connection//

// (async ()=>{
//     try{
//         await db.connect();// data base connection 
//     init(server)// second sock.Io connection 
 

//     // then server boostrap 
//      server.listen(port,hostname,()=>{
//         console.log(`the middle man is running at http://${hostname}:${port}`);
//      })
//     }catch(err){
//         console.log('faild to boostrap the middle man ', err );
//         process.exit(1)
//     }
// })();

// const shutdown = async()=>{
//     console.log('middle man is shutting down');
//     await db.disconnect();
//     server.close(()=>process.exit(0))
// };

// process.on('SIGINT', shutdown);// will be fire in production mode
// process.on('SIGTERM', shutdown);// will be fire in production mode

// socket.js


// const { Server } = require('socket.io');
// const { client, connection } = require('./conectiondb/dbConnect');
// const { ObjectId } = require('mongodb');
// const Message = require('./schemas/messageSchema')


// let io; // Will hold the socket instance

// function init(server) {
//     io = new Server(server,{
//         cors:{
//             origin:'*',
//             methods:['GET','POST','DELET','UPDATE']
//         }
//     });
//     const users = {};

//     io.on('connection', (socket) => {
//         console.log("A User Connected", socket.id);

//         socket.on('registerUser', (username) => {
//             users[username] = socket.id;
//             console.log(`User ${username} registered with socket ID: ${socket.id}`);
//         });

//         socket.on('newMessage', async ({sender,recipient,content}) => {
     
        
//             try {
//                    // create new message documment in mongo via mongoose 

//                    const message=  await new Message.create({
//                       sender,
//                       recipient,
//                       content
//                    });

//                    console.log(' message inserted in the db', message)
                 
                
//                 // Emit the message to the recipient if they are connected
//                 if (users[recipient]) {
//                     io.to(users[recipient]).emit('newMessage', message);
//                     console.log(`Message sent to recipient:${recipient}, message  :${content}`)
//                 } else {
//                     console.log(`Recipient ${recipient} is not connected`);
//                 }
//             } catch (err) {
//                 console.error('Error persisting message', err);
//             }
//         });

//         // Handle content update
//         socket.on('updateContent', async ({id, newContent}) => {
//             console.log( id , newContent);

//             try {
//               const updated= await Message.findByIdAndUpdate(
//                 id,
//                 {conten:newContent},
//                 {new:true}
//               )
                
                
//                 // emiting the updated content
//                 if (updated) {
//                     io.emit('updateContent', { id, newContent });
//                 } else {
//                     console.log('Content not updated');
//                 }
//             } catch (err) {
//                 console.log("Error updating message", err);
//             }
//         });

//         socket.on('deleteContent', async (id) => {
//             try {
//                   const deleted = await Message.findByIdAndDelete(id)

                  
//                 if (deleted) {
//                     io.emit('deleteContent', { id });
//                 }
//             } catch (err) {
//                 console.log("Error deleting message", err);
//             }
//         });
       

//         // Handle user disconnect
//         socket.on('disconnect', () => {
//             for (const username in users) {
//                 if (users[username] === socket.id) {
//                     delete users[username];
//                     console.log(`User ${username} disconnected`);
//                     break;
//                 }
//             }
//         });
//     });
// }

// // Function to get the socket.io instance
// function getIo() {
//     if (!io) {
//         throw new Error('Socket.io not initialized');
//     }
//     return io;
// }


// // Export the init function to be called in your server file
// module.exports = { init, getIo };
