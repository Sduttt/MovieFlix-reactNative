import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { useAuth } from '@/services/AuthContext'
import React, { useState } from 'react'
import { ActivityIndicator, Image, Modal, ScrollView, Text, TextInput, ToastAndroid, TouchableOpacity, View, Linking } from 'react-native'

const profile = () => {
    const { loading, user, logout, isNewUser, deleteAccount } = useAuth()
    const [showPasswordModal, setShowPasswordModal] = useState(false)
    const [password, setPassword] = useState('')

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    const handleDeleteAccount = async () => {
        try {
            await deleteAccount(password)
            setShowPasswordModal(false)
            setPassword('')
            ToastAndroid.show('Account deleted successfully', ToastAndroid.LONG)
        } catch (error) {
            ToastAndroid.show('Invalid password or deletion failed', ToastAndroid.LONG)
        }
    }

    return (
        <View className='flex-1 bg-primary'>
            <Image source={images.bg} className="w-full absolute z-0" />

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />

            ) : user ? (

                <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', padding: 24 }}>

                    <View className="items-center mt-8 mb-8">
                        <View className="w-32 h-32 rounded-full bg-[#6C5DD3] items-center justify-center shadow-lg shadow-[#6C5DD3]/50 mb-6 border-4 border-[#1F212C]">
                            <Text className="text-white text-5xl font-bold tracking-wider">
                                {getInitials(user.name)}
                            </Text>
                        </View>
                        <Text className="text-white text-3xl font-bold mb-2">{user.name}</Text>
                        <Text className="text-gray-400 text-base">{user.email}</Text>
                    </View>

                    {/* Actions */}
                    <View className="w-full space-y-4">
                        <TouchableOpacity
                            onPress={logout}
                            className="w-full p-4 rounded-2xl border border-[#2D303E] bg-[#1F212C] flex-row items-center justify-center"
                        >
                            <Text className="text-white font-semibold text-lg">Log Out</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => setShowPasswordModal(true)}
                            className="mt-4 w-full p-4 rounded-2xl border border-red-500/30 bg-red-500/10 flex-row items-center justify-center"
                        >
                            <Text className="text-red-500 font-semibold text-lg">Delete Account</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Developer Info Section */}
                    <View className="w-full mt-8 bg-[#1F212C] rounded-3xl p-6 border border-[#2D303E]">
                        <Text className="text-white text-xl font-bold mb-4">👨‍💻 About Developer</Text>

                        {/* Email */}
                        <TouchableOpacity
                            onPress={() => Linking.openURL('mailto:subhamdutta588@gmail.com')}
                            className="flex-row items-center mb-4 p-3 bg-[#2D303E] rounded-xl"
                        >
                            <Text className="text-2xl mr-3">📧</Text>
                            <View className="flex-1">
                                <Text className="text-gray-400 text-xs mb-1">Email</Text>
                                <Text className="text-white text-sm">subhamdutta588@gmail.com</Text>
                            </View>
                        </TouchableOpacity>

                        {/* Social Media Links */}
                        <Text className="text-gray-400 text-sm mb-3">Connect with me:</Text>
                        <View className="flex-row justify-between mb-4">
                            {/* LinkedIn */}
                            <TouchableOpacity
                                onPress={() => Linking.openURL('https://www.linkedin.com/in/sduttt/')}
                                className="flex-1 mr-2 p-4 bg-[#0A66C2] rounded-xl items-center"
                            >
                                <Image className="text-2xl mb-1" source={icons.linkedin} />
                            </TouchableOpacity>

                            {/* Facebook */}
                            <TouchableOpacity
                                onPress={() => Linking.openURL('https://www.facebook.com/subham.dutta.664725')}
                                className="flex-1 mx-1 p-4 bg-[#1877F2] rounded-xl items-center"
                            >
                                <Image className="text-2xl mb-1" source={icons.facebook} />
                            </TouchableOpacity>

                            {/* Instagram */}
                            <TouchableOpacity
                                onPress={() => Linking.openURL('https://www.instagram.com/sdutttttt/')}
                                className="flex-1 ml-2 p-4 rounded-xl items-center"
                                style={{ backgroundColor: '#E4405F' }}
                            >
                                <Image className="text-2xl mb-1" source={icons.insta} />
                            </TouchableOpacity>
                        </View>

                        {/* Source Code Button */}
                        <TouchableOpacity
                            onPress={() => Linking.openURL('https://github.com/Sduttt/MovieFlix-reactNative')}
                            className="w-full p-4 bg-[#6C5DD3] rounded-2xl flex-row items-center justify-center"
                        >
                            <Image className="w-10 h-10 mr-4 mb-1" source={icons.github} />
                            <Text className="text-white font-bold text-base">View Source Code on GitHub</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>


            ) : (
                isNewUser ? (
                    <Signup />
                ) : (
                    <Signin />

                )
            )}

            {/* Password Modal */}
            <Modal
                visible={showPasswordModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowPasswordModal(false)}
            >
                <View className="flex-1 bg-black/50 justify-center items-center px-6">
                    <View className="bg-[#1F212C] rounded-3xl p-6 w-full max-w-sm border border-[#2D303E]">
                        <Text className="text-white text-2xl font-bold mb-2">Delete Account</Text>
                        <Text className="text-gray-400 text-sm mb-6">Enter your password to confirm account deletion. This action cannot be undone.</Text>

                        <TextInput
                            className="bg-[#2D303E] text-white p-4 rounded-xl mb-6 border border-[#3D404E]"
                            placeholder="Enter your password"
                            placeholderTextColor="#6B7280"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                            autoFocus
                        />

                        <View className="flex-row gap-3">
                            <TouchableOpacity
                                onPress={() => {
                                    setShowPasswordModal(false)
                                    setPassword('')
                                }}
                                className="flex-1 p-4 rounded-xl border border-[#2D303E] bg-[#2D303E]"
                            >
                                <Text className="text-white font-semibold text-center">Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleDeleteAccount}
                                className="flex-1 p-4 rounded-xl bg-red-500"
                                disabled={!password}
                            >
                                <Text className="text-white font-semibold text-center">Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default profile