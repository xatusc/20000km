/**
 * RouteTracker - Modular donation progress tracker
 * Displays funding progress along a route SVG
 * WCAG AAA compliant with localStorage fallback
 */

const RouteTracker = (function() {
  'use strict';

  // Default configuration
  const defaults = {
    dataUrl: '',
    costPerKm: 5,
    totalKm: 20000,
    direction: 'rtl',
    subtitle: '',
    container: null,
    svgDesktop: null,
    svgMobile: null,
    mobileBreakpoint: 768,
    animationDuration: 1500,
    localStorageKey: 'routeTracker_lastData'
  };

  let config = {};
  let currentData = null;

  /**
   * Initialize the tracker
   * @param {Object} options - Configuration options
   */
  function init(options) {
    config = { ...defaults, ...options };

    if (!config.container) {
      console.error('RouteTracker: container is required');
      return;
    }

    const container = typeof config.container === 'string'
      ? document.querySelector(config.container)
      : config.container;

    if (!container) {
      console.error('RouteTracker: container not found');
      return;
    }

    // Build the tracker HTML structure
    buildTrackerHTML(container);

    // Load and display data
    loadData();

    // Handle resize for responsive SVG switching
    handleResize();
    window.addEventListener('resize', debounce(handleResize, 250));
  }

  /**
   * Build the tracker HTML structure
   */
  function buildTrackerHTML(container) {
    container.innerHTML = `
      <div class="route-tracker" role="region" aria-label="Fundraising progress tracker">
        <!-- Header with subtitle and stats -->
        <div class="route-tracker__header">
          <span class="route-tracker__subtitle" aria-hidden="true">${config.subtitle}</span>
          <span class="route-tracker__stats">
            <span class="route-tracker__funded" id="tracker-funded">0</span>
            <span class="route-tracker__separator">/</span>
            <span class="route-tracker__total">${config.totalKm.toLocaleString()}</span>
            <span class="route-tracker__unit">km funded</span>
          </span>
        </div>

        <!-- Accessible live region for screen readers -->
        <div
          id="tracker-live-region"
          class="visually-hidden"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        ></div>

        <!-- Progress bar (semantic) -->
        <div
          id="tracker-progressbar"
          role="progressbar"
          aria-valuenow="0"
          aria-valuemin="0"
          aria-valuemax="${config.totalKm}"
          aria-label="Kilometers funded"
          tabindex="0"
        >
          <!-- SVG container -->
          <div class="route-tracker__svg-container">
            <div class="route-tracker__svg route-tracker__svg--desktop" id="tracker-svg-desktop"></div>
            <div class="route-tracker__svg route-tracker__svg--mobile" id="tracker-svg-mobile"></div>

            <!-- Loading skeleton -->
            <div class="route-tracker__skeleton" id="tracker-skeleton">
              <div class="route-tracker__skeleton-bar"></div>
            </div>
          </div>
        </div>

        <!-- Endpoint labels -->
        <div class="route-tracker__endpoints route-tracker__endpoints--desktop">
          <span class="route-tracker__endpoint route-tracker__endpoint--end">Cabo da Roca</span>
          <span class="route-tracker__endpoint route-tracker__endpoint--start">Vladivostok</span>
        </div>

        <!-- Mobile waypoint labels -->
        <div class="route-tracker__waypoints route-tracker__waypoints--mobile" id="tracker-waypoints">
          <!-- Generated dynamically -->
        </div>

        <!-- Overfunding message -->
        <div class="route-tracker__overfund" id="tracker-overfund" hidden>
          <span class="route-tracker__overfund-text"></span>
        </div>

        <!-- Data unavailable message -->
        <div class="route-tracker__error" id="tracker-error" hidden>
          <span class="route-tracker__error-text">Data temporarily unavailable</span>
        </div>
      </div>
    `;

    // Load SVGs
    loadSVGs();

    // Generate mobile waypoint labels
    generateMobileWaypoints();
  }

  /**
   * Load SVG files into containers
   */
  async function loadSVGs() {
    const desktopContainer = document.getElementById('tracker-svg-desktop');
    const mobileContainer = document.getElementById('tracker-svg-mobile');

    if (config.svgDesktop && desktopContainer) {
      try {
        const response = await fetch(config.svgDesktop);
        const svgText = await response.text();
        desktopContainer.innerHTML = svgText;
      } catch (e) {
        console.error('RouteTracker: Failed to load desktop SVG', e);
      }
    }

    if (config.svgMobile && mobileContainer) {
      try {
        const response = await fetch(config.svgMobile);
        const svgText = await response.text();
        mobileContainer.innerHTML = svgText;
      } catch (e) {
        console.error('RouteTracker: Failed to load mobile SVG', e);
      }
    }
  }

  /**
   * Generate mobile waypoint labels
   */
  function generateMobileWaypoints() {
    const waypoints = [
      { name: 'Vladivostok', km: 0, position: 0 },
      { name: 'Beijing', km: 1854, position: 9.27 },
      { name: 'Urumqi', km: 5584, position: 27.92 },
      { name: 'Samarkand', km: 8262, position: 41.31 },
      { name: 'Istanbul', km: 13244, position: 66.22 },
      { name: 'Italy', km: 16387, position: 81.94 },
      { name: 'Santiago', km: 17167, position: 85.84 },
      { name: 'Cabo da Roca', km: 20000, position: 100 }
    ];

    const container = document.getElementById('tracker-waypoints');
    if (!container) return;

    container.innerHTML = waypoints.map(wp => `
      <div class="route-tracker__waypoint" style="--position: ${wp.position}%" data-km="${wp.km}">
        <span class="route-tracker__waypoint-name">${wp.name}</span>
      </div>
    `).join('');
  }

  /**
   * Load fundraising data from source
   */
  async function loadData() {
    showSkeleton(true);

    try {
      const response = await fetch(config.dataUrl);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      currentData = data;

      // Save to localStorage for fallback
      saveToLocalStorage(data);

      // Update display
      updateDisplay(data);
      showSkeleton(false);

    } catch (error) {
      console.error('RouteTracker: Failed to fetch data', error);

      // Try localStorage fallback
      const cachedData = getFromLocalStorage();

      if (cachedData) {
        currentData = cachedData;
        updateDisplay(cachedData, true);
        showSkeleton(false);
      } else {
        showError(true);
        showSkeleton(false);
      }
    }
  }

  /**
   * Update the display with data
   * @param {Object} data - Fundraising data
   * @param {boolean} isCached - Whether data is from cache
   */
  function updateDisplay(data, isCached = false) {
    const fundedKm = data.fundedKm || 0;
    const totalKm = data.totalKm || config.totalKm;

    // Calculate progress percentage (cap visual at 100%)
    const rawProgress = (fundedKm / totalKm) * 100;
    const visualProgress = Math.min(rawProgress, 100);

    // Update text displays
    const fundedEl = document.getElementById('tracker-funded');
    if (fundedEl) {
      fundedEl.textContent = fundedKm.toLocaleString();
    }

    // Update ARIA
    const progressbar = document.getElementById('tracker-progressbar');
    if (progressbar) {
      progressbar.setAttribute('aria-valuenow', fundedKm);
    }

    // Update live region for screen readers
    const liveRegion = document.getElementById('tracker-live-region');
    if (liveRegion) {
      const cachedNote = isCached ? ', showing cached data' : '';
      liveRegion.textContent = `${fundedKm.toLocaleString()} of ${totalKm.toLocaleString()} kilometers funded, ${visualProgress.toFixed(1)} percent complete, running westward from Vladivostok to Cabo da Roca${cachedNote}`;
    }

    // Handle overfunding
    if (rawProgress > 100) {
      const bonusKm = fundedKm - totalKm;
      showOverfund(bonusKm);
    }

    // Animate SVG progress
    animateProgress(visualProgress);

    // Update mobile waypoint states
    updateMobileWaypoints(fundedKm);
  }

  /**
   * Animate SVG path progress
   * @param {number} percentage - Progress percentage (0-100)
   */
  function animateProgress(percentage) {
    // For RTL: progress starts from 100% (right) and decreases
    // stroke-dashoffset: 0 = fully visible, pathLength = fully hidden
    const progressPaths = document.querySelectorAll('.route-unlocked');
    const indicators = document.querySelectorAll('.progress-indicator');

    progressPaths.forEach(path => {
      const pathLength = path.getTotalLength();

      // Set up dash array
      path.style.strokeDasharray = pathLength;

      // Calculate offset for RTL (progress from right to left)
      // At 0%, offset = 0 (nothing shown from right)
      // At 100%, offset = pathLength (full path shown)
      const offset = pathLength * (1 - percentage / 100);

      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        path.style.strokeDashoffset = offset;
      } else {
        path.style.transition = `stroke-dashoffset ${config.animationDuration}ms ease-out`;
        // Trigger reflow
        path.getBoundingClientRect();
        path.style.strokeDashoffset = offset;
      }
    });

    // Move progress indicator along path
    indicators.forEach(indicator => {
      const path = indicator.closest('svg')?.querySelector('.route-unlocked');
      if (!path) return;

      const pathLength = path.getTotalLength();
      // For RTL, position is measured from the start (right side)
      const position = pathLength * (percentage / 100);
      const point = path.getPointAtLength(position);

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        indicator.setAttribute('cx', point.x);
        indicator.setAttribute('cy', point.y);
      } else {
        indicator.style.transition = `cx ${config.animationDuration}ms ease-out, cy ${config.animationDuration}ms ease-out`;
        indicator.setAttribute('cx', point.x);
        indicator.setAttribute('cy', point.y);
      }
    });
  }

  /**
   * Update mobile waypoint visual states
   */
  function updateMobileWaypoints(fundedKm) {
    const waypoints = document.querySelectorAll('.route-tracker__waypoint');
    waypoints.forEach(wp => {
      const km = parseInt(wp.dataset.km, 10);
      if (fundedKm >= km) {
        wp.classList.add('route-tracker__waypoint--reached');
      } else {
        wp.classList.remove('route-tracker__waypoint--reached');
      }
    });
  }

  /**
   * Show/hide loading skeleton
   */
  function showSkeleton(show) {
    const skeleton = document.getElementById('tracker-skeleton');
    if (skeleton) {
      skeleton.hidden = !show;
    }
  }

  /**
   * Show/hide error state
   */
  function showError(show) {
    const error = document.getElementById('tracker-error');
    if (error) {
      error.hidden = !show;
    }
  }

  /**
   * Show overfunding message
   */
  function showOverfund(bonusKm) {
    const overfund = document.getElementById('tracker-overfund');
    if (overfund) {
      overfund.hidden = false;
      const text = overfund.querySelector('.route-tracker__overfund-text');
      if (text) {
        text.textContent = `+${bonusKm.toLocaleString()} bonus km funded beyond the goal!`;
      }
    }
  }

  /**
   * Handle responsive breakpoint changes
   */
  function handleResize() {
    const isMobile = window.innerWidth < config.mobileBreakpoint;
    const desktopSvg = document.querySelector('.route-tracker__svg--desktop');
    const mobileSvg = document.querySelector('.route-tracker__svg--mobile');
    const desktopEndpoints = document.querySelector('.route-tracker__endpoints--desktop');
    const mobileWaypoints = document.querySelector('.route-tracker__waypoints--mobile');

    if (desktopSvg) desktopSvg.hidden = isMobile;
    if (mobileSvg) mobileSvg.hidden = !isMobile;
    if (desktopEndpoints) desktopEndpoints.hidden = isMobile;
    if (mobileWaypoints) mobileWaypoints.hidden = !isMobile;
  }

  /**
   * Save data to localStorage
   */
  function saveToLocalStorage(data) {
    try {
      localStorage.setItem(config.localStorageKey, JSON.stringify({
        ...data,
        cachedAt: new Date().toISOString()
      }));
    } catch (e) {
      console.warn('RouteTracker: Failed to save to localStorage', e);
    }
  }

  /**
   * Get data from localStorage
   */
  function getFromLocalStorage() {
    try {
      const cached = localStorage.getItem(config.localStorageKey);
      return cached ? JSON.parse(cached) : null;
    } catch (e) {
      console.warn('RouteTracker: Failed to read from localStorage', e);
      return null;
    }
  }

  /**
   * Debounce utility
   */
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Get current data (for external access)
   */
  function getData() {
    return currentData;
  }

  /**
   * Manually refresh data
   */
  function refresh() {
    loadData();
  }

  // Public API
  return {
    init,
    getData,
    refresh
  };
})();

// Export for ES modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = RouteTracker;
}
