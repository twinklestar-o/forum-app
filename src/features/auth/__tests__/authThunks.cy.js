import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest'
import { store } from '../../../store'
import { login } from '../authSlice' // thunk action

// Skenario: Menguji async thunk login
// 1. Dispatch login dengan kredensial benar → harus berhasil dan menyimpan user & token.
// 2. Dispatch login dengan kredensial salah → harus gagal dan user tetap null.

const server = setupServer(
  rest.post('/api/login', (req, res, ctx) => {
    const { email, password } = req.json()
    if (email === 'test12345@example.com' && password === 'test12345') {
      return res(ctx.status(200), ctx.json({ user: { id: 'u1', name: 'Test' }, token: 'tok' }))
    }
    return res(ctx.status(401), ctx.json({ message: 'Unauthorized' }))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('auth thunk login', () => {
  it('dispatches success on valid login', async () => {
    // Skenario: Login sukses dengan email & password valid
    const result = await store.dispatch(login({ email: 'test12345@example.com', password: 'test12345' }))
    const state = store.getState().auth
    expect(state.user).toBeTruthy()
    expect(state.token).toBe('tok')
  })

  it('handles invalid credentials', async () => {
    // Skenario: Login gagal dengan kredensial salah
    await store.dispatch(login({ email: 'bad', password: 'bad' }))
    const state = store.getState().auth
    expect(state.user).toBeNull()
  })
})
