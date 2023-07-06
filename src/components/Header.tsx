import Image from 'next/image'
import Link from 'next/link'
import MagicColorWhite from 'public/magic_color_white.svg'
import {useEffect, useState} from 'react'
import {useMagic} from './provider/MagicPrrovider'
import Toast from '@/utils/Toast'
type HeaderProps = {
	disconnectedCallback: () => void
	account: string | null
}
const Header = (props: HeaderProps) => {
	const {magic} = useMagic()

	const handleDisconnect = () => {
		;(async () => {
			try {
				if (await magic?.user.isLoggedIn()) {
					await magic?.user.logout()
				}
			} catch (error) {
				Toast({message: 'Something went wrong', type: 'error'})
				console.log('disconnect error: ' + JSON.stringify(error))
			}
		})()
		localStorage.setItem('user', '')
		props.disconnectedCallback()
	}

	return (
		<div className='w-full drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] h-[64px] flex items-center'>
			<Image
				className='h-[180] w-[120px] m-2'
				src={MagicColorWhite}
				alt='logo'
			/>
			<Link
				href='https://magic.link/docs'
				className='text-white font-medium underline mx-4'>
				Docs
			</Link>
			<div className='text-white'>|</div>
			<Link
				href='https://dashboard.magic.link/signup'
				className='text-white font-medium underline mx-4'>
				Dashboard
			</Link>
			<div className='text-white'>|</div>
			<Link
				href='https://discord.com/invite/magiclabs'
				className='text-white font-medium underline mx-4'>
				Discord
			</Link>

			{props.account && (
				<div className='flex flex-col flex-1 items-end px-8'>
					<div className='flex'>
						<button
							className='drop-shadow-lg rounded-lg px-2 py-1 font-medium bg-[#A799FF] hover:bg-[#A799FF]/[0.5] text-white'
							onClick={handleDisconnect}>
							Disconnect
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default Header
