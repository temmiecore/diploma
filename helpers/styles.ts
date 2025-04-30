import { Dimensions, StyleSheet } from "react-native";
import { lightColors } from "./colors";

const { width } = Dimensions.get("window");
const ITEM_SIZE = width / 3 - 20;

export const styles = StyleSheet.create({
  // Containers
  containerStretched: {
    flex: 1,
    backgroundColor: lightColors.background,
  },
  container: {
    backgroundColor: lightColors.background,
  },
  containerCentered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: lightColors.background,
  },
  scrollContainer: {
    padding: 24,
    paddingBottom: 100,
    alignItems: "center",
    backgroundColor: lightColors.background,
  },

  // For keyboard avoiding view
  containerInner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: lightColors.background,
  },

  // Text
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: lightColors.textPrimary,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    alignSelf: "flex-start",
    color: lightColors.textPrimary,
  },
  titleSecondary: {
    fontSize: 20,
    fontWeight: "500",
    color: lightColors.textPrimary,
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
    color: lightColors.textPrimary,
  },

  //Buttons
  button: {
    backgroundColor: lightColors.buttonPrimary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 4,
    padding: 12,
  },
  buttonText: {
    color: lightColors.buttonText,
    fontSize: 18,
    fontWeight: "600",
  },
  inverseButton: {
    borderColor: lightColors.buttonPrimary,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 4,
    padding: 12,
  },
  inverseButtonText: {
    color: lightColors.buttonPrimary,
    fontSize: 18,
    fontWeight: "600",
  },

  // Custom buttons
  addButton: {
    position: "absolute",
    bottom: 20,
    backgroundColor: lightColors.buttonPrimary,
    paddingHorizontal: 24,
    borderRadius: 100,
    alignSelf: "center",
  },
  addButtonText: {
    fontSize: 64,
    color: lightColors.buttonText,
  },
  signOutButton: {
    backgroundColor: lightColors.buttonDanger,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
    padding: 8,
  },
  buyButton: {
    backgroundColor: lightColors.buttonGreen,
    padding: 10,
    borderRadius: 10,
  },
  cancelButton: {
    backgroundColor: lightColors.buttonDanger,
    padding: 10,
    borderRadius: 10,
  },
  exitButton: {
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  saveButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: lightColors.buttonPrimary,
    padding: 16,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  // Inputs
  input: {
    backgroundColor: lightColors.backgroundSecondary,
    borderColor: lightColors.border,
    borderRadius: 10,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: lightColors.backgroundSecondary,
    borderColor: lightColors.border,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
    overflow: "hidden",
  },
  picker: {
    width: "100%",
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: lightColors.border,
    backgroundColor: lightColors.backgroundSecondary,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  icon: {
    width: 32,
    height: 32,
  },
  headerButtons: {
    flexDirection: "row",
    gap: 16,
  },
  categories: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 12,
    height: 48,
    borderBottomWidth: 1,
    borderColor: lightColors.border,
    marginVertical: 8,
  },
  categoryButton: {
    backgroundColor: lightColors.buttonPrimary,
    borderRadius: 10,
    padding: 10,
    height: 40,
  },
  categoryButtonText: {
    color: lightColors.buttonText,
    fontWeight: "600",
  },

  // Modal & Menu
  modalOverlay: {
    flex: 1,
    backgroundColor: lightColors.modalBackground,
    justifyContent: "center",
    alignItems: "center",
  },
  menu: {
    backgroundColor: lightColors.background,
    borderRadius: 8,
    padding: 20,
    minWidth: 220,
    gap: 8,
  },
  modalButtons: {
    flexDirection: "row",
    marginTop: 20,
    gap: 10,
  },

  // Task Item
  taskCard: {
    margin: 12,
    padding: 16,
    backgroundColor: lightColors.backgroundSecondary,
    borderRadius: 10,
    elevation: 2,
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
    color: lightColors.textPrimary,
  },
  taskDesc: {
    fontSize: 16,
    color: lightColors.textPrimary,
    marginBottom: 4,
  },
  taskDeadline: {
    fontSize: 14,
    color: lightColors.textPrimary,
    marginBottom: 4,
  },
  taskTags: {
    fontSize: 14,
    color: lightColors.textLight,
    marginBottom: 8,
  },

  // Pet
  petImage: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
  imageWrapper: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: "hidden",
    marginBottom: 20,
    borderWidth: 3,
    borderColor: lightColors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  // Shop Item
  itemCard: {
    flexDirection: "column",
    backgroundColor: lightColors.backgroundSecondary,
    padding: 16,
    marginRight: 12,
    borderRadius: 12,
    width: 120,
    alignItems: "center",
  },
  itemName: { fontSize: 16, fontWeight: "bold" },
  itemPrice: { fontSize: 14, color: lightColors.textLight },

  // Inventory
  grid: {
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    width: ITEM_SIZE,
    height: ITEM_SIZE + 20,
    margin: 10,
    borderRadius: 10,
    backgroundColor: lightColors.backgroundSecondary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },

  // Misc
  petDetails: {
    marginVertical: 12,
    alignItems: "center",
    borderRadius: 10,
    borderColor: lightColors.border,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 24,
  },
  itemRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: lightColors.backgroundSecondary,
    flexDirection: "row",
    gap: 8,
  },
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
    borderColor: lightColors.border,
    borderRadius: 8,
    marginRight: 10,
  },
  selectedDifficulty: {
    backgroundColor: lightColors.backgroundTertiary,
  },
});
