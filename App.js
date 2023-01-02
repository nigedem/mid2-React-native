import React, {useState} from 'react';
import { Keyboard, ScrollView, StyleSheet, Text, View } from 'react-native';
import {HomeScreen, StudentScreen, EmployeeScreen, TeacherScreen} from './component/Screens';
import TaskInputField from './component/TaskInputField';
import TaskItem from './component/TaskItem';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';


const Tab = createBottomTabNavigator();

export default function App() {


  return (
    <View style={styles.container}>
      <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen 
                    name='Student' 
                    component={StudentScreen}
                    options={{ 
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="home" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen 
                    name='Teacher'
                    component={TeacherScreen} 
                    options={{ 
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="info-circle" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen 
                    name='Employee'
                    component={EmployeeScreen} 
                    options={{ 
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="phone" color={color} size={size} />
                        ),
                    }}
                />
                
            </Tab.Navigator>
        </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1A3C',
  },
  heading: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 20,
  },
  scrollView: {
    marginBottom: 70,
  },
  taskContainer: {
    marginTop: 20,
  }
});