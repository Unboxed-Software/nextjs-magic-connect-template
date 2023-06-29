import {useMagic} from '@/components/provider/MagicPrroviderr'

const Balance = () => {
	const {web3, magic} = useMagic()

	return (
		<div className='bg-white drop-shadow-lg rounded-lg p-4 font-medium'>
			Wallet
		</div>
	)
}

export default Balance
