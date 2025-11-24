import { images } from '@/constants/images'
// import { icons } from '@/constants/icons'
import React from 'react'
import { Image, ImageBackground, Text, View } from 'react-native'


const Tabicon = ({ focused, icon, title }: any) => {
    if (focused) {
        return (
            <ImageBackground source={images.highlight} className='flex flex-row w-full flex-1 items-center justify-center rounded-full overflow-hidden min-w-[112px] min-h-16 mt-4'>
                <Image source={icon} tintColor="#151312" className="size-5" />
                <Text className='text-secondary text-base font-semibold ml-2'>{title}</Text>
            </ImageBackground>
        )
    } else {
        return (
            <View className='size-full justify-center mt-4 items-center'>
                <Image source={icon} tintColor={"#A8B5DB"} className='size-5' />
            </View>
        )
    }
}

export default Tabicon