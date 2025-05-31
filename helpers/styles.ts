import { Dimensions, StyleSheet } from "react-native";
import { lightColors } from "./colors";

const { width } = Dimensions.get("window");
const ITEM_SIZE = width / 3 - 20;

export const createStyles = (theme: typeof lightColors) =>
  StyleSheet.create({
    // Containers
    containerStretched: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      backgroundColor: theme.background,
    },
    containerCentered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.background,
    },
    scrollContainer: {
      padding: 24,
      paddingBottom: 100,
      alignItems: "center",
      backgroundColor: theme.background,
    },

    // For keyboard avoiding view
    containerInner: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.background,
    },

    // Text
    title: {
      fontSize: 24,
      fontWeight: "600",
      color: theme.textPrimary,
      textAlign: "center",
    },
    label: {
      fontSize: 16,
      marginBottom: 8,
      alignSelf: "flex-start",
      color: theme.textPrimary,
    },
    titleSecondary: {
      fontSize: 20,
      fontWeight: "500",
      color: theme.textPrimary,
    },
    text: {
      fontSize: 18,
      marginBottom: 8,
      color: theme.textPrimary,
    },

    //Buttons
    button: {
      backgroundColor: theme.buttonPrimary,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 4,
      padding: 12,
    },
    buttonText: {
      color: theme.buttonText,
      fontSize: 18,
      fontWeight: "600",
    },
    inverseButton: {
      borderColor: theme.buttonPrimary,
      borderWidth: 2,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 4,
      padding: 12,
    },
    inverseButtonText: {
      color: theme.buttonPrimary,
      fontSize: 18,
      fontWeight: "600",
    },

    // Custom buttons
    addButton: {
      position: "absolute",
      bottom: 20,
      backgroundColor: theme.buttonPrimary,
      paddingHorizontal: 24,
      borderRadius: 100,
      alignSelf: "center",
    },
    addButtonText: {
      fontSize: 64,
      color: theme.buttonText,
    },
    signOutButton: {
      backgroundColor: theme.buttonDanger,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 24,
      padding: 8,
    },
    buyButton: {
      backgroundColor: theme.buttonGreen,
      padding: 10,
      borderRadius: 10,
    },
    cancelButton: {
      backgroundColor: theme.buttonDanger,
      padding: 10,
      borderRadius: 10,
    },
    exitButton: {
      alignSelf: "flex-end",
      padding: 6,
      borderColor: theme.buttonDanger,
      borderWidth: 2,
      borderRadius: 10,
    },
    saveButton: {
      position: "absolute",
      bottom: 20,
      left: 20,
      right: 20,
      backgroundColor: theme.buttonPrimary,
      padding: 16,
      borderRadius: 50,
      alignItems: "center",
      justifyContent: "center",
    },

    // Inputs
    input: {
      backgroundColor: theme.backgroundSecondary,
      color: theme.textPrimary,
      borderColor: theme.border,
      borderRadius: 10,
      borderWidth: 1,
      padding: 16,
      marginBottom: 16,
      fontSize: 16,
    },
    pickerContainer: {
      backgroundColor: theme.backgroundSecondary,
      color: theme.textPrimary,
      borderColor: theme.border,
      borderRadius: 10,
      borderWidth: 1,
      paddingHorizontal: 8,
      marginBottom: 16,
      overflow: "hidden",
    },
    picker: {
      color: theme.textPrimary,
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
      borderColor: theme.border,
      backgroundColor: theme.backgroundSecondary,
    },
    headerTitle: {
      fontSize: 24,
      color: theme.textPrimary,
      fontWeight: "bold",
    },
    icon: {
      width: 32,
      height: 32,
      tintColor: theme.textPrimary,
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
      borderColor: theme.border,
      marginVertical: 8,
    },
    categoryButton: {
      backgroundColor: theme.buttonPrimary,
      borderRadius: 10,
      padding: 10,
      height: 40,
    },
    categoryButtonText: {
      color: theme.buttonText,
      fontWeight: "600",
    },

    // Modal & Menu
    modalOverlay: {
      flex: 1,
      backgroundColor: theme.modalBackground,
      justifyContent: "center",
      alignItems: "center",
    },
    menu: {
      backgroundColor: theme.background,
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
      backgroundColor: theme.backgroundSecondary,
      borderRadius: 10,
      elevation: 2,
    },
    taskTitle: {
      fontSize: 20,
      fontWeight: "600",
      marginBottom: 4,
      color: theme.textPrimary,
    },
    taskDesc: {
      fontSize: 16,
      color: theme.textPrimary,
      marginBottom: 4,
    },
    taskDeadline: {
      fontSize: 14,
      color: theme.textPrimary,
      marginBottom: 4,
    },
    taskTags: {
      fontSize: 14,
      color: theme.textLight,
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
      borderColor: theme.border,
      alignItems: "center",
      justifyContent: "center",
    },

    // Shop Item
    itemCard: {
      flexDirection: "column",
      backgroundColor: theme.backgroundSecondary,
      padding: 16,
      marginRight: 12,
      borderRadius: 12,
      width: 120,
      alignItems: "center",
    },
    itemName: { fontSize: 16, color: theme.textPrimary, fontWeight: "bold" },
    itemPrice: { fontSize: 14, color: theme.textLight },

    // Inventory
    grid: {
      justifyContent: "center",
    },
    item: {
      width: ITEM_SIZE,
      paddingVertical: 6,
      borderRadius: 10,
      margin: 10,
      backgroundColor: theme.backgroundSecondary,
      justifyContent: "center",
      alignItems: "center",
      elevation: 2,
    },

    // Footer
    footer: {
      backgroundColor: theme.background,
    },
    footerImage: {
      tintColor: theme.textPrimary,
      width: 36,
      height: 36,
    },

    // Misc
    petDetails: {
      marginVertical: 12,
      alignItems: "center",
      borderRadius: 10,
      borderColor: theme.border,
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
      borderColor: theme.backgroundSecondary,
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
      borderColor: theme.border,
      borderRadius: 8,
      marginRight: 10,
    },
    selectedDifficulty: {
      backgroundColor: theme.backgroundTertiary,
    },
    ovalShadow: {
      width: 200,
      height: 100,
      backgroundColor: "rgba(0,0,0,0.2)",
      borderRadius: "50%",
      position: "absolute",
      bottom: -30,
      alignSelf: "center",
      zIndex: -1,
    },

    feedMenuTitle: {
      fontSize: 16,
      color: theme.textPrimary,
      marginBottom: 10,
      fontWeight: "600",
    },

    petIconWrapper: {
        margin: 8,
        padding: 16,
        borderRadius: 8,
        backgroundColor: theme.backgroundSecondary,
        alignItems: "center",
        justifyContent: "center",
    },
    petIconSelected: {
        borderWidth: 2,
        borderColor: theme.backgroundTertiary,
    },
    petIcon: {
        width: 128,
        height: 128,
        resizeMode: "contain",
    },
  });
