<script setup lang="ts">
// Crew food log — Mandarin-only, passcode-gated.
// Lets Ria's on-the-road crew log what she ate without giving them lab tracker access.
// Posts to the `submit-crew-food` Supabase edge function which validates the passcode
// and inserts via service role into the shared food_entries table.

definePageMeta({ layout: false })

useSeoMeta({
  title: '机组录入 · 20,000KM',
  description: 'Crew-only food entry for the 20,000KM Experiment.',
  robots: 'noindex,nofollow',
})

const SUPABASE_URL = 'https://uipwxpyucbtdpxlagjvv.supabase.co'
const PUBLISHABLE_KEY = 'sb_publishable_ATiFD6-zJ8TzSdHAYOQhmQ_UzPwDO_3'
const PASSCODE_KEY = 'crew-food-passcode'

const passcode = ref('')
const authed = ref(false)
const authChecking = ref(false)

const description = ref('')
const calories = ref<number | null>(null)
const carbs_g = ref<number | null>(null)
const protein_g = ref<number | null>(null)
const estimateMeta = ref<{ confidence?: string; items?: unknown; notes?: string } | null>(null)
const estimating = ref(false)
const submitting = ref(false)
const toast = ref<string | null>(null)
const error = ref<string | null>(null)

onMounted(() => {
  const stored = typeof window !== 'undefined' ? localStorage.getItem(PASSCODE_KEY) : null
  if (stored) {
    passcode.value = stored
    authed.value = true
  }
})

async function tryAuth() {
  if (!passcode.value.trim() || authChecking.value) return
  authChecking.value = true
  error.value = null
  try {
    // Probe the function with an empty description. Returns 401 invalid_passcode
    // if wrong, 400 description_required if passcode is right — that's our "valid" signal.
    const res = await fetch(`${SUPABASE_URL}/functions/v1/submit-crew-food`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passcode: passcode.value, description: '' }),
    })
    const data = await res.json().catch(() => ({}))
    if (res.status === 401) {
      error.value = '密码错误'
      return
    }
    if (res.status === 400 && data.error === 'description_required') {
      localStorage.setItem(PASSCODE_KEY, passcode.value)
      authed.value = true
      return
    }
    error.value = '验证失败,请稍后再试'
  } catch {
    error.value = '网络错误'
  } finally {
    authChecking.value = false
  }
}

async function estimate() {
  if (!description.value.trim() || estimating.value) return
  estimating.value = true
  error.value = null
  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/estimate-calories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: PUBLISHABLE_KEY,
        Authorization: `Bearer ${PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ description: description.value.trim() }),
    })
    const data = await res.json()
    if (data.error) {
      error.value = 'AI估算失败,请手动输入'
      return
    }
    if (data.kcal != null) calories.value = data.kcal
    if (data.carbs_g != null) carbs_g.value = data.carbs_g
    if (data.protein_g != null) protein_g.value = data.protein_g
    estimateMeta.value = {
      confidence: data.confidence,
      items: data.items,
      notes: data.notes,
    }
  } catch {
    error.value = 'AI估算失败,请手动输入'
  } finally {
    estimating.value = false
  }
}

async function submit() {
  if (!description.value.trim() || submitting.value) return
  submitting.value = true
  error.value = null
  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/submit-crew-food`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        passcode: passcode.value,
        description: description.value.trim(),
        calories: calories.value,
        carbs_g: carbs_g.value,
        protein_g: protein_g.value,
        estimate_meta: estimateMeta.value,
      }),
    })
    const data = await res.json()
    if (!res.ok) {
      if (data.error === 'invalid_passcode') {
        error.value = '密码失效,请重新登录'
        localStorage.removeItem(PASSCODE_KEY)
        authed.value = false
      } else {
        error.value = '提交失败,请重试'
      }
      return
    }
    const summary = [
      data.calories != null ? `${data.calories} 千卡` : null,
      data.carbs_g != null ? `${data.carbs_g}g 碳水` : null,
      data.protein_g != null ? `${data.protein_g}g 蛋白` : null,
    ].filter(Boolean).join(' · ')
    toast.value = `✓ 已记录 · ${summary || '无营养数据'}`
    description.value = ''
    calories.value = null
    carbs_g.value = null
    protein_g.value = null
    estimateMeta.value = null
    setTimeout(() => { toast.value = null }, 4500)
  } catch {
    error.value = '网络错误'
  } finally {
    submitting.value = false
  }
}

function logout() {
  localStorage.removeItem(PASSCODE_KEY)
  authed.value = false
  passcode.value = ''
  description.value = ''
  calories.value = null
  carbs_g.value = null
  protein_g.value = null
  estimateMeta.value = null
  error.value = null
}
</script>

<template>
  <div class="crew-page">
    <header class="crew-header">
      <h1>为 Ria 记录食物</h1>
      <p class="crew-subtitle">20,000KM · 机组录入</p>
    </header>

    <main class="crew-main">
      <!-- Passcode gate -->
      <section v-if="!authed" class="crew-block">
        <label class="crew-field">
          <span>访问密码</span>
          <input
            v-model="passcode"
            type="password"
            autocomplete="off"
            autofocus
            @keydown.enter="tryAuth"
          />
        </label>
        <button
          class="crew-btn-primary"
          :disabled="!passcode.trim() || authChecking"
          @click="tryAuth"
        >
          {{ authChecking ? '验证中…' : '进入' }}
        </button>
        <p v-if="error" class="crew-error">{{ error }}</p>
      </section>

      <!-- Entry form -->
      <section v-else class="crew-block">
        <label class="crew-field">
          <span>食物描述</span>
          <input
            v-model="description"
            type="text"
            placeholder='例如 "一大碗米饭加鸡腿"'
            autofocus
          />
        </label>

        <button
          class="crew-btn-secondary"
          :disabled="!description.trim() || estimating"
          @click="estimate"
        >
          {{ estimating ? 'AI估算中…' : 'AI 估算营养' }}
        </button>

        <div class="crew-row">
          <label class="crew-field">
            <span>千卡</span>
            <input v-model.number="calories" type="number" inputmode="numeric" min="0" />
          </label>
          <label class="crew-field">
            <span>碳水 (g)</span>
            <input v-model.number="carbs_g" type="number" inputmode="numeric" min="0" />
          </label>
          <label class="crew-field">
            <span>蛋白 (g)</span>
            <input v-model.number="protein_g" type="number" inputmode="numeric" min="0" />
          </label>
        </div>

        <p v-if="estimateMeta" class="crew-meta">
          AI估算 · 置信度: <strong>{{ estimateMeta.confidence || '?' }}</strong>
          <span v-if="estimateMeta.notes"> · {{ estimateMeta.notes }}</span>
        </p>

        <button
          class="crew-btn-primary"
          :disabled="!description.trim() || submitting"
          @click="submit"
        >
          {{ submitting ? '提交中…' : '提交' }}
        </button>

        <p v-if="error" class="crew-error">{{ error }}</p>

        <button class="crew-logout" @click="logout">登出</button>
      </section>

      <div v-if="toast" class="crew-toast">{{ toast }}</div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.crew-page {
  min-height: 100vh;
  background: $cream;
  padding: $space-6 $space-4 $space-12;
  font-family: $font-sans;
  color: $warm-black;
}

.crew-header {
  text-align: center;
  margin: 0 auto $space-8;
  max-width: 480px;
}

.crew-header h1 {
  font-family: $font-serif;
  font-size: clamp($text-xl, 5vw, $text-2xl);
  font-weight: 400;
  color: $warm-black;
  margin: 0 0 $space-2 0;
  letter-spacing: -0.01em;
}

.crew-subtitle {
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-wider;
  text-transform: uppercase;
  color: $earth-500;
  margin: 0;
}

.crew-main {
  max-width: 480px;
  margin: 0 auto;
}

.crew-block {
  display: flex;
  flex-direction: column;
  gap: $space-4;
}

.crew-field {
  display: flex;
  flex-direction: column;
  gap: $space-1;
}

.crew-field > span {
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  color: $earth-700;
}

.crew-field input {
  width: 100%;
  padding: $space-3;
  border: 2px solid $warm-black;
  background: $cream;
  font-family: $font-mono;
  font-size: $text-base;
  color: $warm-black;
  -webkit-appearance: none;
  appearance: none;
  border-radius: 0;
}

.crew-field input:focus {
  outline: none;
  border-color: $terracotta-700;
}

.crew-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $space-2;
}

.crew-row .crew-field > span {
  font-size: 0.6rem;
}

.crew-row .crew-field input {
  padding: $space-2;
  font-size: $text-sm;
}

.crew-meta {
  font-family: $font-mono;
  font-size: $text-xs;
  color: $earth-600;
  margin: 0;

  strong {
    color: $terracotta-700;
  }
}

.crew-btn-primary {
  padding: $space-4;
  background: $terracotta-700;
  color: $cream;
  border: 2px solid $terracotta-700;
  font-family: $font-mono;
  font-size: $text-base;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  cursor: pointer;
  min-height: 56px;
  transition: background 0.2s, transform 0.15s;
}

.crew-btn-primary:hover:not(:disabled) {
  background: $terracotta-800;
  border-color: $terracotta-800;
}

.crew-btn-primary:active:not(:disabled) {
  transform: scale(0.98);
}

.crew-btn-primary:disabled {
  background: $earth-300;
  border-color: $earth-300;
  cursor: not-allowed;
}

.crew-btn-secondary {
  padding: $space-3;
  background: $warm-black;
  color: $cream;
  border: 2px solid $warm-black;
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s;
}

.crew-btn-secondary:hover:not(:disabled) {
  background: $earth-800;
  border-color: $earth-800;
}

.crew-btn-secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.crew-logout {
  background: none;
  border: none;
  color: $earth-500;
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  padding: $space-2;
  margin-top: $space-6;
  cursor: pointer;
  align-self: center;

  &:hover {
    color: $warm-black;
  }
}

.crew-error {
  font-family: $font-mono;
  font-size: $text-sm;
  color: $terracotta-700;
  margin: 0;
  text-align: center;
}

.crew-toast {
  position: fixed;
  bottom: $space-6;
  left: 50%;
  transform: translateX(-50%);
  background: $warm-black;
  color: $cream;
  padding: $space-3 $space-6;
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  max-width: calc(100vw - #{$space-8});
  text-align: center;
  z-index: 1000;
}
</style>
