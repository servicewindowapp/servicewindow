const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtybWZ4ZWRreG95emtlcW5pamNkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDM2ODU0MywiZXhwIjoyMDg5OTQ0NTQzfQ.uTSXThr9Eyb1Xob8G7DXucw4imikIq7dECz-9E4ojdA'
const HOST = 'krmfxedkxoyzkeqnijcd.supabase.co'
const PASSWORD = 'TestSW2026!'
const https = require('https')

function api(method, path, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      { hostname: HOST, path, method,
        headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' }
      },
      res => { let d = ''; res.on('data', c => d += c); res.on('end', () => resolve(JSON.parse(d))) }
    )
    req.on('error', reject)
    if (body) req.write(JSON.stringify(body))
    req.end()
  })
}

async function run() {
  const res = await api('GET', '/auth/v1/admin/users?per_page=100')
  const test = res.users.filter(u => u.email.startsWith('test-') && u.email.endsWith('@servicewindow.app'))
  for (const u of test) {
    await api('PUT', `/auth/v1/admin/users/${u.id}`, { password: PASSWORD })
    console.log('updated:', u.email)
  }
  console.log('done')
}

run().catch(console.error)