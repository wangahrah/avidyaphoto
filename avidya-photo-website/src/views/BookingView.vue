<template>
  <div class="booking">
    <!-- Header -->
    <header class="booking-header">
      <router-link to="/" class="back-btn">← Back to Home</router-link>
      <h1 class="brand-name">avidya photo</h1>
      <p class="page-title">Book Your Session</p>
    </header>

    <!-- Bio Section -->
    <section class="bio-section">
      <div class="bio-container">
        <div class="bio-content">
          <div class="bio-image">
            <img src="/photos/misc/bio.jpg" alt="Michael - Photographer" />
          </div>
          <div class="bio-text">
            <p>Michael is a passionate photographer based in New Jersey, specializing in capturing life's most precious moments. With a keen eye for detail and a love for storytelling through imagery, Michael creates timeless photographs that preserve the authentic emotions and connections that make your family unique.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Booking Form -->
    <section class="booking-form-section">
      <div class="form-container">
        <form @submit.prevent="submitForm" class="booking-form">
          <div class="form-group">
            <label for="fullName">Full Name *</label>
            <input
              type="text"
              id="fullName"
              v-model="form.fullName"
              :class="{ error: errors.fullName }"
              placeholder="Enter your full name"
              required
            />
            <span v-if="errors.fullName" class="error-message">{{ errors.fullName }}</span>
          </div>

          <div class="form-group">
            <label for="email">Email *</label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              :class="{ error: errors.email }"
              placeholder="your.email@example.com"
              required
            />
            <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
          </div>

          <div class="form-group">
            <label for="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              v-model="form.phone"
              :class="{ error: errors.phone }"
              placeholder="(555) 123-4567"
              required
            />
            <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
          </div>

          <div class="form-group">
            <label for="serviceType">Service Type *</label>
            <select
              id="serviceType"
              v-model="form.serviceType"
              :class="{ error: errors.serviceType }"
              required
            >
              <option value="">Select a service</option>
              <option value="portraits">Portraits</option>
              <option value="events">Events</option>
              <option value="farms">Farms</option>
            </select>
            <span v-if="errors.serviceType" class="error-message">{{ errors.serviceType }}</span>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="preferredDate">Preferred Date *</label>
              <input
                type="date"
                id="preferredDate"
                v-model="form.preferredDate"
                :class="{ error: errors.preferredDate }"
                :min="minDate"
                required
              />
              <span v-if="errors.preferredDate" class="error-message">{{ errors.preferredDate }}</span>
            </div>

            <div class="form-group">
              <label for="preferredTime">Preferred Time *</label>
              <select
                id="preferredTime"
                v-model="form.preferredTime"
                :class="{ error: errors.preferredTime }"
                required
              >
                <option value="">Select time</option>
                <option value="morning">Morning (8AM - 12PM)</option>
                <option value="afternoon">Afternoon (12PM - 5PM)</option>
                <option value="evening">Evening (5PM - 8PM)</option>
                <option value="golden-hour">Golden Hour (Sunset)</option>
              </select>
              <span v-if="errors.preferredTime" class="error-message">{{ errors.preferredTime }}</span>
            </div>
          </div>

          <div class="form-group">
            <label for="message">Message / Additional Details</label>
            <textarea
              id="message"
              v-model="form.message"
              placeholder="Tell me about your vision, special requests, location preferences, or any other details..."
              rows="5"
            ></textarea>
          </div>

          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            <span v-if="isSubmitting">Sending...</span>
            <span v-else>Send Booking Request</span>
          </button>
        </form>

        <!-- Success Message -->
        <div v-if="showSuccessMessage" class="success-message">
          <h3>Booking Request Sent!</h3>
          <p>Thank you for your interest! I'll get back to you within 24 hours to discuss your session details and availability.</p>
          <router-link to="/" class="return-home-btn">Return to Home</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import emailjs from '@emailjs/browser'

interface BookingForm {
  fullName: string
  email: string
  phone: string
  serviceType: string
  preferredDate: string
  preferredTime: string
  message: string
}

interface FormErrors {
  [key: string]: string
}

const form = ref<BookingForm>({
  fullName: '',
  email: '',
  phone: '',
  serviceType: '',
  preferredDate: '',
  preferredTime: '',
  message: ''
})

const errors = ref<FormErrors>({})
const isSubmitting = ref(false)
const showSuccessMessage = ref(false)

const minDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

const validateForm = (): boolean => {
  errors.value = {}

  // Full Name validation
  if (!form.value.fullName.trim()) {
    errors.value.fullName = 'Full name is required'
  } else if (form.value.fullName.trim().length < 2) {
    errors.value.fullName = 'Full name must be at least 2 characters'
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.value.email.trim()) {
    errors.value.email = 'Email is required'
  } else if (!emailRegex.test(form.value.email)) {
    errors.value.email = 'Please enter a valid email address'
  }

  // Phone validation
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  const cleanPhone = form.value.phone.replace(/[\s\-\(\)]/g, '')
  if (!form.value.phone.trim()) {
    errors.value.phone = 'Phone number is required'
  } else if (!phoneRegex.test(cleanPhone) || cleanPhone.length < 10) {
    errors.value.phone = 'Please enter a valid phone number'
  }

  // Service Type validation
  if (!form.value.serviceType) {
    errors.value.serviceType = 'Please select a service type'
  }

  // Preferred Date validation
  if (!form.value.preferredDate) {
    errors.value.preferredDate = 'Please select a preferred date'
  } else {
    const selectedDate = new Date(form.value.preferredDate)
    const today = new Date()
    if (selectedDate < today) {
      errors.value.preferredDate = 'Please select a future date'
    }
  }

  // Preferred Time validation
  if (!form.value.preferredTime) {
    errors.value.preferredTime = 'Please select a preferred time'
  }

  return Object.keys(errors.value).length === 0
}

const submitForm = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true

  try {
    // Send email via EmailJS
    const templateParams = {
      from_name: form.value.fullName,
      from_email: form.value.email,
      phone: form.value.phone,
      service_type: form.value.serviceType,
      preferred_date: form.value.preferredDate,
      preferred_time: form.value.preferredTime,
      message: form.value.message,
      to_name: 'Avidya Photo', // Your name
    }

    await emailjs.send(
      'service_uln3eth', // Replace with your EmailJS service ID
      'template_vyq27f7', // Replace with your EmailJS template ID
      templateParams,
      'qyRHCGiDWsUnqslyi' // Replace with your EmailJS public key
    )
    
    console.log('Booking submitted successfully')
    
    // Show success message
    showSuccessMessage.value = true
    
    // Reset form
    form.value = {
      fullName: '',
      email: '',
      phone: '',
      serviceType: '',
      preferredDate: '',
      preferredTime: '',
      message: ''
    }
  } catch (error) {
    console.error('Error submitting booking:', error)
    // Show error message to user
    alert('Sorry, there was an error sending your booking request. Please try again or contact us directly.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Inter:wght@300;400;500;600&display=swap');

.booking {
  min-height: 100vh;
  background-color: #fafafa;
  font-family: 'Inter', sans-serif;
}

/* Header */
.booking-header {
  background: linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%);
  padding: 30px 20px 40px;
  text-align: center;
  position: relative;
}

.back-btn {
  position: absolute;
  left: 20px;
  top: 30px;
  color: #666;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.back-btn:hover {
  color: #c7b299;
}

.brand-name {
  font-family: 'Dancing Script', cursive;
  font-size: 3rem;
  font-weight: 700;
  margin: 0;
  color: #2c2c2c;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.page-title {
  font-size: 1.3rem;
  font-weight: 400;
  color: #666;
  margin: 10px 0 0;
  letter-spacing: 0.5px;
}

/* Bio Section */
.bio-section {
  padding: 6px 2px;
}

.bio-container {
  max-width: 1600px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.bio-content {
  display: flex;
  align-items: center;
  padding: 50px;
}

.bio-image {
  max-width: 200px;
  margin-right: 50px;
}

.bio-image img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.bio-text {
  flex: 1;
}

.bio-text p {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
}

/* Booking Form Section */
.booking-form-section {
  padding: 60px 20px;
}

.form-container {
  max-width: 1600px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.booking-form {
  padding: 50px;
}

.form-group {
  margin-bottom: 30px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
  font-size: 1rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 15px 18px;
  border: 2px solid #e5e5e5;
  border-radius: 8px;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
  background-color: #fafafa;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #c7b299;
  background-color: white;
  box-shadow: 0 0 0 3px rgba(199, 178, 153, 0.1);
}

.form-group input.error,
.form-group select.error,
.form-group textarea.error {
  border-color: #e74c3c;
  background-color: #fef5f5;
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.error-message {
  display: block;
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 5px;
  font-weight: 500;
}

.submit-btn {
  width: 100%;
  background: linear-gradient(135deg, #c7b299 0%, #b5a081 100%);
  color: white;
  border: none;
  padding: 18px 30px;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
  letter-spacing: 0.5px;
}

.submit-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #b5a081 0%, #a89070 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(199, 178, 153, 0.4);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

/* Success Message */
.success-message {
  padding: 50px;
  text-align: center;
  background: linear-gradient(135deg, #f8f6f2 0%, #f0ede6 100%);
}

.success-message h3 {
  font-size: 2rem;
  color: #2c2c2c;
  margin: 0 0 20px;
  font-weight: 600;
}

.success-message p {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 30px;
}

.return-home-btn {
  display: inline-block;
  background: linear-gradient(135deg, #c7b299 0%, #b5a081 100%);
  color: white;
  text-decoration: none;
  padding: 15px 30px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.return-home-btn:hover {
  background: linear-gradient(135deg, #b5a081 0%, #a89070 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(199, 178, 153, 0.4);
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .booking-header {
    padding: 20px 15px 30px;
  }
  
  .back-btn {
    left: 15px;
    top: 20px;
  }
  
  .brand-name {
    font-size: 2.5rem;
  }
  
  .page-title {
    font-size: 1.1rem;
  }
  
  .booking-form-section {
    padding: 40px 15px;
  }
  
  .bio-section {
    padding: 40px 15px;
  }
  
  .bio-content {
    flex-direction: column;
    padding: 30px 25px;
    text-align: center;
  }
  
  .bio-image {
    margin-right: 0;
    margin-bottom: 30px;
    flex: 1;
    margin-left: auto;
    margin-right: auto;
  }
  
  .booking-form,
  .success-message {
    padding: 30px 25px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .form-group {
    margin-bottom: 25px;
  }
  
  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 12px 15px;
  }
  
  .submit-btn {
    padding: 15px 25px;
    font-size: 1rem;
  }
}
</style> 