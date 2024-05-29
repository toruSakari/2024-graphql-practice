import { ComponentProps } from 'react'
import { Avatar as PartsAvatar, AvatarImage as PartsAvatarImage, AvatarFallback as PartsAvatarFallBack } from '@/components/parts'

type Props = Omit<ComponentProps<typeof PartsAvatarImage>, 'className'> &  Pick<ComponentProps<typeof PartsAvatar>, 'className'>

const Avatar = ({ className, ...props }:Props) => {
  return (
    <PartsAvatar className={className}>
      <PartsAvatarImage {...props}></PartsAvatarImage>
      <PartsAvatarFallBack></PartsAvatarFallBack>
    </PartsAvatar>
  )
}

export default { Avatar }
