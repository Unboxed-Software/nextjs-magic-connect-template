import {Network, NetworkOption, getFormattedNetwork} from '@/utils/network'
import {Magic} from 'magic-sdk'
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react'
import Web3, {net} from 'web3'

export type MagicContextType = {
	network: NetworkOption | null
	magic: Magic | null
	web3: Web3 | null
}

const MagicContext = createContext<MagicContextType>({
	network: null,
	magic: null,
	web3: null,
})

export const useMagic = () => useContext(MagicContext)

type ProviderProps = {
	network: NetworkOption | null
	children: ReactNode
}

export const MagicProvier = (props: ProviderProps) => {
	const [network, setNetwork] = useState<NetworkOption | null>(props.network)
	const [magic, setMagic] = useState<Magic | null>(null)
	const [web3, setWeb3] = useState<Web3 | null>(null)

	useEffect(() => {
		let currentNetwork: NetworkOption
		if (network == null) {
			currentNetwork = getFormattedNetwork(Network.POLY_TESTNET)
		} else {
			currentNetwork = {...props.network!}
		}
		const magic = new Magic('pk_live_8D6C562ABCA3140A', {
			network: {
				rpcUrl: currentNetwork.rpcUrl,
				chainId: currentNetwork.chainId,
			},
		})
		const web3 = new Web3(magic.rpcProvider)
		setNetwork(network)
		setMagic(magic)
		setWeb3(web3)
	}, [props, network])

	const value = useMemo(() => {
		return {
			network,
			magic,
			web3,
		}
	}, [network, magic])

	return (
		<MagicContext.Provider value={value}>
			{props.children}
		</MagicContext.Provider>
	)
}
