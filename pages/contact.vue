<script setup lang="ts">
useSeoMeta({
  title: 'Connect | 20,000KM',
  description: 'Get in touch with the 20,000km team for press, sponsorship, or land crew inquiries.'
})

const formData = reactive({
  name: '',
  email: '',
  reason: '',
  message: ''
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)
const submitError = ref('')

const reasons = [
  { value: 'press', label: 'Press & Media' },
  { value: 'sponsorship', label: 'Sponsorship' },
  { value: 'land-crew', label: 'Land Crew (Limited)' },
  { value: 'other', label: 'Other' }
]

const handleSubmit = async (e: Event) => {
  e.preventDefault()
  isSubmitting.value = true
  submitError.value = ''

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
  <div class="container py-16">
    <div class="contact-layout">
      <div class="contact-content">
        <h1 class="contact-title">Connect</h1>
        <p class="contact-intro">
          Whether you're press, a potential partner, or someone who knows the route,
          we'd love to hear from you.
        </p>

        <!-- Success State -->
        <div v-if="isSubmitted" class="success-message">
          <h2>Message Sent</h2>
          <p>Thanks for reaching out. We'll get back to you within 48 hours.</p>
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
            <label for="name" class="form-label">Name</label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              name="name"
              required
              class="form-input"
              placeholder="Your name"
            >
          </div>

          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              name="email"
              required
              class="form-input"
              placeholder="your@email.com"
            >
          </div>

          <div class="form-group">
            <label for="reason" class="form-label">I'm reaching out about</label>
            <select
              id="reason"
              v-model="formData.reason"
              name="reason"
              required
              class="form-select"
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
          </div>

          <div class="form-group">
            <label for="message" class="form-label">Message</label>
            <textarea
              id="message"
              v-model="formData.message"
              name="message"
              required
              class="form-textarea"
              rows="5"
              placeholder="Tell us more..."
            ></textarea>
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
          <h3>Press Kit</h3>
          <p>High-resolution photos, bio, and project details for media.</p>
          <a href="mailto:hello@20000km.com?subject=Press Kit Request" class="sidebar-link">
            Request Press Kit
          </a>
        </div>

        <div class="sidebar-card">
          <h3>Follow the Journey</h3>
          <ul class="social-links">
            <li><a href="https://instagram.com/whereisriax" target="_blank" rel="noopener">Instagram</a></li>
            <li><a href="https://substack.com/@whereisriax" target="_blank" rel="noopener">Substack</a></li>
            <li><a href="https://strava.app.link/qeKK5Sw4OZb" target="_blank" rel="noopener">Strava</a></li>
          </ul>
        </div>

        <!-- Land Crew Note (moved to sidebar) -->
        <div class="crew-card">
          <h3>Land Crew</h3>
          <p>
            Know the route? Have a vehicle? We're looking for local support
            in select regions. Limited opportunity during specific segments.
          </p>
        </div>
      </aside>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

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

  p {
    color: $teal-600;
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
    color: $terracotta;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

// Sidebar
.contact-sidebar {
  @media (max-width: $breakpoint-xl) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $space-6;
  }

  @media (max-width: $breakpoint-md) {
    grid-template-columns: 1fr;
  }
}

.sidebar-card {
  padding: $space-6;
  border: $border-width solid $earth-200;
  margin-bottom: $space-6;

  @media (max-width: $breakpoint-xl) {
    margin-bottom: 0;
  }

  h3 {
    font-family: $font-serif;
    font-size: $text-lg;
    margin-bottom: $space-2;
  }

  p {
    font-size: $text-sm;
    color: $earth-500;
    margin-bottom: $space-4;
  }
}

.crew-card {
  padding: $space-6;
  background: $sand-100;
  border-left: 3px solid $sage;
  margin-bottom: $space-6;

  @media (max-width: $breakpoint-xl) {
    margin-bottom: 0;
    grid-column: span 2;
  }

  @media (max-width: $breakpoint-md) {
    grid-column: span 1;
  }

  h3 {
    font-family: $font-mono;
    font-size: $text-xs;
    letter-spacing: $tracking-wide;
    text-transform: uppercase;
    color: $sage;
    margin-bottom: $space-2;
  }

  p {
    font-size: $text-sm;
    color: $earth-600;
    line-height: $leading-relaxed;
  }
}

.sidebar-link {
  display: inline-block;
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  color: $warm-black;
  text-decoration: none;
  padding-bottom: $space-1;
  border-bottom: 1px solid $warm-black;

  &:hover {
    color: $terracotta;
    border-color: $terracotta;
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
      color: $terracotta;
    }
  }
}

// Hidden honeypot
.hidden {
  display: none !important;
}
</style>
