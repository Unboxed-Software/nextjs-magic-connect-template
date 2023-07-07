import Image from 'next/image'
import Link from 'next/link'
import MagicWhite from 'public/magic_white.svg'
import {useMagic} from './provider/MagicProvider'
import Toast from '@/utils/Toast'
import DevLinks from './DevLinks'
type HeaderProps = {
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
	}

	return (
		<div className='w-full min-h-[35vh] drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] flex flex-col items-center bg-hero'>
			<Image
				className='h-[180] w-[120px] mt-4 mb-2'
				src={MagicWhite}
				alt='logo'
			/>
			<h3 className='text-gray-400 font-bold mb-4'>Demo</h3>
			<DevLinks />
		</div>
	)
}

export default Header
