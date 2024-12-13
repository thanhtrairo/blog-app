import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '~/components/ui/dialog'

interface ModalProps {
  title: React.ReactNode
  open: boolean
  description?: string
  children?: React.ReactNode
  onClose: () => void
}

export const Modal: React.FC<ModalProps> = ({ title, description, open, children, onClose }) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onChange}>
      <DialogContent
        className="max-h-full w-10/12 max-w-none overflow-auto max-sm:px-4 sm:w-[640px]"
        aria-describedby=""
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>{children}</div>
      </DialogContent>
    </Dialog>
  )
}
