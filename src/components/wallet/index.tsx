import {useState} from 'react'
import Card from '../card/Card'
import CardHeader from '../card/CardHeader'
import {useMagic} from '../provider/MagicProvider'
import Balance from './balane/Balance'
import Address from './address/Address'
import SendTransaction from './transaction/SendTransaction'
import SignMessage from './message/SignMessage'
import Toast from '@/utils/Toast'
import Status from './status/Status'
import DevLinks from '../DevLinks'

const Wallet = ({disconnectCallback}: {disconnectCallback: () => void}) => {
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
			Toast({message: 'Something went wrong', type: 'error'})
		}
	}

	return (
		<div className='min-h-[100%] w-full flex flex-col items-center align-center absolute top-[25%]'>
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
				<Status disconnectCallback={disconnectCallback} />
				<Balance />
				<Address />
			</Card>
			<Card>
				<CardHeader title='Send Transaction' />
				<SendTransaction />
			</Card>
			<Card>
				<CardHeader title='Sign Personal Message' />
				<SignMessage />
			</Card>

			<DevLinks primary />
		</div>
	)
}

export default Wallet
