<script setup lang="ts">
/**
 * PodcastSection - Dark themed podcast section with inline audio player
 * Features most recent episode prominently + horizontal scroll for more
 */

const { latestEpisode, moreEpisodes, isLoading, error, podcastUrl } = usePodcastFeed()

// Audio player state
const audioEl = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const progressPercent = computed(() => {
  if (duration.value === 0) return 0
  return (currentTime.value / duration.value) * 100
})

// Format time as mm:ss or hh:mm:ss
const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) return '0:00'
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const formattedCurrentTime = computed(() => formatTime(currentTime.value))
const formattedDuration = computed(() => formatTime(duration.value))

const togglePlay = () => {
  if (!audioEl.value) return

  if (isPlaying.value) {
    audioEl.value.pause()
  } else {
    audioEl.value.play()
  }
}

const handleTimeUpdate = () => {
  if (audioEl.value) {
    currentTime.value = audioEl.value.currentTime
  }
}

const handleLoadedMetadata = () => {
  if (audioEl.value) {
    duration.value = audioEl.value.duration
  }
}

const handlePlay = () => {
  isPlaying.value = true
}

const handlePause = () => {
  isPlaying.value = false
}

const handleEnded = () => {
  isPlaying.value = false
  currentTime.value = 0
}

const seek = (event: MouseEvent) => {
  if (!audioEl.value) return

  const progressBar = event.currentTarget as HTMLElement
  const rect = progressBar.getBoundingClientRect()
  const percent = (event.clientX - rect.left) / rect.width
  audioEl.value.currentTime = percent * duration.value
}

// Placeholder cover image
const coverImage = '/images/Ria_lookback.webp'
</script>

<template>
  <section class="podcast-section">
    <div class="container">
      <header class="podcast-header">
        <span class="podcast-eyebrow">{{ $t('podcast.eyebrow') }}</span>
        <h2 class="podcast-title">{{ $t('podcast.title') }}</h2>
        <p class="podcast-subhead">{{ $t('podcast.subhead') }}</p>
      </header>

      <!-- Loading State -->
      <div v-if="isLoading" class="podcast-loading">
        <LoadingSkeleton type="podcast" />
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="podcast-error">
        <p>{{ error }}</p>
        <a :href="podcastUrl" target="_blank" rel="noopener noreferrer" class="podcast-cta">
          {{ $t('podcast.listenOn') }}
        </a>
      </div>

      <!-- Content -->
      <template v-else-if="latestEpisode">
        <!-- Featured Episode -->
        <div class="podcast-featured">
          <div class="podcast-featured__cover">
            <img :src="coverImage" alt="Podcast cover art" loading="lazy">
          </div>

          <div class="podcast-featured__content">
            <span class="podcast-featured__badge">
              {{ $t('podcast.latestEpisode') }}
              <span v-if="latestEpisode.duration"> · {{ latestEpisode.duration }}</span>
            </span>

            <h3 class="podcast-featured__title">{{ latestEpisode.title }}</h3>

            <p class="podcast-featured__desc">{{ latestEpisode.description }}</p>

            <!-- Audio Player -->
            <div v-if="latestEpisode.audioUrl" class="audio-player">
              <button
                type="button"
                class="audio-player__btn"
                :aria-label="isPlaying ? $t('podcast.pause') : $t('podcast.play')"
                @click="togglePlay"
              >
                <!-- Play Icon -->
                <svg v-if="!isPlaying" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <!-- Pause Icon -->
                <svg v-else viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              </button>

              <div class="audio-player__progress" @click="seek">
                <div class="audio-player__track">
                  <div
                    class="audio-player__fill"
                    :style="{ width: `${progressPercent}%` }"
                  ></div>
                </div>
              </div>

              <span class="audio-player__time">
                {{ formattedCurrentTime }} / {{ formattedDuration }}
              </span>

              <audio
                ref="audioEl"
                :src="latestEpisode.audioUrl"
                preload="metadata"
                @timeupdate="handleTimeUpdate"
                @loadedmetadata="handleLoadedMetadata"
                @play="handlePlay"
                @pause="handlePause"
                @ended="handleEnded"
              />
            </div>

            <!-- Platform Links -->
            <div class="podcast-platforms">
              <a
                :href="podcastUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="platform-link"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                Spotify
              </a>
              <a
                href="https://podcasts.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                class="platform-link"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0H5.34zm6.525 2.568c2.336 0 4.448.902 6.056 2.587 1.224 1.272 1.912 2.619 2.264 4.392.12.59-.12 1.2-.59 1.54-.468.34-1.127.34-1.595-.05-.39-.34-.546-.78-.468-1.37-.273-1.32-.78-2.34-1.595-3.18-1.166-1.22-2.751-1.89-4.462-1.89-3.462 0-6.292 2.79-6.487 6.448-.117 2.18.702 4.158 2.148 5.59.702.69 1.053 1.59 1.014 2.6-.078 1.32-.702 2.37-1.872 3.15-.156.12-.35.15-.546.12-.194-.04-.35-.16-.428-.31-.78-1.47-.273-3.15 1.053-4.29.546-.48.858-1.13.897-1.89.04-.64-.194-1.22-.663-1.72-1.79-1.79-2.771-4.24-2.654-6.94C4.053 4.99 7.602 2.567 11.865 2.567zm.078 4.32c.897 0 1.716.35 2.304.98.585.59.897 1.41.858 2.26-.04 1.33-.819 2.34-1.989 3.19-.39.27-.624.7-.624 1.17v1.87c0 .59-.078 1.22-.273 1.83-.507 1.64-1.599 2.78-3.198 3.38-.117.04-.234.04-.35.04-.312 0-.585-.12-.78-.31-.234-.27-.312-.63-.156-.98.546-1.24.624-2.19.195-2.88-.273-.47-.702-.82-1.17-1.02a3.89 3.89 0 01-1.794-1.64c-.663-1.14-.741-2.57-.156-3.87.702-1.6 2.11-2.62 3.868-2.82.39-.04.78-.04 1.17.04.78.12 1.482.43 2.07.93.117.08.195.2.195.31s-.04.23-.117.31c-.156.16-.39.16-.546 0-.507-.43-1.092-.7-1.755-.78-.312-.04-.663-.04-.975 0-1.326.16-2.382.93-2.928 2.14-.468 1.02-.39 2.07.195 2.93.39.58.936.97 1.482 1.17.702.31 1.326.82 1.755 1.52.585.93.663 2.02.312 3.26.936-.55 1.56-1.41 1.833-2.45.117-.47.195-.93.195-1.37v-1.87c0-.86.39-1.64 1.053-2.14.858-.63 1.404-1.33 1.443-2.26.04-.55-.156-1.09-.546-1.49-.39-.39-.897-.59-1.443-.59-1.17 0-2.148.93-2.226 2.14 0 .23-.195.43-.43.43-.233 0-.428-.2-.428-.43.117-1.72 1.521-3.03 3.276-3.03z"/>
                </svg>
                Apple
              </a>
            </div>
          </div>
        </div>

        <!-- More Episodes -->
        <div v-if="moreEpisodes.length > 0" class="podcast-more">
          <h4 class="podcast-more__title">{{ $t('podcast.moreEpisodes') }}</h4>

          <div class="podcast-episodes">
            <a
              v-for="episode in moreEpisodes"
              :key="episode.title"
              :href="podcastUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="episode-card"
            >
              <div class="episode-card__cover">
                <img :src="coverImage" alt="" loading="lazy">
                <div class="episode-card__play">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              <span class="episode-card__date">{{ episode.formattedDate }}</span>
              <h5 class="episode-card__title">{{ episode.title }}</h5>
              <span v-if="episode.duration" class="episode-card__duration">{{ episode.duration }}</span>
            </a>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/scss/_variables' as *;

.podcast-section {
  background: $warm-black; // Flat, no gradient
  color: $cream;
  padding: $space-20 0;
}

.podcast-header {
  margin-bottom: $space-10;
  text-align: center;
}

.podcast-eyebrow {
  display: block;
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-widest;
  text-transform: uppercase;
  color: $terracotta-400;
  margin-bottom: $space-3;
}

.podcast-title {
  font-family: $font-serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 400;
  color: $cream;
  margin: 0;
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.podcast-subhead {
  font-family: $font-serif;
  font-style: italic;
  font-size: $text-base;
  color: rgba($cream, 0.85);
  margin: $space-2 0 0 0;
}

// Loading & Error states
.podcast-loading {
  padding: $space-8;

  @media (max-width: $breakpoint-md) {
    padding: $space-6;
  }
}

.podcast-error {
  padding: $space-12;
  text-align: center;
  font-family: $font-mono;
  font-size: $text-sm;
  color: rgba($cream, 0.85);
}

.podcast-cta {
  display: inline-block;
  margin-top: $space-4;
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  color: $cream;
  text-decoration: none;
  padding: $space-3 $space-6;
  border: 1px solid rgba($cream, 0.3);
  transition: all $transition-base;

  &:hover {
    background: rgba($cream, 0.1);
    border-color: $cream;
  }
}

// Featured Episode
.podcast-featured {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: $space-10;
  padding: $space-10;
  background: rgba($cream, 0.02);
  border: 2px solid rgba($cream, 0.15); // Hard border
  margin-bottom: $space-12;

  @media (max-width: $breakpoint-lg) {
    grid-template-columns: 1fr;
    text-align: center;
  }
}

.podcast-featured__cover {
  img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border: 3px solid rgba($cream, 0.2); // Hard border, no radius
  }

  @media (max-width: $breakpoint-lg) {
    max-width: 220px;
    margin: 0 auto;
  }
}

.podcast-featured__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.podcast-featured__badge {
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  color: $terracotta-400;
  margin-bottom: $space-3;
}

.podcast-featured__title {
  font-family: $font-serif;
  font-size: $text-2xl;
  color: $cream;
  margin: 0 0 $space-3 0;
  line-height: $leading-snug;
}

.podcast-featured__desc {
  font-size: $text-base;
  color: rgba($cream, 0.85);
  line-height: $leading-relaxed;
  margin: 0 0 $space-6 0;
  max-width: 500px;

  @media (max-width: $breakpoint-lg) {
    margin-left: auto;
    margin-right: auto;
  }
}

// Audio Player
.audio-player {
  display: flex;
  align-items: center;
  gap: $space-4;
  margin-bottom: $space-6;

  @media (max-width: $breakpoint-md) {
    flex-wrap: wrap;
    justify-content: center;
  }
}

.audio-player__btn {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  background: $terracotta-700;
  border: 2px solid $terracotta-700;
  color: $cream;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all $transition-base;

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    background: $terracotta-800;
    border-color: $terracotta-800;
  }

  &:focus {
    outline: 2px solid $terracotta-400;
    outline-offset: 2px;
  }
}

.audio-player__progress {
  flex: 1;
  min-width: 150px;
  cursor: pointer;
  padding: $space-2 0;
}

.audio-player__track {
  height: 8px;
  background: rgba($cream, 0.15);
  overflow: hidden;
}

.audio-player__fill {
  height: 100%;
  background: $terracotta;
  transition: width 0.1s linear;
}

.audio-player__time {
  flex-shrink: 0;
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  color: rgba($cream, 0.85);
  min-width: 90px;
  text-align: right;
}

// Platform Links
.podcast-platforms {
  display: flex;
  gap: $space-4;
  flex-wrap: wrap;

  @media (max-width: $breakpoint-lg) {
    justify-content: center;
  }
}

.platform-link {
  display: inline-flex;
  align-items: center;
  gap: $space-2;
  font-family: $font-mono;
  font-size: $text-sm;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  color: rgba($cream, 0.85);
  text-decoration: none;
  padding: $space-3 $space-4;
  border: 1px solid rgba($cream, 0.4);
  transition: all $transition-base;

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    color: $cream;
    border-color: $cream;
    background: rgba($cream, 0.05);
  }
}

// More Episodes
.podcast-more {
  margin-top: $space-8;
}

.podcast-more__title {
  font-family: $font-mono;
  font-size: $text-xs;
  letter-spacing: $tracking-wide;
  text-transform: uppercase;
  color: rgba($cream, 0.85);
  margin: 0 0 $space-4 0;
}

.podcast-episodes {
  display: flex;
  gap: $space-4;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding-bottom: $space-4;

  // Hide scrollbar but keep functionality
  scrollbar-width: thin;
  scrollbar-color: rgba($cream, 0.2) transparent;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba($cream, 0.2);
    border-radius: 3px;
  }
}

.episode-card {
  flex-shrink: 0;
  width: 200px;
  scroll-snap-align: start;
  text-decoration: none;
  color: inherit;
  transition: transform $transition-base;

  &:hover {
    transform: translateY(-4px);

    .episode-card__play {
      opacity: 1;
    }

    .episode-card__title {
      color: $terracotta-400;
    }
  }
}

.episode-card__cover {
  position: relative;
  margin-bottom: $space-3;

  img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border: 2px solid rgba($cream, 0.15); // Hard border, no radius
  }
}

.episode-card__play {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba($warm-black, 0.6);
  opacity: 0;
  transition: opacity $transition-base;

  svg {
    width: 40px;
    height: 40px;
    color: $cream;
  }
}

.episode-card__date {
  display: block;
  font-family: $font-mono;
  font-size: $text-xs;
  color: rgba($cream, 0.85);
  margin-bottom: $space-1;
}

.episode-card__title {
  display: block;
  font-family: $font-serif;
  font-size: $text-base;
  color: $cream;
  line-height: $leading-snug;
  margin-bottom: $space-2;
  transition: color $transition-base;

  // Clamp to 2 lines
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.episode-card__duration {
  font-family: $font-mono;
  font-size: $text-xs;
  color: rgba($cream, 0.75);
}
</style>
