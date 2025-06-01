import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Alert } from "react-native";
import SignUp from "@/app/signup";

// mock database module
const mockOnce = jest.fn();
const mockRef = jest.fn(() => ({ once: mockOnce }));

jest.mock("@react-native-firebase/database", () => ({
    firebase: {
        app: jest.fn(() => ({
            database: jest.fn(() => ({
                ref: mockRef,
            })),
        })),
    },
}));

// mock expo-router module
const mockNavigate = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    navigate: mockNavigate,
  }),
}));

describe("Signup Module I", () => {
    const alertSpy = jest.spyOn(Alert, "alert").mockImplementation(() => { });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should fail signup with invalid email", async () => {
        const { getByPlaceholderText, getByTestId, getByText } = render(<SignUp />);

        fireEvent.changeText(getByPlaceholderText("example@gmail.com"), "invalidemail");
        fireEvent.changeText(getByTestId("password1"), "password123");
        fireEvent.changeText(getByTestId("password2"), "password123");
        fireEvent.press(getByText("Next"));

        await waitFor(() => {
            expect(alertSpy).toHaveBeenCalledWith("Invalid email address!");
        });
    });

    it("should fail signup with weak password", async () => {
        const { getByPlaceholderText, getByTestId, getByText } = render(<SignUp />);

        fireEvent.changeText(getByPlaceholderText("example@gmail.com"), "goodemail@email.com");
        fireEvent.changeText(getByTestId("password1"), "123");
        fireEvent.changeText(getByTestId("password2"), "123");
        fireEvent.press(getByText("Next"));

        await waitFor(() => {
            expect(alertSpy).toHaveBeenCalledWith("Password should be at least 6 characters long!");
        });
    });

    it("should fail signup with mismatched passwords", async () => {
        const { getByPlaceholderText, getByTestId, getByText } = render(<SignUp />);

        fireEvent.changeText(getByPlaceholderText("example@gmail.com"), "goodemail@email.com");
        fireEvent.changeText(getByTestId("password1"), "password1");
        fireEvent.changeText(getByTestId("password2"), "password2");
        fireEvent.press(getByText("Next"));

        await waitFor(() => {
            expect(alertSpy).toHaveBeenCalledWith("Passwords do not match!");
        });
    });

    it("should fail signup with used email", async () => {
        mockOnce.mockResolvedValueOnce({
            val: () => ({
                user1: { email: "user@example.com" },
            }),
        });

        const { getByPlaceholderText, getByTestId, getByText } = render(<SignUp />);

        fireEvent.changeText(getByPlaceholderText("example@gmail.com"), "user@example.com");
        fireEvent.changeText(getByTestId("password1"), "password123");
        fireEvent.changeText(getByTestId("password2"), "password123");
        fireEvent.press(getByText("Next"));

        await waitFor(() => {
            expect(alertSpy).toHaveBeenCalledWith("Email is already used!");
        });
    });

    it("should navigate to personal information page on successful signup", async () => {
        mockOnce.mockResolvedValueOnce({ val: () => null });

        const { getByPlaceholderText, getByTestId, getByText } = render(<SignUp />);

        fireEvent.changeText(getByPlaceholderText("example@gmail.com"), "user@example.com");
        fireEvent.changeText(getByTestId("password1"), "password123");
        fireEvent.changeText(getByTestId("password2"), "password123");
        fireEvent.press(getByText("Next"));

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/signup/personalInformation");
        });
    });
});
