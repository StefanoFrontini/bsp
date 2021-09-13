<template>
  <div>
    <transition name="bounce">
      <div class="alert" v-if="messageAlertActive">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="#ffdb9b"
          stroke="#ce8500"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-alert-circle"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <div class="msg">{{ messageAlert }}</div>
        <div class="close-btn" @click="closeAlert">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ce8500"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-x"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
      </div>
    </transition>
    <transition name="bounce">
      <div class="alert success" v-if="messageSuccessActive">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="rgb(180, 238, 122)"
          stroke="rgb(83, 164, 3)"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-check-circle"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <div class="msg success">{{ messageSuccess }}</div>
        <div class="close-btn success" @click="closeSuccess">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgb(83, 164, 3)"
            stroke-width="4"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-x"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  methods: {
    closeSuccess() {
      this.$store.dispatch("message_success_active", false);
    },
    closeAlert() {
      this.$store.dispatch("message_alert_active", false);
    },
  },
  computed: {
    messageSuccess() {
      return this.$store.getters.messageSuccess;
    },
    messageSuccessActive() {
      return this.$store.getters.messageSuccessActive;
    },
    messageAlert() {
      return this.$store.getters.messageAlert;
    },
    messageAlertActive() {
      return this.$store.getters.messageAlertActive;
    },
  },
};
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

.alert.hide {
  display: none;
}

.alert {
  display: flex;
  align-items: center;
  background: rgba(250, 214, 151, 0.9);
  min-width: 360px;
  position: fixed;
  top: 10px;
  left: 50%;
  margin-left: -180px;
  padding: 0.75rem 1rem;
  gap: 1rem;
  border-radius: 0.25rem;
  border-left: 8px solid rgba(255, 165, 2, 0.9);
  overflow: hidden;
  z-index: 2;
}

.alert.success {
  background: rgb(180, 238, 122, 0.8);
  border-left: 8px solid rgb(83, 164, 3, 0.8);
  top: 10px;
}

.alert .msg {
  color: #875800;
  padding-right: 2rem;
}

.alert .msg.success {
  color: rgb(45, 80, 11);
  padding-right: 2rem;
}

.alert .close-btn {
  display: flex;
  background: rgba(255, 208, 128, 0.9);
  padding: 2rem 0.5rem;
  position: absolute;
  right: 0px;
  cursor: pointer;
}

.close-btn.success {
  background: rgb(146, 218, 73, 0.8);
}

.close-btn:hover {
  background: rgba(255, 199, 102, 0.9);
}

.close-btn.success:hover {
  background: rgb(129, 205, 53);
}

.button {
  color: var(--pink);
  border: 2px solid;
  border-radius: 0.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  text-align: center;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 600;
  background-color: transparent;
  cursor: pointer;
  margin: 0 auto;
  margin-top: 2rem;
}

@media (min-width: 1000px) {
  .alert {
    margin-left: -300px;
  }
}
</style>
