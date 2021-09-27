<template>
  <div class="episode-preview-photo-small">
    <g-image
      src="~/assets/images/unknown-profile.jpeg"
      class="round"
      alt="profilo sconosciuto"
    />
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.episode-preview-photo-small {
  width: 90px;
  height: 90px;
  background: var(--gradient);
  padding: 3px;
  border-radius: 50%;
  margin: 0 auto;
}

.round {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
</style>
