import { RouteLocation, useRoute } from "vue-router"

const suffix = "Mini's Corner"
export const useBlogMeta = (title: string, description: string) => {
  const route = useRoute()
  const formattedTitle = title ? title + " | " + suffix : suffix
  const canonical =
    baseUrl() +
    (route.fullPath.endsWith("/") ? route.fullPath : route.fullPath + "/")
  return {
    title: formattedTitle,
    link: [{ rel: "canonical", href: canonical }],
    meta: [
      { name: "title", content: formattedTitle },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, maximum-scale=1",
      },
      { hid: "description", name: "description", content: description },
      {
        name: "og:description",
        content: description,
      },
      {
        name: "twitter:description",
        content: description,
      },
      {
        name: "og:title",
        content: formattedTitle,
      },
      {
        name: "twitter:title",
        content: formattedTitle,
      },
      {
        name: "og:url",
        content: canonical,
      },
      {
        name: "twitter:url",
        content: canonical,
      },
    ],
    script: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: generateBreadcrumbs(route),
        }),
      },
    ],
    htmlAttrs: {
      lang: "en",
    },
  }
}

function generateBreadcrumbs(route: RouteLocation) {
  const arr = []
  const split = route.fullPath.split("/")
  let curr = ""
  for (let i = 0; i < split.length; i++) {
    curr = curr + split[i] + "/"
    arr.push({
      "@type": "ListItem",
      position: i,
      name: guessTitle(split[i]),
      item: baseUrl() + curr,
    })
  }

  return arr
}

function guessTitle(segment: string): string {
  if (segment === "/" || segment === "") {
    return suffix
  } else {
    return segment
  }
}

function baseUrl(): string {
  return "https://benndorf.dev"
}
