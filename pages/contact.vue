<script setup lang="ts">
useSeoMeta({
  title: 'Connect | 20,000KM',
  description: 'Get in touch with the 20,000km team for press, sponsorship, or land crew inquiries.'
})

const route = useRoute()

const formData = reactive({
  name: '',
  email: '',
  reason: '',
  message: ''
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)
const submitError = ref('')

// Field-level validation errors
const fieldErrors = reactive({
  name: '',
  email: '',
  reason: '',
  message: ''
})

// Validate email format
const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// Validate individual field
const validateField = (field: keyof typeof formData) => {
  fieldErrors[field] = ''

  switch (field) {
    case 'name':
      if (!formData.name.trim()) {
        fieldErrors.name = 'Name is required'
      }
      break
    case 'email':
      if (!formData.email.trim()) {
        fieldErrors.email = 'Email is required'
      } else if (!isValidEmail(formData.email)) {
        fieldErrors.email = 'Please enter a valid email address'
      }
      break
    case 'reason':
      if (!formData.reason) {
        fieldErrors.reason = 'Please select a reason'
      }
      break
    case 'message':
      if (!formData.message.trim()) {
        fieldErrors.message = 'Message is required'
      } else if (formData.message.trim().length < 10) {
        fieldErrors.message = 'Message must be at least 10 characters'
      }
      break
  }

  return !fieldErrors[field]
}

// Validate all fields
const validateForm = () => {
  const fields: (keyof typeof formData)[] = ['name', 'email', 'reason', 'message']
  return fields.every(field => validateField(field))
}

const reasons = [
  { value: 'press', label: 'Press & Media' },
  { value: 'sponsorship', label: 'Sponsorship' },
  { value: 'land-crew', label: 'Land Crew (Limited)' },
  { value: 'other', label: 'Other' }
]

// Pre-fill reason from query param if valid
onMounted(() => {
  const reasonParam = route.query.reason as string
  if (reasonParam && reasons.some(r => r.value === reasonParam)) {
    formData.reason = reasonParam
  }
})

const handleSubmit = async (e: Event) => {
  e.preventDefault()
  submitError.value = ''

  // Validate all fields before submitting
  if (!validateForm()) {
    // Focus first field with error
    const firstError = Object.keys(fieldErrors).find(key => fieldErrors[key as keyof typeof fieldErrors])
    if (firstError) {
      const element = document.getElementById(firstError)
      element?.focus()
    }
    return
  }

  isSubmitting.value = true

  try {
    const form = e.target as HTMLFormElement
    const formDataObj = new FormData(form)

    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formDataObj as any).toString()
    })

    if (response.ok) {
      isSubmitted.value = true
    } else {
      throw new Error('Form submission failed')
    }
  } catch (error) {
    submitError.value = 'Something went wrong. Please email us directly at hello@20000km.com'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="contact-page">

    <div class="container py-16">
      <div class="contact-layout">
        <div class="contact-content">
          <h1 class="contact-title">Get in Touch</h1>
          <p class="contact-intro">
            Press, partners, or fellow travelers—we'd love to hear from you.
          </p>

        <!-- Success State -->
        <div v-if="isSubmitted" class="success-message">
          <h2>Message Received</h2>
          <p class="success-text">
            We'll get back to you within 48 hours—or about 2 marathons.
          </p>
          <div class="success-links">
            <p class="success-links-label">While you wait:</p>
            <ul>
              <li>
                <a href="https://instagram.com/whereisriax" target="_blank" rel="noopener">
                  Follow along on Instagram
                </a>
              </li>
              <li>
                <a href="https://substack.com/@whereisriax" target="_blank" rel="noopener">
                  Read the Long Run Letter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Contact Form (Netlify Forms) -->
        <form
          v-else
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          class="contact-form"
          @submit="handleSubmit"
        >
          <!-- Netlify form name (required for Netlify to detect the form) -->
          <input type="hidden" name="form-name" value="contact">

          <!-- Honeypot field (spam protection) -->
          <p class="hidden">
            <label>Don't fill this out: <input name="bot-field"></label>
          </p>

          <div class="form-group">
            <label for="name" class="form-label">
              Name <span class="required-indicator" aria-hidden="true">*</span>
            </label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              name="name"
              required
              :class="['form-input', { 'form-input--error': fieldErrors.name }]"
              :aria-invalid="!!fieldErrors.name"
              :aria-describedby="fieldErrors.name ? 'name-error' : undefined"
              placeholder="Your name"
              @blur="validateField('name')"
            >
            <p v-if="fieldErrors.name" id="name-error" class="field-error" role="alert">
              {{ fieldErrors.name }}
            </p>
          </div>

          <div class="form-group">
            <label for="email" class="form-label">
              Email <span class="required-indicator" aria-hidden="true">*</span>
            </label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              name="email"
              required
              :class="['form-input', { 'form-input--error': fieldErrors.email }]"
              :aria-invalid="!!fieldErrors.email"
              :aria-describedby="fieldErrors.email ? 'email-error' : undefined"
              placeholder="your@email.com"
              @blur="validateField('email')"
            >
            <p v-if="fieldErrors.email" id="email-error" class="field-error" role="alert">
              {{ fieldErrors.email }}
            </p>
          </div>

          <div class="form-group">
            <label for="reason" class="form-label">
              I'm reaching out about <span class="required-indicator" aria-hidden="true">*</span>
            </label>
            <select
              id="reason"
              v-model="formData.reason"
              name="reason"
              required
              :class="['form-select', { 'form-input--error': fieldErrors.reason }]"
              :aria-invalid="!!fieldErrors.reason"
              :aria-describedby="fieldErrors.reason ? 'reason-error' : undefined"
              @blur="validateField('reason')"
              @change="validateField('reason')"
            >
              <option value="" disabled>Select a reason</option>
              <option
                v-for="reason in reasons"
                :key="reason.value"
                :value="reason.value"
              >
                {{ reason.label }}
              </option>
            </select>
            <p v-if="fieldErrors.reason" id="reason-error" class="field-error" role="alert">
              {{ fieldErrors.reason }}
            </p>
          </div>

          <div class="form-group">
            <label for="message" class="form-label">
              Message <span class="required-indicator" aria-hidden="true">*</span>
            </label>
            <textarea
              id="message"
              v-model="formData.message"
              name="message"
              required
              :class="['form-textarea', { 'form-input--error': fieldErrors.message }]"
              :aria-invalid="!!fieldErrors.message"
              :aria-describedby="fieldErrors.message ? 'message-error' : undefined"
              rows="5"
              placeholder="Tell us more..."
              @blur="validateField('message')"
            ></textarea>
            <p v-if="fieldErrors.message" id="message-error" class="field-error" role="alert">
              {{ fieldErrors.message }}
            </p>
          </div>

          <div v-if="submitError" class="form-error">
            {{ submitError }}
          </div>

          <button
            type="submit"
            class="form-submit"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Sending...' : 'Send Message' }}
          </button>
        </form>

        <!-- Direct Email Fallback -->
        <div class="email-fallback">
          <p>
            Prefer email?
            <a href="mailto:hello@20000km.com">hello@20000km.com</a>
          </p>
        </div>
      </div>

      <aside class="contact-sidebar">
        <div class="sidebar-card">
          <span class="sidebar-label">For Media</span>
          <h3>Press Kit</h3>
          <p>Photos, bio, and project details for coverage.</p>
          <a href="mailto:hello@20000km.com?subject=Press Kit Request" class="sidebar-link">
            Request Kit →
          </a>
        </div>

        <div class="sidebar-card">
          <span class="sidebar-label">Limited Spots</span>
          <h3>Land Crew</h3>
          <p>Know the route? Have a vehicle? Local support needed in select regions.</p>
        </div>

        <div class="sidebar-card">
          <span class="sidebar-label">Follow Along</span>
          <h3>The Journey</h3>
          <ul class="social-links">
            <li><a href="https://instagram.com/whereisriax" target="_blank" rel="noopener">Instagram</a></li>
            <li><a href="https://substack.com/@whereisriax" target="_blank" rel="noopener">Substack</a></li>
            <li><a href="https://strava.app.link/qeKK5Sw4OZb" target="_blank" rel="noopener">Strava</a></li>
          </ul>
        </div>
      </aside>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

// Hero Image Strip
.contact-hero {
  position: relative;
  height: 140px;
  margin: (-$space-12) calc(-50vw + 50%) 0;
  width: 100vw;
  overflow: hidden;

  @media (max-width: $breakpoint-md) {
    height: 100px;
  }
}

.contact-hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 40%;
}

.contact-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba($warm-black, 0.1) 0%,
    rgba($warm-black, 0.3) 60%,
    rgba($cream, 0.9) 90%,
    rgba($cream, 1) 100%
  );
}

.contact-layout {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: $space-16;
  align-items: start;

  @media (max-width: $breakpoint-xl) {
    grid-template-columns: 1fr;
    gap: $space-12;
  }
}

.contact-title {
  font-family: $font-serif;
  font-size: $text-4xl;
  margin-bottom: $space-4;
}

.contact-intro {
  font-size: $text-lg;
  color: $earth-600;
  line-height: $leading-relaxed;
  margin-bottom: $space-8;
  max-width: 500px;
}

// Form Styles
.contact-form {
  margin-bottom: $space-12;
}

.form-group {
  margin-bottom: $space-6;
}

.form-label {
  display: block;
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  color: $earth-600;
  margin-bottom: $space-2;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: $space-4;
  border: $border-width solid $earth-300;
  background: $cream;
  font-family: $font-sans;
  font-size: $text-base;
  color: $warm-black;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: $terracotta;
  }

  &::placeholder {
    color: $earth-400;
  }

  // Error state
  &.form-input--error {
    border-color: $terracotta-600;
    background: $terracotta-50;

    &:focus {
      border-color: $terracotta-700;
    }
  }
}

// Required field indicator
.required-indicator {
  color: $terracotta-600;
  margin-left: $space-1;
}

// Field-level error message
.field-error {
  margin-top: $space-2;
  font-size: $text-sm;
  color: $terracotta-700;
  display: flex;
  align-items: center;
  gap: $space-2;

  &::before {
    content: '⚠';
    font-size: $text-xs;
  }
}

.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%231A1814' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right $space-4 center;
  padding-right: $space-10;
  cursor: pointer;
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.form-error {
  padding: $space-4;
  background: $terracotta-50;
  border: $border-width solid $terracotta;
  color: $terracotta-700;
  font-size: $text-sm;
  margin-bottom: $space-6;
}

.form-submit {
  display: inline-block;
  background: $terracotta-700;
  color: $cream;
  padding: $space-4 $space-8;
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  border: 2px solid $terracotta-700;
  cursor: pointer;
  transition: background 0.2s ease;
  min-height: 48px;
  min-width: 48px;

  &:hover:not(:disabled) {
    background: $terracotta-800;
    border-color: $terracotta-800;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

// Success Message
.success-message {
  padding: $space-8;
  background: $teal-50;
  border: $border-width solid $teal-500;
  margin-bottom: $space-12;

  h2 {
    font-family: $font-serif;
    font-size: $text-xl;
    color: $teal-700;
    margin-bottom: $space-2;
  }

  .success-text {
    color: $teal-600;
    margin-bottom: $space-6;
  }
}

.success-links {
  padding-top: $space-4;
  border-top: $border-width solid $teal-200;

  .success-links-label {
    font-family: $font-mono;
    font-size: $text-xs;
    letter-spacing: $tracking-wide;
    text-transform: uppercase;
    color: $teal-600;
    margin-bottom: $space-3;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: $space-2;

    &:last-child {
      margin-bottom: 0;
    }
  }

  a {
    font-size: $text-sm;
    color: $teal-700;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }

    &::before {
      content: '→ ';
      color: $teal-500;
    }
  }
}

// Email Fallback
.email-fallback {
  padding-top: $space-8;
  border-top: $border-width solid $earth-200;
  margin-bottom: $space-8;

  p {
    font-size: $text-sm;
    color: $earth-500;
  }

  a {
    color: $terracotta-700;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

// Sidebar
.contact-sidebar {
  display: flex;
  flex-direction: column;
  gap: $space-6;

  @media (max-width: $breakpoint-xl) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: $breakpoint-md) {
    grid-template-columns: 1fr;
  }
}

.sidebar-card {
  padding: $space-6;
  border: 2px solid $warm-black;
  background: $cream;

  h3 {
    font-family: $font-serif;
    font-size: $text-lg;
    margin-bottom: $space-2;
  }

  p {
    font-size: $text-sm;
    color: $earth-600;
    line-height: $leading-relaxed;
    margin-bottom: 0;
  }
}

.sidebar-label {
  display: block;
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-widest;
  text-transform: uppercase;
  color: $terracotta-700;
  margin-bottom: $space-2;
}

.sidebar-link {
  display: inline-block;
  margin-top: $space-4;
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  color: $warm-black;
  text-decoration: none;

  &:hover {
    color: $terracotta-700;
  }
}

.social-links {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: $space-2;

    &:last-child {
      margin-bottom: 0;
    }
  }

  a {
    font-size: $text-sm;
    color: $earth-600;
    text-decoration: none;

    &:hover {
      color: $terracotta-700;
    }
  }
}

// Hidden honeypot
.hidden {
  display: none !important;
}
</style>
