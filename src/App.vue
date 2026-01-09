<template>
  <navbar v-if="!$route.meta.hideLayout"></navbar>

  <router-view></router-view>
</template>
<script setup></script>
<style scoped></style>
