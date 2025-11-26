import { Image, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const MovieCard = ({ id, title, poster_path, release_date }: any) => {
    return (
        <Link href={`/movies/${id}`} asChild>
            <TouchableOpacity className='w-[30%]'>
                <Image source={{ uri: poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : 'https://placehold.co/600x400/1a1a1a/FFFFFF.png' }} className='w-full h-52 object-cover rounded-lg' />
                <Text className='text-white font-semibold text-xs mt-2' numberOfLines={2} ellipsizeMode='tail'>{title}</Text>
                <Text className='text-gray-500 text-xs mt-1'>{release_date.slice(0, 4)}</Text>

            </TouchableOpacity>

        </Link>
    )
}

export default MovieCard