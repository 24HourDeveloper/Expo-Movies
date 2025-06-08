import React, { useState } from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

type FilterButtonProps = {
  onFilterChange: (provider: string | null, genre: string | null) => void;
};

const providers = [
  { id: "8", name: "Netflix" },
  { id: "9", name: "Prime Video" },
  { id: "337", name: "Disney+" },
  { id: "2", name: "Apple TV+" },
  { id: "350", name: "HBO Max" },
];

const genres = [
  { id: "28", name: "Action" },
  { id: "12", name: "Adventure" },
  { id: "16", name: "Animation" },
  { id: "35", name: "Comedy" },
  { id: "80", name: "Crime" },
  { id: "99", name: "Documentary" },
  { id: "18", name: "Drama" },
  { id: "10751", name: "Family" },
  { id: "14", name: "Fantasy" },
  { id: "36", name: "History" },
  { id: "27", name: "Horror" },
  { id: "10402", name: "Music" },
  { id: "9648", name: "Mystery" },
  { id: "10749", name: "Romance" },
  { id: "878", name: "Science Fiction" },
  { id: "53", name: "Thriller" },
  { id: "10752", name: "War" },
  { id: "37", name: "Western" },
];

export default function FilterButton({ onFilterChange }: FilterButtonProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const handleApplyFilters = () => {
    onFilterChange(selectedProvider, selectedGenre);
    setModalVisible(false);
  };

  const handleClearFilters = () => {
    setSelectedProvider(null);
    setSelectedGenre(null);
    onFilterChange(null, null);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setModalVisible(true)}
      >
        <AntDesign name="filter" size={32} color="white" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Movies</Text>

            <Text style={styles.sectionTitle}>Streaming Provider</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.providerScroll}
            >
              {providers.map((provider) => (
                <TouchableOpacity
                  key={provider.id}
                  style={[
                    styles.filterChip,
                    selectedProvider === provider.id && styles.selectedChip,
                  ]}
                  onPress={() =>
                    setSelectedProvider(
                      selectedProvider === provider.id ? null : provider.id
                    )
                  }
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      selectedProvider === provider.id &&
                        styles.selectedChipText,
                    ]}
                  >
                    {provider.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.sectionTitle}>Genre</Text>
            <ScrollView style={styles.genreScroll}>
              <View style={styles.genreGrid}>
                {genres.map((genre) => (
                  <TouchableOpacity
                    key={genre.id}
                    style={[
                      styles.filterChip,
                      selectedGenre === genre.id && styles.selectedChip,
                    ]}
                    onPress={() =>
                      setSelectedGenre(
                        selectedGenre === genre.id ? null : genre.id
                      )
                    }
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        selectedGenre === genre.id && styles.selectedChipText,
                      ]}
                    >
                      {genre.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.clearButton]}
                onPress={handleClearFilters}
              >
                <Text style={styles.buttonText}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.applyButton]}
                onPress={handleApplyFilters}
              >
                <Text style={styles.buttonText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  filterButton: {
    position: "absolute",
    right: 20,
    bottom: Platform.OS === "ios" ? 90 : 80,
    backgroundColor: "#AA4A44",
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#1B1212",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    marginBottom: 10,
  },
  providerScroll: {
    marginBottom: 20,
  },
  genreScroll: {
    maxHeight: 300,
  },
  genreGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#2A2A2A",
    marginRight: 8,
    marginBottom: 8,
  },
  selectedChip: {
    backgroundColor: "#AA4A44",
  },
  filterChipText: {
    color: "white",
    fontSize: 14,
  },
  selectedChipText: {
    fontWeight: "600",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  clearButton: {
    backgroundColor: "#2A2A2A",
  },
  applyButton: {
    backgroundColor: "#AA4A44",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
