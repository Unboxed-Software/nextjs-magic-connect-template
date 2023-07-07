import CardBody from '@/components/card/CardBody'
import {useMagic} from '@/components/provider/MagicProvider'
import Toast from '@/utils/Toast'
import {useEffect, useState} from 'react'

const Status = ({disconnectCallback}: {disconnectCallback: () => void}) => {
	const {magic} = useMagic()
	const [account, setAccount] = useState<string | null>()

	useEffect(() => {
		const account = localStorage.getItem('user')
		setAccount(account)
	}, [])

	return (
		<CardBody
			label='Status'
			value={account as string}
			action={{
				title: 'Disconnect',
				type: 'info',
				onClick: () => {
					;(async () => {
						try {
							if (await magic?.user.isLoggedIn()) {
								await magic?.user.logout()
							}
						} catch (error) {
							Toast({
								message: 'Something went wrong',
								type: 'error',
							})
							console.log(
								'disconnect error: ' + JSON.stringify(error)
							)
						}
					})()
					localStorage.setItem('user', '')
					disconnectCallback()
				},
			}}
		/>
	)
}

export default Status
