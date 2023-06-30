import Card from '@/components/card/Card'
import CardHeader from '@/components/card/CardHeader'
import CardBody from '@/components/card/CardBody'
import {useMagic} from '@/components/provider/MagicPrrovider'
import {useEffect, useState} from 'react'

const Balance = () => {
	const {web3, magic} = useMagic()

	const [balance, setBalance] = useState<string | undefined>('0 ether')
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		getBalance()
	}, [])

	const getBalance = async () => {
		setLoading(true)
		setBalance('... ether')
		try {
			const address = localStorage.getItem('user')
			console.log('address: ' + address)
			if (!address) {
				return
			}
			const walletBalance = await web3?.eth.getBalance(address)

			if (walletBalance) {
				setBalance(
					`${web3?.utils.fromWei(walletBalance, 'ether')} ether`
				)
			}
			console.log('balance: ' + walletBalance)
			setLoading(false)
		} catch (e) {
			setLoading(false)
			console.log(e)
		}
	}

	const handleActionClick = () => {
		getBalance()
	}

	return (
		<Card>
			<CardHeader title='Wallet' />
			<CardBody
				label='Balance'
				value={balance as unknown as string}
				needDivider
				action={{
					title: 'Refresh',
					onClick: handleActionClick,
					type: 'info',
					loading: loading,
				}}
			/>
		</Card>
	)
}

export default Balance
