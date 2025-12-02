import React, { useState } from 'react'
import { Text, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'

const Saved = () => {
    // State to track which tab is active
    const [activeTab, setActiveTab] = useState<'watchlist' | 'watched'>('watchlist')

    return (
        <SafeAreaView className="flex-1 bg-primary">
            <Image source={images.bg} className="w-full absolute z-0" />

            <View className="px-5 mt-5">
                <Text className="text-white text-center text-3xl font-bold mb-6">Saved Movies</Text>

                {/* Custom Tab Bar */}
                <View className="flex-row bg-[#1F212C] rounded-full p-1 mb-6 border border-[#2D303E]">
                    {/* Watchlist Tab */}
                    <TouchableOpacity
                        className={`flex-1 py-3 rounded-full items-center justify-center ${activeTab === 'watchlist' ? 'bg-[#6C5DD3]' : 'bg-transparent'}`}
                        onPress={() => setActiveTab('watchlist')}
                    >
                        <Text className={`font-semibold text-base ${activeTab === 'watchlist' ? 'text-white' : 'text-gray-400'}`}>Watchlist</Text>
                    </TouchableOpacity>

                    {/* Watched Tab */}
                    <TouchableOpacity
                        className={`flex-1 py-3 rounded-full items-center justify-center ${activeTab === 'watched' ? 'bg-[#6C5DD3]' : 'bg-transparent'}`}
                        onPress={() => setActiveTab('watched')}
                    >
                        <Text className={`font-semibold text-base ${activeTab === 'watched' ? 'text-white' : 'text-gray-400'}`}>Watched</Text>
                    </TouchableOpacity>
                </View>

                {/* Content Area */}
                <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                    {activeTab === 'watchlist' ? (
                        // Watchlist Content (Empty State)
                        <View className="items-center justify-center mt-20">
                            <Image source={icons.save} className="w-16 h-16 tint-gray-600 mb-4" style={{ tintColor: '#4B5563' }} />
                            <Text className="text-white text-xl text-center w-full font-bold">Your Watchlist is Empty</Text>
                            <Text className="text-gray-400 text-center mt-2 px-10">Movies you want to watch will appear here.</Text>
                        </View>
                    ) : (
                        // Watched Content (Empty State)
                        <View className="items-center justify-center mt-20">
                            <Image source={icons.tick} className="w-16 h-16 tint-gray-600 mb-4" style={{ tintColor: '#4B5563' }} />
                            <Text className="text-white text-xl font-bold">No Watched Movies</Text>
                            <Text className="text-gray-400 text-center mt-2 px-10">Movies you mark as watched will appear here.</Text>
                        </View>
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Saved