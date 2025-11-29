import { View, Text, KeyboardAvoidingView, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants/icons'
import { useAuth } from '@/services/AuthContext'

const Signup = () => {
    const { signup } = useAuth()
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const handleSignup = () => {
        if (!name || !email || !password) {
            setError('Please fill all the fields')
            return
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long')
            return
        }
        signup(email, password, name)
    }
    return (

        <>
            <KeyboardAvoidingView className='bg-primary flex-1' behavior='padding'>
                <View className='items-center justify-center mt-44'>

                    <Image source={icons.logo} className='w-24 h-24 mb-16' />

                    <Text className='text-white text-4xl font-bold mb-12'>Sign Up</Text>

                    <View className='space-y-4 w-full px-8'>
                        <TextInput
                            placeholder='Name'
                            placeholderTextColor="#9CA4AB"
                            className='bg-white/10 border border-white/20 text-white p-4 rounded-2xl mb-4 focus:border-light-100'
                            keyboardType='email-address'
                            autoCapitalize='none'
                            onChangeText={setName}
                        />
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

                        <TouchableOpacity onPress={handleSignup} className="w-full bg-[#6C5DD3] p-4 rounded-2xl items-center justify-center shadow-lg shadow-[#6C5DD3]/50">
                            <Text className="text-white font-bold text-lg">Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </>
    )
}

export default Signup