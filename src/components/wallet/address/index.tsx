import CardBody from '@/components/card/CardBody'
import {useEffect, useState} from 'react'

const Address = () => {
	const [account, setAccount] = useState<string | null>()

	useEffect(() => {
		const account = localStorage.getItem('user')
		setAccount(account)
	}, [])

	return <CardBody label='Address' value={account as string} needDivider />
}

export default Address
