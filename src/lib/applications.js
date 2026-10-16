// Job application submit helper.
// Abhi sirf metadata jata hai (file nahi). Real backend lagane par VITE_API_URL set karo
// (.env me: VITE_API_URL=https://your-api.com) aur wahan file storage + malware scan add karo.
const API = import.meta.env.VITE_API_URL

const localReference = () => `UNE-${Date.now().toString(36).toUpperCase().slice(-6)}`

export const submitApplication = async (payload) => {
  if (!API) {
    await new Promise((resolve) => setTimeout(resolve, 700))
    return { reference: localReference() }
  }

  const res = await fetch(`${API}/applications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message || 'Could not send your application. Please try again.')
  return { reference: data.reference || localReference() }
}
