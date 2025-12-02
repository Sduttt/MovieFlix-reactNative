import { icons } from '@/constants/icons'
import { getLanguageName } from '@/constants/languages'
import { fetchCastCrew, fetchMovieDetails } from '@/services/api_config'
import { APPWRITE_CONFIG, databases } from '@/services/appwrite'
import { useAuth } from '@/services/AuthContext'
import useFetch from '@/services/useFetch'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useState, useEffect } from 'react'
import { Image, ScrollView, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { ID, Query } from 'react-native-appwrite'

const Movie = () => {

    const { id } = useLocalSearchParams()
    const { data: movie, loading } = useFetch(() => fetchMovieDetails(id as string))
    const { data: castCrew, loading: castCrewLoading } = useFetch(() => fetchCastCrew(id as string))
    const { user } = useAuth()
    const [isWatchlist, setIsWatchlist] = useState(false)
    const [isWatched, setIsWatched] = useState(false)
    const [doc, setDoc] = useState<any>(null)
    const [alertmsg, setAlertmsg] = useState<string>('')

    // Check if movie is in watchlist or watched
    const checkStatus = async () => {
        if (!user || !movie) return
        try {
            const res = await databases.listDocuments(
                APPWRITE_CONFIG.databaseId,
                APPWRITE_CONFIG.collectionId,
                [
                    Query.equal('userId', user.$id),
                    Query.equal('movieId', movie.id.toString())

                ]
            )
            if (res.documents.length > 0) {
                setIsWatchlist(true)
                setDoc(res.documents[0])
                setIsWatched(doc.isWatched)
                setIsWatchlist(doc.isWatchlist)
            }
        } catch (error) {
            console.log(error)
            setAlertmsg(`Error: ${error}`)
            setTimeout(() => {
                setAlertmsg('')
            }, 3000)
        }
    }

    // Save Button function in all cases
    const saveMovie = async () => {
        try {
            if (!user) {
                router.push('/profile')
                setAlertmsg('Please login to save movie')
                setTimeout(() => {
                    setAlertmsg('')
                }, 3000)
                return
            }
            if (isWatchlist) {
                await databases.deleteDocument(
                    APPWRITE_CONFIG.databaseId,
                    APPWRITE_CONFIG.collectionId,
                    doc.$id
                )
                setIsWatchlist(false)
                setIsWatched(false)
                setDoc(null)
                setAlertmsg('Movie removed from Wishlist')
                setTimeout(() => {
                    setAlertmsg('')
                }, 3000)
                return
            }
            if (!isWatched && !isWatchlist) {
                const res = await databases.createDocument(
                    APPWRITE_CONFIG.databaseId,
                    APPWRITE_CONFIG.collectionId,
                    ID.unique(),
                    {
                        userId: user.$id,
                        movieId: movie.id.toString(),
                        title: movie.title,
                        poster_path: movie.poster_path,
                        release_date: movie.release_date,
                        isWatched: false,
                        isWatchlist: true
                    }
                )
                setIsWatchlist(true)
                setIsWatched(false)
                setDoc(res)
                setAlertmsg('Movie added to Wishlist')
                setTimeout(() => {
                    setAlertmsg('')
                }, 3000)
            }
        } catch (error) {
            console.log(error)
            setAlertmsg(`Error: ${error}`)
            setTimeout(() => {
                setAlertmsg('')
            }, 3000)
        }
    }

    // Watch Button function in all cases
    const watchMovie = async () => {
        try {
            if (!user) {
                router.push('/profile')
                setAlertmsg('Please login to add movie to watched')
                setTimeout(() => {
                    setAlertmsg('')
                }, 3000)
                return
            }
            if (isWatched) {
                await databases.updateDocument(
                    APPWRITE_CONFIG.databaseId,
                    APPWRITE_CONFIG.collectionId,
                    doc.$id,
                    {
                        isWatched: false,
                        isWatchlist: true
                    }
                )
                setIsWatchlist(true)
                setIsWatched(false)
                setAlertmsg('Movie removed from Watched and added to Wishlist')
                setTimeout(() => {
                    setAlertmsg('')
                }, 3000)
            }
            if (!isWatched && !isWatchlist) {
                const res = await databases.createDocument(
                    APPWRITE_CONFIG.databaseId,
                    APPWRITE_CONFIG.collectionId,
                    ID.unique(),
                    {
                        userId: user.$id,
                        movieId: movie.id.toString(),
                        title: movie.title,
                        poster_path: movie.poster_path,
                        release_date: movie.release_date,
                        isWatched: true,
                        isWatchlist: false
                    }
                )
                setIsWatchlist(false)
                setIsWatched(true)
                setDoc(res)
                setAlertmsg('Movie added to Watched')
                setTimeout(() => {
                    setAlertmsg('')
                }, 3000)
            }
            if (isWatchlist && !isWatched) {
                await databases.updateDocument(
                    APPWRITE_CONFIG.databaseId,
                    APPWRITE_CONFIG.collectionId,
                    doc.$id,
                    {
                        isWatched: true,
                        isWatchlist: false
                    }
                )
                setIsWatchlist(false)
                setIsWatched(true)
                setAlertmsg('Movie added to Watched')
                setTimeout(() => {
                    setAlertmsg('')
                }, 3000)
            }
        } catch (error) {
            console.log(error)
            setAlertmsg(`Error: ${error}`)
            setTimeout(() => {
                setAlertmsg('')
            }, 3000)
        }
    }

    useEffect(() => {
        checkStatus()
    }, [user, movie])

    useEffect(() => {
        if (alertmsg) {
            ToastAndroid.show(alertmsg, ToastAndroid.SHORT)
        }
    }, [alertmsg])

    return (
        <View className='bg-primary flex-1'>
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <View>
                    <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }} className='w-full h-[550px]' resizeMode='stretch' />
                    <View className='relative bottom-20 flex-row items-center justify-around px-5'>
                        <TouchableOpacity onPress={saveMovie} disabled={isWatched} className={` ${isWatched ? "bg-[#534d7d]" : "bg-[#6C5DD3]"} flex-row items-center justify-center gap-x-2 w-48 py-1 mr-4 rounded-3xl h-16`}>
                            <Image source={icons.heart} className='size-6' />
                            <Text className={`text-white text-xl font-bold ${isWatched ? "text-gray-400" : "text-white"}`}>{isWatchlist ? "UNSAVE" : "SAVE"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={watchMovie} className='flex-row items-center justify-center gap-x-2 bg-[#5dd365] w-48 py-1 ml-4 rounded-3xl h-16'>
                            <Image source={icons.tick} className='size-6' />
                            <Text className='text-white text-xl font-bold'>{isWatched ? "NOT WATCHED" : "WATCHED"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className='flex-col items-start mt-[-40px] px-5'>
                    <Text className='text-white text-xl font-bold'>{movie?.title}</Text>
                    <View className='flex-row items-center mt-2'>
                        <Text className='text-sm text-gray-300 mt-2 mr-4'>{movie?.release_date.slice(0, 4)}</Text>
                        <Text className='text-sm text-gray-300 mt-2 mr-4'>{Math.floor(movie?.runtime / 60)}h {movie?.runtime % 60}m</Text>
                        <Text className='text-sm text-gray-300 mt-2'>
                            {movie?.original_language ? getLanguageName(movie.original_language) : ''}
                        </Text>
                    </View>
                    <View className='mt-2 flex-row items-center bg-dark-100 px-2 py-1 rounded-full gap-x-1'>
                        <Image source={icons.star} className='size-4' />
                        <Text className='text-sm text-gray-300'>
                            <Text className='font-bold'>{movie?.vote_average.toFixed(1) || 0}</Text> / 10 ({movie?.vote_count})</Text>
                    </View>
                    <View className='mt-2'>
                        <Text className='text-gray-300 text-base mt-2'>Overview</Text>
                        <Text className='text-white text-sm mt-1'>{movie?.overview}</Text>
                    </View>
                    <View className='mt-2'>
                        <Text className='text-gray-300 text-base mt-2'>Genres</Text>
                        <Text className='text-white text-sm mt-1'>{movie?.genres.map((genre: any) => genre.name).join(', ')}</Text>
                    </View>
                    <View className='mt-2'>
                        <Text className='text-gray-300 text-base mt-2'>Director</Text>
                        <Text className='text-white text-sm mt-1'>{castCrew?.crew.find((crew: any) => crew.job === 'Director')?.name}</Text>
                    </View>
                    <View className='mt-2'>
                        <Text className='text-gray-300 text-base mt-2'>Cast</Text>
                        <Text className='text-white text-sm mt-1'>{castCrew?.cast.map((cast: any) => cast.name).join(', ')}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Movie