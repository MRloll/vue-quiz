import { useMotion } from "@vueuse/motion";
import { Ref } from "vue";

export const usePageLoadAnimation = (target: Ref<HTMLElement | null>) => {
  useMotion(target, {
    initial: {
      y: 100,
      opacity: 0,
    },
    enter: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 25,
        mass: 0.5,
      },
    },
  });
};
