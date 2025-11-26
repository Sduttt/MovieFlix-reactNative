import { Image, TextInput, View } from 'react-native'
import React from 'react'
import { icons } from '../constants/icons'
import { useRouter } from 'expo-router'

const Searchbar = ({ placeholder, value, onChangeText, onPress }: { placeholder: string, value?: string, onChangeText?: (text: string) => void, onPress?: () => void }) => {
    return (
        <View className='flex-row items-center px-5 py-4 bg-dark-200 rounded-full'>
            <Image source={icons.search} className='w-5 h-5' tintColor="#ab8bff" resizeMode='contain' />
            <TextInput
                placeholder={placeholder}
                placeholderTextColor='#a8b5db'
                className='text-white flex-1 ml-2'
                onPress={onPress}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    )
}

export default Searchbar