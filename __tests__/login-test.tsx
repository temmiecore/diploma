import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Login from "@/app/login";
import { Alert } from "react-native";

const mockSignInWithEmailAndPassword = jest.fn();

jest.mock("@react-native-firebase/auth", () => {
  return () => ({
    signInWithEmailAndPassword: mockSignInWithEmailAndPassword,
  });
});

describe("Login Module", () => {
    const testEmail = "test@example.com";
    const testPassword = "password123";

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should fail login with incorrect credentials", async () => {
        mockSignInWithEmailAndPassword.mockRejectedValueOnce({});

        const { getByPlaceholderText, getByText } = render(<Login />);
        const alertSpy = jest.spyOn(Alert, "alert").mockImplementation(() => { });

        fireEvent.changeText(getByPlaceholderText("example@gmail.com"), testEmail);
        fireEvent.changeText(getByPlaceholderText("**************"), testPassword);
        fireEvent.press(getByText("Log In"));

        await waitFor(() => {
            expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith(testEmail, testPassword);
            expect(alertSpy).toHaveBeenCalledWith(expect.stringContaining("Incorrect email or password"));
        });

        alertSpy.mockRestore();
    });

    it("should succeed login with correct credentials", async () => {
        mockSignInWithEmailAndPassword.mockResolvedValueOnce({ user: { email: testEmail } });

        const { getByPlaceholderText, getByText } = render(<Login />);

        fireEvent.changeText(getByPlaceholderText("example@gmail.com"), testEmail);
        fireEvent.changeText(getByPlaceholderText("**************"), testPassword);
        fireEvent.press(getByText("Log In"));

        await waitFor(() => {
            expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith(testEmail, testPassword);
        });
    });
});
