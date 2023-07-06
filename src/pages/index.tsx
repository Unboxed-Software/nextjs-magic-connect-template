import Header from '@/components/Header'
import Login from '@/components/Login'
import {MagicProvider, useMagic} from '@/components/provider/MagicProvider'
import Wallet from '@/components/wallet'
import {Network, NetworkOption, getFormattedNetwork} from '@/utils/network'
import {useEffect, useState} from 'react'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Home() {
	const {magic} = useMagic()

	const [account, setAccount] = useState<string | null>(null)
	const [selectedNetwork, setSelectedNetwork] =
		useState<NetworkOption | null>(
			getFormattedNetwork(Network.POLY_TESTNET)
		)

	useEffect(() => {
		setAccount(localStorage.getItem('user'))
	}, [])
	return (
		<MagicProvider network={selectedNetwork}>
			<ToastContainer />
			<div className='home-page'>
				<Header
					disconnectedCallback={() => {
						setAccount(null)
					}}
					account={account}
				/>
				<div className='mt-10'>
					{account ? (
						<Wallet />
					) : (
						<Login
							onChange={(value: string) =>
								setSelectedNetwork(getFormattedNetwork(value))
							}
							selectedNetwork={selectedNetwork}
							setAccount={setAccount}
						/>
					)}
				</div>
			</div>
		</MagicProvider>
	)
}
