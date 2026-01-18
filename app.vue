<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <!-- Hidden form for Netlify Forms detection (required for SSR/client-rendered forms) -->
  <form
    name="contact"
    data-netlify="true"
    netlify-honeypot="bot-field"
    hidden
  >
    <input type="hidden" name="form-name" value="contact">
    <input name="bot-field">
    <input name="name">
    <input name="email">
    <select name="reason"></select>
    <textarea name="message"></textarea>
  </form>
</template>
