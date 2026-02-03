"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ username, password }) })
      if (!res.ok) throw new Error('Invalid')
      router.push('/admin')
    } catch (err) {
      setError('Invalid credentials')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="w-full max-w-md bg-card p-8 rounded-lg shadow">
        <h1 className="text-2xl font-semibold mb-4">Admin Sign in</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Username</label>
            <input value={username} onChange={e=>setUsername(e.target.value)} className="w-full px-3 py-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input value={password} onChange={e=>setPassword(e.target.value)} type="password" className="w-full px-3 py-2 border rounded" />
          </div>
          {error && <div className="text-sm text-destructive">{error}</div>}
          <div>
            <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded" disabled={loading}>{loading? 'Signing in...' : 'Sign in'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
