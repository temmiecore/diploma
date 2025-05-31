import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import FinishSignUp from '@/app/signup/finishSignUp';

// mock database module
const mockOnce = jest.fn();
const mockSet = jest.fn(() => ({ once: mockOnce }));

jest.mock('@react-native-firebase/database', () => ({
    firebase: {
        app: jest.fn(() => ({
            database: jest.fn(() => ({
                ref: jest.fn(() => ({
                    set: mockSet,
                })),
            })),
        })),
    },
}));

// mock auth module
const mockCreateUserWithEmailAndPassword = jest.fn();

jest.mock('@react-native-firebase/auth', () => {
    return () => ({
        createUserWithEmailAndPassword: mockCreateUserWithEmailAndPassword,
    });
});

// mock user
jest.mock('@/helpers/useUserStore', () => ({
    useUserStore: () => ({
        user: {
            email: 'test@example.com',
            password: 'password123',
            name: '',
            age: '',
            gender: '',
            tasks: [],
            pet: null,
            coinAmount: 0,
            profileImage: null,
        },
        updateUser: jest.fn(),
    }),
}));

describe('Signup Module II', () => {
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => { });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should alert on signup error', async () => {
        mockCreateUserWithEmailAndPassword.mockRejectedValueOnce(new Error('Fail'));

        const { getByText } = render(<FinishSignUp />);

        fireEvent.press(getByText('Sign Up'));

        await waitFor(() => {
            expect(alertSpy).toHaveBeenCalledWith(expect.stringContaining('Something went wrong: Fail'));
        });
    });

    it('should create new user on successful signup', async () => {
        mockCreateUserWithEmailAndPassword.mockResolvedValueOnce({
            user: { uid: '123' },
        });

        const { getByText } = render(<FinishSignUp />);

        fireEvent.press(getByText('Sign Up'));

        await waitFor(() => {
            expect(mockCreateUserWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'password123');
            expect(mockSet).toHaveBeenCalled();
        });
    });
});
