import { defineComponent, h, ref, computed, inject } from "vue";
const RouteKey = Symbol("RouteKey");

// parse the path and query params utility (e.g. /about?name=John&age=30 => { path: '/about', query: { name: 'John', age: 30 } })
function parsePath(url) {
  const [pre, _query] = url.split("?");
  const path = pre.replace(
    `${window.location.protocol}//${window.location.host}`,
    "",
  );
  const queryParams = new URLSearchParams(_query);
  const query = {};

  queryParams.forEach((value, key) => {
    query[key] = isNaN(value) ? value : Number(value);
  });

  return { path, query };
}

export function createRouter(options) {
  const { routes } = options;
  const { pathname, search } = window.location;
  const parsed = parsePath(`${pathname}${search}`);
  const route = ref(parsed);
  const routePath = computed(() => route.value.path);
  const origin = window.location.origin; // http://localhost:5173

  return {
    // You will code within the install method to complete the challenge 👇
    install(app) {
      app.provide(RouteKey, route);
      // create a RouterView component, which will render the current route component
      // just like with Vue Router all the RouteRecords are set via options.routes (see main.js)
      const RouterView = defineComponent({
        setup() {
          return () => {
            const currentRoute = routes.find(
              (route) => routePath.value === route.path,
            );

            // wrapper div
            return h(
              "div",
              {
                class: "mockup-browser-wrapper",
              },
              [
                // toolbar
                h("div", { class: "mockup-browser-toolbar" }, [
                  h("div", { class: "mockup-browser-url" }, [
                    h("span", origin),
                    h("input", {
                      value: routePath.value,
                      onInput: (e) => {
                        const matchingRoute = routes.find(
                          (r) => r.path === e.target.value,
                        );
                        if (matchingRoute) {
                          getRouter(route).push(e.target.value);
                        }
                      },
                    }),
                  ]),
                ]),

                // content
                h("div", { class: "mockup-browser-content" }, [
                  h(currentRoute.component),
                ]),
              ],
            );
          };
        },
      });

      // h(currentRoute.component)

      app.component("RouterView", RouterView);
    },
  };
}

function getRouter(route) {
  return {
    push(_path) {
      const { path, query } = parsePath(_path);
      route.value.path = path;
      route.value.query = query;
      history.pushState(null, null, _path);
    },
  };
}

export function useRouter() {
  const route = inject(RouteKey);
  return getRouter(route);
}

export function useRoute() {
  const route = inject(RouteKey);

  return route.value;
}
