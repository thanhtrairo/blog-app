import ImageResize from 'tiptap-extension-resize-image'

export const Image = ImageResize.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      loading: {
        default: 'lazy',
      },
      class: {
        default: 'min-h-80',
      },
    }
  },
})
