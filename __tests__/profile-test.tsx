import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import ProfilePage from "@/app/auth/(tabs)/profile";
import { ToastAndroid } from "react-native";

// Mock Firebase auth and database so it can actually run
jest.mock("@react-native-firebase/auth", () => () => ({
    currentUser: {
        uid: "mock-user-id",
    },
}));

jest.mock("@react-native-firebase/database", () => ({
    firebase: {
        app: () => ({
            database: () => ({
                ref: () => ({
                    set: jest.fn().mockResolvedValue(undefined),
                    on: jest.fn(),
                }),
            }),
        }),
    },
}));

// Mock ToastAndroid
jest.mock("react-native/Libraries/Components/ToastAndroid/ToastAndroid", () => ({
    show: jest.fn(),
}));

describe("Profile Module", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should save changes and Toast for name, age, gender", async () => {
        const { getByText } = render(<ProfilePage />);
        fireEvent.press(getByText("Save Changes"));

        await waitFor(() => {
            expect(ToastAndroid.show).toHaveBeenCalledWith("User changes saved!", ToastAndroid.SHORT);
        });
    });

    // test for email validation
    
    // test for email change
});
