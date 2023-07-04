import {useState} from 'react'
import Card from '../card/Card'
import CardHeader from '../card/CardHeader'
import {useMagic} from '../provider/MagicPrrovider'
import Balance from './balane'
import Address from './address'
import SendTransaction from './transaction/SendTransaction'
import SignMessage from './message/SignMessage'

const Wallet = () => {
	const {magic} = useMagic()

	const [loading, setLoading] = useState(false)

	const handleShowUi = async () => {
		setLoading(true)
		try {
			if (!(await magic?.user.isLoggedIn())) {
				alert('Please click disconnect and login again')
			} else {
				try {
					await magic?.wallet.showUI()
				} catch (e) {
					alert('Please click disconnect and login again')
					console.log(e)
				} finally {
					setLoading(false)
				}
			}
		} catch (error) {
			console.log(`Error while showing ui ${JSON.stringify(error)}`)
		}
	}

	return (
		<div className='min-h-[100%]'>
			<div className='grid gap-4 grid-cols-5 p-4 mx-[10%]'>
				<Card>
					<CardHeader
						title='Wallet'
						action={{
							title: 'Show',
							type: 'info',
							onClick: () => {
								handleShowUi()
							},
							loading,
						}}
					/>
					<Balance />
					<Address />
				</Card>
				<Card>
					<CardHeader title='Send Transaction' />
					<SendTransaction />
				</Card>
				<Card>
					<CardHeader title='Send Transaction' />
					<SignMessage />
				</Card>
			</div>
		</div>
	)
}

export default Wallet
