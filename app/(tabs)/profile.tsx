
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import { images } from '@/constants/images'
import { useAuth } from '@/services/AuthContext'
import { Link } from 'expo-router'
import React from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'

const profile = () => {
    const { user, logout, isNewUser, deleteAccount } = useAuth()

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };
    return (
        <View className='flex-1 bg-primary'>
            <Image source={images.bg} className="w-full absolute z-0" />

            {user ? (

                <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', padding: 24 }}>


                    <View className="items-center mt-8 mb-8">
                        <View className="w-32 h-32 rounded-full bg-[#6C5DD3] items-center justify-center shadow-lg shadow-[#6C5DD3]/50 mb-6 border-4 border-[#1F212C]">
                            <Text className="text-white text-5xl font-bold tracking-wider">
                                {getInitials(user.name)}
                            </Text>
                        </View>
                        <Text className="text-white text-3xl font-bold mb-2">{user.name}</Text>
                        <Text className="text-gray-400 text-base">{user.email}</Text>

                        <View className="mt-4 px-4 py-1 bg-[#1F212C] rounded-full border border-[#2D303E]">
                            <Text className="text-[#6C5DD3] font-semibold text-sm">Free User</Text>
                        </View>
                    </View>

                    {/* Premium Card */}
                    <TouchableOpacity className="w-full bg-[#6C5DD3] p-6 rounded-3xl mb-8 flex-row items-center justify-between shadow-lg shadow-[#6C5DD3]/30">
                        <View>
                            <Text className="text-white text-xl font-bold mb-1">Go Premium</Text>
                            <Text className="text-white/80 text-sm">Enjoy an ad-free experience</Text>
                        </View>
                        <View className="w-12 h-12 bg-white/20 rounded-full items-center justify-center">
                            <Text className="text-2xl">👑</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Actions */}
                    <View className="w-full space-y-4">
                        <TouchableOpacity
                            onPress={logout}
                            className="w-full p-4 rounded-2xl border border-[#2D303E] bg-[#1F212C] flex-row items-center justify-center"
                        >
                            <Text className="text-white font-semibold text-lg">Log Out</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={deleteAccount}
                            className="mt-4 w-full p-4 rounded-2xl border border-red-500/30 bg-red-500/10 flex-row items-center justify-center"
                        >
                            <Text className="text-red-500 font-semibold text-lg">Delete Account</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Footer */}
                    <View className="mt-8 mb-4">
                        <Text className="text-gray-500 text-sm">Contact Us: <Link href="mailto:support@movieapp.com">support@movieapp.com</Link></Text>
                    </View>
                </ScrollView>


            ) : (
                isNewUser ? (
                    <Signup />
                ) : (
                    <Signin />

                )
            )}
        </View>
    )
}

export default profile