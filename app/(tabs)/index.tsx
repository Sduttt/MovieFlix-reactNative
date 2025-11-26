import MovieCard from "@/components/MovieCard";
import Searchbar from "@/components/searchbar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovie } from "@/services/api_config";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { Text, View, Image, ScrollView, ActivityIndicator, FlatList } from "react-native";


export default function Index() {
  const router = useRouter();
  const { data: movies, loading: moviesLoading, error: moviesError } = useFetch(() => fetchMovie({ query: "" }));

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="w-full absolute z-0" />
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerClassName="min-h-full pb-10">
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        {
          moviesLoading ? (
            <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center" />
          )
            :
            moviesError ? (
              <Text className="text-white">Error: {moviesError.message}</Text>
            ) : (
              <View className="flex-1 mt-5">
                <Searchbar onPress={() => router.push("/search")} placeholder="Search" />
                <Text className="text-white text-2xl font-bold mt-5 mb-3">Trending Movies</Text>
                <FlatList
                  data={movies}
                  renderItem={({ item }) => {
                    return (
                      <MovieCard {...item} />

                    )
                  }}
                  keyExtractor={(item) => item.id.toString()}
                  numColumns={3}
                  columnWrapperClassName="flex-start gap-5 pr-5 mb-10"
                  className="mt-2 pb-32"
                  scrollEnabled={false}
                />
              </View>
            )
        }

      </ScrollView>
    </View>
  );
}
