import React, { useEffect, useState } from 'react'
import { Text, View, Image, ScrollView, ActivityIndicator, FlatList } from 'react-native'
import MovieCard from '@/components/MovieCard';
import Searchbar from '@/components/searchbar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovie } from '@/services/api_config';
import useFetch from '@/services/useFetch';

const search = () => {
    const { data: movies, loading: moviesLoading, error: moviesError, reset, refetch: loadmovies } = useFetch(() => fetchMovie({ query: searchQuery }), false)
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const timeout = setTimeout(async () => {
            if (searchQuery.trim()) {
                await loadmovies();
            } else {
                reset();
            }
        }, 500);
        return () => clearTimeout(timeout);

    }, [searchQuery]);

    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="w-full absolute z-0" />
            <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperClassName="flex-start gap-4 my-4"
                className="px-5"
                contentContainerClassName='pb-24'
                ListHeaderComponent={
                    <>
                        <View className='w-full flex-row items-center justify-center mt-20 mb-10'>
                            <Image source={icons.logo} className='w-12 h-10' />
                        </View>
                        <View className="my-5">
                            <Searchbar placeholder="Search movies..." value={searchQuery} onChangeText={(text) => setSearchQuery(text)} />
                        </View>

                        {moviesLoading && (
                            <ActivityIndicator size='large' color="#0000ff" className='my-3' />
                        )}
                        {moviesError && (<Text className='text-white'>Error: {moviesError.message}</Text>)}

                        {!moviesLoading && !moviesError && searchQuery.trim() && movies?.length > 0 && (
                            <Text className='text-white text-xl font-bold mt-5 mb-3'>
                                Search Result For {" "}
                                <Text className='text-[#ab8bff] font-bold'>"{searchQuery}"</Text>
                            </Text>

                        )}
                    </>
                }
                ListEmptyComponent={
                    !moviesLoading && !moviesError ? (
                        <Text className='text-gray-500 text-base font-bold mt-5 mb-3 text-center'>
                            {searchQuery.trim() ? "No movies found" : "Start typing to search"}
                        </Text>
                    ) : null
                }
            />
        </View>
    );
}

export default search