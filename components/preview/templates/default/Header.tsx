import { Personal } from '@prisma/client'

export default function Header({ personal }: { personal: Personal | null }) {
  if (!personal) return

  return (
    <div className='flex justify-center'>
      <div className='absolute mt-10 flex flex-col bg-white px-16 py-10 text-center uppercase ring-1 ring-black'>
        <div className='mb-1 text-2xl font-bold tracking-widest'>
          {personal?.firstName} {personal?.lastName}
        </div>
        <div className='text-sm'>{personal?.position}</div>
      </div>
    </div>
  )
}
