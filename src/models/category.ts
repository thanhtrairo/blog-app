export enum CAT_SLUG {
  REACT_JS = 'ReactJs',
  NEXT_JS = 'NextJs',
  HTML_CSS = 'HTML_CSS',
  JAVASCRIPT = 'JavaScript',
  PERFORMANCE = 'Performance',
}

export const imgByCat = {
  [CAT_SLUG.REACT_JS]: '/reactjs.webp',
  [CAT_SLUG.NEXT_JS]: '/nextjs.webp',
  [CAT_SLUG.HTML_CSS]: '/html_css.webp',
  [CAT_SLUG.JAVASCRIPT]: '/javascript.webp',
  [CAT_SLUG.PERFORMANCE]: '/performance.webp',
}

export const catOptions = [
  {
    value: CAT_SLUG.REACT_JS,
    label: 'ReactJs',
  },
  {
    value: CAT_SLUG.NEXT_JS,
    label: 'NextJs',
  },
  {
    value: CAT_SLUG.HTML_CSS,
    label: 'HTML & CSS',
  },
  {
    value: CAT_SLUG.JAVASCRIPT,
    label: 'Javascript',
  },
  {
    value: CAT_SLUG.PERFORMANCE,
    label: 'Performance',
  },
]

export const catOptionsForFilter = [
  {
    value: 'all',
    label: 'Tất cả',
  },
  ...catOptions,
]
