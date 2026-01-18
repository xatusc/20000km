# 🖼️ Image Optimization Guide

## How to Use NuxtImg Component

Your project has `@nuxt/image` configured! Here's how to use it:

### ❌ **OLD WAY** (Don't do this):
```vue
<img src="/images/photo.jpg" alt="Description">
```

### ✅ **NEW WAY** (Do this instead):
```vue
<NuxtImg src="/images/photo.jpg" alt="Description" />
```

## Benefits of NuxtImg

1. **Automatic optimization** - Compresses images without quality loss
2. **Responsive sizes** - Creates multiple sizes for different screen widths
3. **Modern formats** - Converts to WebP and AVIF automatically
4. **Lazy loading** - Built-in lazy loading (no need for loading="lazy")
5. **Retina support** - Serves 2x images for high-DPI screens

## Examples

### Basic Image
```vue
<NuxtImg src="/Ria_run_2.webp" alt="Ria running" />
```

### Image with Specific Size
```vue
<NuxtImg
  src="/Ria_vertical.webp"
  alt="Ria portrait"
  width="600"
  height="800"
/>
```

### Background Image (use NuxtPicture for art direction)
```vue
<NuxtPicture
  src="/route-map.webp"
  alt="Route map"
  :img-attrs="{ class: 'w-full h-auto' }"
/>
```

## Images to Update

Found these components using `<img>` tags:
- [ ] `components/PodcastSection.vue` - 2 instances
- [ ] `pages/journey.vue` - 1 instance

## Learn More
- [Nuxt Image Docs](https://image.nuxt.com/)
