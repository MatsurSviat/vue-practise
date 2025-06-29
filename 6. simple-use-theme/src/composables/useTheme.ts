import { ref, watch } from "vue";

// First we take in a theme argument with a default value of "light".
export const useTheme = (theme: string = "light") => {
  // Next, we create a ref with the theme value.
  const _theme = ref(theme);

  // We then watch the theme ref and set the theme on the HTML element whenever the theme changes.
  watch(
    _theme,
    (newTheme) => {
      // Here we use document.querySelector to get the HTML element
      // https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
      // but you could also use document.documentElement to select the HTML element
      // https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement
      const htmlEl = document.querySelector("html");
      if (htmlEl) {
        htmlEl.dataset.theme = newTheme;
      }
    },
    {
      // We set immediate to true so that the theme is set on the HTML element
      // immediately when the composable is used
      immediate: true,
    },
  );

  // Finally, we return the theme ref.
  return _theme;
};
