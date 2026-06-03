<script setup lang="ts">
// Crew food log — Mandarin-only, passcode-gated.
// Lets Ria's on-the-road support team log what she ate without giving them
// lab tracker access. Posts to the `submit-crew-food` Supabase edge function
// which validates the passcode and inserts via service role into the shared
// food_entries table. Same endpoint also proxies the Groq nutrition estimator
// (`mode: 'estimate'`) and returns gamification stats (`mode: 'stats'`).

definePageMeta({ layout: false })

useSeoMeta({
  title: 'Ria 吃了啥? · 20,000KM',
  description: 'Crew-only food entry for the 20,000KM Experiment.',
  robots: 'noindex,nofollow',
})

const SUPABASE_URL = 'https://uipwxpyucbtdpxlagjvv.supabase.co'
const PASSCODE_KEY = 'crew-food-passcode'
const ENDPOINT = `${SUPABASE_URL}/functions/v1/submit-crew-food`

// Tunables — change here, no schema or env work needed
// 66kg / 175cm woman running 8-9hr/day low-intensity: BMR ~1460 + run cost
// ~4000-4500 + daily activity ~400 → realistic burn ≈ 6000 kcal/day.
const KCAL_TARGET = 6000
const MILESTONE_KCAL = 1500 // toast every 1500 kcal crossed today

const ENCOURAGEMENTS = [
  '棒!再来一笔',
  'Ria 跑得动 多亏你们',
  '记好了,继续保持',
  '营养满满,加油',
  '辛苦啦,小分队',
  '干得漂亮',
  '又一餐落账',
  '再来点蛋白吧',
]

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
const toastKind = ref<'normal' | 'first' | 'milestone'>('normal')
const error = ref<string | null>(null)

const stats = ref<{
  today_count: number
  today_kcal: number
  today_carbs: number
  today_protein: number
  streak: number
} | null>(null)

const kcalProgress = computed(() => {
  if (!stats.value) return 0
  return Math.min((stats.value.today_kcal / KCAL_TARGET) * 100, 100)
})

const fireEmoji = computed(() => {
  const s = stats.value?.streak || 0
  if (s >= 30) return '🔥🔥🔥'
  if (s >= 7) return '🔥🔥'
  if (s >= 1) return '🔥'
  return '·'
})

const confidenceCn = (c?: string) => {
  if (c === 'high') return '高'
  if (c === 'medium') return '中'
  if (c === 'low') return '低'
  return c || '?'
}

onMounted(async () => {
  const stored = typeof window !== 'undefined' ? localStorage.getItem(PASSCODE_KEY) : null
  if (stored) {
    passcode.value = stored
    authed.value = true
    await refreshStats()
  }
})

async function tryAuth() {
  if (!passcode.value.trim() || authChecking.value) return
  authChecking.value = true
  error.value = null
  try {
    // Probe with mode: 'stats' — succeeds if passcode is valid, returns 401 if not.
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passcode: passcode.value, mode: 'stats' }),
    })
    const data = await res.json().catch(() => ({}))
    if (res.status === 401) {
      error.value = '密码错误'
      return
    }
    if (res.ok) {
      localStorage.setItem(PASSCODE_KEY, passcode.value)
      authed.value = true
      stats.value = data
      return
    }
    error.value = '验证失败,请稍后再试'
  } catch {
    error.value = '网络错误'
  } finally {
    authChecking.value = false
  }
}

async function refreshStats() {
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passcode: passcode.value, mode: 'stats' }),
    })
    if (res.ok) stats.value = await res.json()
  } catch { /* non-blocking */ }
}

async function estimate() {
  if (!description.value.trim() || estimating.value) return
  estimating.value = true
  error.value = null
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        passcode: passcode.value,
        description: description.value.trim(),
        mode: 'estimate',
      }),
    })
    const data = await res.json()
    if (!res.ok || data.error) {
      if (data.error === 'invalid_passcode') {
        error.value = '密码失效,请重新登录'
        localStorage.removeItem(PASSCODE_KEY)
        authed.value = false
      } else {
        error.value = 'AI估算失败,请手动输入'
      }
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

function pickEncouragement() {
  return ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)]
}

async function submit() {
  if (!description.value.trim() || submitting.value) return
  submitting.value = true
  error.value = null
  try {
    const res = await fetch(ENDPOINT, {
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
    // Celebration logic:
    //  - first entry of the day → 🌅 special
    //  - this submission crosses a 1500-kcal milestone → 🔥 special
    //  - otherwise → rotating encouragement
    const wasFirstOfDay = (stats.value?.today_count || 0) === 0
    const prevKcal = stats.value?.today_kcal || 0
    const addedKcal = data.calories ?? 0
    const nextKcal = prevKcal + addedKcal
    const crossedMilestone =
      addedKcal > 0 &&
      Math.floor(nextKcal / MILESTONE_KCAL) > Math.floor(prevKcal / MILESTONE_KCAL)
    const milestoneKcal = Math.floor(nextKcal / MILESTONE_KCAL) * MILESTONE_KCAL

    if (wasFirstOfDay) {
      toast.value = '🌅 今日第一笔!Ria 准备出发'
      toastKind.value = 'first'
    } else if (crossedMilestone) {
      toast.value = `🔥 已破 ${milestoneKcal.toLocaleString()} 千卡!Ria 满血推进`
      toastKind.value = 'milestone'
    } else {
      const cheer = pickEncouragement()
      const summary = data.calories != null ? ` · +${data.calories} 千卡` : ''
      toast.value = `✓ ${cheer}${summary}`
      toastKind.value = 'normal'
    }

    description.value = ''
    calories.value = null
    carbs_g.value = null
    protein_g.value = null
    estimateMeta.value = null
    setTimeout(() => { toast.value = null }, 4500)

    // Refresh stats so the progress bar / streak update immediately
    refreshStats()
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
  stats.value = null
  error.value = null
}
</script>

<template>
  <div class="crew-page">
    <header class="crew-header">
      <h1>Ria 吃了啥?</h1>
      <p class="crew-subtitle">20,000KM · 后援团</p>
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

      <!-- Entry form (with stats + progress bar at top) -->
      <section v-else class="crew-block">
        <!-- Stats strip -->
        <div v-if="stats" class="crew-stats">
          <div class="crew-stats-row">
            <span class="crew-stat-pill">{{ fireEmoji }} 连续 {{ stats.streak }} 天</span>
            <span class="crew-stat-pill">今日已记 {{ stats.today_count }} 笔</span>
          </div>
          <div class="crew-energy">
            <div class="crew-energy-label">
              <span>🍚 Ria 今日能量</span>
              <span class="crew-energy-num">
                <strong>{{ stats.today_kcal.toLocaleString() }}</strong>
                <span class="crew-energy-unit"> / {{ KCAL_TARGET.toLocaleString() }} 千卡</span>
              </span>
            </div>
            <div class="crew-energy-bar">
              <div class="crew-energy-fill" :style="{ width: `${kcalProgress}%` }"></div>
            </div>
            <div class="crew-energy-macros">
              碳水 {{ stats.today_carbs }}g · 蛋白 {{ stats.today_protein }}g
            </div>
          </div>
        </div>

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
          AI估算 · 把握: <strong>{{ confidenceCn(estimateMeta.confidence) }}</strong>
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

      <div v-if="toast" class="crew-toast" :class="`crew-toast--${toastKind}`">
        {{ toast }}
      </div>
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
  margin: 0 auto $space-6;
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

// --------- Stats strip (streak + today + energy bar) ---------
.crew-stats {
  display: flex;
  flex-direction: column;
  gap: $space-3;
  padding: $space-4;
  background: $sand-100;
  border: 2px solid $warm-black;
  margin-bottom: $space-2;
}

.crew-stats-row {
  display: flex;
  gap: $space-2;
  justify-content: center;
  flex-wrap: wrap;
}

.crew-stat-pill {
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-wide;
  background: $warm-black;
  color: $cream;
  padding: $space-1 $space-3;
  border-radius: 999px;
}

.crew-energy-label {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-wide;
  color: $earth-700;
  margin-bottom: $space-2;
}

.crew-energy-num strong {
  font-size: $text-base;
  color: $terracotta-700;
}

.crew-energy-unit {
  color: $earth-500;
}

.crew-energy-bar {
  position: relative;
  width: 100%;
  height: 14px;
  background: $earth-200;
  border: 1px solid $warm-black;
  overflow: hidden;
}

.crew-energy-fill {
  height: 100%;
  background: $terracotta;
  transition: width 0.6s ease;
}

.crew-energy-macros {
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-wide;
  color: $earth-600;
  text-align: center;
  margin-top: $space-2;
}

// --------- Form fields ---------
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

// --------- Buttons ---------
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

// --------- Toast ---------
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
  animation: crew-toast-in 0.25s ease-out;
}

.crew-toast--first {
  background: $terracotta-700;
  font-size: $text-base;
}

.crew-toast--milestone {
  background: $terracotta-700;
  font-size: $text-base;
}

@keyframes crew-toast-in {
  from { transform: translate(-50%, 20px); opacity: 0; }
  to { transform: translate(-50%, 0); opacity: 1; }
}
</style>
