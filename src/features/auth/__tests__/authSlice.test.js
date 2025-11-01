/* eslint-env vitest */

import { describe, it, expect } from 'vitest'
import authReducer, { loginSuccess, logout } from '../authSlice'

// Skenario: Menguji reducer auth
// 1. Mengembalikan state awal ketika tidak ada action.
// 2. Menyimpan user dan token ketika loginSuccess dipanggil.
// 3. Mereset user dan token ketika logout dipanggil.
// 4. Menangani getMe.fulfilled untuk memperbarui user profile.

describe('auth reducer', () => {
  it('should return the initial state', () => {
    const initial = undefined
    const state = authReducer(initial, { type: '@@INIT' })
    expect(state).toBeDefined()
  })

  it('should handle loginSuccess sets user and token', () => {
    const prev = { user: null, token: null }
    const action = loginSuccess({ user: { id: 'u1', name: 'Ruth' }, token: 'abc' })
    const next = authReducer(prev, action)
    expect(next.user).toEqual({ id: 'u1', name: 'Ruth' })
    expect(next.token).toBe('abc')
  })

  it('should handle logout resets user and token', () => {
    const prev = { user: { id: 'u1' }, token: 'abc' }
    const next = authReducer(prev, logout())
    expect(next.user).toBeNull()
    expect(next.token).toBeNull()
  })

  // 🆕 tambahan
  it('should handle getMe.fulfilled updates user profile', () => {
    const prev = { user: null, token: 'abc', isLoading: false, error: null }
    const action = { type: 'auth/getMe/fulfilled', payload: { id: 'u2', name: 'Tester' } }
    const next = authReducer(prev, action)
    expect(next.user).toEqual({ id: 'u2', name: 'Tester' })
  })
})
