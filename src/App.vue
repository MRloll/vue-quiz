<script setup>
  import { onMounted } from "vue";
  import { useI18n } from "vue-i18n";
  const savedLocale = localStorage.getItem("lang") || "en";

  const { locale } = useI18n();

  const setLang = (lang = "en") => {
    locale.value = lang;
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  };

  function changeLang(lang) {
    setLang(lang);
  }

  onMounted(() => {
    setLang(savedLocale);
  });
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold underline">{{ $t("hello") }}</h1>
    <button class="btn" @click="changeLang('ar')">عربي</button>
    <button class="btn" @click="changeLang('en')">English</button>
  </div>
</template>

<style scoped></style>
