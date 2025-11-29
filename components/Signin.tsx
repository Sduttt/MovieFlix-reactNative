import { View, Text, KeyboardAvoidingView, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants/icons'
import { useAuth } from '@/services/AuthContext'

const Signin = () => {
    const { login, isNewUser, setIsNewUser } = useAuth()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const handleSignin = async () => {
        if (!email || !password) {
            setError('Please fill all the fields')
            return
        }
        const result = await login(email, password)
        if (result) {
            setError(result)
        }
    }
    const setNewUserTrue = () => {
        setIsNewUser(true)
    }
    return (
        <>
            <KeyboardAvoidingView className='bg-primary flex-1' behavior='padding'>
                <View className='items-center justify-center mt-44'>

                    <Image source={icons.logo} className='w-24 h-24 mb-16' />

                    <Text className='text-white text-4xl font-bold mb-12'>Sign In</Text>

                    <View className='space-y-4 w-full px-8'>
                        <TextInput
                            placeholder='Email'
                            placeholderTextColor="#9CA4AB"
                            className='bg-white/10 border border-white/20 text-white p-4 rounded-2xl mb-4 focus:border-light-100'
                            keyboardType='email-address'
                            autoCapitalize='none'
                            onChangeText={setEmail}
                        />
                        <TextInput
                            placeholder='Password'
                            placeholderTextColor="#9CA4AB"
                            className='bg-white/10 border border-white/20 text-white p-4 rounded-2xl mb-6 focus:border-light-100'
                            secureTextEntry
                            autoCapitalize='none'
                            onChangeText={setPassword}
                        />

                        <TouchableOpacity onPress={handleSignin} className="w-full bg-[#6C5DD3] p-4 rounded-2xl items-center justify-center shadow-lg shadow-[#6C5DD3]/50">
                            <Text className="text-white font-bold text-lg">Sign In</Text>
                        </TouchableOpacity>

                        <Text className='text-red-500 text-center mt-4'>{error}</Text>
                    </View>


                    <View className='flex-row justify-center mt-4'>
                        <Text className='text-white'>
                            Don't have an account?{' '}
                        </Text>
                        <TouchableOpacity onPress={setNewUserTrue}>
                            <Text className='text-white font-bold'>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </>
    )
}

export default Signin
