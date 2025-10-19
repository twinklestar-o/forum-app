import 'whatwg-fetch'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest'
import { configureStore } from '@reduxjs/toolkit'
import authReducer, { login } from '../authSlice'

// Gunakan URL penuh sesuai baseURL API kamu
const API_BASE = 'https://forum-api.dicoding.dev/v1'

// Mock server untuk endpoint login
const server = setupServer(
  // Handle OPTIONS (preflight CORS)
  http.options(`${API_BASE}/login`, () => HttpResponse.json({}, { status: 200 })),

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

describe('auth thunk login', () => {
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
})
