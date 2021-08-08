<template>
  <div class="episode-preview-photo-small">
    <g-image
      v-if="foto.foto"
      class="round"
      :src="foto.foto.url"
      :alt="`Foto di ${foto.nome} ${foto.cognome}`"
    />

    <g-image v-else src="~/assets/images/unknown-profile.jpeg" class="round" />
  </div>
</template>

<script>
export default {
  props: ["foto"],
};
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
