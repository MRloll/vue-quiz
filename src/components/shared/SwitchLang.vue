<template>
  <div>
    <button class="btn text-black dark:text-white" @click="changeLang()">
      {{ locale === "ar" ? "English" : "العربية" }}
    </button>
  </div>
</template>

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

  function changeLang() {
    const lang = locale.value === "ar" ? "en" : "ar";
    setLang(lang);
  }

  onMounted(() => {
    setLang(savedLocale);
  });
</script>

<style lang="scss" scoped></style>
