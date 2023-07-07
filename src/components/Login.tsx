import {Network, NetworkOption, getFormattedNetwork} from '@/utils/network'
import {useMagic} from './provider/MagicProvider'
import {Dispatch, SetStateAction, useEffect, useState} from 'react'
import classNames from 'classnames'
import {toast} from 'react-toastify'
import Toast from '@/utils/Toast'
import Card from './card/Card'
import Image from 'next/image'
import MagicWhite from 'public/magic_white.svg'

export type Props = {
	onChange: (value: string) => void
	selectedNetwork: NetworkOption | null
	setAccount: Dispatch<SetStateAction<string | null>>
}
const Login = ({onChange, selectedNetwork, setAccount}: Props) => {
	const {magic} = useMagic()

	const [loginInProgress, setLoginInProgress] = useState(false)

	const handleConnect = async () => {
		setLoginInProgress(true)
		try {
			const accounts = await magic?.wallet.connectWithUI()
			if (accounts) {
				localStorage.setItem('user', accounts[0])
				setAccount(accounts[0])
				setLoginInProgress(false)
			}
		} catch (e: any) {
			console.log(JSON.stringify(e))
			if (e.code == '-32603') {
				Toast({message: 'Login cancelled by user', type: 'error'})
			}
			setLoginInProgress(false)
		}
	}

	return (
		<div className='max-w-[40%] min-w-[20%] rounded-md mx-auto py-6 px-4'>
			<div className='w-full flex flex-col items-center'>
				<Image
					className='h-[180] w-[120px] mt-4 mb-2'
					src={MagicWhite}
					alt='logo'
				/>
				<h3 className='text-gray-400 font-bold mb-4'>Demo</h3>
			</div>

			<div className='flex flex-col justify-center items-center'>
				<select
					className='text-black border-none rounded-md px-4 py-2 my-4'
					value={selectedNetwork?.value}
					onChange={(e: any) => onChange(e.target.value)}>
					{Object.keys(Network).map((key) => (
						<option
							className='text-black'
							value={getFormattedNetwork(Network[key]).value}
							key={key}>
							{Network[key]}
						</option>
					))}
				</select>
				<button
					className={classNames(
						'rounded-3xl px-8 py-2 bg-[#A799FF]/[0.7] text-white font-medium',
						!loginInProgress ? 'hover:bg-[#A799FF]' : ''
					)}
					onClick={handleConnect}
					disabled={loginInProgress}>
					{loginInProgress
						? 'Waiting for login to complete...'
						: 'Login'}
				</button>
			</div>
		</div>
	)
}

export default Login
