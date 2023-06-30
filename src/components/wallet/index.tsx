import {useState} from 'react'
import Card from '../card/Card'
import CardHeader from '../card/CardHeader'
import {useMagic} from '../provider/MagicPrrovider'
import Balance from './balane'

const Wallet = () => {
	const {magic} = useMagic()

	const [loading, setLoading] = useState(false)

	const handleShowUi = async () => {
		setLoading(true)
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
	}

	return (
		<div className='min-h-[100%]'>
			<div className='grid gap-2 grid-cols-4 p-4'>
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
				</Card>
			</div>
		</div>
	)
}

export default Wallet
