import ImageResize from 'tiptap-extension-resize-image'

const HEIGHT = 400

export const Image = ImageResize.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      loading: {
        default: 'lazy',
      },
      class: {
        default: HEIGHT,
      },
    }
  },
})
// kiểm tra image đã complete ? h-auto : h=400px
