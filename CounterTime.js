import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";

const Second = () => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);
  const [offset, setOffset] = useState(0);
  const limit = 5;

  const getApi = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
      const filter = await response.json();
      setdata((prev) => [...prev, ...filter.results]);
    } catch (error) {
      console.log("Failed", error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getApi();
  }, [offset]);

  const loadMore = async () => {
    if (!loading) {
      setOffset((prev) => prev + limit);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <FlatList
        style={styles.flatitem}
        data={data}
        renderItem={({ item }) => (
          <View style={styles.box}>
            <Text style={{ fontSize: 12, color: "blue" }}>
              Data: {item.name}
            </Text>
            <Text>URL: {item.url}</Text>
          </View>
        )}
        ListHeaderComponent={<Text>Header</Text>}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => (
          <View style={{ marginTop: 10, height: 2 }} />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1} // Adjust threshold for triggering load more
        ListFooterComponent={() => {
          return loading ? <ActivityIndicator size="large" color="#0000ff" /> : null;
        }}
      />
    </View>
  );
};

export default Second;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    borderWidth: 0.6,
  },
  flatitem: {
    marginTop: 40,
  },
});
