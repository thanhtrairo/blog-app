import { mergeAttributes } from '@tiptap/core'
import BaseHeading from '@tiptap/extension-heading'

import { slugify } from '~/utils/helpers'

export enum LEVELS_HEADING {
  LEVEL1 = 1,
  LEVEL2 = 2,
}

const classes: Record<LEVELS_HEADING, string> = {
  [LEVELS_HEADING.LEVEL1]: 'text-3xl mt-10 mb-4',
  [LEVELS_HEADING.LEVEL2]: 'text-2xl mt-8 mb-2',
}

export const Heading = BaseHeading.configure({ levels: [1, 2] }).extend({
  renderHTML({ node, HTMLAttributes }) {
    const hasLevel = this.options.levels.includes(node.attrs.level)
    const level: LEVELS_HEADING = hasLevel ? node.attrs.level : this.options.levels[0]
    return [
      `h${level}`,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: `!${classes[level]} font-medium`,
        id: slugify(node.content.content[0].text || ''),
      }),
      0,
    ]
  },
})
