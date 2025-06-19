<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Photo {
  src: string
  alt: string
}

interface Service {
  name: string
  description: string
  photos: Photo[]
}

const selectedService = ref<string | null>(null)
const fullScreenPhoto = ref<string | null>(null)
const services = ref([
  { name: 'Portraits' },
  { name: 'Events' },
  { name: 'Farms' }
])

const serviceData = ref<Record<string, Service>>({
  Portraits: {
    name: 'Portraits',
    description: "Every person has a unique story written in their expressions, their posture, their quiet moments of reflection. I specialize in creating intimate portrait sessions that reveal the authentic you - whether it's the gentle strength in a mother's eyes, the quiet confidence of a graduate, or the weathered hands that tell a lifetime of stories. My approach is relaxed and personal, allowing your true character to shine through in timeless portraits you'll treasure forever.",
    photos: [
      { src: '/photos/portraits/portrait1.jpg', alt: 'Portrait sample 1' },
      { src: '/photos/portraits/portrait2.jpg', alt: 'Portrait sample 2' },
      { src: '/photos/portraits/portrait3.jpg', alt: 'Portrait sample 3' }
    ]
  },
  Events: {
    name: 'Events',
    description: "Life's most precious celebrations deserve to be captured with the care they inspire. From intimate wedding ceremonies where two hearts become one, to local festivals, parties, and creative events, I document the laughter, tears, and spontaneous moments that make your gathering unforgettable. My gentle, unobtrusive approach ensures that while I'm preserving your memories, you're free to be fully present in the joy of the moment.",
    photos: [
      { src: '/photos/events/event1.jpg', alt: 'Event sample 1' },
      { src: '/photos/events/event2.jpg', alt: 'Event sample 2' },
      { src: '/photos/events/event3.jpg', alt: 'Event sample 3' }
    ]
  },
  Farms: {
    name: 'Farms',
    description: "There's something special about capturing the heart of homestead life. From the morning light filtering through the barn as families tend to their beloved animals, to the satisfaction of harvest from lovingly tended gardens. I love documenting the intimate moments of small family farms - where livestock aren't just farm animals but cherished members of the homestead, and where traditional skills and sustainable living create a rich tapestry of modern homesteading life.",
    photos: [
      { src: '/photos/farms/farm1.jpg', alt: 'Farm sample 1' },
      { src: '/photos/farms/farm2.jpg', alt: 'Farm sample 2' },
      { src: '/photos/farms/farm3.jpg', alt: 'Farm sample 3' }
    ]
  }
})

const portfolioPhotos = ref<Photo[]>([
  { src: '/photos/portfolio/portfolio1.jpg', alt: 'Portfolio 1' },
  { src: '/photos/portfolio/portfolio2.jpg', alt: 'Portfolio 2' },
  { src: '/photos/portfolio/portfolio3.jpg', alt: 'Portfolio 3' },
  { src: '/photos/portfolio/portfolio4.jpg', alt: 'Portfolio 4' },
  { src: '/photos/portfolio/portfolio5.jpg', alt: 'Portfolio 5' },
  { src: '/photos/portfolio/portfolio6.jpg', alt: 'Portfolio 6' },
  { src: '/photos/portfolio/portfolio7.jpg', alt: 'Portfolio 7' }
])

const selectService = (serviceName: string) => {
  selectedService.value = serviceName
}

const getSelectedServiceData = (): Service => {
  return serviceData.value[selectedService.value!] || serviceData.value.Portraits
}

const openFullScreen = (photoSrc: string) => {
  fullScreenPhoto.value = photoSrc
}

const closeFullScreen = () => {
  fullScreenPhoto.value = null
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && fullScreenPhoto.value) {
    closeFullScreen()
  }
}

onMounted(() => {
  // Auto-select first service on load
  selectedService.value = 'Portraits'
  
  // Add escape key listener
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  // Clean up event listener on unmount
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="home">
    <!-- Header Section -->
    <header class="header">
      <div class="header-content">
        <h1 class="brand-name">avidya photo</h1>
        <p class="tagline">capture the moments that live forever</p>
      </div>
      <router-link to="/book" class="header-book-btn">
        Book Today!
      </router-link>
    </header>

    <!-- Header Image Section -->
    <section class="header-image-section">
      <div class="header-image-container">
        <img src="/photos/misc/header.jpg" alt="Avidya Photo Header" />
      </div>
    </section>

    <!-- Service Selection Menu -->
    <section class="services-section">
      <div class="services-container">
        <div
          v-for="service in services"
          :key="service.name"
          class="service-card"
          :class="{ active: selectedService === service.name }"
          @click="selectService(service.name)"
        >
          <h3>{{ service.name }}</h3>
        </div>
      </div>
    </section>

    <!-- Dynamic Content Section -->
    <section class="dynamic-content" v-if="selectedService">
      <div class="content-container">
        <!-- Top Photo (farm1) -->
        <div class="top-photo">
          <div class="photo-item">
            <img 
              :src="getSelectedServiceData().photos[0].src" 
              :alt="getSelectedServiceData().photos[0].alt" 
              @click="openFullScreen(getSelectedServiceData().photos[0].src)"
              class="clickable-photo"
            />
          </div>
        </div>
        
        <!-- Content Text -->
        <div class="content-text">
          <h2>{{ getSelectedServiceData().name }}</h2>
          <p>{{ getSelectedServiceData().description }}</p>
        </div>
        
        <!-- Bottom Photos (farm2 & farm3) -->
        <div class="bottom-photos">
          <div
            v-for="(photo, index) in getSelectedServiceData().photos.slice(1)"
            :key="index"
            class="photo-item"
          >
            <img 
              :src="photo.src" 
              :alt="photo.alt" 
              @click="openFullScreen(photo.src)"
              class="clickable-photo"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Main Portfolio Section -->
    <section class="portfolio-section">
      <h2 class="portfolio-title">Portfolio</h2>
      <div class="portfolio-grid">
        <div
          v-for="(photo, index) in portfolioPhotos"
          :key="index"
          class="portfolio-item"
        >
          <img 
            :src="photo.src" 
            :alt="photo.alt" 
            @click="openFullScreen(photo.src)"
            class="clickable-photo"
          />
        </div>
      </div>
    </section>

    <!-- Full Screen Photo Overlay -->
    <div 
      v-if="fullScreenPhoto" 
      class="fullscreen-overlay"
      @click="closeFullScreen"
    >
      <div class="fullscreen-container">
        <img 
          :src="fullScreenPhoto" 
          alt="Full screen photo" 
          class="fullscreen-photo"
          @click="closeFullScreen"
        />
        <button 
          class="close-button" 
          @click="closeFullScreen"
          aria-label="Close full screen"
        >
          ×
        </button>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Inter:wght@300;400;500;600&display=swap');

.home {
  min-height: 100vh;
  background-color: #fafafa;
  color: #333;
  font-family: 'Inter', sans-serif;
}

/* Header Section */
.header {
  position: sticky;
  top: 0;
  text-align: center;
  padding: 10px 20px 10px;
  background: linear-gradient(180deg, #fafafa 0%, rgba(250, 250, 250, 0.95) 100%);
  backdrop-filter: blur(15px);
  z-index: 100;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.06),
    0 4px 16px rgba(0, 0, 0, 0.04),
    0 2px 8px rgba(0, 0, 0, 0.03),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  border-radius: 0 0 16px 16px;
  border-bottom: 1px solid rgba(199, 178, 153, 0.15);
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.header-content {
  flex: 1;
  text-align: center;
}

.header-book-btn {
  background: linear-gradient(135deg, #c7b299 0%, #b5a081 100%);
  color: white;
  padding: 12px 20px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: 0 4px 15px rgba(199, 178, 153, 0.3);
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.header-book-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(199, 178, 153, 0.5);
  background: linear-gradient(135deg, #b5a081 0%, #a89070 100%);
}

.brand-name {
  font-family: 'Dancing Script', cursive;
  font-size: 4rem;
  font-weight: 700;
  color: #2c2c2c;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.tagline {
  font-size: 1.2rem;
  font-weight: 300;
  color: #666;
  margin: 0px 0 0;
  font-style: italic;
  letter-spacing: 0.5px;
}

/* Header Image Section */
.header-image-section {
  padding: 20px 40px;
  background-color: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-image-container {
  max-width: 1200px;
  width: 100%;
  height: auto;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  background: white;
}

.header-image-container img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  aspect-ratio: 1920 / 1611;
}

/* Services Section */
.services-section {
  padding: 60px 40px;
  background-color: #fafafa;
}

.services-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 120px;
}

.service-card {
  background: none;
  border: none;
  padding: 20px 10px;
  text-align: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
}

.service-card::after {
  content: '';
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: repeating-linear-gradient(
    to right,
    #c7b299 0px,
    #c7b299 4px,
    transparent 4px,
    transparent 8px
  );
  transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.service-card:hover::after {
  width: 120%;
}

.service-card.active::after {
  width: 130%;
  background: repeating-linear-gradient(
    to right,
    #b5a081 0px,
    #b5a081 4px,
    transparent 4px,
    transparent 8px
  );
}

.service-card:hover h3 {
  color: #c7b299;
  transform: translateY(-2px);
}

.service-card.active h3 {
  color: #b5a081;
  transform: translateY(-3px);
}

.service-card h3 {
  font-family: 'Dancing Script', cursive;
  font-size: 2.2rem;
  font-weight: 600;
  margin: 0;
  color: #2c2c2c;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* Dynamic Content Section */
.dynamic-content {
  padding: 80px 40px 120px;
  background-color: #fafafa;
  animation: fadeInUp 0.6s ease-out;
  overflow: hidden;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.content-container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto;
  gap: 60px;
  align-items: start;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  padding: 50px;
}

.content-text {
  padding-right: 0;
}

.content-text h2 {
  font-family: 'Dancing Script', cursive;
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 25px;
  color: #2c2c2c;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: 1px;
}

.content-text p {
  font-size: 1.2rem;
  line-height: 1.9;
  color: #444;
  font-weight: 400;
  font-style: italic;
  letter-spacing: 0.3px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.top-photo {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.top-photo .photo-item {
  max-width: 800px;
  width: 100%;
}

.bottom-photos {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  overflow: hidden;
}

.photo-item {
  overflow: hidden;
  border-radius: 8px;
  padding: 0;
  margin: 0;
}

.photo-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.photo-item:hover img {
  transform: scale(1.02);
}

/* Portfolio Section */
.portfolio-section {
  padding: 80px 40px;
  background-color: #fafafa;
}

.portfolio-title {
  text-align: center;
  font-family: 'Dancing Script', cursive;
  font-size: 3.5rem;
  font-weight: 700;
  margin: 0 0 60px;
  color: #2c2c2c;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: 2px;
}

.portfolio-grid {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  padding: 50px;
}

.portfolio-item img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.portfolio-item:hover img {
  transform: scale(1.02);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

/* Clickable Photo Styles */
.clickable-photo {
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.clickable-photo:hover {
  transform: scale(1.02);
}

/* Full Screen Overlay */
.fullscreen-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fullscreen-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  box-sizing: border-box;
}

.fullscreen-photo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  cursor: default;
  animation: scaleIn 0.3s ease-out;
}

@keyframes scaleIn {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.close-button {
  position: absolute;
  top: -50px;
  right: -10px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  font-size: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  line-height: 1;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  transform: scale(1.1);
}



/* Desktop Padding */
@media (min-width: 1200px) {
  .header {
    padding: 20px 60px 15px;
  }
  
  .header-image-section {
    padding: 15px 60px;
  }
  
  .services-section {
    padding: 40px 60px;
  }
  
  .dynamic-content {
    padding: 60px 40px 40px;
  }
  
  .portfolio-section {
    padding: 40px 60px;
  }
}

/* Large Desktop Optimization */
@media (min-width: 1400px) {
  .header {
    padding: 20px 20px 20px;
  }
  
  .header-image-section {
    padding: 20px 20px;
  }
  
  .header-image-container {
    max-width: 1400px;
  }
  
  .services-section {
    padding: 20px 200px 20px;
  }
  
  .dynamic-content {
    padding: 80px 120px 50px;
  }
  
  .portfolio-section {
    padding: 50px 120px;
  }
  
  .services-container {
    gap: 150px;
    max-width: 2600px;
  }
  
  .content-container {
    max-width: 2600px;
    gap: 100px;
  }
  
  .portfolio-grid {
    max-width: 2600px;
    gap: 40px;
  }
  
  .service-card h3 {
    font-size: 2.4rem;
  }
}

/* Tablet Responsiveness */
@media (max-width: 1199px) and (min-width: 769px) {
  .header {
    padding: 20px 40px 15px;
  }
  
  .header-image-section {
    padding: 15px 40px;
  }
  
  .services-section {
    padding: 35px 40px;
  }
  
  .dynamic-content {
    padding: 50px 30px 70px;
  }
  
  .portfolio-section {
    padding: 50px 40px;
  }
  
  .content-container {
    max-width: 900px;
    gap: 50px;
    padding: 40px;
  }
  
  .services-container {
    max-width: 900px;
    gap: 80px;
  }
  
  .portfolio-grid {
    max-width: 900px;
    gap: 25px;
    padding: 40px;
  }
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .header {
    padding: 15px 20px 10px;
    flex-direction: column;
    gap: 15px;
  }
  
  .header-book-btn {
    padding: 10px 18px;
    font-size: 0.85rem;
  }
  
  .header-image-section {
    padding: 10px 20px;
  }
  
  .services-section {
    padding: 30px 20px;
  }
  
  .dynamic-content {
    padding: 40px 20px 60px;
  }
  
  .portfolio-section {
    padding: 40px 20px;
  }

  .brand-name {
    font-size: 3rem;
  }
  
  .tagline {
    font-size: 1rem;
  }
  
  .header-image-container {
    border-radius: 8px;
  }
  
  .services-container {
    flex-direction: column;
    gap: 30px;
  }
  
  .service-card {
    padding: 15px 10px;
  }
  
  .service-card h3 {
    font-size: 2rem;
  }
  
  .content-container {
    grid-template-columns: 1fr;
    gap: 30px;
    max-width: 100%;
    padding: 30px;
  }
  
  .content-text {
    padding-right: 0;
  }
  
  .content-text h2 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }
  
  .content-text p {
    font-size: 1.1rem;
    line-height: 1.8;
  }
  
  .top-photo .photo-item {
    max-width: 100%;
    width: 100%;
  }
  
  .bottom-photos {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .portfolio-grid {
    grid-template-columns: 1fr;
    gap: 15px;
    padding: 30px;
  }
  
  .portfolio-item img {
    height: auto;
  }
  
  .portfolio-title {
    font-size: 2.8rem;
    margin-bottom: 35px;
  }
  
  /* Full Screen Mobile Adjustments */
  .fullscreen-container {
    padding: 60px 20px 20px;
  }
  
  .close-button {
    top: 20px;
    right: 20px;
    font-size: 1.5rem;
    width: 40px;
    height: 40px;
  }

}

@media (max-width: 480px) {
  .header {
    padding: 15px 15px 10px;
    flex-direction: column;
    gap: 12px;
  }
  
  .header-book-btn {
    padding: 8px 16px;
    font-size: 0.8rem;
  }
  
  .header-image-section {
    padding: 10px 15px;
  }
  
  .services-section {
    padding: 25px 15px;
  }
  
  .dynamic-content {
    padding: 30px 15px 50px;
  }
  
  .portfolio-section {
    padding: 30px 15px;
  }
  
  .brand-name {
    font-size: 2.5rem;
  }
  
  .service-card {
    padding: 12px 8px;
  }
  
  .service-card h3 {
    font-size: 1.8rem;
  }
  
  .content-container {
    gap: 25px;
    padding: 20px;
  }
  
  .content-text h2 {
    font-size: 2.2rem;
    margin-bottom: 15px;
  }
  
  .content-text p {
    font-size: 1rem;
    line-height: 1.7;
  }
  
  .bottom-photos {
    gap: 12px;
  }
  
  .portfolio-title {
    font-size: 2.4rem;
    margin-bottom: 30px;
  }
  
  .portfolio-item img {
    height: auto;
  }
}
</style>
