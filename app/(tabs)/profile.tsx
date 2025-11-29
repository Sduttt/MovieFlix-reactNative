import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import React, { useState } from 'react'
import { Text, View } from 'react-native'

const profile = () => {
    const [isAuth, setIsAuth] = useState(false)
    const [newUser, setNewUser] = useState(true)
    return (
        <>
            {isAuth ? (
                <Text>Logged In</Text>
            ) : (
                newUser ? (
                    <>
                        <Signup />
                    </>
                ) : (
                    <Signin />

                )
            )}
        </>
    )
}

export default profile