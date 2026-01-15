/**
 * InteractiveMap - Progress tracker overlaid on route map image
 * Shows animated runner progress and hover tooltips for waypoints
 */

const InteractiveMap = (function() {
  'use strict';

  /*
   * ========================================================================
   * HOW TO MANUALLY ADJUST WAYPOINT POSITIONS
   * ========================================================================
   *
   * Each waypoint has x and y coordinates as PERCENTAGES (0-100):
   *   x: 0 = left edge, 100 = right edge
   *   y: 0 = top edge, 100 = bottom edge
   *
   * TO FIND THE RIGHT COORDINATES:
   * 1. Open the page in your browser
   * 2. Right-click on the map image and select "Inspect"
   * 3. In DevTools, hover over the map - you'll see its dimensions
   * 4. Find where the route line passes through for each city
   * 5. Calculate: x = (pixels from left / image width) * 100
   *              y = (pixels from top / image height) * 100
   *
   * QUICK VISUAL METHOD:
   * - If a dot is too far RIGHT, DECREASE the x value
   * - If a dot is too far LEFT, INCREASE the x value
   * - If a dot is too far DOWN, DECREASE the y value
   * - If a dot is too far UP, INCREASE the y value
   *
   * Example: If Beijing dot is floating above the route line,
   *          increase its y value (e.g., from 32 to 38)
   *
   * WAYPOINT PROPERTIES:
   *   id: unique identifier (no spaces, lowercase)
   *   name: display name shown in label/tooltip
   *   km: distance from start (for progress tracking)
   *   x: horizontal position (0=left, 100=right)
   *   y: vertical position (0=top, 100=bottom)
   *   country: shown in tooltip
   *   info: description shown in tooltip
   * ========================================================================
   */
  const waypoints = [
    // START - Vladivostok is on the far right of the map, on the route line
    { id: 'vladivostok', name: 'Vladivostok', km: 0, x: 96, y: 43, country: 'Russia', info: 'Start - Pacific coast of Russia' },

    // CHINA - Route goes down through Beijing, Xi'an, then back up to Urumqi
    { id: 'beijing', name: 'Beijing', km: 1854, x: 86, y: 59, country: 'China', info: 'Through the Great Wall' },
    { id: 'xian', name: "Xi'an", km: 3000, x: 82.5, y: 76, country: 'China', info: 'Ancient Silk Road capital' },
    { id: 'urumqi', name: 'Urumqi', km: 5584, x: 72.5, y: 53, country: 'China', info: 'Gateway to Central Asia' },

    // CENTRAL ASIA - Samarkand is roughly in the middle of the map
    { id: 'samarkand', name: 'Samarkand', km: 8262, x: 52, y: 60, country: 'Uzbekistan', info: 'Heart of the Silk Road' },

    // MIDDLE EAST - Iran, then up to Turkey
    { id: 'iran', name: 'Iran', km: 11500, x: 44, y: 79, country: 'Iran', info: 'Persian highlands crossing' },
    { id: 'istanbul', name: 'Istanbul', km: 13500, x: 28, y: 53, country: 'Turkey', info: 'Where East meets West' },

    // EUROPE - Through Italy, Spain, to Portugal
    { id: 'italy', name: 'Italy', km: 16500, x: 17, y: 36, country: 'Italy', info: 'Through the Alps' },
    { id: 'santiago', name: 'Santiago', km: 19000, x: 4, y: 50, country: 'Spain', info: 'Camino de Santiago' },

    // FINISH - Cabo da Roca is on the far left
    { id: 'lisbon', name: 'Cabo da Roca', km: 20000, x: 4, y: 64, country: 'Portugal', info: 'Finish - Westernmost point of Eurasia' }
  ];

  // Configuration
  let config = {
    container: null,
    dataUrl: '',
    totalKm: 20000,
    imageSrc: 'route-map.png',
    imageWebp: 'route-map.webp',
    animationDuration: 2000
  };

  let currentData = null;
  let animationFrame = null;
  let pinnedTooltip = null; // Track if a waypoint tooltip is pinned open
  let runnerTooltipPinned = false; // Track if runner tooltip is pinned open

  /**
   * Initialize the interactive map
   */
  function init(options) {
    config = { ...config, ...options };

    const container = typeof config.container === 'string'
      ? document.querySelector(config.container)
      : config.container;

    if (!container) {
      console.error('InteractiveMap: container not found');
      return;
    }

    buildHTML(container);
    loadData();
    setupEventListeners();
  }

  /**
   * Build the HTML structure
   */
  function buildHTML(container) {
    container.innerHTML = `
      <div class="interactive-map" role="region" aria-label="Interactive route progress map">
        <!-- Progress stats bar (above map) -->
        <div class="interactive-map__stats">
          <div class="interactive-map__stats-left">
            <span class="interactive-map__direction">← Running West</span>
          </div>
          <div class="interactive-map__stats-right">
            <span class="interactive-map__funded" id="map-funded">0</span>
            <span class="interactive-map__separator">/</span>
            <span class="interactive-map__total">${config.totalKm.toLocaleString()}</span>
            <span class="interactive-map__unit">km funded</span>
          </div>
        </div>

        <div class="interactive-map__image-wrapper">
          <!-- Gray route (base layer - unfunded portion visible) -->
          <picture class="interactive-map__picture interactive-map__picture--gray">
            <source srcset="route-map-gray.webp" type="image/webp">
            <img
              src="route-map-gray.png"
              alt=""
              class="interactive-map__image interactive-map__image--gray"
              loading="lazy"
              aria-hidden="true"
            >
          </picture>

          <!-- Red route (overlay - revealed as runner passes, from right to left) -->
          <picture class="interactive-map__picture interactive-map__picture--red" id="map-red-overlay">
            <source srcset="${config.imageWebp}" type="image/webp">
            <img
              src="${config.imageSrc}"
              alt="Route from Vladivostok to Cabo da Roca"
              class="interactive-map__image interactive-map__image--red"
              loading="lazy"
            >
          </picture>

          <!-- SVG overlay for the route path and runner animation -->
          <svg class="interactive-map__overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
            <!-- Route path traced to follow the terracotta line on route-map.png -->
            <!-- Vladivostok → Beijing → Xi'an → Urumqi → Samarkand → Iran → Istanbul → Italy → Santiago → Cabo da Roca -->
            <path
              id="map-route-path"
              class="interactive-map__route"
              d="M 95 28
                 C 93 32, 91 38, 89 42
                 C 87 52, 86 58, 85 62
                 C 82 58, 78 45, 73 38
                 C 66 35, 58 40, 52 45
                 C 48 48, 45 52, 42 55
                 C 38 50, 33 42, 28 38
                 C 23 34, 20 32, 17 30
                 C 12 32, 9 33, 7 35
                 C 5 40, 4 45, 3 48"
              fill="none"
              stroke="transparent"
              stroke-width="2"
            />
          </svg>

          <!-- Waypoint markers -->
          <div class="interactive-map__waypoints" id="map-waypoints"></div>

          <!-- Runner icon (progress indicator) - flipped horizontally to face west -->
          <!-- Made focusable and interactive for accessibility -->
          <button
            class="interactive-map__runner"
            id="map-runner"
            type="button"
            aria-label="Fundraising progress marker"
            aria-describedby="runner-tooltip"
          >
            <svg viewBox="0 0 100 100" fill="currentColor" style="transform: scaleX(-1);" aria-hidden="true">
              <path d="M73.742,16.819c-2.138,5.297-8.161,7.866-13.472,5.755c-5.298-2.138-7.879-8.161-5.741-13.472c2.124-5.311,8.147-7.892,13.458-5.754C73.285,5.485,75.866,11.509,73.742,16.819z"/>
              <path d="M46.543,61.739l-5.62,8.363l-6.306,3.012c-1.95,0.928-3.415,2.554-4.127,4.584c-0.726,2.018-0.605,4.209,0.322,6.145c0.121,0.256,0.269,0.484,0.404,0.727l-6.319,9.425c-1.25,1.869-3.415,2.877-5.661,2.635c-0.968-0.107-1.896-0.443-2.716-0.981c-2.756-1.868-3.496-5.62-1.64-8.376l22.601-33.693l0.014,0.014l0.04,0.04L46.543,61.739z"/>
              <path d="M34.644,45.727c0.444,2.635-1.331,5.109-3.953,5.553c-0.269,0.04-0.538,0.067-0.807,0.067c-0.027,0-0.054-0.014-0.094-0.014c-0.121,0-0.229-0.014-0.35-0.027c-0.188-0.026-0.363-0.04-0.538-0.08c-0.121-0.027-0.242-0.054-0.363-0.095c-0.161-0.054-0.336-0.107-0.498-0.174c-0.107-0.041-0.215-0.094-0.336-0.162c-0.148-0.067-0.296-0.161-0.444-0.255c-0.094-0.067-0.202-0.134-0.296-0.202c-0.134-0.107-0.269-0.229-0.39-0.35c-0.094-0.081-0.175-0.161-0.255-0.255c-0.121-0.134-0.229-0.282-0.336-0.43c-0.067-0.094-0.134-0.175-0.202-0.282c-0.107-0.175-0.188-0.35-0.269-0.538c-0.041-0.094-0.094-0.175-0.135-0.269c-0.094-0.283-0.188-0.592-0.242-0.901l-2.891-23.3c0-0.041,0-0.067,0-0.094c-0.027-0.175-0.027-0.35-0.04-0.524c0-0.161-0.014-0.309-0.014-0.47c0.014-0.027,0-0.067,0-0.094c0.014-0.121,0.054-0.242,0.067-0.363c0.027-0.161,0.054-0.322,0.094-0.484c0.04-0.161,0.107-0.309,0.161-0.457s0.094-0.282,0.162-0.403c0.067-0.162,0.161-0.31,0.255-0.457c0.081-0.108,0.148-0.229,0.229-0.336c0.094-0.134,0.215-0.255,0.336-0.39c0.094-0.094,0.188-0.202,0.282-0.296c0.135-0.107,0.269-0.215,0.404-0.309c0.107-0.081,0.215-0.162,0.349-0.242c0.148-0.094,0.31-0.161,0.471-0.242c0.121-0.054,0.242-0.107,0.363-0.148c0.188-0.081,0.376-0.121,0.564-0.161c0.094-0.027,0.175-0.054,0.282-0.081c0.027,0,0.054,0,0.081,0c0.175-0.027,0.363-0.027,0.538-0.041c0.121,0,0.242-0.013,0.363-0.013c0.027,0,0.054,0.013,0.094,0.013c0.014,0,0.041,0,0.054,0c0.014,0,0.014,0,0.027,0c0.014,0,0.014,0,0.027,0c0,0,20.894,1.17,22.44,1.654c0.995,0.309,17.089,8.067,17.681,11.832l4.611,12.154L84.565,34.5c0.256-0.175,0.511-0.323,0.78-0.444c0.08-0.041,0.161-0.067,0.241-0.094c0.188-0.081,0.391-0.148,0.578-0.202c0.095-0.027,0.188-0.041,0.282-0.067c0.202-0.04,0.417-0.067,0.619-0.081c0.08,0,0.161-0.013,0.229-0.013c0.04,0,0.054,0,0.094,0c0.081,0,0.148,0.013,0.229,0.027c0.242,0,0.484,0.027,0.727,0.081c0.121,0.027,0.242,0.054,0.362,0.094c0.216,0.054,0.431,0.134,0.646,0.229c0.107,0.054,0.229,0.107,0.336,0.161c0.216,0.121,0.404,0.255,0.605,0.403c0.081,0.067,0.175,0.121,0.269,0.202c0.27,0.229,0.512,0.498,0.74,0.793c1.546,2.165,1.062,5.176-1.103,6.736l-17.546,12.92c-0.027,0.027-0.054,0.027-0.081,0.054c-0.134,0.095-0.296,0.175-0.443,0.256c-0.148,0.081-0.282,0.161-0.417,0.215c-0.04,0.014-0.067,0.041-0.094,0.054c-0.121,0.041-0.229,0.054-0.35,0.095c-0.148,0.054-0.31,0.107-0.471,0.134c-0.161,0.041-0.323,0.041-0.484,0.067c-0.147,0.014-0.296,0.027-0.43,0.027c-0.175,0-0.35-0.014-0.524-0.027c-0.135-0.014-0.27-0.026-0.403-0.054c-0.175-0.026-0.337-0.08-0.498-0.135c-0.134-0.04-0.269-0.066-0.39-0.12c-0.161-0.067-0.31-0.148-0.457-0.216c-0.121-0.067-0.256-0.134-0.377-0.215c-0.147-0.094-0.282-0.202-0.416-0.31c-0.108-0.08-0.216-0.161-0.31-0.255c-0.135-0.135-0.269-0.296-0.39-0.444c-0.054-0.066-0.135-0.134-0.188-0.215c-0.014-0.026-0.027-0.054-0.04-0.08c-0.107-0.135-0.188-0.296-0.27-0.458c-0.08-0.134-0.147-0.269-0.215-0.403c-0.014-0.04-0.027-0.066-0.04-0.094l-4.007-9.062c0,0-3.469,6.279-4.49,8.041l11.898,10.729c1.196,1.076,1.909,2.568,1.99,4.168c0.04,0.888-0.121,1.762-0.444,2.555c-0.026,0.081-0.026,0.148-0.054,0.215c-0.538,1.52-1.641,2.743-3.092,3.429l-26.5,12.639c-0.82,0.39-1.694,0.578-2.595,0.578c-2.313,0-4.451-1.345-5.445-3.429c-0.054-0.107-0.067-0.229-0.121-0.336c-0.551-1.371-0.619-2.877-0.121-4.275c0.538-1.52,1.64-2.743,3.092-3.429l3.24-1.546l15.543-7.408l-6.588-5.93l-8.78-7.919c-0.094-0.094-0.161-0.188-0.242-0.282c-3.644-4.061-0.955-10.837-0.242-12.598l3.993-9.949l-9.896-0.807L34.644,45.727z"/>
            </svg>
            <!-- Tooltip for runner -->
            <span class="interactive-map__runner-tooltip" id="runner-tooltip" role="tooltip">
              <span class="interactive-map__runner-tooltip-km" id="runner-tooltip-km">0 km</span>
              <span class="interactive-map__runner-tooltip-note">funded so far</span>
              <span class="interactive-map__runner-tooltip-disclaimer">This shows fundraising progress, not real-time location</span>
            </span>
          </button>

          <!-- Tooltip -->
          <div class="interactive-map__tooltip" id="map-tooltip" role="tooltip" aria-hidden="true">
            <div class="interactive-map__tooltip-name"></div>
            <div class="interactive-map__tooltip-country"></div>
            <div class="interactive-map__tooltip-km"></div>
            <div class="interactive-map__tooltip-info"></div>
          </div>
        </div>

        <!-- Accessible live region -->
        <div id="map-live-region" class="visually-hidden" role="status" aria-live="polite"></div>
      </div>
    `;

    // Generate waypoint markers
    generateWaypoints();
  }

  /**
   * Generate waypoint markers on the map
   */
  function generateWaypoints() {
    const container = document.getElementById('map-waypoints');
    if (!container) return;

    container.innerHTML = waypoints.map(wp => `
      <button
        class="interactive-map__waypoint"
        data-waypoint="${wp.id}"
        data-km="${wp.km}"
        style="left: ${wp.x}%; top: ${wp.y}%;"
        aria-label="${wp.name}, ${wp.country} - ${wp.km.toLocaleString()} km"
        tabindex="0"
      >
        <span class="interactive-map__waypoint-dot"></span>
        <span class="interactive-map__waypoint-label">${wp.name}</span>
      </button>
    `).join('');
  }

  /**
   * Set up event listeners for interactivity
   */
  function setupEventListeners() {
    const waypointsContainer = document.getElementById('map-waypoints');
    const tooltip = document.getElementById('map-tooltip');
    const runner = document.getElementById('map-runner');

    if (!waypointsContainer || !tooltip) return;

    // Hover events for waypoints
    waypointsContainer.addEventListener('mouseenter', handleWaypointHover, true);
    waypointsContainer.addEventListener('mouseleave', handleWaypointLeave, true);
    waypointsContainer.addEventListener('focus', handleWaypointHover, true);
    waypointsContainer.addEventListener('blur', handleWaypointLeave, true);

    // Click events for waypoints (to pin tooltip open)
    waypointsContainer.addEventListener('click', handleWaypointClick, true);

    // Touch events for mobile
    waypointsContainer.addEventListener('touchstart', handleWaypointTouch, { passive: true });

    // Runner click event (to pin runner tooltip open)
    if (runner) {
      runner.addEventListener('click', handleRunnerClick);
    }

    // Close pinned tooltips when clicking elsewhere
    document.addEventListener('click', handleDocumentClick);
  }

  /**
   * Handle waypoint hover
   */
  function handleWaypointHover(e) {
    // Don't show hover tooltip if any tooltip is pinned
    if (pinnedTooltip || runnerTooltipPinned) return;

    const waypoint = e.target.closest('.interactive-map__waypoint');
    if (!waypoint) return;

    const id = waypoint.dataset.waypoint;
    const wp = waypoints.find(w => w.id === id);
    if (!wp) return;

    showTooltip(wp, waypoint);
  }

  /**
   * Handle waypoint leave
   */
  function handleWaypointLeave(e) {
    // Don't hide if any tooltip is pinned
    if (pinnedTooltip || runnerTooltipPinned) return;

    const waypoint = e.target.closest('.interactive-map__waypoint');
    if (!waypoint) return;

    hideTooltip();
  }

  /**
   * Handle waypoint click (pin tooltip open)
   */
  function handleWaypointClick(e) {
    const waypoint = e.target.closest('.interactive-map__waypoint');
    if (!waypoint) return;

    e.stopPropagation();

    const id = waypoint.dataset.waypoint;
    const wp = waypoints.find(w => w.id === id);
    if (!wp) return;

    const runner = document.getElementById('map-runner');
    const mapContainer = document.querySelector('.interactive-map');

    // If clicking the same waypoint, unpin it
    if (pinnedTooltip === id) {
      pinnedTooltip = null;
      hideTooltip();
      if (mapContainer) mapContainer.classList.remove('interactive-map--tooltip-pinned');
    } else {
      // Pin this tooltip open
      pinnedTooltip = id;
      showTooltip(wp, waypoint);
      if (mapContainer) mapContainer.classList.add('interactive-map--tooltip-pinned');
    }

    // Close runner tooltip if open
    runnerTooltipPinned = false;
    if (runner) runner.classList.remove('interactive-map__runner--tooltip-pinned');
  }

  /**
   * Handle runner click (pin runner tooltip open)
   */
  function handleRunnerClick(e) {
    e.stopPropagation();

    const runner = document.getElementById('map-runner');
    const mapContainer = document.querySelector('.interactive-map');
    if (!runner) return;

    // Toggle pinned state
    runnerTooltipPinned = !runnerTooltipPinned;
    runner.classList.toggle('interactive-map__runner--tooltip-pinned', runnerTooltipPinned);

    // Update container class and close waypoint tooltip if opening runner
    if (runnerTooltipPinned) {
      pinnedTooltip = null;
      hideTooltip();
      if (mapContainer) mapContainer.classList.add('interactive-map--tooltip-pinned');
    } else {
      if (mapContainer) mapContainer.classList.remove('interactive-map--tooltip-pinned');
    }
  }

  /**
   * Handle document click (close pinned tooltips)
   */
  function handleDocumentClick(e) {
    const runner = document.getElementById('map-runner');
    const mapContainer = document.querySelector('.interactive-map');

    // Close pinned waypoint tooltip
    if (pinnedTooltip) {
      pinnedTooltip = null;
      hideTooltip();
    }

    // Close pinned runner tooltip
    if (runnerTooltipPinned) {
      runnerTooltipPinned = false;
      if (runner) runner.classList.remove('interactive-map__runner--tooltip-pinned');
    }

    // Remove pinned state from container
    if (mapContainer) mapContainer.classList.remove('interactive-map--tooltip-pinned');
  }

  /**
   * Handle touch on mobile
   */
  function handleWaypointTouch(e) {
    const waypoint = e.target.closest('.interactive-map__waypoint');
    if (!waypoint) return;

    e.stopPropagation();

    const id = waypoint.dataset.waypoint;
    const wp = waypoints.find(w => w.id === id);
    if (!wp) return;

    const mapContainer = document.querySelector('.interactive-map');

    // Pin the tooltip on touch
    pinnedTooltip = id;
    showTooltip(wp, waypoint);
    if (mapContainer) mapContainer.classList.add('interactive-map--tooltip-pinned');
  }

  /**
   * Show tooltip for a waypoint
   */
  function showTooltip(wp, element) {
    const tooltip = document.getElementById('map-tooltip');
    if (!tooltip) return;

    // Update tooltip content
    tooltip.querySelector('.interactive-map__tooltip-name').textContent = wp.name;
    tooltip.querySelector('.interactive-map__tooltip-country').textContent = wp.country;
    tooltip.querySelector('.interactive-map__tooltip-km').textContent = `${wp.km.toLocaleString()} km from start`;
    tooltip.querySelector('.interactive-map__tooltip-info').textContent = wp.info;

    // Position tooltip using percentage values (same as waypoint positioning)
    // This keeps tooltip responsive and aligned with its waypoint
    tooltip.style.left = `${wp.x}%`;
    tooltip.style.top = `${wp.y}%`;

    // Show tooltip
    tooltip.classList.add('interactive-map__tooltip--visible');
    tooltip.setAttribute('aria-hidden', 'false');
  }

  /**
   * Hide tooltip
   */
  function hideTooltip() {
    const tooltip = document.getElementById('map-tooltip');
    if (!tooltip) return;

    tooltip.classList.remove('interactive-map__tooltip--visible');
    tooltip.setAttribute('aria-hidden', 'true');
  }

  /**
   * Load fundraising data
   */
  async function loadData() {
    try {
      const response = await fetch(config.dataUrl);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      currentData = data;
      updateProgress(data);
    } catch (error) {
      console.error('InteractiveMap: Failed to load data', error);
      // Try localStorage fallback
      const cached = localStorage.getItem('interactiveMap_data');
      if (cached) {
        const data = JSON.parse(cached);
        updateProgress(data);
      }
    }
  }

  /**
   * Update progress display and animate runner
   */
  function updateProgress(data) {
    const fundedKm = data.fundedKm || 0;
    const totalKm = data.totalKm || config.totalKm;
    const progress = Math.min((fundedKm / totalKm) * 100, 100);

    // Update funded display
    const fundedEl = document.getElementById('map-funded');
    if (fundedEl) {
      animateNumber(fundedEl, 0, fundedKm, config.animationDuration);
    }

    // Update runner tooltip km value
    const runnerTooltipKm = document.getElementById('runner-tooltip-km');
    if (runnerTooltipKm) {
      runnerTooltipKm.textContent = `${fundedKm.toLocaleString()} km`;
    }

    // Update waypoint states
    updateWaypointStates(fundedKm);

    // Animate runner along the path
    animateRunner(progress);

    // Update live region for accessibility
    const liveRegion = document.getElementById('map-live-region');
    if (liveRegion) {
      liveRegion.textContent = `${fundedKm.toLocaleString()} of ${totalKm.toLocaleString()} kilometers funded, ${progress.toFixed(1)} percent complete`;
    }

    // Save to localStorage
    try {
      localStorage.setItem('interactiveMap_data', JSON.stringify(data));
    } catch (e) {}
  }

  /**
   * Update waypoint visual states based on progress
   */
  function updateWaypointStates(fundedKm) {
    const waypointEls = document.querySelectorAll('.interactive-map__waypoint');
    waypointEls.forEach(el => {
      const km = parseInt(el.dataset.km, 10);
      if (fundedKm >= km) {
        el.classList.add('interactive-map__waypoint--reached');
      } else {
        el.classList.remove('interactive-map__waypoint--reached');
      }
    });
  }

  /**
   * Animate the runner icon along the route path
   */
  function animateRunner(progress) {
    const runner = document.getElementById('map-runner');
    const path = document.getElementById('map-route-path');

    if (!runner || !path) return;

    // Get the position along the path
    const pathLength = path.getTotalLength();
    const targetLength = pathLength * (progress / 100);

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Jump directly to position
      setRunnerPosition(path, targetLength);
    } else {
      // Animate to position
      let currentLength = 0;
      const startTime = performance.now();
      const duration = config.animationDuration;

      function animate(now) {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / duration, 1);

        // Easing function (ease-out)
        const eased = 1 - Math.pow(1 - t, 3);
        currentLength = targetLength * eased;

        setRunnerPosition(path, currentLength);

        if (t < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      }

      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      animationFrame = requestAnimationFrame(animate);
    }
  }

  /**
   * Set runner position based on path length
   */
  function setRunnerPosition(path, length) {
    const runner = document.getElementById('map-runner');
    const redOverlay = document.getElementById('map-red-overlay');
    if (!runner) return;

    const point = path.getPointAtLength(length);
    const svg = path.closest('svg');
    const wrapper = svg.closest('.interactive-map__image-wrapper');

    if (!svg || !wrapper) return;

    // Convert SVG coordinates to percentage of wrapper
    const svgRect = svg.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();

    // The SVG viewBox is 0 0 100 100, so point.x and point.y are already percentages
    runner.style.left = `${point.x}%`;
    runner.style.top = `${point.y}%`;
    runner.classList.add('interactive-map__runner--visible');

    // Update clip-path on red overlay to reveal from right edge to runner position
    // inset(top right bottom left) - we clip from left side up to runner position
    if (redOverlay) {
      redOverlay.style.clipPath = `inset(0 0 0 ${point.x}%)`;
    }
  }

  /**
   * Animate a number counting up
   */
  function animateNumber(element, from, to, duration) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      element.textContent = to.toLocaleString();
      return;
    }

    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.round(from + (to - from) * eased);

      element.textContent = current.toLocaleString();

      if (t < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  /**
   * Refresh data
   */
  function refresh() {
    loadData();
  }

  /**
   * Get current data
   */
  function getData() {
    return currentData;
  }

  return {
    init,
    refresh,
    getData
  };
})();

// Export for ES modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = InteractiveMap;
}
