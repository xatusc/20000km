/**
 * Scroll Reveal Composable
 * Uses Intersection Observer to trigger slow fade-in animations on scroll
 * Respects motion preferences via useSensoryMode
 */

interface ScrollRevealOptions {
  threshold?: number    // 0-1, how much of element must be visible
  rootMargin?: string   // CSS margin around viewport (negative = must be more visible)
  once?: boolean        // Only animate once (default: true)
  delay?: number        // ms to wait before starting observation (for page nav)
}

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const {
    threshold = 0.2,
    rootMargin = '-50px 0px',
    once = true,
    delay = 400
  } = options

  const { motionAllowed } = useSensoryMode()

  // Fresh state for each component instance
  let observer: IntersectionObserver | null = null
  let delayTimer: ReturnType<typeof setTimeout> | null = null
  const elements = new Set<Element>()

  const createObserver = () => {
    if (import.meta.server || observer) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')

            if (once) {
              observer?.unobserve(entry.target)
              elements.delete(entry.target)
            }
          } else if (!once) {
            entry.target.classList.remove('is-visible')
          }
        })
      },
      { threshold, rootMargin }
    )
  }

  const observe = (el: Element | null | undefined) => {
    if (!el || import.meta.server) return

    // If motion not allowed, show immediately
    if (!motionAllowed.value) {
      el.classList.add('is-visible')
      return
    }

    elements.add(el)
  }

  const observeAll = (selector: string, container?: Element) => {
    if (import.meta.server) return

    const root = container || document
    const nodeList = root.querySelectorAll(selector)
    nodeList.forEach((el) => observe(el))

    // Start observing after delay (fresh for each call)
    if (delayTimer) clearTimeout(delayTimer)

    delayTimer = setTimeout(() => {
      // If motion got disabled while waiting, show all immediately
      if (!motionAllowed.value) {
        elements.forEach((el) => el.classList.add('is-visible'))
        return
      }

      createObserver()
      elements.forEach((el) => {
        observer?.observe(el)
      })
    }, delay)
  }

  const unobserve = (el: Element | null | undefined) => {
    if (!el) return
    observer?.unobserve(el)
    elements.delete(el)
  }

  // Cleanup on unmount
  onUnmounted(() => {
    if (delayTimer) clearTimeout(delayTimer)
    observer?.disconnect()
    observer = null
    elements.clear()
  })

  // Handle motion preference changes
  watch(motionAllowed, (allowed) => {
    if (!allowed) {
      elements.forEach((el) => el.classList.add('is-visible'))
    }
  })

  return {
    observe,
    unobserve,
    observeAll,
  }
}

/**
 * Typewriter effect composable
 * Types out text character by character with a slow, deliberate pace
 */
interface TypewriterOptions {
  charDelay?: number   // ms between characters
  startDelay?: number  // ms before starting
}

export function useTypewriter(options: TypewriterOptions = {}) {
  const { charDelay = 45, startDelay = 500 } = options
  const { motionAllowed } = useSensoryMode()

  const typewrite = (
    el: HTMLElement | null,
    text: string,
    onComplete?: () => void,
    fallbackDelay: number = 3000 // fallback after 3s
  ) => {
    if (!el) return

    // Store full text for accessibility
    el.setAttribute('aria-label', text)

    // If motion not allowed, show full text immediately
    if (!motionAllowed.value) {
      el.textContent = text
      el.classList.add('typing-complete')
      onComplete?.()
      return
    }

    el.textContent = ''
    let index = 0
    let completed = false

    const type = () => {
      if (completed) return
      if (index < text.length) {
        el.textContent += text.charAt(index)
        index++
        setTimeout(type, charDelay)
      } else {
        completed = true
        el.classList.add('typing-complete')
        onComplete?.()
      }
    }

    // Fallback: show full text if not completed after fallbackDelay
    const fallbackTimeout = setTimeout(() => {
      if (!completed) {
        el.textContent = text
        el.classList.add('typing-complete')
        completed = true
        onComplete?.()
      }
    }, fallbackDelay + startDelay)

    setTimeout(type, startDelay)
  }

  /**
   * Typewriter effect for HTML content
   * Types out text character by character, preserving HTML tags
   */
  const typewriteHtml = (
    el: HTMLElement | null,
    html: string,
    onComplete?: () => void,
    fallbackDelay: number = 5000
  ) => {
    if (!el) return

    // Extract plain text for accessibility
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = html
    const plainText = tempDiv.textContent || ''
    el.setAttribute('aria-label', plainText)

    // If motion not allowed, show full HTML immediately
    if (!motionAllowed.value) {
      el.innerHTML = html
      el.classList.add('typing-complete')
      onComplete?.()
      return
    }

    el.innerHTML = ''
    let index = 0
    let completed = false

    // Parse HTML into segments: text and tags
    const segments: { type: 'text' | 'tag'; content: string }[] = []
    let current = ''
    let inTag = false

    for (const char of html) {
      if (char === '<') {
        if (current) segments.push({ type: 'text', content: current })
        current = '<'
        inTag = true
      } else if (char === '>' && inTag) {
        current += '>'
        segments.push({ type: 'tag', content: current })
        current = ''
        inTag = false
      } else {
        current += char
      }
    }
    if (current) segments.push({ type: 'text', content: current })

    // Flatten into characters, but keep tags as single units
    const chars: string[] = []
    for (const seg of segments) {
      if (seg.type === 'tag') {
        chars.push(seg.content)
      } else {
        for (const c of seg.content) {
          chars.push(c)
        }
      }
    }

    const type = () => {
      if (completed) return
      if (index < chars.length) {
        el.innerHTML += chars[index]
        index++
        // Tags are instant, only delay for actual characters
        const delay = chars[index - 1].startsWith('<') ? 0 : charDelay
        setTimeout(type, delay)
      } else {
        completed = true
        el.classList.add('typing-complete')
        onComplete?.()
      }
    }

    // Fallback: show full HTML if not completed
    setTimeout(() => {
      if (!completed) {
        el.innerHTML = html
        el.classList.add('typing-complete')
        completed = true
        onComplete?.()
      }
    }, fallbackDelay + startDelay)

    setTimeout(type, startDelay)
  }

  return { typewrite, typewriteHtml }
}
