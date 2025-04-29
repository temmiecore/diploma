import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Containers
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerCentered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    padding: 24,
    paddingBottom: 100,
    alignItems: "center",
  },

  // Headers & Titles
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fafafa",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    marginBottom: 32,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  titleTop: {
    fontSize: 28,
    marginBottom: 32,
    fontWeight: "600",
    color: "#333",
  },
  label: {
    marginTop: 10,
    marginBottom: 4,
    fontSize: 16,
    fontWeight: "600",
  },
  headerButtons: {
    flexDirection: "row",
    gap: 16,
  },

  // Text
  text: {
    fontSize: 16,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  exText: {
    fontSize: 16,
    marginTop: 8,
    marginBottom: 20,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 4,
  },
  statText: {
    fontSize: 18,
    marginVertical: 4,
  },
  statusText: {
    fontSize: 18,
    fontStyle: "italic",
    marginTop: 10,
    marginBottom: 30,
  },
  exitText: {
    color: "red",
    fontSize: 16,
  },

  // Inputs
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
    marginBottom: 12,
  },
  pickerContainer: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    marginBottom: 16,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
  },
  picker: {
    height: 50,
    width: "100%",
  },

  // Buttons
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#4e8cff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  googleButton: {
    width: "100%",
    height: 50,
    borderColor: "#4e8cff",
    borderWidth: 1.5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  googleButtonText: {
    color: "#4e8cff",
    fontSize: 16,
    fontWeight: "500",
  },
  completeButton: {
    backgroundColor: "#4e8cff",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  completeButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  feedButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    marginBottom: 8,
    alignItems: "center",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "#4e8cff",
    paddingHorizontal: 24,
    borderRadius: 100,
    alignSelf: "center",
  },
  addButtonText: {
    fontSize: 64,
    color: "#fff",
  },

  // Pet / Task View
  pet: {
    width: 120,
    height: 120,
    position: "absolute",
  },
  petList: {
    paddingVertical: 8,
  },
  petIconWrapper: {
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 12,
    padding: 8,
    marginHorizontal: 8,
    backgroundColor: "#f0f0f0",
  },
  petIconSelected: {
    borderColor: "#4e8cff",
    backgroundColor: "#e0f0ff",
  },
  petIcon: {
    width: 160,
    height: 160,
    resizeMode: "contain",
  },
  petDetails: {
    marginTop: 24,
    alignItems: "center",
  },
  petImage: {
    width: "80%",
    height: "80%",
    resizeMode: "contain"
  },
  imageWrapper: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: "hidden",
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  petName: {
    fontSize: 24,
    marginVertical: 4,
  },

  // Task Card
  taskCard: {
    margin: 12,
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    elevation: 2,
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
  },
  taskDesc: {
    fontSize: 16,
    color: "#555",
    marginBottom: 4,
  },
  taskDeadline: {
    fontSize: 14,
    color: "#777",
    marginBottom: 4,
  },
  taskTags: {
    fontSize: 14,
    color: "#999",
    marginBottom: 8,
  },

  // Footer / Navigation
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 14,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fafafa",
  },
  icon: {
    width: 32,
    height: 32,
  },

  // Utility
  inner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  exitButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  doneContainer: {
    position: "absolute",
    bottom: 40,
    alignItems: "center",
  },
  doneText: {
    fontSize: 18,
    marginBottom: 10,
  },

  // Progress
  progressBarContainer: {
    width: "80%",
    height: 12,
    backgroundColor: "black",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 20,
  },
  progressBarFill: {
    height: 12,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
  },

  // Modal & Menu
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  menu: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    minWidth: 220,
    gap: 8,
  },

  // Misc
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
    alignSelf: "flex-end",
    gap: 10,
  },
  difficultyContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  difficultyButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginRight: 10,
  },
  selectedDifficulty: {
    backgroundColor: "#ddd",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categories: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 12,
    height: 48,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginVertical: 8,
  },
  categoryButton: {
    backgroundColor: "#4e8cff",
    borderRadius: 10,
    padding: 10,
    height: 40,
  },
  categoryButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 24,
  },
  signOutButton: {
    marginTop: 24,
    width: "100%",
  },
  saveButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#4e8cff",
    padding: 16,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  sectionTitle: { fontSize: 20, marginTop: 20 },
  list: { marginTop: 10 },
  itemCard: {
    flexDirection: "column",
    backgroundColor: "#f0f0f0",
    padding: 16,
    marginRight: 12,
    borderRadius: 12,
    width: 120,
    alignItems: "center",
  },
  itemName: { fontSize: 16, fontWeight: "bold" },
  itemPrice: { fontSize: 14, color: "gray" },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    backgroundColor: "white",
    padding: 20,
    width: "80%",
    borderRadius: 16,
    alignItems: "center",
  },
  modalTitle: { fontSize: 22, fontWeight: "bold" },
  modalButtons: {
    flexDirection: "row",
    marginTop: 20,
    gap: 10,
  },
  buyButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 10,
  },
  cancelButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 10,
  },




  itemRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between"
},
});
