import {Network, NetworkOption, getFormattedNetwork} from '@/utils/network'
import {useMagic} from './provider/MagicPrrovider'
import {Dispatch, SetStateAction, useEffect, useState} from 'react'
import classNames from 'classnames'

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
		} catch (e) {
			console.log(JSON.stringify(e))
			setLoginInProgress(false)
		}
	}

	return (
		<div className='max-w-[40%] min-w-[20%] rounded-md mx-auto py-6 px-4 flex flex-col justify-center items-center'>
			<select
				className='text-black border-none rounded-md px-4 py-2 my-4'
				value={selectedNetwork?.value}
				onChange={(e: any) => onChange(e.target.value)}>
				{Object.keys(Network).map((key) => (
					<option
						className='text-black'
						value={getFormattedNetwork(Network[key]).value}>
						{Network[key]}
					</option>
				))}
			</select>
			<button
				className={classNames(
					'rounded-3xl px-8 py-2 bg-[#A799FF] text-white font-medium',
					!loginInProgress ? 'hover:bg-[#A799FF]/[0.5]' : ''
				)}
				onClick={handleConnect}
				disabled={loginInProgress}>
				{loginInProgress ? 'Waiting for login to complete...' : 'Login'}
			</button>
		</div>
	)
}

export default Login
