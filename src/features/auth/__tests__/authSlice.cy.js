import { describe, it, expect } from 'vitest'
import authReducer, { loginSuccess, logout } from '../authSlice'

// Skenario: Menguji reducer auth
// 1. Mengembalikan state awal ketika tidak ada action.
// 2. Menyimpan user dan token ketika loginSuccess dipanggil.
// 3. Mereset user dan token ketika logout dipanggil.

describe('auth reducer', () => {
  it('should return the initial state', () => {
    // Skenario: Reducer harus mengembalikan state awal saat inisialisasi
    const initial = undefined
    const state = authReducer(initial, { type: '@@INIT' })
    expect(state).toBeDefined()
  })

  it('should handle loginSuccess sets user and token', () => {
    // Skenario: Reducer harus menyimpan user dan token setelah loginSuccess
    const prev = { user: null, token: null }
    const action = loginSuccess({ user: { id: 'u1', name: 'Ruth' }, token: 'abc' })
    const next = authReducer(prev, action)
    expect(next.user).toEqual({ id: 'u1', name: 'Ruth' })
    expect(next.token).toBe('abc')
  })

  it('should handle logout resets user and token', () => {
    // Skenario: Reducer harus mereset user dan token setelah logout
    const prev = { user: { id: 'u1' }, token: 'abc' }
    const next = authReducer(prev, logout())
    expect(next.user).toBeNull()
    expect(next.token).toBeNull()
  })
})
