import { icons } from '@/constants/icons'
import { getLanguageName } from '@/constants/languages'
import { fetchCastCrew, fetchMovieDetails } from '@/services/api_config'
import useFetch from '@/services/useFetch'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'

const Movie = () => {

    const { id } = useLocalSearchParams()
    const { data: movie, loading } = useFetch(() => fetchMovieDetails(id as string))
    const { data: castCrew, loading: castCrewLoading } = useFetch(() => fetchCastCrew(id as string))
    return (
        <View className='bg-primary flex-1'>
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <View>
                    <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }} className='w-full h-[550px]' resizeMode='stretch' />
                </View>
                <View className='flex-col items-start mt-5 px-5'>
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