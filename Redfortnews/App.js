import React, { useEffect, useState } from "react";
import { Text, View, FlatList, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { Thumbnail } from "native-base";
import SoundPlayer from 'react-native-sound-player'

function ArticlesScreen() {

    const [data, setData] = useState({});
  
    useEffect(() => {
      getData();
    }, []);
  
    const getData = async () => {
      let resp = await fetch("https://redfortnews.com/wp-json/wp/v2/posts");
      try {
        const respJson = await resp.json();
        setData(respJson);
      } catch (err) {
        throw err;
      }
    };
    const removeParagraphTag = (data) => {
      const removePre = data.replace(/<p[^>]*>/g, "").replace(/<\/p>/g, "");
      return removePre;
    };
  return ( // TODO -> CardPadding,image, Header, Webstories link, 
    <View> 
      <Text style={{ fontSize: 40, backgroundColor: "#0000" }}></Text>
       <Text style={{ fontSize: 30, backgroundColor: "#0000" }}>  RedFortNews</Text>
    <View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <Thumbnail style={{marginHorizontal:6,borderColor:'red', borderWidth:2}} source={require('./assets/1.jpg')}/>
        <Thumbnail style={{marginHorizontal:6,borderColor:'red', borderWidth:2}} source={require('./assets/2.jpg')}/>  
        <Thumbnail style={{marginHorizontal:6,borderColor:'black', borderWidth:2}} source={require('./assets/3.jpg')}/>
        <Thumbnail style={{marginHorizontal:6,borderColor:'black', borderWidth:2}} source={require('./assets/4.jpg')}/>
        <Thumbnail style={{marginHorizontal:6,borderColor:'black', borderWidth:2}} source={require('./assets/5.jpg')}/>
        <Thumbnail style={{marginHorizontal:6,borderColor:'black', borderWidth:2}} source={require('./assets/6.jpg')}/>
        <Thumbnail style={{marginHorizontal:6,borderColor:'black', borderWidth:2}} source={require('./assets/3.jpg')}/>
        <Thumbnail style={{marginHorizontal:6,borderColor:'black', borderWidth:2}} source={require('./assets/1.jpg')}/>
      </ScrollView>
    </View>
    <FlatList
      data={data}
      renderItem={({ item }) => {
        const { title, content } = item;
        const simpleContent = removeParagraphTag(content.rendered);
        return (
          <Card>
          <Card.Content>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            <Title>{title.rendered}</Title>
            <Paragraph>{simpleContent}</Paragraph>
          </Card.Content>
        </Card>
        );
      }}
      keyExtractor={(item, index) => index.toString()}
    />
  </View>
  );
}

function PodcastScreen() {

  const btnplay = async () => {
   

   try {
   
    SoundPlayer.playSoundFile("alone", "mp3")
    // SoundPlayer.playUrl("https://www.computerhope.com/jargon/m/example.mp3")
 
 
  } catch (err) {
    console.log(`cannot play the sound file`, err)
}

   };
 

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Button  onPress={btnplay}> Play Podcast Now</Button>
  </View>

  );
}

function MoreScreen() {   // TODO -> Username, profile pic, dark mode switch, screens-  About Us, Contact Us, Disclaimer, Feedback, Privacy Policy, Terms and Conditions, Rate Us
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>More</Text> 
    </View>
  );
}



const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer >
      
      <Tab.Navigator
     
      
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Articles') {
              iconName = focused ? 'md-paper' : 'md-paper';
            } else if (route.name === 'Podcast') {
              iconName = focused ? 'md-microphone' : 'md-microphone';
            } else if (route.name === 'More') {
              iconName = focused ? 'ios-arrow-dropup' : 'ios-arrow-dropup';
            } 
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'black',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Articles" component={ArticlesScreen}  />
        <Tab.Screen name="Podcast" component={PodcastScreen} />
        <Tab.Screen name="More" component={MoreScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
