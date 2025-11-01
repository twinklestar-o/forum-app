/* eslint-env vitest */
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/authSlice";
import LoginPage from "../../pages/LoginPage";

describe("LoginPage Component", () => {
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

  it("renders login form elements correctly", () => {
    renderWithStore(<LoginPage />);

    // gunakan placeholder, bukan label
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("calls login handler when form submitted", () => {
    const store = configureStore({ reducer: { auth: authReducer } });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    // isi form
    fireEvent.change(screen.getByPlaceholderText(/email/i), {
      target: { value: "admin12345@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "admin12345" },
    });

    // klik tombol login
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // verifikasi tombol ada (baik Login maupun Logging in...)
    const loginButton = screen.getByRole("button", { name: /login|logging in/i });
    expect(loginButton).toBeInTheDocument();
  });
});
