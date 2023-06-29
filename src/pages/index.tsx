import Header from '@/components/Header'
import Login from '@/components/Login'
import {MagicProvier, useMagic} from '@/components/provider/MagicPrroviderr'
import Wallet from '@/components/wallet'
import {Network, NetworkOption, getFormattedNetwork} from '@/utils/network'
import {useEffect, useState} from 'react'

export default function Home() {
	const {magic} = useMagic()

	const [account, setAccount] = useState<string | null>(null)
	const [selectedNetwork, setSelectedNetwork] =
		useState<NetworkOption | null>(
			getFormattedNetwork(Network.POLY_TESTNET)
		)

	useEffect(() => {
		setAccount(localStorage.getItem('user'))
		console.log(localStorage.getItem('user'))
	}, [])
	return (
		<MagicProvier network={getFormattedNetwork(Network.POLY_TESTNET)}>
			<div className='home-page'>
				<Header />
				<div className='mt-10'>
					{account ? (
						<Wallet />
					) : (
						<Login
							onChange={(value: string) =>
								setSelectedNetwork(getFormattedNetwork(value))
							}
							selectedNetwork={selectedNetwork}
						/>
					)}
				</div>
			</div>
		</MagicProvier>
	)
}
