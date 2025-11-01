import 'whatwg-fetch'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest'
import { configureStore } from '@reduxjs/toolkit'
import authReducer, { login, registerUser } from '../authSlice'

// Gunakan URL penuh sesuai baseURL API kamu
const API_BASE = 'https://forum-api.dicoding.dev/v1'

// Mock server untuk endpoint login & register
const server = setupServer(
  // Handle OPTIONS (preflight CORS)
  http.options(`${API_BASE}/login`, () => HttpResponse.json({}, { status: 200 })),
  http.options(`${API_BASE}/register`, () => HttpResponse.json({}, { status: 200 })),

  // Handle POST login
  http.post(`${API_BASE}/login`, async ({ request }) => {
    const { email, password } = await request.json()

    if (email === 'test12345@example.com' && password === 'test12345') {
      return HttpResponse.json({
        data: {
          user: { id: 'u1', name: 'Test' },
          token: 'tok',
        },
      })
    }

    return new HttpResponse(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
    })
  }),

  // Handle POST register
  http.post(`${API_BASE}/register`, async ({ request }) => {
    const { email } = await request.json()

    if (email === 'success@example.com') {
      return HttpResponse.json({
        data: { user: { id: 'u2', name: 'New User' } },
      })
    }

    return new HttpResponse(JSON.stringify({ message: 'Register failed' }), {
      status: 400,
    })
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// helper untuk buat store baru per test
const createTestStore = () =>
  configureStore({
    reducer: { auth: authReducer },
  })

describe('auth thunk functions', () => {
  // 1️⃣ LOGIN TESTS
  it('dispatches success on valid login', async () => {
    const store = createTestStore()
    await store.dispatch(
      login({ email: 'test12345@example.com', password: 'test12345' })
    )
    const state = store.getState().auth
    expect(state.user).toEqual({ id: 'u1', name: 'Test' })
    expect(state.token).toBe('tok')
  })

  it('handles invalid credentials', async () => {
    const store = createTestStore()
    await store.dispatch(login({ email: 'wrong', password: 'wrong' }))
    const state = store.getState().auth
    expect(state.user).toBeNull()
  })

  // 2️⃣ REGISTER TESTS
  it('dispatches success on valid register', async () => {
    const store = createTestStore()
    await store.dispatch(
      registerUser({
        name: 'New User',
        email: 'success@example.com',
        password: 'abc123',
      })
    )
    const state = store.getState().auth
    expect(state.isLoading).toBe(false)
    expect(state.error).toBeNull()
  })

  it('handles failed register', async () => {
    const store = createTestStore()
    await store.dispatch(
      registerUser({
        name: 'Fail User',
        email: 'fail@example.com',
        password: 'abc123',
      })
    )
    const state = store.getState().auth
    expect(state.error).toBeDefined()
  })
})
