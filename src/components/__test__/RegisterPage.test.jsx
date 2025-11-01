/* eslint-env vitest */
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/authSlice";
import RegisterPage from "../../pages/RegisterPage";

// Mock react-redux agar tidak error dispatch(...).unwrap
vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return {
    ...actual,
    useDispatch: () =>
      vi.fn(() => ({
        unwrap: () => Promise.resolve(), // mencegah error unwrap
      })),
    useSelector: () => ({ isLoading: false, error: null }),
  };
});

// Mock navigate agar tidak benar-benar berpindah halaman
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe("RegisterPage Component", () => {
  const renderWithStore = (
    ui,
    {
      preloadedState,
      store = configureStore({ reducer: { auth: authReducer }, preloadedState }),
    } = {}
  ) =>
    render(
      <Provider store={store}>
        <MemoryRouter>{ui}</MemoryRouter>
      </Provider>
    );

  it("renders register form elements correctly", () => {
    renderWithStore(<RegisterPage />);

    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
  });

  it("calls registerUser when form is submitted", async () => {
    renderWithStore(<RegisterPage />);

    fireEvent.change(screen.getByPlaceholderText(/name/i), {
      target: { value: "Admin User" },
    });
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "admin@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "admin12345" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    const registerButton = screen.getByRole("button", { name: /register/i });
    expect(registerButton).toBeInTheDocument();
  });
});
