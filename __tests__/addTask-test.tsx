import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import AddTaskPage from "@/app/auth/addTask";
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
                }),
            }),
        }),
    },
}));

// Mock ToastAndroid
jest.mock("react-native/Libraries/Components/ToastAndroid/ToastAndroid", () => ({
    show: jest.fn(),
}));

describe("AddTask Module", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should Toast when title is empty", async () => {
        const { getByText } = render(<AddTaskPage />);

        fireEvent.press(getByText("Add Task"));

        await waitFor(() => {
            expect(ToastAndroid.show).toHaveBeenCalledWith("Title cannot be empty!", ToastAndroid.SHORT);
        });
    });

    it("should Toast when deadline is in the past", async () => {
        const { getByText, getByTestId } = render(<AddTaskPage />);

        fireEvent.changeText(getByTestId("title"), "Test");
        fireEvent.changeText(getByTestId("deadlineInput"), new Date(Date.now() - 10000).toISOString());

        fireEvent.press(getByText("Add Task"));

        await waitFor(() => {
            expect(ToastAndroid.show).toHaveBeenCalledWith("Deadline cannot be in the past!", ToastAndroid.SHORT);
        });
    });

    it("should Toast when repeat interval is negative", async () => {
        const { getByText, getByTestId } = render(<AddTaskPage />);

        fireEvent.changeText(getByTestId("title"), "Test");
        fireEvent.changeText(getByTestId("deadlineInput"), new Date(Date.now() + 10000).toISOString());
        fireEvent.changeText(getByTestId("repeatInterval"), "-1");
        fireEvent(getByTestId("isRepeated"), "valueChange", true);

        fireEvent.press(getByText("Add Task"));

        await waitFor(() => {
            expect(ToastAndroid.show).toHaveBeenCalledWith("Repeat interval must be a non-negative number!", ToastAndroid.SHORT);
        });
    });

    it("should add task successfully when all fields are valid", async () => {
        const { getByText, getByTestId } = render(<AddTaskPage />);

        fireEvent.changeText(getByTestId("title"), "Test");
        fireEvent.changeText(getByTestId("deadlineInput"), new Date(Date.now() + 10000).toISOString());

        fireEvent.press(getByText("Add Task"));

        await waitFor(() => {
            expect(ToastAndroid.show).toHaveBeenCalledWith("Task added successfully!", ToastAndroid.SHORT);
        });
    });
});
