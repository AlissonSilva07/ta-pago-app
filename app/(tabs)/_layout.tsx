import { Tabs } from 'expo-router';
import React from 'react';
import Feather from '@expo/vector-icons/Feather';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Feather size={24} />,
        }}
      />
    </Tabs>
  );
}
