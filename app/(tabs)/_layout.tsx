import Tabicon from '@/components/tabicon'
import { Tabs } from 'expo-router'
import React from 'react'
import { icons } from '@/constants/icons'

const _layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                tabBarStyle: {
                    backgroundColor: "#0F0D23",
                    borderRadius: 50,
                    marginHorizontal: 20,
                    marginBottom: 36,
                    height: 52,
                    position: 'absolute',
                    overflow: 'hidden',
                    borderWidth: 1,
                    borderColor: '#0f0d23'
                }
            }}
        >
            <Tabs.Screen name="index" options={{
                title: "Home",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <Tabicon focused={focused} title="Home" icon={icons.home} />
                )
            }} />
            <Tabs.Screen name="search" options={{
                title: "Search",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <Tabicon focused={focused} title="Search" icon={icons.search} />
                )
            }} />
            <Tabs.Screen name="saved" options={{
                title: "Saved",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <Tabicon focused={focused} title="Saved" icon={icons.save} />
                )

            }} />
            <Tabs.Screen name="profile" options={{
                title: "Profile",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <Tabicon focused={focused} title="Profile" icon={icons.person} />
                )
            }} />
        </Tabs>
    )
}

export default _layout